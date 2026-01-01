
import type { IDCardData } from '../types';
import { COLORS } from '../constants';

interface Props {
  data: IDCardData;
}

export const IDCardFront: React.FC<Props> = ({ data }) => {
  // Format DOB properly
  const formatDOB = (dobString: string) => {
    try {
      const date = new Date(dobString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dobString;
    }
  };

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
              DDKA - OFFICIAL ID
            </h1>
            <p className="text-orange-300 text-[5.5px] font-bold uppercase tracking-widest mt-0.5">
              Dhanbad District Kabaddi Association
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

      {/* Photo Section - Professional Square */}
      <div className="flex justify-center py-2.5 relative shrink-0">
        <div className="relative p-1 bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg rounded border-2 border-orange-500" 
             style={{ width: '68px', height: '82px' }}>
          <div className="w-full h-full bg-white overflow-hidden rounded">
            <img 
              src={data.photoUrl} 
              alt={data.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* ID Number Badge */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white text-[7px] font-black px-2.5 py-0.5 rounded-full border border-orange-500 shadow-md">
          ID: {data.idNo}
        </div>
      </div>

      {/* Player Name */}
      <div className="px-3 py-1.5 text-center border-b border-slate-200">
        <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-tight">
          {data.name}
        </h2>
        <p className="text-orange-600 text-[5.5px] font-black uppercase tracking-widest mt-0.5">
          KABADDI PLAYER
        </p>
      </div>

      {/* Details Grid - Professional */}
      <div className="flex-grow px-2.5 py-1.5 space-y-1 overflow-hidden">
        {/* Row 1: DOB and Blood Group */}
        <div className="grid grid-cols-2 gap-1">
          <div className="bg-blue-50 px-1.5 py-0.75 rounded border-l-2 border-blue-600">
            <span className="text-[4.5px] text-slate-500 font-bold uppercase block tracking-wide">DOB</span>
            <span className="text-[7px] font-bold text-slate-900 leading-tight">{formatDOB(data.dob)}</span>
          </div>
          <div className="bg-red-50 px-1.5 py-0.75 rounded border-l-2 border-red-600">
            <span className="text-[4.5px] text-slate-500 font-bold uppercase block tracking-wide">Blood</span>
            <span className="text-[7.5px] font-black text-red-600 leading-tight">{data.bloodGroup}</span>
          </div>
        </div>

        {/* Row 2: Phone */}
        <div className="bg-slate-900 text-white px-1.5 py-0.75 rounded">
          <span className="text-[4.5px] text-slate-300 font-bold uppercase block tracking-wide">Phone</span>
          <span className="text-[7px] font-bold tracking-wider leading-tight">{data.phone}</span>
        </div>

        {/* Row 3: Father's Name */}
        <div className="bg-slate-50 px-1.5 py-0.75 rounded border border-slate-200">
          <span className="text-[4.5px] text-slate-500 font-bold uppercase block tracking-wide">Father</span>
          <p className="text-[6.5px] font-semibold text-slate-800 leading-tight truncate">
            {data.fathersName}
          </p>
        </div>

        {/* Row 4: Address */}
        <div className="bg-slate-50 px-1.5 py-0.75 rounded border border-slate-200 flex-grow">
          <span className="text-[4.5px] text-slate-500 font-bold uppercase block tracking-wide">Address</span>
          <p className="text-[6px] font-medium text-slate-700 leading-tight line-clamp-2">
            {data.address}
          </p>
        </div>
      </div>

      {/* Footer - Professional */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 px-2 py-1.5 mt-auto shrink-0 flex items-center justify-between">
        <span className="text-white/40 text-[5px] font-black tracking-[0.15em] uppercase">OFFICIAL MEMBER CARD</span>
        <div className="flex gap-0.5">
          <div className="w-2 h-0.5 bg-orange-500 rounded-full"></div>
          <div className="w-1 h-0.5 bg-orange-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
