import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, Phone, Info, ChevronDown, ChevronUp, Youtube, Instagram, Twitter, Facebook } from 'lucide-react';
import { CONTACT_INFO, SOCIAL_LINKS } from '../constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const FAQS = [
	{
		question: {
			en: 'How can I join JSKA or participate in events?',
			hi: 'मैं JSKA में कैसे शामिल हो सकता हूँ या कार्यक्रमों में भाग ले सकता हूँ?',
		},
		answer: {
			en: 'You can register as a player or institution using the registration page. For event participation, keep an eye on our News section for announcements.',
			hi: 'आप पंजीकरण पृष्ठ का उपयोग करके खिलाड़ी या संस्था के रूप में पंजीकरण कर सकते हैं। कार्यक्रमों में भाग लेने के लिए, घोषणाओं के लिए हमारे समाचार अनुभाग पर नज़र रखें।',
		},
	},
	{
		question: {
			en: 'Where is JSKA located?',
			hi: 'JSKA कहाँ स्थित है?',
		},
		answer: {
			en: 'Retired Rly Colony, Gomoh, Jharkhand 828401',
			hi: 'रिटायर्ड रेलवे कॉलोनी, गोमो, धनबाद, झारखंड 828401',
		},
	},
	{
		question: {
			en: 'How do I contact for support or queries?',
			hi: 'सहायता या प्रश्नों के लिए मैं कैसे संपर्क करूँ?',
		},
		answer: {
			en: 'You can use the contact form or email us at jharkhandstatekabaddi@gmail.com. For urgent queries, call +91 9123163206.',
			hi: 'आप संपर्क फ़ॉर्म का उपयोग कर सकते हैं या हमें jharkhandstatekabaddi@gmail.com पर ईमेल कर सकते हैं। त्वरित सहायता के लिए, +91 9123163206 पर कॉल करें।',
		},
	},
];

