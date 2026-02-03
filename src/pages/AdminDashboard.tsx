import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, XCircle, Trash2, 
  Users, Building, RefreshCcw, Search, Eye,
  LogOut, Newspaper, Image as ImageIcon, Mail, UserCheck, Heart,
  Trophy, Gavel, UserCog, FileText, Award, Download
} from 'lucide-react';
import StatusMark from '../components/admin/StatusMark';
import ExportCsvModal from '../components/admin/ExportCsvModal';
import { Link } from 'react-router-dom';
import type { Language } from '../translations';

interface AdminDashboardProps {
  lang: Language;
}

interface AdminPermissions {
  canAccessGallery?: boolean;
  canAccessNews?: boolean;
  canAccessContacts?: boolean;
  canAccessChampions?: boolean;
  canAccessReferees?: boolean;
  canAccessTechnicalOfficials?: boolean;
  canAccessUnifiedSearch?: boolean;
  canAccessPlayerDetails?: boolean;
  canAccessInstitutionDetails?: boolean;
  canAccessDonations?: boolean;
  canAccessImportantDocs?: boolean;
  canAccessBulkEmail?: boolean;
  canDelete?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang: _lang }) => { 
  const [activeTab, setActiveTab] = useState<'players' | 'institutions'>('players');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [ageFilter, setAgeFilter] = useState<'All Ages' | 'Under 10' | '10-14' | '14-16' | '16-19' | '19-25' | 'Over 25'>('All Ages');

  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [adminPermissions, setAdminPermissions] = useState<AdminPermissions | null>(null);
  const [showDocs, setShowDocs] = useState(false);
  const docsRef = useRef<HTMLDivElement | null>(null);
  const [showManage, setShowManage] = useState(false);
  const manageRef = useRef<HTMLDivElement | null>(null);

  // Selection & export state for table exports
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);

  const playerExportFields = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'dob', label: 'DOB' },
    { key: 'aadharNumber', label: 'Aadhar' },
    { key: 'transactionId', label: 'Transaction ID' },
    { key: 'memberRole', label: 'Role' },
    { key: 'idNo', label: 'ID Number' },
    { key: 'status', label: 'Status' }
  ];

  const institutionExportFields = [
    { key: 'instName', label: 'Institution Name' },
    { key: 'instType', label: 'Type' },
    { key: 'officePhone', label: 'Office Phone' },
    { key: 'email', label: 'Email' },
    { key: 'address', label: 'Address' },
    { key: 'regNo', label: 'Reg No' },
    { key: 'status', label: 'Status' }
  ];

  // Public/feature visibility settings (controlled by superadmin)
  const [publicSettings, setPublicSettings] = useState<{ allowGallery?: boolean; allowNews?: boolean; allowContacts?: boolean; allowDonations?: boolean; allowImportantDocs?: boolean; allowUnifiedSearch?: boolean; allowExportAll?: boolean; allowExportPlayers?: boolean; allowExportTechnicalOfficials?: boolean; allowExportInstitutions?: boolean }>({});



  // Public settings that can affect admin UI (loaded for all admins)


  // Close docs dropdown on outside click or Escape
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!showDocs) return;
      if (docsRef.current && !docsRef.current.contains(e.target as Node)) {
        setShowDocs(false);
      }
    }
    function handleManageClick(e: MouseEvent) {
      if (!showManage) return;
      if (manageRef.current && !manageRef.current.contains(e.target as Node)) {
        setShowManage(false);
      }
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowDocs(false);
        setShowManage(false);
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('mousedown', handleManageClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('mousedown', handleManageClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showDocs, showManage]);

  // Mobile detection to render a compact card list on small screens
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 640);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Pending counts for admin attention
  const [pendingPlayers, setPendingPlayers] = useState<number>(0);
  const [pendingInstitutions, setPendingInstitutions] = useState<number>(0);
  const [pendingOfficials, setPendingOfficials] = useState<number>(0);
  const [pendingDonations, setPendingDonations] = useState<number>(0);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchPendingCounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

      const [playersRes, instRes, offsRes, donsRes] = await Promise.all([
        fetch(`${API_URL}/api/players`, { headers }),
        fetch(`${API_URL}/api/institutions`, { headers }),
        fetch(`${API_URL}/api/technical-officials`, { headers }),
        fetch(`${API_URL}/api/donations`, { headers }),
      ]);

      const [playersJson, instJson, offsJson, donsJson] = await Promise.all([
        playersRes.ok ? playersRes.json() : null,
        instRes.ok ? instRes.json() : null,
        offsRes.ok ? offsRes.json() : null,
        donsRes.ok ? donsRes.json() : null,
      ]);

      const pCount = Array.isArray(playersJson) ? playersJson.filter((p: any) => (p.status || '').toLowerCase() === 'pending').length : (playersJson && playersJson.data ? playersJson.data.filter((p: any) => (p.status || '').toLowerCase() === 'pending').length : 0);
      const iCount = Array.isArray(instJson) ? instJson.filter((i: any) => (i.status || '').toLowerCase() === 'pending').length : (instJson && instJson.data ? instJson.data.filter((i: any) => (i.status || '').toLowerCase() === 'pending').length : 0);
      const oCount = Array.isArray(offsJson) ? offsJson.filter((o: any) => (o.status || '').toLowerCase() === 'pending').length : (offsJson && offsJson.data ? offsJson.data.filter((o: any) => (o.status || '').toLowerCase() === 'pending').length : 0);
      const dCount = Array.isArray(donsJson) ? donsJson.filter((d: any) => (d.status || '').toLowerCase() === 'pending').length : (donsJson && donsJson.data ? donsJson.data.filter((d: any) => (d.status || '').toLowerCase() === 'pending').length : 0);

      setPendingPlayers(pCount || 0);
      setPendingInstitutions(iCount || 0);
      setPendingOfficials(oCount || 0);
      setPendingDonations(dCount || 0);
    } catch (e) {
      console.error('Failed to fetch pending counts', e);
    }
  };

  // Fetch pending counts on mount and when permissions change
  useEffect(() => {
    fetchPendingCounts();
  }, [API_URL, adminRole, adminPermissions]);

  // Load public settings (which control module visibility)
  useEffect(() => {
    const loadPublicSettings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/settings/public`);
        const json = await res.json();
        if (json && json.success && json.data) {
          setPublicSettings({
            allowGallery: typeof json.data.allowGallery === 'boolean' ? json.data.allowGallery : true,
            allowNews: typeof json.data.allowNews === 'boolean' ? json.data.allowNews : true,
            allowContacts: typeof json.data.allowContacts === 'boolean' ? json.data.allowContacts : true,
            allowDonations: typeof json.data.allowDonations === 'boolean' ? json.data.allowDonations : true,
            allowImportantDocs: typeof json.data.allowImportantDocs === 'boolean' ? json.data.allowImportantDocs : true,
            allowUnifiedSearch: typeof json.data.allowUnifiedSearch === 'boolean' ? json.data.allowUnifiedSearch : true,
            allowExportAll: typeof json.data.allowExportAll === 'boolean' ? json.data.allowExportAll : true,
            allowExportPlayers: typeof json.data.allowExportPlayers === 'boolean' ? json.data.allowExportPlayers : true,
            allowExportTechnicalOfficials: typeof json.data.allowExportTechnicalOfficials === 'boolean' ? json.data.allowExportTechnicalOfficials : true,
            allowExportInstitutions: typeof json.data.allowExportInstitutions === 'boolean' ? json.data.allowExportInstitutions : true,
          });
        }
      } catch (e) {
        console.error('Failed to fetch public settings', e);
      }
    };
    loadPublicSettings();
  }, [API_URL]);

  // Clear table selections when exports are turned off
  useEffect(() => {
    const onSettingsUpdate = (e: any) => {
      if (!e?.detail) return;
      // If the unified export toggle was turned off, clear any selected rows for export
      if (typeof e.detail.allowExportAll === 'boolean' && e.detail.allowExportAll === false) {
        setSelectedIds([]);
      }
      if (typeof e.detail.allowUnifiedSearch === 'boolean') {
        setPublicSettings(prev => ({ ...prev, allowUnifiedSearch: e.detail.allowUnifiedSearch }));
      }
    };
    window.addEventListener('ddka-settings-updated', onSettingsUpdate as EventListener);
    return () => window.removeEventListener('ddka-settings-updated', onSettingsUpdate as EventListener);
  }, [activeTab]);


  const handleLogout = () => {
    // Clear authentication flags and admin JWT
    localStorage.removeItem('token');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminPermissions');
    sessionStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/admin-portal-access';
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'players' ? '/api/players' : '/api/institutions';
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Resolve admin role from localStorage or JWT token once on mount
  useEffect(() => {
    let storedRole = localStorage.getItem('adminRole');
    const storedPermsRaw = localStorage.getItem('adminPermissions');

    if (storedPermsRaw) {
      try {
        const parsed: AdminPermissions = JSON.parse(storedPermsRaw);
        setAdminPermissions(parsed);
      } catch (e) {
        console.error('Failed to parse adminPermissions from storage', e);
      }
    }

    if (!storedRole) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payloadPart = token.split('.')[1];
          const decoded = JSON.parse(atob(payloadPart));
          if (decoded && typeof decoded.role === 'string') {
            storedRole = decoded.role;
            localStorage.setItem('adminRole', decoded.role);
          }
        } catch (e) {
          console.error('Failed to decode admin role from token', e);
        }
      }
    }

    if (storedRole) {
      setAdminRole(storedRole);
    }
  }, []);

  // Refresh permissions and role from backend so Admin Management changes apply without re-login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchMe = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) return;
        const result = await res.json();
        if (result.success && result.admin) {
          const { role, permissions } = result.admin;
          if (role) {
            setAdminRole(role);
            localStorage.setItem('adminRole', role);
          }
          if (permissions) {
            setAdminPermissions(permissions);
            localStorage.setItem('adminPermissions', JSON.stringify(permissions));
          }
        }
      } catch (e) {
        console.error('Failed to refresh admin profile', e);
      }
    };

    fetchMe();


  }, [API_URL]);

  // Toggle component: fetch & update settings (superadmin only)
  const ToggleShowIDs: React.FC = () => {
    const [loadingSetting, setLoadingSetting] = useState(false);
    const [showIds, setShowIds] = useState<boolean | null>(null);

    useEffect(() => {
      const load = async () => {
        setLoadingSetting(true);
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_URL}/api/settings`, { headers: { Authorization: `Bearer ${token}` } });
          const json = await res.json();
          if (json && json.success && typeof json.data?.showIdsToUsers === 'boolean') {
            setShowIds(json.data.showIdsToUsers);
          } else {
            setShowIds(true);
          }
        } catch (err) {
          console.error('Failed to load setting', err);
          setShowIds(true);
        } finally {
          setLoadingSetting(false);
        }
      };
      load();
    }, []);

    const toggle = async () => {
      if (showIds === null) return;
      try {
        setLoadingSetting(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/settings`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ showIdsToUsers: !showIds })
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.message || 'Failed to update setting');
          return;
        }
        setShowIds(!showIds);
        alert('Updated setting successfully');
      } catch (err) {
        console.error(err);
        alert('Failed to update setting');
      } finally {
        setLoadingSetting(false);
      }
    };

    return (
      <button
        onClick={toggle}
        disabled={loadingSetting}
        title={showIds ? 'ID numbers/cards are visible to users' : 'ID numbers/cards are hidden from users'}
        aria-pressed={showIds === true}
        className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-full md:rounded-xl font-bold md:font-black shadow-sm transition-all active:scale-95 ${loadingSetting ? 'opacity-60 cursor-not-allowed' : ''} ${showIds ? 'bg-white text-green-600 md:hover:bg-green-600 md:hover:text-white' : 'bg-white text-slate-700 md:hover:bg-slate-700 md:hover:text-white'}`}
      >
        {showIds ? <CheckCircle size={16} /> : <XCircle size={16} />}
        <span className="font-black text-xs md:text-sm">ID</span>
        <div className={`${showIds ? 'bg-green-600' : 'bg-slate-400'} w-4 h-4 md:w-6 md:h-6 rounded-md border`} aria-hidden="true" />
        <span className="sr-only">ID: {showIds ? 'ON' : 'OFF'}</span>
      </button>
    );
  };

  // Toggle nodemailer (email sending) - superadmin only
  const ToggleEmail: React.FC = () => {
    const [loadingSetting, setLoadingSetting] = useState(false);
    const [emailEnabled, setEmailEnabled] = useState<boolean | null>(null);

    useEffect(() => {
      const load = async () => {
        setLoadingSetting(true);
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_URL}/api/settings`, { headers: { Authorization: `Bearer ${token}` } });
          const json = await res.json();
          if (json && json.success && typeof json.data?.emailEnabled === 'boolean') {
            setEmailEnabled(json.data.emailEnabled);
          } else {
            setEmailEnabled(true);
          }
        } catch (err) {
          console.error('Failed to load email setting', err);
          setEmailEnabled(true);
        } finally {
          setLoadingSetting(false);
        }
      };
      load();
    }, []);

    const toggle = async () => {
      if (emailEnabled === null) return;
      try {
        setLoadingSetting(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/settings`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ emailEnabled: !emailEnabled })
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.message || 'Failed to update email setting');
          return;
        }
        setEmailEnabled(!emailEnabled);
        alert('Updated email setting successfully');
      } catch (err) {
        console.error(err);
        alert('Failed to update email setting');
      } finally {
        setLoadingSetting(false);
      }
    };

    return (
      <button
        onClick={toggle}
        disabled={loadingSetting}
        title={emailEnabled ? 'Email sending is ON' : 'Email sending is OFF'}
        aria-pressed={emailEnabled === true}
        className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-full md:rounded-xl font-bold md:font-black shadow-sm transition-all active:scale-95 ${loadingSetting ? 'opacity-60 cursor-not-allowed' : ''} ${emailEnabled ? 'bg-white text-green-600 md:hover:bg-green-600 md:hover:text-white' : 'bg-white text-slate-700 md:hover:bg-slate-700 md:hover:text-white'}`}
      >
        {emailEnabled ? <CheckCircle size={16} /> : <XCircle size={16} />}
        <span className="font-black text-xs md:text-sm">MAIL</span>
        <div className={`${emailEnabled ? 'bg-green-600' : 'bg-slate-400'} w-4 h-4 md:w-6 md:h-6 rounded-md border`} aria-hidden="true" />
        <span className="sr-only">MAIL: {emailEnabled ? 'ON' : 'OFF'}</span>
      </button>
    );
  };

  // Generic small toggle for export-related settings
  const ToggleSetting: React.FC<{ label: string; settingKey: 'allowExportAll' | 'allowExportPlayers' | 'allowExportTechnicalOfficials' | 'allowExportInstitutions' }> = ({ label, settingKey }) => {
    const [loadingSetting, setLoadingSetting] = useState(false);
    const [value, setValue] = useState<boolean | null>(null);

    useEffect(() => {
      const load = async () => {
        setLoadingSetting(true);
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_URL}/api/settings`, { headers: { Authorization: `Bearer ${token}` } });
          const json = await res.json();
          if (json && json.success && typeof json.data?.[settingKey] === 'boolean') {
            setValue(json.data[settingKey]);
          } else {
            setValue(true);
          }
        } catch (err) {
          console.error('Failed to load setting', err);
          setValue(true);
        } finally {
          setLoadingSetting(false);
        }
      };
      load();
    }, [settingKey]);

    const toggle = async () => {
      if (value === null) return;
      try {
        setLoadingSetting(true);
        const token = localStorage.getItem('token');
        const body: any = {};
        body[settingKey] = !value;
        const res = await fetch(`${API_URL}/api/settings`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(body)
        });
        if (!res.ok) {
          const err = await res.json();
          alert(err.message || 'Failed to update setting');
          return;
        }
        setValue(!value);
        alert('Updated setting successfully');
        // Update global publicSettings so current session reflects change immediately
        setPublicSettings(prev => ({ ...prev, [settingKey]: !value }));
        // Notify other parts of the app to re-fetch or update their UI
        window.dispatchEvent(new CustomEvent('ddka-settings-updated', { detail: { [settingKey]: !value } }));
      } catch (err) {
        console.error(err);
        alert('Failed to update setting');
      } finally {
        setLoadingSetting(false);
      }
    };

    return (
      <button
        onClick={toggle}
        disabled={loadingSetting}
        title={`${label}: ${value ? 'ON' : 'OFF'}`}
        aria-pressed={value === true}
        className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-2 md:py-3 rounded-full md:rounded-xl font-bold md:font-black shadow-sm transition-all active:scale-95 ${loadingSetting ? 'opacity-60 cursor-not-allowed' : ''} ${value ? 'bg-white text-green-600 md:hover:bg-green-600 md:hover:text-white' : 'bg-white text-slate-700 md:hover:bg-slate-700 md:hover:text-white'}`}
      >
        {value ? <CheckCircle size={16} /> : <XCircle size={16} />}
        <span className="font-black text-xs md:text-sm">{label}</span>
        <div className={`${value ? 'bg-green-600' : 'bg-slate-400'} w-4 h-4 md:w-6 md:h-6 rounded-md border`} aria-hidden="true" />
        <span className="sr-only">{label}: {value ? 'ON' : 'OFF'}</span>
      </button>
    );
  };

  const ToggleExportAll: React.FC = () => <ToggleSetting label="EXP" settingKey="allowExportAll" />;

  // Toggle for allowing admins to manage Donations (superadmin only)



  const updateStatus = async (id: string, newStatus: 'Pending' | 'Approved' | 'Rejected') => {
    try {
      const endpoint = activeTab === 'players' ? '/api/players/status' : '/api/institutions/status';
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        const resJson = await response.json();
        fetchData();
        if (resJson.emailSent) {
          const type = resJson.emailType === 'rejection' ? 'Rejection' : resJson.emailType === 'approval' ? 'Approval' : 'Notification';
          alert(`${type} email sent`);
        }
      } else {
        const errData = await response.json();
        alert(errData.message || "Error updating status");
      }
    } catch (error) {
      alert("Error updating status");
    }
  };

  const deleteEntry = async (id: string) => {
    if (!window.confirm("Permanently delete this record? This cannot be undone.")) return;
    try {
      const endpoint = activeTab === 'players' ? `/api/players/${id}` : `/api/institutions/${id}`;
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      if (response.ok) {
        fetchData();
      } else {
        alert("Delete failed on server");
      }
    } catch (error) {
      alert("Error deleting entry");
    }
  };

  const calculateAge = (dob?: string) => {
    if (!dob) return null;
    const birth = new Date(dob);
    if (Number.isNaN(birth.getTime())) return null;
    const diff = Date.now() - birth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getAgeGroup = (dob?: string) => {
    const age = calculateAge(dob);
    if (age === null) return 'N/A';
    if (age < 10) return 'Under 10';
    if (age <= 14) return '10-14';
    if (age <= 16) return '14-16';
    if (age <= 19) return '16-19';
    if (age <= 25) return '19-25';
    return 'Over 25';
  };

  const searchFiltered = data.filter(item => 
    (item.fullName || item.instName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.transactionId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.aadharNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.idNo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.phone || item.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusFiltered = searchFiltered.filter(item => {
    if (statusFilter === 'All') return true;
    return (item.status || 'Pending') === statusFilter;
  });

  const filteredData = statusFiltered.filter(item => {
    if (activeTab !== 'players' || ageFilter === 'All Ages') return true;
    const group = getAgeGroup(item.dob);
    return group === ageFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-oswald font-bold text-blue-900 uppercase tracking-tight">DDKA CONTROL CENTER</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Admin Portal • Team DDKA (Build By Praveen Kumar❤️)
            </p>
            <div className="flex items-center gap-4">
              {adminRole && (
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-blue-700">
                  Admin: {adminRole === 'superadmin' ? 'SUPERADMIN' : 'ADMIN'}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap w-full md:w-auto">
            {adminRole === 'superadmin' && (
              <div className="relative" ref={manageRef}>
                <button
                  type="button"
                  onClick={() => setShowManage(prev => !prev)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-700 px-4 md:px-6 py-2 md:py-3 rounded-xl font-black shadow-sm border-2 border-slate-100 hover:bg-slate-700 hover:text-white transition-all active:scale-95"
                  aria-expanded={showManage}
                  aria-controls="manage-toggles"
                  title="Manage settings"
                >
                  <UserCog size={18} />
                  <span className="font-black text-sm">MANAGE</span>
                </button>

                {showManage && (
                  <div
                    id="manage-toggles"
                    className="absolute left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-0 mt-3 w-[90vw] sm:w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50"
                    role="dialog"
                    aria-label="Manage settings"
                  >
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Settings</div>
                    <table className="w-full text-sm table-auto">
                      <thead>
                        <tr className="text-left text-slate-500">
                          <th className="py-1">Setting</th>
                          <th className="py-1 text-right">Toggle</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 font-semibold text-slate-700">ID</td>
                          <td className="py-2 text-right"><div className="flex justify-end scale-90 origin-right"><ToggleShowIDs /></div></td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-slate-700">MAIL</td>
                          <td className="py-2 text-right"><div className="flex justify-end scale-90 origin-right"><ToggleEmail /></div></td>
                        </tr>
                        <tr>
                          <td className="py-2 font-semibold text-slate-700">EXP</td>
                          <td className="py-2 text-right"><div className="flex justify-end scale-90 origin-right"><ToggleExportAll /></div></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={handleLogout}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-red-600 px-4 md:px-6 py-2 md:py-3 rounded-xl font-black shadow-sm border-2 border-red-50 hover:bg-red-600 hover:text-white transition-all active:scale-95"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="font-black text-sm">LOGOUT</span>
            </button>
          </div>
        </div>

        {/* Admin Management Panel */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {/* Gallery - requires canAccessGallery and not globally disabled */}
          {(adminRole === 'superadmin' || (publicSettings.allowGallery && adminPermissions?.canAccessGallery)) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessGallery) {
                  window.location.href = '/admin/gallery';
                } else {
                  alert('You do not have permission to manage gallery. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                adminRole === 'superadmin' || adminPermissions?.canAccessGallery
                  ? 'bg-white hover:bg-blue-50 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ImageIcon
                size={32}
                className={`${
                  adminRole === 'superadmin' || adminPermissions?.canAccessGallery
                    ? 'text-blue-700 mb-2'
                    : 'text-slate-400 mb-2'
                }`}
              />
              <span className="font-bold text-xs">Manage Gallery</span>
            </button>
          )}

          {/* News - requires canAccessNews and not globally disabled */}
          {(adminRole === 'superadmin' || (publicSettings.allowNews && adminPermissions?.canAccessNews)) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessNews) {
                  window.location.href = '/admin-news-upload';
                } else {
                  alert('You do not have permission to manage news. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                adminRole === 'superadmin' || adminPermissions?.canAccessNews
                  ? 'bg-white hover:bg-blue-50 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Newspaper
                size={32}
                className={`${
                  adminRole === 'superadmin' || adminPermissions?.canAccessNews
                    ? 'text-blue-700 mb-2'
                    : 'text-slate-400 mb-2'
                }`}
              />
              <span className="font-bold text-xs">Manage News</span>
            </button>
          )}

          {/* Contacts - requires canAccessContacts and not globally disabled */}
          {(adminRole === 'superadmin' || (publicSettings.allowContacts && adminPermissions?.canAccessContacts)) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessContacts) {
                  window.location.href = '/admin/contact';
                } else {
                  alert('You do not have permission to manage contact forms. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                adminRole === 'superadmin' || adminPermissions?.canAccessContacts
                  ? 'bg-white hover:bg-blue-50 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Mail
                size={28}
                className={`${
                  adminRole === 'superadmin' || adminPermissions?.canAccessContacts
                    ? 'text-blue-700 mb-2'
                    : 'text-slate-400 mb-2'
                }`}
              />
              <span className="font-bold text-xs">Contact Forms</span>
            </button>
          )}

          {/* Bulk Email - superadmin only */}
          {(adminRole === 'superadmin' || adminPermissions?.canAccessBulkEmail) && (
            <button
              type="button"
              onClick={() => {
                window.location.href = '/admin/bulk-email';
              }}
              className="flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] bg-white hover:bg-slate-50 cursor-pointer"
            >
              <Mail
                size={28}
                className="text-slate-700 mb-2"
              />
              <span className="font-bold text-xs">Bulk Email</span>
            </button>
          )}

          {/* Unified Search */}
          {(adminRole === 'superadmin' || adminPermissions?.canAccessUnifiedSearch) && (
            <button
              type="button"
              onClick={() => {
                window.location.href = '/admin/unified-search';
              }}
              className="flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] bg-white hover:bg-slate-50 cursor-pointer"
            >
              <Search size={28} className="text-slate-700 mb-2" />
              <span className="font-bold text-xs">Unified Search</span>
            </button>
          )}

          {/* Our Champions - hidden unless admin has permission (superadmin sees all) */}
          {(adminRole === 'superadmin' || adminPermissions?.canAccessChampions) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessChampions) {
                  window.location.href = '/admin/players';
                } else {
                  alert('You do not have permission to manage champions. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                adminRole === 'superadmin' || adminPermissions?.canAccessChampions
                  ? 'bg-white hover:bg-orange-50 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Trophy
                size={28}
                className={`${
                  adminRole === 'superadmin' || adminPermissions?.canAccessChampions
                    ? 'text-orange-700 mb-2'
                    : 'text-slate-400 mb-2'
                }`}
              />
              <span className="font-bold text-xs">Our Champions</span>
            </button>
          )}

          {/* Referee Board - hidden unless admin has permission (superadmin sees all) */}
          {(adminRole === 'superadmin' || adminPermissions?.canAccessReferees) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessReferees) {
                  window.location.href = '/admin/referees';
                } else {
                  alert('You do not have permission to manage referees. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                adminRole === 'superadmin' || adminPermissions?.canAccessReferees
                  ? 'bg-white hover:bg-slate-50 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div className="relative w-full flex items-center justify-center">
                <Gavel
                  size={28}
                  className={`${
                    adminRole === 'superadmin' || adminPermissions?.canAccessReferees
                      ? 'text-amber-700 mb-2'
                      : 'text-slate-400 mb-2'
                  }`}
                />
                {0 > 0 && (adminRole === 'superadmin' || adminPermissions?.canAccessReferees) && (
                  <div className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold">0</div>
                )}
              </div>
              <span className="font-bold text-xs">Referee Board</span>
            </button>
          )}

          {/* Donations - requires canAccessDonations and not globally disabled */}
          {(adminRole === 'superadmin' || (publicSettings.allowDonations && adminPermissions?.canAccessDonations)) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessDonations) {
                  window.location.href = '/admin/donations';
                } else {
                  alert('You do not have permission to manage donations. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                adminRole === 'superadmin' || adminPermissions?.canAccessDonations ? 'bg-white hover:bg-slate-50 cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div className="relative w-full flex items-center justify-center">
                <Heart
                  size={28}
                  className={`${
                    adminRole === 'superadmin' || adminPermissions?.canAccessDonations
                      ? 'text-rose-700 mb-2'
                      : 'text-slate-400 mb-2'
                  }`}
                />
                {pendingDonations > 0 && (adminRole === 'superadmin' || adminPermissions?.canAccessDonations) && (
                  <div className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-700 text-white text-xs font-bold">{pendingDonations}</div>
                )}
              </div>
              <span className="font-bold text-xs">Donations</span>
            </button>
          )}

          {/* Technical Officials - hidden unless admin has permission (superadmin sees all) */}
          {(adminRole === 'superadmin' || adminPermissions?.canAccessTechnicalOfficials) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessTechnicalOfficials) {
                  window.location.href = '/admin/technical-officials';
                } else {
                  alert('You do not have permission to manage technical officials. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                adminRole === 'superadmin' || adminPermissions?.canAccessTechnicalOfficials
                  ? 'bg-white hover:bg-slate-50 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div className="relative w-full flex items-center justify-center">
                <UserCheck
                  size={28}
                  className={`${
                    adminRole === 'superadmin' || adminPermissions?.canAccessTechnicalOfficials
                      ? 'text-emerald-700 mb-2'
                      : 'text-slate-400 mb-2'
                  }`}
                />
                {pendingOfficials > 0 && (adminRole === 'superadmin' || adminPermissions?.canAccessTechnicalOfficials) && (
                  <div className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold">{pendingOfficials}</div>
                )}
              </div>
              <span className="font-bold text-xs">Technical Officials</span>
            </button>
          )}
          {adminRole === 'superadmin' && (
            <Link to="/admin/manage-admins" className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow border hover:bg-red-50 transition-all w-full min-h-[92px]">
              <UserCog size={28} className="text-red-700 mb-2" />
              <span className="font-bold text-xs text-red-900">Manage Admins</span>
            </Link>
          )} 

          {(adminRole === 'superadmin' || (publicSettings.allowImportantDocs && adminPermissions?.canAccessImportantDocs)) && (
            <div className="relative" ref={docsRef}>
              <button 
                type="button"
                aria-expanded={showDocs}
                aria-controls="important-docs-dropdown"
                onClick={() => {
                  if (adminRole === 'superadmin' || adminPermissions?.canAccessImportantDocs) setShowDocs(s => !s);
                  else alert('You do not have permission to access Important Docs.');
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all min-h-[92px] ${
                  (adminRole === 'superadmin' || adminPermissions?.canAccessImportantDocs) ? 'bg-white hover:bg-emerald-50 cursor-pointer w-full' : 'bg-slate-100 text-slate-400 cursor-not-allowed w-full'
                }`}
              >
                <FileText size={28} className={`${(adminRole === 'superadmin' || adminPermissions?.canAccessImportantDocs) ? 'text-emerald-700 mb-2' : 'text-slate-400 mb-2'}`} />
                <span className="font-bold text-xs text-emerald-900">Important Docs</span>
                {!(adminRole === 'superadmin' || adminPermissions?.canAccessImportantDocs) && (
                  <div className="mt-1 text-[10px] text-yellow-700 font-semibold">Disabled</div>
                )}

              </button>

              {showDocs && (adminRole === 'superadmin' || adminPermissions?.canAccessImportantDocs) && (
                <div id="important-docs-dropdown" role="menu" className="absolute z-50 mt-2 left-1/2 -translate-x-1/2 w-64 sm:w-72 bg-white shadow-lg rounded-lg p-3 border ring-1 ring-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-sm">Important Docs</strong>
                    <button onClick={() => setShowDocs(false)} aria-label="Close" className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>

                  <nav className="flex flex-col gap-1">
                      <a href="/important-docs/entry-form.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-slate-50">
                      <FileText size={18} className="text-slate-600 w-6" />
                      <span className="text-sm">Entry Form</span>
                      <span className="ml-auto text-slate-400">↗</span>
                    </a>

                    <a href="/important-docs/technical-id-card.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-slate-50">
                      <UserCheck size={18} className="text-slate-600 w-6" />
                      <span className="text-sm">Technical ID Card</span>
                      <span className="ml-auto text-slate-400">↗</span>
                    </a>

                    <a href="/important-docs/official-certificate.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-slate-50">
                      <Award size={18} className="text-slate-600 w-6" />
                      <span className="text-sm">Official Certificate</span>
                      <span className="ml-auto text-slate-400">↗</span>
                    </a>

                    <a href="/important-docs/certificate-2.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 px-2 rounded hover:bg-slate-50">
                      <Trophy size={18} className="text-slate-600 w-6" />
                      <span className="text-sm">Certificate 2</span>
                      <span className="ml-auto text-slate-400">↗</span>
                    </a>
                  </nav>
                </div>
              )}
            </div>
          )}
          {/* Player Details tab - requires canAccessPlayerDetails */}
          {(adminRole === 'superadmin' || adminPermissions?.canAccessPlayerDetails) && (
            <button
              type="button"
              onClick={() => {
                if (adminRole === 'superadmin' || adminPermissions?.canAccessPlayerDetails) {
                  window.location.href = '/admin/registrations?tab=players';
                } else {
                  alert('You do not have permission to view player details. Please contact the superadmin.');
                }
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
                activeTab === 'players'
                  ? 'bg-blue-900 text-white'
                  : (adminRole === 'superadmin' || adminPermissions?.canAccessPlayerDetails)
                      ? 'bg-white hover:bg-blue-50 text-blue-900'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div className="relative w-full flex items-center justify-center">
                <Users
                  size={28}
                  className={
                    activeTab === 'players'
                      ? 'text-orange-400'
                      : (adminRole === 'superadmin' || adminPermissions?.canAccessPlayerDetails)
                          ? 'text-blue-900'
                          : 'text-slate-400'
                  }
                />
                {pendingPlayers > 0 && (adminRole === 'superadmin' || adminPermissions?.canAccessPlayerDetails) && (
                  <div className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold">{pendingPlayers}</div>
                )}
              </div>
              <span className="font-bold text-xs">Player Details</span>
            </button>
          )}

          {/* Institution Details tab - requires canAccessInstitutionDetails */}
          <button
            type="button"
            onClick={() => {
              if (adminRole === 'superadmin' || adminPermissions?.canAccessInstitutionDetails) {
                window.location.href = '/admin/registrations?tab=institutions';
              } else {
                alert('You do not have permission to view institution details. Please contact the superadmin.');
              }
            }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl shadow border transition-all w-full min-h-[92px] ${
              activeTab === 'institutions'
                ? 'bg-blue-900 text-white'
                : (adminRole === 'superadmin' || adminPermissions?.canAccessInstitutionDetails)
                    ? 'bg-white hover:bg-blue-50 text-blue-900'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            <div className="relative w-full flex items-center justify-center">
              <Building
                size={28}
                className={
                  activeTab === 'institutions'
                    ? 'text-orange-400'
                    : (adminRole === 'superadmin' || adminPermissions?.canAccessInstitutionDetails)
                        ? 'text-blue-900'
                        : 'text-slate-400'
                }
              />
              {pendingInstitutions > 0 && (adminRole === 'superadmin' || adminPermissions?.canAccessInstitutionDetails) && (
                <div className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold">{pendingInstitutions}</div>
              )}
            </div>
            <span className="font-bold text-xs">Institution Details</span>
          </button>
        </div>

        <div className="mt-4 text-sm text-slate-500">
          Use the buttons above to open the dedicated Registrations page with search and filters.
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;