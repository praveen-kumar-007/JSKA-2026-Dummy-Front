import type { FC } from 'react';
import { LogIn } from 'lucide-react';

export type LoginActivityEntry = {
  _id?: string;
  ip?: string;
  forwardedIp?: string;
  userAgent?: string;
  acceptLanguage?: string;
  referer?: string;
  path?: string;
  method?: string;
  loginType?: string;
  country?: string | null;
  createdAt?: string;
  latitude?: number | null;
  longitude?: number | null;
};

interface LoginActivityCardProps {
  activities?: LoginActivityEntry[];
  title?: string;
  subtitle?: string;
}

const formatTimestamp = (value?: string) => {
  if (!value) return 'Unknown time';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'Unknown time';
  return parsed.toLocaleString();
};

const getDisplayIp = (entry: LoginActivityEntry) => {
  if (entry.forwardedIp) {
    const [primary] = entry.forwardedIp.split(',');
    return primary ? primary.trim() : entry.forwardedIp;
  }
  return entry.ip || 'Unknown IP';
};

const formatCoordinates = (entry: LoginActivityEntry) => {
  const lat = typeof entry.latitude === 'number' ? entry.latitude : Number(entry.latitude);
  const lon = typeof entry.longitude === 'number' ? entry.longitude : Number(entry.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
};

const LoginActivityCard: FC<LoginActivityCardProps> = ({
  activities = [],
  title = 'Login Activity',
  subtitle,
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 w-full">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
      <div className="flex items-center gap-3">
        <span className="bg-slate-100 text-slate-900 rounded-full p-2">
          <LogIn size={22} />
        </span>
        <div>
          <p className="text-lg font-semibold text-slate-900 tracking-wide">{title}</p>
          {subtitle && <p className="text-xs text-slate-500 uppercase tracking-wider">{subtitle}</p>}
        </div>
      </div>
      {activities.length > 0 && (
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
          Showing {activities.length} recent
        </span>
      )}
    </div>

    {activities.length === 0 ? (
      <p className="text-sm text-slate-500">No login attempts recorded yet.</p>
    ) : (
      <div className="space-y-4">
        {activities.map((entry, index) => {
          const coordinateLabel = formatCoordinates(entry);
          return (
            <div key={entry._id || index} className="rounded-xl border border-slate-100 p-3 bg-slate-50">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                <div className="flex-1">
                  <p className="text-[11px] uppercase text-slate-500 tracking-[0.2em]">
                    {formatTimestamp(entry.createdAt)}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{getDisplayIp(entry)}</p>
                  <p className="text-xs text-slate-500 mt-0.5 break-words">
                    {entry.userAgent || 'Unknown user agent'}
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-500 space-y-1">
                  <p className="font-semibold text-slate-700">
                    {entry.country ? `${entry.country}` : 'Unknown location'}
                  </p>
                  {coordinateLabel && (
                    <p className="text-[10px] text-slate-400">{coordinateLabel}</p>
                  )}
                  <p>{entry.loginType || 'Login'}</p>
                  {(entry.method || entry.path) && (
                    <p>
                      {entry.method ? `${entry.method.toUpperCase()} ` : ''}
                      {entry.path || 'Unknown endpoint'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default LoginActivityCard;