const Contact: React.FC<{ lang?: 'en' | 'hi' }> = ({ lang = 'en' }) => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	});
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
		'idle'
	);
	const [faqOpen, setFaqOpen] = useState<number | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('sending');
		try {
			const res = await fetch(`${API_URL}/api/contact`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			});
			const result = await res.json().catch(() => null);
			if (res.ok && result && result.success) {
				setStatus('sent');
				setForm({ name: '', email: '', phone: '', subject: '', message: '' });
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	};

	return (
		<>
			<Helmet>
				<title>
					{lang === 'hi'
						? 'संपर्क करें | झारखंड राज्य कबड्डी संघ (JSKA)'
						: 'Contact JSKA | Jharkhand State Kabaddi Association, Jharkhand'}
				</title>
				<meta
					name="description"
					content={
						lang === 'hi'
							? 'झारखंड राज्य कबड्डी संघ (JSKA) से संपर्क करें – पता, फोन, ईमेल और ऑनलाइन संपर्क फ़ॉर्म के माध्यम से झारखंड में कबड्डी से जुड़ी सभी जानकारी प्राप्त करें।'
							: 'Contact Jharkhand State Kabaddi Association (JSKA) – address, phone, email and contact form for Kabaddi-related queries in Jharkhand.'
					}
				/>
					<meta
						name="keywords"
						content="Contact JSKA, contact Jharkhand Kabaddi Association, Kabaddi enquiries Jharkhand, Kabaddi Jharkhand contact, jaan kabaddi contact, jharkhand kabaddi office, kabaddi association of jharkhand"
					/>
			</Helmet>
			<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-0 px-0">
			<div className="w-full bg-gradient-to-b from-primary to-primary-light py-16 px-2 text-center">
				<h1 className="text-4xl font-extrabold mb-2 text-gold drop-shadow">
					{lang === 'hi' ? 'रजिस्ट्रेशन एवं पूछताछ' : 'Official Inquiries — JSKA'}
				</h1>
				<p className="text-lg text-slate-200 mb-6 max-w-2xl mx-auto">
					{lang === 'hi'
						? 'कृपया अपने प्रश्न या औपचारिक अनुरोध नीचे प्रेषित करें। हमारी टीम शीघ्र उत्तर देगी।'
						: 'Please submit your formal inquiry below. Our office will respond promptly.'}
				</p>
			</div>
			<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 md:px-8 -mt-10">
				{/* Association Details */}
			<div className="bg-white rounded-2xl p-8 text-slate-800 shadow-xl flex flex-col gap-6 border border-slate-100 border-l-4 border-accent">
			<h2 className="text-2xl font-semibold mb-2 text-primary">
					{lang === 'hi' ? 'अधिकारिक संपर्क विवरण' : 'Official Contact Details'}
				</h2>
				<p className="text-slate-600 mb-4 text-sm">
					{lang === 'hi'
						? 'अधिकृत पूछताछ और कार्यालय संचार के लिए नीचे दिए गए विवरण का उपयोग करें।'
						: 'Use the details below for official enquiries and correspondence.'}
					</p>
				<div className="flex items-start gap-4 bg-muted rounded-xl p-4 border border-[#eee6dc]">
					<MapPin className="text-accent w-8 h-8" />
					<div>
						<div className="font-bold text-primary">
								{lang === 'hi' ? 'पंजीकृत कार्यालय' : 'Registered Office'}
							</div>
							<div className="text-sm">{CONTACT_INFO.address}</div>
						</div>
					</div>
				<div className="flex items-start gap-4 bg-muted rounded-xl p-4 border border-[#eee6dc]">
					<Phone className="text-accent w-8 h-8" />
					<div>
						<div className="font-bold text-primary">
								{lang === 'hi' ? 'दूरभाष' : 'Telephone'}
							</div>
							<div className="text-sm">{CONTACT_INFO.phone}</div>
						</div>
					</div>
					<div className="flex items-start gap-4 bg-purple-50 rounded-xl p-4 border border-purple-100">
						<Mail className="text-purple-500 w-8 h-8" />
						<div>
							<div className="font-bold text-teal-900">
								{lang === 'hi' ? 'औपचारिक ईमेल' : 'Official Email'}
							</div>
							<a
								href={`mailto:${CONTACT_INFO.email}`}
								className="underline text-teal-900 hover:text-teal-700 text-sm"
							>
								{CONTACT_INFO.email}
							</a>
						</div>
					</div>
				<div className="flex items-start gap-4 bg-muted rounded-xl p-4 border border-[#eee6dc]">
					<Info className="text-accent w-8 h-8" />
					<div>
						<div className="font-bold text-primary">
								{lang === 'hi' ? 'पंजीकृत संस्था' : 'Registered Body'}
							</div>
							<div className="text-sm">
								Jharkhand State Kabaddi Association (JSKA)
							</div>
							<div className="text-xs text-slate-600 mt-1">
								{lang === 'hi'
									? 'झारखंड राज्य कबड्डी संघ से संबद्ध (AKFI मान्यता प्राप्त)'
									: 'Affiliated to Jharkhand State Kabaddi Association (Recognized by AKFI)'}
							</div>
						</div>
					</div>
					{/* Social Media Links */}
					<div className="mt-2 bg-muted rounded-xl p-4 border border-[#eee6dc]">
					<div className="text-sm font-semibold text-primary mb-3">
						{lang === 'hi' ? 'औपचारिक चैनल' : 'Official Channels'}
						</div>
						<div className="flex flex-wrap items-center gap-3 justify-between sm:justify-start">
							<a
								href={SOCIAL_LINKS.youtube}
								target="_blank"
								rel="noreferrer"
								aria-label="JSKA YouTube Channel"
								className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-accent/80 hover:bg-accent/10 active:bg-accent/20 text-[10px] font-semibold transition-all shadow-sm hover:shadow-md active:shadow-inner w-[48%] sm:w-auto justify-center"
							>
								<span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-gold group-hover:bg-primary-light group-hover:text-gold transition-all">
									<Youtube className="w-3 h-3" />
								</span>
								<span className="tracking-wide">YouTube</span>
							</a>
							<a
								href={SOCIAL_LINKS.instagram}
								target="_blank"
								rel="noreferrer"
								aria-label="JSKA Instagram"
								className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-accent/80 hover:bg-accent/10 active:bg-accent/20 text-[10px] font-semibold transition-all shadow-sm hover:shadow-md active:shadow-inner w-[48%] sm:w-auto justify-center"
							>
								<span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-gold group-hover:bg-primary-light group-hover:text-gold transition-all">
									<Instagram className="w-3 h-3" />
								</span>
								<span className="tracking-wide">Instagram</span>
							</a>
							<a
								href={SOCIAL_LINKS.x}
								target="_blank"
								rel="noreferrer"
								aria-label="JSKA X (Twitter)"
								className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-accent/80 hover:bg-accent/10 active:bg-accent/20 text-[10px] font-semibold transition-all shadow-sm hover:shadow-md active:shadow-inner w-[48%] sm:w-auto justify-center"
							>
								<span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-gold group-hover:bg-primary-light group-hover:text-gold transition-all">
									<Twitter className="w-3 h-3" />
								</span>
								<span className="tracking-wide">X</span>
							</a>
								<a
									href={SOCIAL_LINKS.facebook}
									target="_blank"
									rel="noreferrer"
									aria-label="JSKA Facebook Page"
								className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-accent/80 hover:bg-accent/10 active:bg-accent/20 text-[10px] font-semibold transition-all shadow-sm hover:shadow-md active:shadow-inner w-[48%] sm:w-auto justify-center"
								>
								<span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-primary text-gold group-hover:bg-primary-light group-hover:text-gold transition-all">
									<Facebook className="w-3 h-3" />
								</span>
								<span className="tracking-wide">Facebook</span>
								</a>
						</div>
					</div>
				</div>
				{/* Contact Form */}
				<div className="bg-white rounded-2xl p-8 text-slate-800 shadow-xl border border-slate-100 border-l-4 border-teal-700">
				<h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-teal-900">
					<Mail className="text-teal-700" />{' '}
					{lang === 'hi' ? 'औपचारिक अनुरोध प्रस्तुत करें' : 'Submit an Inquiry'}
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Subject (optional) */}
						<div>
							<label className="block text-sm font-semibold mb-1 text-teal-900">
								{lang === 'hi' ? 'विषय' : 'Subject'}
							</label>
							<input
								type="text"
								name="subject"
								value={form.subject}
								onChange={handleChange}
								className="w-full px-4 py-3 rounded bg-slate-50 text-teal-900 border border-slate-200 focus:border-teal-600 outline-none"
								placeholder={
									lang === 'hi'
										? 'कृपया विषय संक्षेप में लिखें'
										: 'Briefly state the subject of your inquiry'
								}
							/>
						</div>
						<div className="flex flex-col md:flex-row gap-4">
							<div className="flex-1">
								<label className="block text-sm font-semibold mb-1 text-teal-900">
									{lang === 'hi' ? 'पूरा नाम' : 'Full Name'} *
								</label>
								<input
									type="text"
									name="name"
									value={form.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 rounded bg-slate-50 text-teal-900 border border-slate-200 focus:border-teal-600 outline-none"
									placeholder={
										lang === 'hi' ? 'आपका पूरा नाम' : 'Your full name'
									}
								/>
							</div>
							<div className="flex-1">
								<label className="block text-sm font-semibold mb-1 text-teal-900">
									{lang === 'hi' ? 'ईमेल पता' : 'Email Address'} *
								</label>
								<input
									type="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 rounded bg-slate-50 text-teal-900 border border-slate-200 focus:border-teal-600 outline-none"
									placeholder={
										lang === 'hi' ? 'आपका ईमेल पता' : 'your.email@example.com'
									}
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-semibold mb-1 text-teal-900">
								{lang === 'hi' ? 'फ़ोन (वैकल्पिक)' : 'Phone (optional)'}
							</label>
							<input
								type="text"
								name="phone"
								value={form.phone}
								onChange={handleChange}
className="w-full px-4 py-3 rounded bg-slate-50 text-primary border border-slate-200 focus:border-accent outline-none"
								placeholder={lang === 'hi' ? 'फोन नंबर' : 'Phone number'}
							/>
						</div>
						<div>
							<label className="block text-sm font-semibold mb-1 text-teal-900">
								{lang === 'hi' ? 'विवरण' : 'Details'} *
							</label>
							<textarea
								name="message"
								value={form.message}
								onChange={handleChange}
								required
								rows={5}
								className="w-full px-4 py-3 rounded bg-slate-50 text-teal-900 border border-slate-200 focus:border-teal-600 outline-none"
								placeholder={
									lang === 'hi'
										? 'कृपया अपना अनुरोध या प्रश्न स्पष्ट रूप से लिखें...'
										: 'Please describe your request or inquiry in detail...'
								}
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-accent hover:bg-[#e66900] text-white font-semibold py-3 rounded transition-all"
							disabled={status === 'sending'}
						>
							{status === 'sending'
								? lang === 'hi'
									? 'प्रेषित कर रहे हैं...'
									: 'Submitting...'
								: lang === 'hi'
								? 'अनुरोध भेजें'
								: 'Submit Inquiry'}
						</button>
						{status === 'sent' && (
							<div className="text-green-700 text-sm font-semibold mt-2">
								{lang === 'hi'
									? 'आपका अनुरोध सफलतापूर्वक प्राप्त किया गया है। हम शीघ्र संपर्क करेंगे।'
									: 'Your inquiry has been received. We will reply shortly.'}
							</div>
						)}
						{status === 'error' && (
							<div className="text-red-700 text-sm font-semibold mt-2">
								{lang === 'hi'
									? 'सर्वर त्रुटि। कृपया कुछ समय बाद पुनः प्रयास करें।'
									: 'An error occurred. Please try again later.'}
							</div>
						)}
					</form>
				</div>
			</div>
			{/* FAQ Section */}
			<div className="max-w-4xl mx-auto mt-16 mb-24 px-4">
				<h2 className="text-3xl font-semibold text-center text-primary mb-8">
					{lang === 'hi' ? 'प्रमुख प्रश्न' : 'Common Queries'}
				</h2>
				<div className="space-y-4">
					{FAQS.map((faq, idx) => (
						<div
							key={idx}
							className="bg-purple-50 rounded-xl p-5 text-teal-900 shadow flex flex-col border border-purple-100"
						>
							<button
								onClick={() =>
									setFaqOpen(faqOpen === idx ? null : idx)
								}
								className="flex items-center justify-between w-full text-left font-semibold text-lg focus:outline-none"
							>
								<span>{faq.question[lang]}</span>
								{faqOpen === idx ? (
									<ChevronUp className="text-purple-500" />
								) : (
									<ChevronDown className="text-purple-500" />
								)}
							</button>
							{faqOpen === idx && (
								<div className="mt-3 text-slate-700 text-base animate-in fade-in duration-300">
									{faq.answer[lang]}
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
		</>
	);
};

export default Contact;
