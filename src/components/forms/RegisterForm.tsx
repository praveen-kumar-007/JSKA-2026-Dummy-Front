import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, User, UserPlus, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import { RegistrationType } from '../../types';
import type { Language } from '../../translations';
import { translations } from '../../translations';
import { Link } from 'react-router-dom';

interface RegisterFormProps {
  lang: Language;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ lang }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const t = translations[lang].forms;

  const [form, setForm] = useState({
    fullName: '',
    fathersName: '',
    gender: 'Male',
    dob: '',
    bloodGroup: '',
    email: '',
    phone: '',
    parentsPhone: '',
    address: '',
    aadharNumber: '',
    district: '',
    registerAs: RegistrationType.PLAYER,
    sportsExperience: '',
    reasonForJoining: '',
    acceptedTerms: false
  });

  const [files, setFiles] = useState<{ photo: File | null; front: File | null; back: File | null }>({ photo: null, front: null, back: null });
  const [previews, setPreviews] = useState<{ photo?: string; front?: string; back?: string }>({});
  const createdUrls = useRef<string[]>([]);
  const [previewOpen, setPreviewOpen] = useState<{ url: string; label?: string } | null>(null);

  const handleFileChange = (key: 'photo' | 'front' | 'back', file: File | null) => {
    // remove
    if (!file) {
      const url = previews[key];
      if (url) {
        try { URL.revokeObjectURL(url); } catch (e) { /* ignore */ }
        createdUrls.current = createdUrls.current.filter(u => u !== url);
      }
      setPreviews(prev => { const n = { ...prev }; delete n[key]; return n; });
      setFiles(prev => ({ ...prev, [key]: null }));
      return;
    }

    // add/update
    const url = URL.createObjectURL(file);
    createdUrls.current.push(url);
    setPreviews(prev => ({ ...prev, [key]: url }));
    setFiles(prev => ({ ...prev, [key]: file }));
  };

  useEffect(() => {
    return () => {
      createdUrls.current.forEach(u => {
        try { URL.revokeObjectURL(u); } catch (e) { /* ignore */ }
      });
    };
  }, []);





  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Client-side validation
    if (!form.fullName || !form.fathersName || !form.dob || !form.email || !form.phone || !form.aadharNumber || !form.reasonForJoining) {
      alert('Please fill all required fields.');
      setIsSubmitting(false);
      return;
    }

    if (!files.photo || !files.front || !files.back) {
      alert('Please upload Photo and Aadhar Front/Back images.');
      setIsSubmitting(false);
      return;
    }

    if (!form.acceptedTerms) {
      alert('Please accept the Terms & Conditions.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Add form data
      Object.entries(form).forEach(([key, value]) => {
        formDataToSend.append(key, String(value as any));
      });

      // Add files
      if (files.photo) formDataToSend.append('photo', files.photo);
      if (files.front) formDataToSend.append('front', files.front);
      if (files.back) formDataToSend.append('back', files.back);

      const API_URL = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${API_URL}/api/players/register`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.success) {
        setIsSuccess(true);
      } else {
        console.error('Registration failed', data);
        alert((data && data.message) || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 xs:p-12 sm:p-16 text-center max-w-2xl w-full">
          <div className="mb-8">
            <CheckCircle className="mx-auto text-green-500" size={80} />
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-slate-800 font-oswald mb-4 uppercase tracking-tight">
            {lang === 'hi' ? 'पंजीकरण सफल!' : 'Registration Successful!'}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {lang === 'hi' ? 'आपका पंजीकरण सफलतापूर्वक पूरा हो गया है।' : 'Your registration has been completed successfully.'}
          </p>
          <Link
            to="/"
            className="inline-block bg-purple-600 hover:bg-teal-900 text-white font-oswald text-xl uppercase px-8 py-4 rounded-2xl shadow-xl transition-all"
          >
            {lang === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 xs:py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 xs:px-6 sm:px-8">
        <div className="text-center mb-8 xs:mb-12 sm:mb-16">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl font-bold text-slate-800 font-oswald uppercase tracking-tight mb-4">
            {t.playerTitle}
          </h1>
          <p className="text-lg xs:text-xl text-slate-600 max-w-3xl mx-auto">
            {t.playerSubtitle}
          </p>
        </div>

        <form onSubmit={handleFinalSubmit} className="bg-gradient-to-tr from-white/60 via-slate-100 to-white p-1 rounded-3xl shadow-2xl">
          <div className="bg-white rounded-2xl p-8 xs:p-10 sm:p-12 border-l-4 border-indigo-600 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 mb-2">
                <h3 className="text-lg font-semibold text-slate-800">{lang === 'hi' ? 'व्यक्तिगत विवरण' : 'Personal Details'}</h3>
              </div>

              {/* Full Name */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none">
                  <User className="w-5 h-5" />
                </div>
                <input placeholder=" " name="fullName" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="peer w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <label className="absolute left-10 -mt-1 top-3 text-xs text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.fullName} *</label>
              </div>

              {/* Father's Name */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none">
                  <UserPlus className="w-5 h-5" />
                </div>
                <input placeholder=" " name="fathersName" required value={form.fathersName} onChange={(e) => setForm({ ...form, fathersName: e.target.value })} className="peer w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <label className="absolute left-10 -mt-1 top-3 text-xs text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.fathersName} *</label>
              </div>

              {/* Gender */}
              <div>
                <label className="sr-only">{t.labels.gender}</label>
                <select name="gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full pl-3 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* DOB */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none">
                  <Calendar className="w-5 h-5" />
                </div>
                <input placeholder=" " type="date" name="dob" required value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="peer w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <label className="absolute left-10 -mt-1 top-3 text-xs text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.dob} *</label>
              </div>

              {/* District */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">District *</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"><MapPin className="w-5 h-5" /></div>
                  <select name="district" required value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full pl-12 pr-3 py-3 mt-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                    <option value="">Select District</option>
                  <option value="Bokaro">Bokaro</option>
                  <option value="Chatra">Chatra</option>
                  <option value="Deoghar">Deoghar</option>
                  <option value="Dhanbad">Dhanbad</option>
                  <option value="Dumka">Dumka</option>
                  <option value="East Singhbhum">East Singhbhum</option>
                  <option value="Garhwa">Garhwa</option>
                  <option value="Giridih">Giridih</option>
                  <option value="Godda">Godda</option>
                  <option value="Gumla">Gumla</option>
                  <option value="Hazaribagh">Hazaribagh</option>
                  <option value="Jamtara">Jamtara</option>
                  <option value="Khunti">Khunti</option>
                  <option value="Koderma">Koderma</option>
                  <option value="Latehar">Latehar</option>
                  <option value="Lohardaga">Lohardaga</option>
                  <option value="Pakur">Pakur</option>
                  <option value="Palamu">Palamu</option>
                  <option value="Ramgarh">Ramgarh</option>
                  <option value="Ranchi">Ranchi</option>
                  <option value="Sahibganj">Sahibganj</option>
                  <option value="Seraikela Kharsawan">Seraikela Kharsawan</option>
                  <option value="Simdega">Simdega</option>
                  <option value="West Singhbhum">West Singhbhum</option>
                </select>
              </div>
            </div>

              {/* Blood Group */}
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.bloodGroup}</label>
                <select name="bloodGroup" value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className="w-full pl-3 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                  <option value="">{lang === 'hi' ? 'ब्लड ग्रुप चुनें' : 'Select Blood Group'}</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"><Mail className="w-5 h-5" /></div>
                <input placeholder=" " type="email" name="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="peer w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <label className="absolute left-10 -mt-1 top-3 text-xs text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.email} *</label>
              </div>

              {/* Phone */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none"><Phone className="w-5 h-5" /></div>
                <input placeholder=" " name="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="peer w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <label className="absolute left-10 -mt-1 top-3 text-xs text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.phone} *</label>
              </div>

              {/* Parents Phone */}
              <div className="relative">
                <input placeholder=" " name="parentsPhone" value={form.parentsPhone} onChange={(e) => setForm({ ...form, parentsPhone: e.target.value })} className="peer w-full pl-3 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <label className="absolute left-3 -mt-1 top-3 text-xs text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.parentsPhone}</label>
              </div>

              <div className="md:col-span-2 mt-2 mb-2">
                <h3 className="text-lg font-semibold text-slate-800">{lang === 'hi' ? 'संपर्क विवरण' : 'Contact Details'}</h3>
              </div>

              {/* Address */}
              <div className="relative md:col-span-2">
                <label className="sr-only">{t.labels.address}</label>
                <textarea placeholder=" " name="address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="peer w-full pl-4 pr-3 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
                <label className="absolute left-8 -mt-1 top-6 text-xs text-slate-500 peer-placeholder-shown:top-6 peer-focus:top-4 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.address} *</label>
              </div>


            <div className="relative">
              <input placeholder=" " name="aadharNumber" required value={form.aadharNumber} onChange={(e) => setForm({ ...form, aadharNumber: e.target.value })} className="peer w-full pl-3 pr-3 py-3 rounded-xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
              <label className="absolute left-3 -mt-1 top-3 text-xs text-slate-500 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:top-1 peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.aadhar} *</label>
            </div>

            <div className="relative md:col-span-2">
              <textarea placeholder=" " name="reasonForJoining" required value={form.reasonForJoining} onChange={(e) => setForm({ ...form, reasonForJoining: e.target.value })} className="peer w-full pl-4 pr-3 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
              <label className="absolute left-8 -mt-1 top-6 text-xs text-slate-500 peer-placeholder-shown:top-6 peer-focus:top-4 peer-placeholder-shown:text-sm peer-focus:text-xs peer-focus:text-indigo-600 transition-all">{t.labels.reason} *</label>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{lang === 'hi' ? 'दस्तावेज़' : 'Documents'}</h3>
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.uploads} *</label>
              <div className="text-sm text-slate-600 mt-3">(Upload your photo and Aadhar front/back. Preview will appear after selecting a file.)</div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Photo (mobile capture enabled) */}
                <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-center">
                  <label className="block text-sm">
                    {t.labels.photo}
                    <input required type="file" accept="image/*" capture="user" onChange={(e) => handleFileChange('photo', e.target.files?.[0] || null)} className="mt-2 mx-auto" />
                  </label>
                  {previews.photo && (
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <img src={previews.photo} alt="photo preview" className="h-20 w-20 object-cover rounded-lg border cursor-pointer" onClick={() => setPreviewOpen({ url: previews.photo!, label: lang === 'hi' ? 'फोटो' : 'Photo' })} />
                      <div className="flex flex-col">
                        <button type="button" className="text-sm text-indigo-600 hover:underline" onClick={() => setPreviewOpen({ url: previews.photo!, label: lang === 'hi' ? 'फोटो' : 'Photo' })}>{lang === 'hi' ? 'देखें' : 'View'}</button>
                        <button type="button" className="text-sm text-red-500 hover:underline mt-1" onClick={() => handleFileChange('photo', null)}>{lang === 'hi' ? 'हटाएँ' : 'Remove'}</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Aadhar Front (mobile capture enabled) */}
                <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-center">
                  <label className="block text-sm">
                    {t.labels.aadharFront}
                    <input required type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange('front', e.target.files?.[0] || null)} className="mt-2 mx-auto" />
                  </label>
                  {previews.front && (
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <img src={previews.front} alt="aadhar front preview" className="h-20 w-28 object-cover rounded-lg border cursor-pointer" onClick={() => setPreviewOpen({ url: previews.front!, label: lang === 'hi' ? 'आधार फ्रंट' : 'Aadhar Front' })} />
                      <div className="flex flex-col">
                        <button type="button" className="text-sm text-indigo-600 hover:underline" onClick={() => setPreviewOpen({ url: previews.front!, label: lang === 'hi' ? 'आधार फ्रंट' : 'Aadhar Front' })}>{lang === 'hi' ? 'देखें' : 'View'}</button>
                        <button type="button" className="text-sm text-red-500 hover:underline mt-1" onClick={() => handleFileChange('front', null)}>{lang === 'hi' ? 'हटाएँ' : 'Remove'}</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Aadhar Back (mobile capture enabled) */}
                <div className="p-3 rounded-lg border border-slate-100 bg-slate-50 text-center">
                  <label className="block text-sm">
                    {t.labels.aadharBack}
                    <input required type="file" accept="image/*" capture="environment" onChange={(e) => handleFileChange('back', e.target.files?.[0] || null)} className="mt-2 mx-auto" />
                  </label>
                  {previews.back && (
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <img src={previews.back} alt="aadhar back preview" className="h-20 w-28 object-cover rounded-lg border cursor-pointer" onClick={() => setPreviewOpen({ url: previews.back!, label: lang === 'hi' ? 'आधार बैक' : 'Aadhar Back' })} />
                      <div className="flex flex-col">
                        <button type="button" className="text-sm text-indigo-600 hover:underline" onClick={() => setPreviewOpen({ url: previews.back!, label: lang === 'hi' ? 'आधार बैक' : 'Aadhar Back' })}>{lang === 'hi' ? 'देखें' : 'View'}</button>
                        <button type="button" className="text-sm text-red-500 hover:underline mt-1" onClick={() => handleFileChange('back', null)}>{lang === 'hi' ? 'हटाएँ' : 'Remove'}</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={form.acceptedTerms} onChange={(e) => setForm({ ...form, acceptedTerms: e.target.checked })} />
                <span className="text-sm text-slate-600">{lang === 'hi' ? 'मैं पुष्टि करता/करती हूं कि ऊपर दी गई सभी जानकारी सत्य और सही है।' : 'I confirm that all details provided are true and correct.'}</span>
              </label>
            </div>
              </div>
            </div>
          {previewOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true" onClick={() => setPreviewOpen(null)}>
              <div className="relative bg-white rounded-md p-4 max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <button type="button" className="absolute top-2 right-2 text-slate-600" onClick={() => setPreviewOpen(null)}>Close</button>
                <img src={previewOpen.url} alt={previewOpen.label} className="w-full h-auto max-h-[80vh] object-contain mx-auto" />
                {previewOpen.label && <div className="mt-2 text-sm text-slate-600 text-center">{previewOpen.label}</div>}
              </div>
            </div>
          )}

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-700 hover:to-teal-600 text-white font-oswald text-xl uppercase py-4 rounded-2xl shadow-2xl transform hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : t.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;