import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertTriangle, RefreshCcw, Shield } from 'lucide-react';
import AdminPageHeader from '../components/admin/AdminPageHeader';
import LoginActivityCard from '../components/admin/LoginActivityCard';
import type { LoginActivityEntry } from '../components/admin/LoginActivityCard';
import { getLoginAlertReadState, markLoginAlertRead } from '../utils/loginAlertStorage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type LoginAlertEntry = {
  userKey: string;
  userType: 'player' | 'institution' | 'official' | 'admin' | 'unknown';
  userModel: string;
  userId: string | null;
  displayName: string;
  email: string | null;
  userDetails: Record<string, any> | null;
  loginActivities: LoginActivityEntry[];
  latestLoginAt: string | null;
};

const AdminLoginAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<LoginAlertEntry[]>([]);
  const [visibleAlerts, setVisibleAlerts] = useState<LoginAlertEntry[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const adminRole = typeof window !== 'undefined' ? localStorage.getItem('adminRole') : null;
  const canView = adminRole === 'superadmin';

  const fetchAlerts = useCallback(async () => {
    if (!token) {
      setError('Authentication missing. Please login again.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/admin/login-activity-alerts?limit=120`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result?.message || 'Failed to load login alerts');
      }
      const incoming = Array.isArray(result.alerts) ? result.alerts : [];
      const sorted = [...incoming].sort((a, b) => {
        const aTime = a.latestLoginAt ? new Date(a.latestLoginAt).getTime() : 0;
        const bTime = b.latestLoginAt ? new Date(b.latestLoginAt).getTime() : 0;
        return bTime - aTime;
      });
      setAlerts(sorted);
    } catch (err) {
      console.error('Login alerts fetch failed', err);
      setError(err instanceof Error ? err.message : 'Unable to load login alerts');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const readState = getLoginAlertReadState();
    setVisibleAlerts(alerts.filter(alert => {
      const readTimestamp = readState[alert.userKey];
      if (!readTimestamp) return true;
      if (!alert.latestLoginAt) return true;
      return new Date(alert.latestLoginAt).getTime() > new Date(readTimestamp).getTime();
    }));
  }, [alerts]);

  useEffect(() => {
    if (!showDetails) return;
    const timestamp = new Date().toISOString();
    localStorage.setItem('loginAlertsViewedAt', timestamp);
    window.dispatchEvent(new CustomEvent('login-alerts-changed'));
  }, [showDetails]);

  useEffect(() => {
    if (!canView) return;
    fetchAlerts();
  }, [canView, fetchAlerts]);

  const summary = useMemo(() => {
    return alerts.reduce<Record<string, number>>((acc, alert) => {
      acc[alert.userType] = (acc[alert.userType] || 0) + 1;
      return acc;
    }, {});
  }, [alerts]);

  const storedLoginCount = useMemo(() => {
    return alerts.reduce((sum, alert) => sum + alert.loginActivities.length, 0);
  }, [alerts]);

  const markAlertRead = useCallback((userKey: string, latest?: string) => {
    markLoginAlertRead(userKey, latest);
    setVisibleAlerts(current => current.filter(alert => alert.userKey !== userKey));
    window.dispatchEvent(new CustomEvent('login-alerts-changed'));
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-3">
          <AlertTriangle className="mx-auto text-orange-600" size={40} />
          <p className="text-lg font-semibold text-slate-900">Authentication required</p>
          <p className="text-sm text-slate-500">Please log in as an admin to view the login alerts.</p>
        </div>
      </div>
    );
  }

  if (!canView) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-3">
          <Shield className="mx-auto text-blue-600" size={40} />
          <p className="text-lg font-semibold text-slate-900">Superadmin access only</p>
          <p className="text-sm text-slate-500">Login alerts are exclusive to superadmin accounts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <AdminPageHeader
          title="Login Alerts"
          subtitle="Track which accounts signed in most recently"
          actions={(
            <button
              type="button"
              onClick={fetchAlerts}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded-full border border-slate-200 bg-white hover:border-blue-300 hover:text-blue-700 transition-all disabled:opacity-60"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
          )}
        />

        <div className="bg-white rounded-3xl border border-slate-100 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500 space-y-1">
              <p>
                {alerts.length} account{alerts.length === 1 ? '' : 's'} showing their latest login.
              </p>
              <p className="text-xs text-slate-400">
                Stored events: {storedLoginCount} (details keep the most recent three per account).
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDetails(prev => !prev)}
              className="text-xs font-semibold uppercase tracking-widest text-blue-600"
            >
              {showDetails ? 'Hide details' : 'View login details'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.3em] text-slate-500">
            {Object.entries(summary).map(([type, count]) => (
              <span key={type} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
                {type}: {count}
              </span>
            ))}
          </div>
        </div>

        {!showDetails && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-sm text-slate-500 flex flex-col items-center justify-center gap-2">
            <AlertTriangle size={24} />
            <p>The login alerts will appear here once you open the details above.</p>
            <p className="text-xs text-slate-400">Click “View login details” to explore each account.</p>
          </div>
        )}

        {showDetails && visibleAlerts.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-sm text-slate-500 flex flex-col items-center justify-center gap-2">
            <AlertTriangle size={24} />
            <p>No alerts remain — dismiss cards after you have reviewed them.</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-sm flex items-center gap-2">
            <AlertTriangle size={16} />
            <span>{error}</span>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-sm text-slate-500">Loading login alerts…</div>
        )}

        {!loading && alerts.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-sm text-slate-500 flex flex-col items-center justify-center gap-2">
            <AlertTriangle size={24} />
            <p>No login activities recorded yet. Check back once members start signing in.</p>
          </div>
        )}

        {showDetails && visibleAlerts.map((alert) => (
          <div key={alert.userKey} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400">{alert.userType || alert.userModel}</p>
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-900">{alert.displayName}</h3>
                </div>
                {alert.email && <p className="text-xs text-slate-500 mt-1 break-words">{alert.email}</p>}
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
                  {alert.userDetails?.status && (
                    <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">Status: {alert.userDetails.status}</span>
                  )}
                  {alert.userDetails?.idNo && (
                    <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">ID: {alert.userDetails.idNo}</span>
                  )}
                  {alert.userDetails?.regNo && (
                    <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">Reg#: {alert.userDetails.regNo}</span>
                  )}
                  {alert.userDetails?.phone && (
                    <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">Phone: {alert.userDetails.phone}</span>
                  )}
                  {alert.userDetails?.mobile && (
                    <span className="px-2 py-1 rounded-full bg-slate-50 border border-slate-200">Mobile: {alert.userDetails.mobile}</span>
                  )}
                </div>
              </div>
              <div className="text-right text-[11px] text-slate-400 space-y-1">
                <p className="font-semibold text-slate-700">
                  {alert.latestLoginAt ? new Date(alert.latestLoginAt).toLocaleString() : 'No recent login'}
                </p>
                <p>{alert.loginActivities.length} stored events</p>
              </div>
            </div>
            <LoginActivityCard
              activities={alert.loginActivities.slice(0, 1)}
              title="Recent logins"
              subtitle="Latest recorded session"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => markAlertRead(alert.userKey, alert.latestLoginAt ?? new Date().toISOString())}
                className="text-xs font-semibold uppercase tracking-widest text-slate-500"
              >
                Mark reviewed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLoginAlerts;
