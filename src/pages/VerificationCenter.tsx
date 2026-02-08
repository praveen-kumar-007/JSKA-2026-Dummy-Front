import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { Language } from '../translations';
import { translations } from '../translations';

type RoleKey = 'player' | 'official' | 'institute';
type VerificationStatus = 'verified' | 'pending' | 'rejected';

type VerificationForm = {
  idNumber: string;
};

type VerificationRecord = {
  idNumber: string;
  name: string;
  fatherName: string;
  dob: string;
  photoUrl: string;
  roles: RoleKey[];
  status: VerificationStatus;
  role?: RoleKey;
  records?: VerificationRecord[];
};

const statusOrder: VerificationStatus[] = ['verified', 'pending', 'rejected'];
const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

type ApiLookupRecord = {
  idNumber?: string;
  name?: string;
  fatherName?: string;
  dob?: string;
  photoUrl?: string;
  roles?: RoleKey[];
  memberRole?: string;
  status?: string;
  role?: RoleKey;
  records?: ApiLookupRecord[];
};

type ApiLookupResponse = {
  success?: boolean;
  message?: string;
  data?: ApiLookupRecord;
};

const defaultRecord: VerificationRecord = {
  idNumber: '—',
  name: 'Record not found',
  fatherName: '—',
  dob: '—',
  photoUrl: 'https://res.cloudinary.com/ddka/image/upload/v1766700000/verification/placeholder.jpg',
  roles: ['player'],
  status: 'pending',
};

const localeForLang = (lang: Language) => (lang === 'hi' ? 'hi-IN' : 'en-IN');

const mapVerificationStatus = (value?: string): VerificationStatus => {
  if (!value) return 'pending';
  const normalized = value.toLowerCase();
  if (normalized === 'approved' || normalized === 'verified') return 'verified';
  if (normalized === 'rejected') return 'rejected';
  return 'pending';
};

const deriveRolesFromMemberRole = (memberRole?: string): RoleKey[] => {
  const normalized = memberRole?.toLowerCase() ?? '';
  const roles: RoleKey[] = [];
  if (!normalized || normalized.includes('player')) roles.push('player');
  if (normalized.includes('official') || normalized.includes('referee')) roles.push('official');
  if (normalized.includes('inst') || normalized.includes('institution')) roles.push('institute');
  return roles.length ? Array.from(new Set(roles)) : ['player'];
};

const formatDateForLocale = (value: string | Date | undefined, locale: string) => {
  if (!value) return '—';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
};

const normalizeRecordEntry = (entry: ApiLookupRecord, lang: Language): VerificationRecord => ({
  idNumber: entry.idNumber ?? '—',
  name: entry.name ?? 'Record not found',
  fatherName: entry.fatherName ?? '—',
  dob: formatDateForLocale(entry.dob, localeForLang(lang)),
  photoUrl: entry.photoUrl ?? defaultRecord.photoUrl,
  roles:
    entry.roles && entry.roles.length
      ? entry.roles
      : deriveRolesFromMemberRole(entry.memberRole),
  status: mapVerificationStatus(entry.status),
  role: entry.role,
});

const normalizeLookupRecord = (record: ApiLookupRecord, lang: Language): VerificationRecord => {
  const normalized = normalizeRecordEntry(record, lang);
  if (record.records && record.records.length) {
    normalized.records = record.records.map((nested) => normalizeRecordEntry(nested, lang));
  }
  return normalized;
};

const buildLookupUrl = (idNumber: string) => {
  const trimmed = idNumber.trim().toUpperCase();
  const encoded = encodeURIComponent(trimmed);
  if (API_BASE_URL) return `${API_BASE_URL}/api/verification/${encoded}`;
  return `/api/verification/${encoded}`;
};

