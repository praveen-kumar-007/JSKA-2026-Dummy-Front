import React, { useState } from 'react';
import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  Upload,
  CheckCircle
} from 'lucide-react';
import type { Language } from '../../translations';

interface TechnicalOfficialFormProps {
  lang: Language;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const TechnicalOfficialForm: React.FC<TechnicalOfficialFormProps> = ({ lang }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    candidateName: '',
    parentName: '',
    dob: '',
    address: '',
    aadharNumber: '',
    gender: 'Male',
    bloodGroup: 'NA',
    playerLevel: 'District',
    work: '',
    mobile: '',
    education: '',
    email: '',
    confirmation: false
  });

  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name === 'aadharNumber') {
      let digits = value.replace(/\D/g, '').slice(0, 12);
      let formatted = '';
      for (let i = 0; i < digits.length; i += 4) {
        if (i > 0) formatted += ' ';
        formatted += digits.substr(i, 4);
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    if (name === 'mobile') {
      let digits = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digits }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'signature' | 'photo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert(lang === 'hi' ? 'फ़ाइल का आकार 10 एमबी से कम होना चाहिए।' : 'File size must be less than 10 MB.');
      e.target.value = '';
      return;
    }

    if (key === 'signature') {
      setSignatureFile(file);
      setSignaturePreview(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      });
    }

    if (key === 'photo') {
      setPhotoFile(file);
      setPhotoPreview(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signatureFile || !photoFile) {
      alert(
        lang === 'hi'
          ? 'कृपया हस्ताक्षर और पासपोर्ट साइज़ फोटो दोनों अपलोड करें।'
          : 'Please upload both Signature and Passport Size Photo.'
      );
      return;
    }

    if (!formData.confirmation) {
      alert(
        lang === 'hi'
          ? 'कृपया सुनिश्चित करें कि ऊपर दी गई सभी जानकारी सही है।'
          : 'Please confirm that all details are correct.'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const form = new FormData();

      form.append('candidateName', formData.candidateName);
      form.append('parentName', formData.parentName);
      form.append('dob', formData.dob);
      form.append('address', formData.address);
      form.append('aadharNumber', formData.aadharNumber);
      form.append('gender', formData.gender);
      form.append('bloodGroup', formData.bloodGroup);
      form.append('playerLevel', formData.playerLevel);
      form.append('work', formData.work);
      form.append('mobile', formData.mobile);
      form.append('education', formData.education);
      form.append('email', formData.email);

      if (signatureFile) form.append('signature', signatureFile);
      if (photoFile) form.append('photo', photoFile);

      const response = await fetch(`${API_URL}/api/technical-officials/register`, {
        method: 'POST',
        body: form
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(result.message || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Connection error. Please check if backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-2xl mx-auto text-center border border-green-100">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-oswald font-bold text-slate-900 mb-3 uppercase tracking-wide">
          {lang === 'hi' ? 'टेक्निकल ऑफिशियल फॉर्म सबमिट' : 'Technical Official Form Submitted'}
        </h2>
        <p className="text-slate-600 text-lg">
          {lang === 'hi'
            ? 'टेक्निकल ऑफिशियल के रूप में पंजीकरण के लिए धन्यवाद। आपकी जानकारी रिकॉर्ड कर ली गई है।'
            : 'Thank you for registering as a Technical Official. Your details have been recorded.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl rounded-3xl max-w-4xl mx-auto border border-slate-100 overflow-hidden">
      <div className="bg-blue-900 px-8 py-6 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-oswald font-bold uppercase tracking-wide">
            {lang === 'hi' ? 'टेक्निकल ऑफिशियल पंजीकरण' : 'Technical Official Registration'}
          </h1>
          <p className="text-blue-200 mt-2 text-sm sm:text-base">
            {lang === 'hi'
              ? 'DDKA टेक्निकल ऑफिशियल पंजीकरण के लिए समर्पित फॉर्म।'
              : 'Dedicated form for DDKA Technical Officials registration.'}
          </p>
        </div>
      </div>

      {/* Sample ID card preview */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 sm:px-8 py-6 flex flex-col items-center gap-4 text-center">
        <div className="text-sm text-slate-700 max-w-2xl">
          <p className="font-semibold text-slate-900 mb-1">
            {lang === 'hi' ? 'परीक्षा के बाद प्राप्त आईडी कार्ड' : 'ID Card after Examination'}
          </p>
          <p>
            {lang === 'hi'
              ? 'DDKA टेक्निकल ऑफिशियल परीक्षा सफलतापूर्वक उत्तीर्ण करने के बाद अभ्यर्थी को नीचे दिखाए गए के समान आधिकारिक DDKA टेक्निकल ऑफिशियल आईडी कार्ड प्राप्त होगा।'
              : 'After successfully qualifying the DDKA Technical Official examination, candidates will receive an official DDKA Technical Official ID card similar to the one shown below.'}
          </p>
        </div>
        <img
          src="https://res.cloudinary.com/dcqo5qt7b/image/upload/v1767535733/Screenshot_2026-01-04_193603_js6bvo.png"
          alt="Sample DDKA Technical Official ID Card issued after exam"
          className="w-full max-w-sm rounded-xl border border-slate-200 shadow-md bg-white"
        />
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 md:p-10 space-y-8 bg-slate-50">
        {/* Personal Details */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-1">
            <div className="p-2 bg-orange-50 rounded-xl">
              <User className="text-orange-600" size={22} />
            </div>
            <h2 className="text-lg sm:text-xl font-oswald font-bold text-slate-800 uppercase tracking-wide">
              {lang === 'hi' ? 'व्यक्तिगत विवरण' : 'Personal Details'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Name of Candidate *
              </label>
              <input
                name="candidateName"
                required
                value={formData.candidateName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Father's / Mother's Name *
              </label>
              <input
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Enter parent name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} /> Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                required
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} /> Full Address *
            </label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200 h-24"
              placeholder="House No., Street, Area, City, State, PIN"
            />
          </div>
        </section>

        {/* Identity & Contact */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-1">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Phone className="text-blue-600" size={22} />
            </div>
            <h2 className="text-lg sm:text-xl font-oswald font-bold text-slate-800 uppercase tracking-wide">
              {lang === 'hi' ? 'पहचान और संपर्क' : 'Identity & Contact'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Aadhar Number *
              </label>
              <input
                name="aadharNumber"
                required
                value={formData.aadharNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="1234 5678 9012"
                maxLength={14}
                inputMode="numeric"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Mobile Number *
              </label>
              <input
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="9876543210"
                maxLength={10}
                inputMode="numeric"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                <Mail size={14} /> Email ID *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="example@mail.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Work / Job *
              </label>
              <input
                name="work"
                required
                value={formData.work}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Occupation / Job role"
              />
            </div>
          </div>
        </section>

        {/* Technical Profile */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-1">
            <div className="p-2 bg-green-50 rounded-xl">
              <FileText className="text-green-600" size={22} />
            </div>
            <h2 className="text-lg sm:text-xl font-oswald font-bold text-slate-800 uppercase tracking-wide">
              {lang === 'hi' ? 'टेक्निकल प्रोफाइल' : 'Technical Profile'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Gender *
              </label>
              <select
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="NA">NA (Not Known)</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Player Level *
              </label>
              <select
                name="playerLevel"
                required
                value={formData.playerLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="District">District</option>
                <option value="State">State</option>
                <option value="National">National</option>
                <option value="Never Played">Never Played</option>
                <option value="Official">Official</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Highest Education *
              </label>
              <input
                name="education"
                required
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g. B.P.Ed, M.P.Ed, Graduate"
              />
            </div>
          </div>
        </section>

        {/* Uploads */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-1">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Upload className="text-purple-600" size={22} />
            </div>
            <h2 className="text-lg sm:text-xl font-oswald font-bold text-slate-800 uppercase tracking-wide">
              {lang === 'hi' ? 'दस्तावेज़ अपलोड' : 'Uploads'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Signature * (Max 10 MB)
              </label>
              <label className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-blue-400 text-sm text-slate-700">
                <span>{signatureFile ? signatureFile.name : 'Upload 1 supported file. Max 10 MB.'}</span>
                <Upload size={18} className="text-slate-500" />
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'signature')}
                />
              </label>
              {signaturePreview && (
                <div className="mt-2 inline-block rounded-lg border border-slate-200 bg-white p-1">
                  <img
                    src={signaturePreview}
                    alt="Signature preview"
                    className="h-20 w-auto object-contain"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                Photo Passport Size * (Max 10 MB)
              </label>
              <label className="flex items-center justify-between gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-blue-400 text-sm text-slate-700">
                <span>{photoFile ? photoFile.name : 'Upload 1 supported file. Max 10 MB.'}</span>
                <Upload size={18} className="text-slate-500" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'photo')}
                />
              </label>
              {photoPreview && (
                <div className="mt-2 inline-block rounded-lg border border-slate-200 bg-white p-1">
                  <img
                    src={photoPreview}
                    alt="Passport photo preview"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Confirmation */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-100 space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="confirmation"
              checked={formData.confirmation}
              onChange={handleChange}
              className="mt-1 w-4 h-4 rounded border-slate-400 text-orange-600 focus:ring-orange-500"
              required
            />
            <p className="text-sm text-slate-700 leading-relaxed">
              {lang === 'hi'
                ? 'मैं पुष्टि करता/करती हूं कि ऊपर दी गई सभी जानकारी मेरे ज्ञान के अनुसार सही है।'
                : 'I confirm that all details provided above are true and correct to the best of my knowledge.'}
            </p>
          </div>
        </section>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-orange-600 hover:bg-blue-900 text-white font-oswald text-lg sm:text-2xl uppercase py-4 sm:py-5 rounded-2xl shadow-xl transition-all ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting
              ? lang === 'hi'
                ? 'सबमिट किया जा रहा है...'
                : 'Submitting...'
              : lang === 'hi'
                ? 'टेक्निकल ऑफिशियल फॉर्म सबमिट करें'
                : 'Submit Technical Official Form'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TechnicalOfficialForm;
