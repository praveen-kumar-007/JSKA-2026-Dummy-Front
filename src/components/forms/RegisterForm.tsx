import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, User, FileText } from 'lucide-react';
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
    if (!form.fullName || !form.fathersName || !form.dob || !form.email || !form.phone || !form.parentsPhone || !form.aadharNumber || !form.reasonForJoining) {
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

  // Success card — aligned with TechnicalOfficialForm visual language
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-emerald-50">
          <div className="bg-teal-900 text-white p-6 rounded-t-3xl">
            <h2 className="text-3xl font-oswald font-bold uppercase tracking-wide">{lang === 'hi' ? 'पंजीकरण सफल!' : 'Registration Successful!'}</h2>
            <p className="text-sm text-teal-200 mt-1">{lang === 'hi' ? 'आपका पंजीकरण रिकॉर्ड कर दिया गया है।' : 'Your registration has been recorded.'}</p>
          </div>
          <div className="p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            </div>
            <p className="text-lg text-slate-700 mb-6">{lang === 'hi' ? 'धन्यवाद — आपका आवेदन प्राप्त हुआ है। प्रशासनिक सत्यापन के बाद आपको सूचित किया जाएगा।' : 'Thank you — your application has been received. You will be notified after administrative verification.'}</p>
            <Link to="/" className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-full">{lang === 'hi' ? 'होम पर जाएं' : 'Back to home'}</Link>
          </div>
        </div>
      </div>
    );
  }

  // New form layout using TechnicalOfficialForm structure (clean cards, section headers)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-teal-900 px-6 py-6 text-white rounded-2xl mb-6">
          <h1 className="text-3xl font-oswald font-bold uppercase tracking-wide">{t.playerTitle}</h1>
          <p className="text-teal-200 mt-2">{t.playerSubtitle}</p>
        </div>

        <form onSubmit={handleFinalSubmit} className="space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2 mb-2">
              <div className="p-2 bg-purple-50 rounded-xl"><User className="text-purple-600" size={20} /></div>
              <h2 className="text-lg font-oswald font-bold text-slate-800 uppercase tracking-wide">{lang === 'hi' ? 'व्यक्तिगत विवरण' : 'Personal Details'}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.fullName} *</label>
                <input name="fullName" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.fathersName} *</label>
                <input name="fathersName" required value={form.fathersName} onChange={(e) => setForm({ ...form, fathersName: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.gender}</label>
                <select name="gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.dob} *</label>
                <input type="date" name="dob" required value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">District *</label>
                <select name="district" required value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50">
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

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.bloodGroup}</label>
                <select name="bloodGroup" value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50">
                  <option value="">Select Blood Group</option>
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

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.email} *</label>
                <input type="email" name="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.phone} *</label>
                <input name="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{lang === 'hi' ? 'अभिभावक का फोन / Guardian phone' : 'Parents / Guardian Phone'} *</label>
                <input name="parentsPhone" required value={form.parentsPhone} onChange={(e) => setForm({ ...form, parentsPhone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" placeholder={lang === 'hi' ? 'अभिभावक का फोन' : 'Parents / Guardian phone'} />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.address} *</label>
                <textarea name="address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.aadhar} *</label>
                <input name="aadharNumber" required value={form.aadharNumber} onChange={(e) => setForm({ ...form, aadharNumber: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">{t.labels.reason} *</label>
                <textarea name="reasonForJoining" required value={form.reasonForJoining} onChange={(e) => setForm({ ...form, reasonForJoining: e.target.value })} className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-50" />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2 mb-2">
              <div className="p-2 bg-amber-50 rounded-xl"><FileText className="text-amber-600" size={18} /></div>
              <h3 className="text-lg font-oswald font-bold text-slate-800 uppercase tracking-wide">{lang === 'hi' ? 'दस्तावेज़' : 'Documents'}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </section>

          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" checked={form.acceptedTerms} onChange={(e) => setForm({ ...form, acceptedTerms: e.target.checked })} />
              <span>{lang === 'hi' ? 'मैं पुष्टि करता/करती हूं कि ऊपर दी गई सभी जानकारी सत्य और सही है।' : 'I confirm that all details provided are true and correct.'}</span>
            </label>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-teal-900 text-white rounded-2xl font-bold hover:bg-teal-800 transition-all">{isSubmitting ? 'Submitting...' : t.submit}</button>
          </div>
        </form>

        {previewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" role="dialog" aria-modal="true" onClick={() => setPreviewOpen(null)}>
            <div className="relative bg-white rounded-md p-4 max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="absolute top-2 right-2 text-slate-600" onClick={() => setPreviewOpen(null)}>Close</button>
              <img src={previewOpen.url} alt={previewOpen.label} className="w-full h-auto max-h-[80vh] object-contain mx-auto" />
              {previewOpen.label && <div className="mt-2 text-sm text-slate-600 text-center">{previewOpen.label}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;