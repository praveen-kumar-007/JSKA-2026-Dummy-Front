import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download, User, Phone, Info, Building2, Wallet, X } from "lucide-react";
import { IDCardFront } from "./Frontcard";
import { IDCardBack } from "./Backcard";
import type { IDCardData } from "../types";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminRegistrationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [type, setType] = useState<'player' | 'institution' | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatedIdNo, setGeneratedIdNo] = useState<string | null>(null);
  const [showIdCard, setShowIdCard] = useState(false);

  // Generate unique DDKA-#### ID
  const generateIdNo = () => {
    const randomFourDigits = Math.floor(1000 + Math.random() * 9000);
    const newIdNo = `DDKA-${randomFourDigits}`;
    setGeneratedIdNo(newIdNo);
    setShowIdCard(true);
  };

  const getIdCardData = (): IDCardData | null => {
    if (!generatedIdNo || type !== 'player' || !data) return null;
    return {
      idNo: generatedIdNo,
      name: data.fullName,
      fathersName: data.fathersName,
      dob: data.dob,
      bloodGroup: data.bloodGroup,
      phone: data.phone,
      address: data.address,
      photoUrl: data.photo,
      transactionId: data.transactionId,
    };
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetch(`${API_URL}/api/players/${id}`)
      .then(async (res) => {
        if (res.ok) {
          const result = await res.json();
          if (result.success) {
            setData(result.data);
            setType('player');
            setLoading(false);
            return 'found'; // short-circuit
          }
        }
        // Try institution if not found as player
        return fetch(`${API_URL}/api/institutions/${id}`);
      })
      .then(async (res) => {
        if (res === 'found') return; // do nothing if already found
        if (!res || !res.ok) throw new Error('Not found');
        const result = await res.json();
        if (result.success) {
          setData(result.data);
          setType('institution');
        } else {
          throw new Error('Not found');
        }
      })
      .catch(() => {
        setError('Registration not found');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error || !data) return <div className="flex justify-center items-center min-h-screen">{error || 'Not found'}</div>;

  // --- Layout: Two columns on desktop, stacked on mobile ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 items-start">
        {/* LEFT COLUMN: Photo & Documents */}
        <div className="flex flex-col gap-8 min-w-[320px]">
          {/* Passport Photo Card */}
          {type === 'player' && data.photo && (
            <div className="bg-white rounded-xl shadow border p-6 flex flex-col items-center justify-start h-full">
              <div className="flex flex-col items-center w-full">
                <img src={data.photo} alt="Photo" className="w-40 h-40 object-cover rounded-lg border mb-4" />
                <div className="font-bold text-lg mb-2">Passport Size Photo</div>
              </div>
              <a href={data.photo} target="_blank" rel="noopener noreferrer" className="w-full mt-2 text-center bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 rounded flex items-center justify-center gap-2 border"><Download size={16} />Download Photo</a>
              <span className="mt-3 inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold">Verified</span>
            </div>
          )}
          {/* Aadhar Card Documents Card */}
          {type === 'player' && (data.front || data.back) && (
            <div className="bg-white rounded-xl shadow border p-6 flex flex-col items-center justify-start h-full">
              <div className="font-bold text-lg mb-4 w-full text-center">Aadhar Card Documents</div>
              <div className="grid grid-cols-2 gap-4 w-full">
                {data.front && (
                  <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center justify-start h-full">
                    <img src={data.front} alt="Aadhar Front" className="w-32 h-20 object-cover rounded border mb-2" />
                    <a href={data.front} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-1 rounded flex items-center justify-center gap-2 border"><Download size={14} />Download Front Side</a>
                    <span className="mt-2 inline-block bg-blue-200 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">Verified</span>
                  </div>
                )}
                {data.back && (
                  <div className="bg-purple-50 rounded-lg p-3 flex flex-col items-center justify-start h-full">
                    <img src={data.back} alt="Aadhar Back" className="w-32 h-20 object-cover rounded border mb-2" />
                    <a href={data.back} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-1 rounded flex items-center justify-center gap-2 border"><Download size={14} />Download Back Side</a>
                    <span className="mt-2 inline-block bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded-full font-bold">Verified</span>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Payment Receipt Card */}
          {type === 'player' && data.receipt && (
            <div className="bg-white rounded-xl shadow border p-6 flex flex-col items-center justify-start h-full">
              <div className="font-bold text-lg mb-2 w-full text-center">Payment Receipt</div>
              <img src={data.receipt} alt="Receipt" className="w-40 h-28 object-cover rounded border mb-2" />
              <a href={data.receipt} target="_blank" rel="noopener noreferrer" className="w-full mt-2 text-center bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-semibold py-2 rounded flex items-center justify-center gap-2 border"><Download size={16} />Download Receipt</a>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Main Info */}
        <div className="flex flex-col gap-6 w-full">
          {/* Back & Dashboard Buttons */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-900 font-bold hover:underline">
              <ArrowLeft size={22} /> Back
            </button>
            <div className="flex gap-2">
              {type === 'player' && data?.status === 'Approved' && (
                <button
                  onClick={generateIdNo}
                  className="px-4 py-2 rounded-full bg-green-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <Wallet size={16} /> Generate ID
                </button>
              )}
              <button
                onClick={() => navigate('/admin-portal-access')}
                className="px-4 py-2 rounded-full bg-blue-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

          {/* Header: Name, Email, Status, Registered Date */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">
                {type === 'player' ? data.fullName : data.instName}
              </h1>
              {type === 'player' && <div className="text-blue-700 text-base font-medium">{data.email}</div>}
            </div>
            <div className="flex flex-row items-center gap-4 md:gap-6">
              <span className={`px-3 py-1 rounded-full text-xs font-bold h-fit ${data.status === 'Approved' ? 'bg-green-100 text-green-700' : data.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{data.status}</span>
              <span className="text-xs text-gray-500 whitespace-nowrap">Registered: {new Date(data.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* PLAYER: Sectioned Details */}
          {type === 'player' && (
            <div className="flex flex-col gap-6 w-full">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow border p-6 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <User className="text-orange-500 bg-orange-100 rounded-full p-1" size={28} />
                  <span className="font-extrabold text-lg text-orange-700 tracking-wide">PERSONAL INFORMATION</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div><span className="font-semibold">Full Name:</span> {data.fullName}</div>
                  <div><span className="font-semibold">Father's Name:</span> {data.fathersName}</div>
                  <div><span className="font-semibold">Date of Birth:</span> {new Date(data.dob).toLocaleDateString()}</div>
                  <div><span className="font-semibold">Gender:</span> {data.gender}</div>
                  <div><span className="font-semibold">Blood Group:</span> {data.bloodGroup}</div>
                  <div><span className="font-semibold">Aadhar Number:</span> {data.aadharNumber}</div>
                  <div className="md:col-span-2"><span className="font-semibold">Address:</span> {data.address}</div>
                </div>
              </div>

              {/* Contact & Identity */}
              <div className="bg-white rounded-xl shadow border p-6 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="text-blue-500 bg-blue-100 rounded-full p-1" size={28} />
                  <span className="font-extrabold text-lg text-blue-700 tracking-wide">CONTACT & IDENTITY</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div><span className="font-semibold">Email:</span> {data.email}</div>
                  <div><span className="font-semibold">Phone:</span> {data.phone}</div>
                  <div><span className="font-semibold">Parent's Phone:</span> {data.parentsPhone}</div>
                </div>
              </div>

              {/* Other Details */}
              <div className="bg-white rounded-xl shadow border p-6 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="text-green-500 bg-green-100 rounded-full p-1" size={28} />
                  <span className="font-extrabold text-lg text-green-700 tracking-wide">OTHER DETAILS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {data.sportsExperience && <div className="md:col-span-2"><span className="font-semibold">Sports Experience:</span> {data.sportsExperience}</div>}
                  {data.reasonForJoining && <div className="md:col-span-2"><span className="font-semibold">Reason for Joining:</span> {data.reasonForJoining}</div>}
                  <div><span className="font-semibold">Transaction ID:</span> {data.transactionId}</div>
                  <div><span className="font-semibold">Registered At:</span> {new Date(data.createdAt).toLocaleString()}</div>
                  <div><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded text-xs font-bold ${data.status === 'Approved' ? 'bg-green-100 text-green-700' : data.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{data.status}</span></div>
                </div>
              </div>
            </div>
          )}

          {/* INSTITUTION: Sectioned Details */}
          {type === 'institution' && (
            <div className="flex flex-col gap-6 w-full">
              {/* Institution Information */}
              <div className="bg-white rounded-xl shadow border p-6 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="text-purple-500 bg-purple-100 rounded-full p-1" size={28} />
                  <span className="font-extrabold text-lg text-purple-700 tracking-wide">INSTITUTION INFORMATION</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div><span className="font-semibold">Institution Name:</span> {data.instName}</div>
                  <div><span className="font-semibold">Type:</span> {data.instType}</div>
                  <div><span className="font-semibold">Registration No:</span> {data.regNo}</div>
                  <div><span className="font-semibold">Est. Year:</span> {data.year}</div>
                  <div><span className="font-semibold">Principal/Head Name:</span> {data.headName}</div>
                  <div><span className="font-semibold">Secretary Name:</span> {data.secretaryName}</div>
                  <div><span className="font-semibold">Surface Type:</span> {data.surfaceType}</div>
                  <div><span className="font-semibold">Field Area (sqft):</span> {data.area}</div>
                  <div><span className="font-semibold">Total Players:</span> {data.totalPlayers}</div>
                  <div><span className="font-semibold">Office Phone:</span> {data.officePhone}</div>
                  <div className="md:col-span-2"><span className="font-semibold">Address:</span> {data.address}</div>
                </div>
              </div>

              {/* Other Details */}
              <div className="bg-white rounded-xl shadow border p-6 w-full">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="text-green-500 bg-green-100 rounded-full p-1" size={28} />
                  <span className="font-extrabold text-lg text-green-700 tracking-wide">OTHER DETAILS</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div><span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded text-xs font-bold ${data.status === 'Approved' ? 'bg-green-100 text-green-700' : data.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{data.status}</span></div>
                  <div><span className="font-semibold">Transaction ID:</span> {data.transactionId}</div>
                  <div><span className="font-semibold">Registered At:</span> {new Date(data.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ID Card Modal */}
      {showIdCard && generatedIdNo && getIdCardData() && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-blue-900 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{data.fullName} - ID Card</h2>
              <button
                onClick={() => {
                  setShowIdCard(false);
                  setGeneratedIdNo(null);
                }}
                className="text-2xl hover:bg-blue-800 p-1 rounded w-8 h-8 flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>

            {/* ID Cards */}
            <div className="p-8 flex gap-8 justify-center flex-wrap">
              <div>
                <h3 className="text-center font-bold text-slate-700 mb-4">Front Side</h3>
                <IDCardFront data={getIdCardData()!} />
              </div>
              <div>
                <h3 className="text-center font-bold text-slate-700 mb-4">Back Side</h3>
                <IDCardBack data={getIdCardData()!} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-slate-100 border-t border-slate-200 p-4 flex gap-4 justify-center">
              <button
                onClick={() => {
                  setShowIdCard(false);
                  setGeneratedIdNo(null);
                }}
                className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded transition"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded transition flex items-center gap-2"
              >
                <Download size={18} /> Print / Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRegistrationDetails;
