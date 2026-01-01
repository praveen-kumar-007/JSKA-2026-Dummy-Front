import React from 'react';
import type { IDCardData } from '../types';
import { COLORS } from '../constants';

interface Props {
  data: IDCardData;
}

export const IDCardBack: React.FC<Props> = ({ data }) => {
  const formatDOB = (dobString: string) => {
    try {
      const date = new Date(dobString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dobString;
    }
  };

  const qrData = `DDKA:${data.idNo}:${data.name}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(qrData)}&color=1e40af`;

  return (
    <div 
      className="relative flex flex-col bg-white overflow-hidden shadow-2xl"
      style={{ 
        width: '240px', 
        height: '380px', 
        borderRadius: '16px',
        fontFamily: "'Poppins', sans-serif",
        border: `2px solid ${COLORS.primary}`
      }}
    >
      {/* Watermark Logos Background */}
      <div className="absolute inset-0 pointer-events-none opacity-8">
        <div className="absolute top-4 left-4 text-2xl font-black text-blue-900">AKFI</div>
        <div className="absolute bottom-4 right-4 text-2xl font-black text-blue-900">JH-KBD</div>
      </div>

      {/* Header Section - Professional */}
      <div 
        className="relative px-3 py-2.5 shrink-0"
        style={{ background: COLORS.primary }}
      >
        <div className="flex items-center justify-center gap-1.5">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-orange-500">
            <span className="text-[10px] font-black text-orange-600">🇮🇳</span>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-white text-[8px] font-black leading-tight tracking-tight uppercase">
              ID VERIFICATION
            </h1>
            <p className="text-orange-300 text-[5.5px] font-bold uppercase tracking-widest mt-0.5">
              Scan QR for Details
            </p>
          </div>
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-orange-500">
            <span className="text-[10px] font-black">🏏</span>
          </div>
        </div>
      </div>

      {/* Accent Line */}
      <div className="h-0.5 w-full shrink-0" style={{ 
        background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.accent}, ${COLORS.secondary})`,
      }} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col px-2.5 py-2 space-y-1.5 justify-between overflow-hidden">
        {/* ID Number */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white px-2 py-1 rounded text-center">
          <p className="text-[4.5px] text-blue-200 font-bold uppercase tracking-wider">Member ID</p>
          <p className="text-[9px] font-black tracking-[0.1em] mt-0.5">{data.idNo}</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center py-1">
          <div className="p-1.5 bg-white border-2 border-blue-900 rounded shadow-md">
            <img src={qrUrl} alt="QR Code" className="w-12 h-12" />
          </div>
        </div>

        {/* Information Grid */}
        <div className="space-y-1">
          {/* DOB */}
          <div className="bg-blue-50 border-l-4 border-blue-600 px-1.5 py-0.75 rounded">
            <p className="text-[4.5px] text-slate-500 font-bold uppercase tracking-wide">Date of Birth</p>
            <p className="text-[7px] font-bold text-slate-900 leading-tight">{formatDOB(data.dob)}</p>
          </div>

          {/* Blood Group */}
          <div className="bg-red-50 border-l-4 border-red-600 px-1.5 py-0.75 rounded">
            <p className="text-[4.5px] text-slate-500 font-bold uppercase tracking-wide">Blood Group</p>
            <p className="text-[8px] font-black text-red-600 leading-tight">{data.bloodGroup}</p>
          </div>

          {/* Emergency Contact */}
          <div className="bg-yellow-50 border-l-4 border-yellow-600 px-1.5 py-0.75 rounded">
            <p className="text-[4.5px] text-slate-500 font-bold uppercase tracking-wide">Emergency Contact</p>
            <p className="text-[7px] font-bold text-slate-900 leading-tight">{data.phone}</p>
          </div>

          {/* Valid Card Notice */}
          <div className="bg-green-50 border border-green-300 rounded px-1.5 py-0.75 text-center">
            <p className="text-[5px] text-green-700 font-black uppercase tracking-wider">
              ✓ Official Valid Card
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Professional */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 px-2 py-1.5 mt-auto shrink-0 flex items-center justify-between">
        <span className="text-white/40 text-[5px] font-black tracking-[0.15em] uppercase">DDKA MEMBER</span>
        <span className="text-orange-400 text-[5px] font-bold">Est. 2017</span>
      </div>
    </div>
  );
};
