import React, { useEffect, useRef, useState } from 'react';

type Field = { key: string; label?: string };

interface Props {
  visible: boolean;
  onClose: () => void;
  records: any[];
  fields: Field[];
  filenamePrefix?: string;
}

const ExportCsvModal: React.FC<Props> = ({ visible, onClose, records, fields, filenamePrefix = 'export' }) => {
  const [selectedFields, setSelectedFields] = useState<Record<string, boolean>>(() => Object.fromEntries(fields.map(f => [f.key, true])));
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setSelectedFields(Object.fromEntries(fields.map(f => [f.key, true])));
  }, [fields]);

  useEffect(() => {
    if (visible) {
      // Focus the close button for accessibility when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [visible]);

  const esc = (s: any) => '"' + String(s ?? '').replace(/"/g, '""') + '"';

  function doExport(recordsToExport: any[], keys: string[]) {
    if (!recordsToExport || recordsToExport.length === 0) {
      alert('No records to export');
      return;
    }

    const header = keys.map(k => fields.find(f => f.key === k)?.label || k);
    const rows = recordsToExport.map(r => keys.map(k => esc((r as any)[k] ?? '')).join(','));
    // Include UTF-8 BOM for Excel compatibility
    const csv = '\uFEFF' + [header.join(','), ...rows].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filenamePrefix}-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  if (!visible) return null;

  const keysSelected = Object.keys(selectedFields).filter(k => selectedFields[k]);

  const gradeFields = fields.filter(f => f.key.startsWith('grade_'));
  const otherFields = fields.filter(f => !f.key.startsWith('grade_'));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="export-modal-title">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 id="export-modal-title" className="text-lg font-bold">Export CSV</h3>
          <button ref={closeButtonRef} onClick={onClose} className="text-slate-500 focus:outline-none focus:ring">Close</button>
        </div>

        <p className="text-sm text-slate-600 mb-4">Select fields to include in the CSV. You can choose rows in the table before opening this modal.</p>

        {gradeFields.length > 0 && (
          <div className="mb-3">
            <div className="text-sm font-semibold mb-2">Grades</div>
            <div className="flex gap-4 mb-4 flex-wrap">
              {gradeFields.map(f => (
                <label key={f.key} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!selectedFields[f.key]}
                    onChange={(e) => setSelectedFields(prev => ({ ...prev, [f.key]: e.currentTarget.checked }))}
                  />
                  <span className="text-sm">{f.label || f.key}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-4 max-h-60 overflow-y-auto pr-2">
          {otherFields.map(f => (
            <label key={f.key} className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!selectedFields[f.key]}
                onChange={(e) => setSelectedFields(prev => ({ ...prev, [f.key]: e.currentTarget.checked }))}
              />
              <span className="text-sm truncate">{f.label || f.key}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <button
            onClick={() => { onClose(); doExport(records, keysSelected); }}
            disabled={records.length === 0 || keysSelected.length === 0}
            className="w-full sm:w-auto px-4 py-2 bg-blue-900 text-white rounded-lg disabled:opacity-50"
          >
            Export
          </button>

          <button
            onClick={() => { onClose(); doExport(records, fields.map(f => f.key)); }}
            disabled={records.length === 0}
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 text-slate-700 rounded-lg"
          >
            Export All Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportCsvModal;