const VerificationCenter: React.FC<{ lang: Language }> = ({ lang }) => {
  const { verification } = translations[lang];
  const [formState, setFormState] = useState<VerificationForm>({ idNumber: '' });
  const [submitted, setSubmitted] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [lookupRecord, setLookupRecord] = useState<VerificationRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const defaultRoles: RoleKey[] = ['player'];

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ idNumber: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setDetailsOpen(true);
    setErrorMessage(null);
    const trimmedId = formState.idNumber.trim();
    if (!trimmedId) {
      setLookupRecord(null);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(buildLookupUrl(trimmedId));
      if (!response.ok) {
        setLookupRecord(null);
        if (response.status === 404) {
          setErrorMessage(verification.errors.notFound);
          return;
        }
        const payload = (await response.json().catch(() => null)) as ApiLookupResponse | null;
        setErrorMessage(payload?.message ?? verification.errors.fetchFailed);
        return;
      }

      const payload = (await response.json()) as ApiLookupResponse;
      if (!payload.success || !payload.data) {
        setLookupRecord(null);
        setErrorMessage(payload?.message ?? verification.errors.notFound);
        return;
      }

      setLookupRecord(normalizeLookupRecord(payload.data, lang));
    } catch (error) {
      console.error('Verification lookup failed', error);
      setLookupRecord(null);
      setErrorMessage(verification.errors.fetchFailed);
    } finally {
      setLoading(false);
    }
  };

  const roleNames = verification.roleNames as Record<RoleKey, string>;
  const selectedRoles = lookupRecord?.roles.length ? lookupRecord.roles : defaultRoles;
  const roleLabelList = selectedRoles.map((role) => roleNames[role]).join(' / ');
  const recordsForTable = lookupRecord?.records?.length
    ? lookupRecord.records
    : lookupRecord
    ? [lookupRecord]
    : [];
  const tableRows = recordsForTable.length ? recordsForTable : [];
  const statusPriority: Record<VerificationStatus, number> = { verified: 0, pending: 1, rejected: 2 };
  const displayRecord = tableRows.reduce<VerificationRecord>((best, row) => {
    if (!best) return row;
    return statusPriority[row.status] < statusPriority[best.status] ? row : best;
  }, tableRows[0] ?? defaultRecord);
  const resolvedStatus: VerificationStatus = displayRecord.status ?? 'pending';
  const currentStatus = verification.statusCopy[resolvedStatus];
  const allRecordsRejected = tableRows.length > 0 && tableRows.every((row) => row.status === 'rejected');
  const playerRow = tableRows.find(
    (row) => row.role === 'player' || row.roles.includes('player')
  );
  const officialRow = tableRows.find(
    (row) => row.role === 'official' || row.roles.includes('official')
  );
  const showPlayerApprovedMessage = Boolean(playerRow && playerRow.status === 'verified');
  const showRefereeRejectedMessage = Boolean(officialRow && officialRow.status === 'rejected');
  const displayId = resolvedStatus === 'rejected' ? 'Rejected' : displayRecord.idNumber || formState.idNumber || '—';

  return (
    <>
      <Helmet>
        <title>{lang === 'hi' ? 'सत्यापन केंद्र | DDKA' : 'Verification Center | DDKA'}</title>
        <meta name="description" content={verification.heroDescription} />
        <meta name="keywords" content={lang === 'hi' ? 'सत्यापन, ID, खिलाड़ियों की जांच, DDKA' : 'verification, id lookup, player verification, DDKA'} />
        <link rel="canonical" href="https://dhanbadkabaddiassociation.tech/verification" />
        <meta property="og:title" content={lang === 'hi' ? 'सत्यापन केंद्र | DDKA' : 'Verification Center | DDKA'} />
        <meta property="og:description" content={verification.heroDescription} />
        <meta property="og:url" content="https://dhanbadkabaddiassociation.tech/verification" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
    <div className="bg-slate-50 min-h-screen font-inter">
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-10">
        <section className="bg-white rounded-3xl shadow-xl px-6 py-10 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 text-orange-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 10.707a1 1 0 01-1.414-1.414L9 6.586l1.707 1.707a1 1 0 01-1.414 1.414L9 9.414 8.707 9.707z" />
                </svg>
              </span>
              <p className="text-sm font-medium text-orange-600">{verification.navLabel}</p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">{verification.heroTitle}</h1>
            <p className="text-lg font-semibold text-slate-700 tracking-tight">{verification.heroSubtitle}</p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">{verification.heroDescription}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {verification.checklist.map((item, index) => (
              <article
                key={`${item}-${index}`}
                className="bg-slate-50/70 border border-slate-100 rounded-3xl p-5 shadow-sm space-y-2"
              >
                <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">Step {index + 1}</p>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr,0.8fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded bg-orange-50 text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-4a1 1 0 100 2 1 1 0 000-2zM7 9a1 1 0 012 0v3a1 1 0 11-2 0V9z" />
                  </svg>
                </span>
                <h2 className="text-2xl font-semibold text-slate-900">Status Overview</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{verification.snapshot.message}</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {statusOrder.map((statusKey) => {
                const copy = verification.statusCopy[statusKey];
                return (
                  <article
                    key={statusKey}
                    className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4 hover:shadow-lg transform hover:-translate-y-1 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
                          statusKey === 'verified' ? 'bg-emerald-100 text-emerald-600' : statusKey === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {statusKey === 'verified' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                            </svg>
                          ) : statusKey === 'pending' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5h2v5H9V5zM9 12h2v2H9v-2z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </span>
                        <div>
                          <span className="text-[11px] uppercase tracking-[0.4em] text-slate-500">{copy.badge}</span>
                          <h3 className="text-2xl font-semibold text-slate-900 leading-tight">{copy.title}</h3>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400">{verification.statuses[statusKey]}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{copy.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="space-y-5 bg-white rounded-3xl shadow-lg p-6 lg:p-8">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.5em] text-orange-600 font-semibold">{verification.navLabel}</p>
              <h2 className="text-xl font-semibold text-slate-900">{verification.form.heading}</h2>
              <p className="text-sm text-slate-600">{verification.form.subheading}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="sm:flex sm:items-center sm:gap-3">
                <label className="flex-1 block">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{verification.form.fields.idNumber}</span>
                  <div className="mt-2 flex items-center rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l3.817 3.817a1 1 0 01-1.414 1.414l-3.817-3.817A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    <input
                      type="text"
                      value={formState.idNumber}
                      onChange={handleInput}
                      placeholder="PLR-2026-001 or example@mail.com"
                      className="ml-3 flex-1 text-sm text-slate-800 bg-transparent focus:outline-none"
                    />
                  </div>
                </label>

                <div className="mt-3 sm:mt-0 sm:w-40">
                  <button
                    type="submit"
                    className={`w-full rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-lg shadow-orange-200 transition focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                      loading ? 'cursor-wait opacity-70' : 'hover:bg-orange-700'
                    }`}
                    disabled={loading}
                  >
                    {loading ? verification.form.loading : verification.form.submit}
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                {lang === 'hi' ? 'ID, पंजीकरण, ईमेल, फोन या आधार नंबर दर्ज करें; सिस्टम खिलाड़ी/रेफरी/संस्थान रोल स्वतः दिखाता है।' : 'Enter an ID, email, phone, or Aadhaar number; the system auto-detects player, referee, and institute roles.'}
              </p>

              {errorMessage && (
                <p className="text-xs text-red-600 font-semibold tracking-wide">{errorMessage}</p>
              )}
            </form>
          </div>
        </section>

        {submitted && !lookupRecord && !loading && (
          <section className="bg-white rounded-3xl shadow-lg p-6 text-red-600 text-sm font-semibold">
            Data not exists.
          </section>
        )}

        {submitted && lookupRecord && allRecordsRejected && (
          <section className="bg-white rounded-3xl shadow-lg p-6 text-red-600 text-sm font-semibold">
            This ID has been rejected by the admin.
          </section>
        )}

        {submitted && lookupRecord && !allRecordsRejected && (
          <section className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
            <details
              className="rounded-3xl border border-slate-100 p-4 bg-slate-50"
              open={detailsOpen}
              onToggle={(event) => setDetailsOpen((event.target as HTMLDetailsElement).open)}
            >
              <summary className="cursor-pointer text-sm font-semibold text-slate-800 flex items-center justify-between">
                {verification.snapshot.summary}
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500">
                  {verification.statuses[resolvedStatus]}
                </span>
              </summary>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-4">
                  <img
                    src={displayRecord.photoUrl}
                    alt={`${displayRecord.name} photo`}
                    className="h-20 w-20 rounded-2xl object-cover border border-slate-200 shadow-sm"
                  />
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-slate-900">
                      {currentStatus.title} · {roleLabelList}
                    </p>
                    <p>{currentStatus.detail}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">{verification.tableHeaders.name}:</span> {displayRecord.name}
                  </p>
                  <p>
                    <span className="font-semibold">{verification.tableHeaders.fatherName}:</span> {displayRecord.fatherName}
                  </p>
                  <p>
                    <span className="font-semibold">{verification.tableHeaders.dob}:</span> {displayRecord.dob}
                  </p>
                  <p>
                    <span className="font-semibold">{verification.tableHeaders.idNumber}:</span> {displayId}
                  </p>
                </div>
              </div>
            </details>

            {(showPlayerApprovedMessage || showRefereeRejectedMessage) && (
              <div className="space-y-1 text-sm">
                {showPlayerApprovedMessage && (
                  <p className="text-emerald-600 font-semibold">
                    Player ID is approved.
                  </p>
                )}
                {showRefereeRejectedMessage && (
                  <p className="text-red-600 font-semibold">
                    Referee ID has been rejected by the admin.
                  </p>
                )}
              </div>
            )}

            <div className="hidden lg:block overflow-x-auto text-sm">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">{verification.snapshot.summaryDetail}</caption>
                <thead className="text-[10px] uppercase tracking-[0.4em] text-slate-500">
                  <tr>
                    <th className="pb-2">{verification.tableHeaders.role}</th>
                    <th className="pb-2">{verification.tableHeaders.name}</th>
                    <th className="pb-2">{verification.tableHeaders.fatherName}</th>
                    <th className="pb-2">{verification.tableHeaders.dob}</th>
                    <th className="pb-2">{verification.tableHeaders.idNumber}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => {
                    const rowRole = row.role ?? (row.roles.length ? row.roles[0] : 'player');
                    return (
                      <tr key={`${row.idNumber}-${rowRole}`} className="border-t border-slate-100">
                        <td className="py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                          {roleNames[rowRole]}
                        </td>
                        <td className="py-3">{row.name}</td>
                        <td className="py-3">{row.fatherName}</td>
                        <td className="py-3">{row.dob}</td>
                        <td className="py-3">
                          {row.status === 'rejected' ? (
                            <span className="text-red-600 font-semibold">Rejected</span>
                          ) : (
                            row.idNumber
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-4">
              {tableRows.map((row) => {
                const rowRole = row.role ?? (row.roles.length ? row.roles[0] : 'player');
                return (
                  <div key={`${row.idNumber}-${rowRole}-mobile`} className="border border-slate-100 rounded-2xl bg-white/90 px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500 mb-3">
                      <span>{roleNames[rowRole]}</span>
                      <span>{row.status === 'rejected' ? 'Rejected' : verification.statuses[row.status ?? 'pending']}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">Name</p>
                      <p className="font-semibold text-slate-900">{row.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">Father Name</p>
                      <p className="font-semibold text-slate-900">{row.fatherName}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">DOB</p>
                      <p className="font-semibold text-slate-900">{row.dob}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">ID Number</p>
                      <p className="font-semibold text-slate-900">
                        {row.status === 'rejected' ? (
                          <span className="text-red-600 font-semibold">Rejected</span>
                        ) : (
                          row.idNumber
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>


          </section>
        )}
      </div>
    </div>
    </>
  );
};

export default VerificationCenter;