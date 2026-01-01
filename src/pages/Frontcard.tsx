
import type { IDCardData } from '../types';
import { COLORS, LOGOS } from '../constants';

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
        borderRadius: '20px',
        fontFamily: "'Poppins', sans-serif",
        border: `2px solid ${COLORS.primary}`
      }}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
        backgroundSize: '8px 8px'
      }} />

      {/* Header Section */}
      <div 
        className="relative h-14 flex items-center px-3 overflow-hidden shrink-0"
        style={{ background: COLORS.primary }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-600 -skew-x-[25deg] translate-x-10 translate-y-[-10%] opacity-20" />
        
        <div className="relative z-10 flex items-center gap-2 w-full">
          <div className="bg-white rounded-full p-0.5 shadow-md w-8 h-8 flex items-center justify-center shrink-0">
            <img src={LOGOS.AKFI} alt="Logo" className="w-6 h-6 object-contain" />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-white text-[7px] font-black leading-tight tracking-tight uppercase">
              DDKA
            </h1>
            <div className="text-orange-300 text-[6px] font-bold uppercase tracking-widest">
              Dhanbad District
            </div>
          </div>
        </div>
      </div>

      {/* Visual Accent */}
      <div className="h-1 w-full shrink-0" style={{ 
        background: `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.accent})`,
      }} />

      {/* Photo Section - Square frame, smaller */}
      <div className="flex justify-center py-2 relative shrink-0">
        <div className="relative p-1 bg-gradient-to-b from-orange-500 to-amber-300 shadow-lg rounded-lg" 
             style={{ width: '70px', height: '85px' }}>
          <div className="w-full h-full bg-white overflow-hidden rounded-md">
            <img 
              src={data.photoUrl} 
              alt={data.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[6px] font-black px-2 py-0.5 rounded border border-orange-500 shadow-md whitespace-nowrap">
          {data.idNo}
        </div>
      </div>

      {/* Player Name & Designation */}
      <div className="px-3 py-1 text-center">
        <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-tight">
          {data.name}
        </h2>
        <p className="text-orange-600 text-[6.5px] font-black uppercase tracking-widest mt-0.5">
          KABADDI PLAYER
        </p>
      </div>

      {/* Details Grid - Compact */}
      <div className="flex-grow px-3 py-1 space-y-1">
        {/* DOB and Blood Group */}
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-blue-50 px-2 py-1 rounded border-l-2 border-blue-600">
            <span className="text-[5px] text-slate-400 font-bold uppercase block">DOB</span>
            <span className="text-[7.5px] font-bold text-slate-800">{formatDOB(data.dob)}</span>
          </div>
          <div className="bg-red-50 px-2 py-1 rounded border-l-2 border-red-600">
            <span className="text-[5px] text-slate-400 font-bold uppercase block">Blood</span>
            <span className="text-[8px] font-black text-red-600">{data.bloodGroup}</span>
          </div>
        </div>

        {/* Phone Number */}
        <div className="bg-slate-900 text-white px-2 py-1 rounded flex items-center justify-between">
          <div className="flex-1">
            <span className="text-[5px] text-slate-300 font-bold uppercase block">Phone</span>
            <span className="text-[7.5px] font-bold tracking-wider">{data.phone}</span>
          </div>
        </div>

        {/* Father's Name */}
        <div className="bg-slate-50 px-2 py-1 rounded border border-slate-200">
          <span className="text-[5px] text-slate-400 font-bold uppercase block">Father's Name</span>
          <p className="text-[7px] font-semibold text-slate-800 leading-tight truncate">
            {data.fathersName}
          </p>
        </div>

        {/* Address */}
        <div className="bg-slate-50 px-2 py-1 rounded border border-slate-200">
          <span className="text-[5px] text-slate-400 font-bold uppercase block">Address</span>
          <p className="text-[6.5px] font-medium text-slate-700 leading-tight line-clamp-2">
            {data.address}
          </p>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="bg-slate-900 h-5 flex items-center justify-between px-3 mt-auto shrink-0">
        <span className="text-white/30 text-[5px] font-black tracking-[0.1em] uppercase">Official Player Card</span>
        <div className="flex gap-1">
          <div className="w-3 h-0.5 bg-orange-500 rounded-full"></div>
          <div className="w-1.5 h-0.5 bg-orange-500/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
