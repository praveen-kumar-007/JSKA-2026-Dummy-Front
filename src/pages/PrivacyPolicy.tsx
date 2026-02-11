import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, Database, UserCheck, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Language } from '../translations';

const PrivacyPolicy: React.FC<{ lang: Language }> = ({ lang }) => {
  const isHi = lang === 'hi';
  return (
    <>
    <Helmet>
      <title>
        {isHi
          ? 'प्राइवेसी पॉलिसी | झारखंड राज्य कबड्डी संघ (JSKA)'
          : 'Privacy Policy | Jharkhand State Kabaddi Association (JSKA)'}
      </title>
      <meta
        name="description"
        content={
          isHi
            ? 'झारखंड राज्य कबड्डी संघ (JSKA) द्वारा छात्रों, खिलाड़ियों और जिला संघों की व्यक्तिगत जानकारी के संग्रह, उपयोग और सुरक्षा से संबंधित गोपनीयता नीति।'
            : 'Privacy policy for students, players, and district associations of Jharkhand explaining how JSKA collects, uses and protects member data.'
        }
      />
      <meta
        name="keywords"
        content="JSKA privacy policy, kabaddi data privacy jharkhand, kabaddi association of jharkhand privacy, player data protection jharkhand, jaan kabaddi privacy"
      />
    </Helmet>

    <div className="min-h-screen text-slate-900">
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-emerald-50">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(245,158,11,0.18),transparent_50%)]" />
        <div className="pointer-events-none absolute -top-28 -right-20 h-80 w-80 rounded-full bg-amber-300/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-300/40 blur-3xl" />

        {/* Hero Section */}
        <section className="relative">
          <div className="container mx-auto px-6 py-16 md:py-20">
            <div className="relative overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-900 px-8 py-12 text-white shadow-2xl md:px-12">
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute -top-10 left-10 h-24 w-24 rounded-full border border-white/30" />
                <div className="absolute bottom-10 right-16 h-36 w-36 rounded-full border border-white/20" />
              </div>
              <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-200">
                    <Shield className="h-4 w-4" />
                    {isHi ? 'गोपनीयता और सुरक्षा' : 'Privacy & Protection'}
                  </span>
                  <h1 className="mt-6 text-4xl font-oswald font-bold uppercase tracking-tight md:text-6xl">
                    {isHi ? 'प्राइवेसी पॉलिसी' : 'Privacy Policy'}
                  </h1>
                  {!isHi && (
                    <p className="mt-5 max-w-2xl text-lg text-amber-50/90">
                      This policy is for students, players, parents, coaches, and every district kabaddi association across Jharkhand. JSKA protects personal data shared for registrations, events, and official records.
                    </p>
                  )}
                  {isHi && (
                    <p className="mt-5 max-w-2xl text-lg text-amber-50/90">
                      यह नीति झारखंड के छात्रों, खिलाड़ियों, अभिभावकों, कोचों और सभी जिला कबड्डी संघों के लिए है। JSKA पंजीकरण, आयोजनों और आधिकारिक रेकॉर्ड के लिए साझा की गई जानकारी की सुरक्षा करता है।
                    </p>
                  )}
                  <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-amber-100/80">
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Last Updated: February 11, 2026</span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">Jharkhand State Kabaddi Association</span>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">
                      {isHi ? 'छात्र केंद्रित' : 'Student Focused'}
                    </h3>
                    <p className="mt-3 text-sm text-amber-50/85">
                      {isHi
                        ? 'अल्पवयस्क खिलाड़ियों के डेटा के लिए अभिभावक सहमति और सुरक्षा पर विशेष ध्यान।'
                        : 'Extra care for minors with guardian consent, safe storage, and limited use.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">
                      {isHi ? 'जिला नेटवर्क' : 'District Network'}
                    </h3>
                    <p className="mt-3 text-sm text-amber-50/85">
                      {isHi
                        ? 'झारखंड के सभी जिलों में सदस्यता और प्रतियोगिताओं के लिए एक ही गोपनीयता मानक।'
                        : 'One uniform privacy standard for every district association in Jharkhand.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur sm:col-span-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">
                      {isHi ? 'डेटा सुरक्षा' : 'Data Safety'}
                    </h3>
                    <p className="mt-3 text-sm text-amber-50/85">
                      {isHi
                        ? 'संग्रह से लेकर संग्रहण और साझा करने तक, हर चरण में सुरक्षा नियंत्रण लागू हैं।'
                        : 'Security controls are applied at every step, from collection to storage and sharing.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20">
          {/* Introduction */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="text-slate-700 space-y-4">
              {!isHi && (
                <>
                  <p className="text-lg leading-relaxed font-semibold text-slate-900">
                    This Privacy Policy explains how JSKA ("we", "us" or "our") collects, uses, stores and safeguards information provided when you register as a player or district association member, participate in our activities, or use our digital platforms.
                  </p>
                  <p className="leading-relaxed">
                    It applies to students, parents or guardians, coaches, and all district kabaddi associations in Jharkhand. By submitting a registration form or continuing to use JSKA services, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with any part of it, you should not complete registration or should request cancellation of membership.
                  </p>
                </>
              )}
              {isHi && (
                <p className="leading-relaxed text-slate-700">
                  यह प्राइवेसी पॉलिसी बताती है कि JSKA आपके द्वारा खिलाड़ी या जिला संघ सदस्य के रूप में पंजीकरण, हमारी गतिविधियों में भागीदारी या डिजिटल प्लेटफ़ॉर्म के उपयोग के दौरान दी गई जानकारी को कैसे एकत्रित, उपयोग, संग्रहित और सुरक्षित रखता है। यह नीति झारखंड के छात्रों, अभिभावकों, कोचों और सभी जिला कबड्डी संघों पर लागू होती है। पंजीकरण फॉर्म जमा करके या सेवाओं का उपयोग जारी रखकर आप यह स्वीकार करते हैं कि आपने इस नीति को पढ़ और समझ लिया है; यदि आप किसी भी भाग से सहमत नहीं हैं तो कृपया पंजीकरण पूर्ण न करें या सदस्यता रद्द करने का अनुरोध करें।
                </p>
              )}
            </div>
          </section>

          {/* Section 1: Information We Collect */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70">
                <Database className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-slate-900">
                {isHi ? '1. हम कौन‑सी जानकारी एकत्र करते हैं' : '1. Information We Collect'}
              </h2>
            </div>

            <div className="space-y-6 text-slate-700">
              {!isHi && (
                <>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                      <h3 className="text-lg font-bold text-emerald-900 mb-3">1.1 Personal Information</h3>
                      <p className="mb-4">Depending on the type of registration, we may collect the following information:</p>
                      <ul className="space-y-3 list-disc list-inside">
                        <li><strong>Identity Details:</strong> Name, parent/guardian name, date of birth, gender and recent photograph.</li>
                        <li><strong>Contact Details:</strong> Mobile number, email address and residential address.</li>
                        <li><strong>Sports Details:</strong> Playing position, previous kabaddi experience and participation history.</li>
                        <li><strong>District Association Details:</strong> District association name, office address and authorised contact person.</li>
                        <li><strong>Emergency Contact:</strong> Name and phone number of parent / guardian or responsible person.</li>
                        <li><strong>Administrative Records:</strong> Membership status and verification references needed for official records.</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-6">
                      <h3 className="text-lg font-bold text-amber-900 mb-3">1.2 Automatically Collected Information</h3>
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Basic technical information when you visit our website (such as IP address, browser type and device information).</li>
                        <li>Attendance logs, training participation data and performance observations maintained by coaches.</li>
                        <li>Copies of communications with JSKA through email, forms or messaging platforms.</li>
                        <li>Photographs or videos taken during JSKA events for legitimate documentation and promotional purposes.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">1.3 Sensitive Information</h3>
                    <p className="leading-relaxed">
                      In limited cases we may record information such as blood group or relevant medical notes shared for safety reasons. Such data is used only in emergencies or to protect member health and is handled with extra care.
                    </p>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    पंजीकरण के प्रकार के आधार पर हम आपका नाम, माता‑पिता / अभिभावक का नाम, जन्म तिथि, लिंग, हाल का फोटो, संपर्क नंबर, ई‑मेल, निवास पता, खेल संबंधी विवरण, जिला संघ का नाम व पता, अधिकृत प्रतिनिधि का नाम, आपातकालीन संपर्क और सदस्यता सत्यापन से जुड़े रेकॉर्ड जैसी जानकारी एकत्र कर सकते हैं। वेबसाइट उपयोग के दौरान तकनीकी विवरण, उपस्थिति‑डेटा तथा आयोजन के समय खींचे गए फोटो / वीडियो भी संग्रहीत हो सकते हैं। रक्त समूह या स्वास्थ्य संबंधी नोट्स जैसी संवेदनशील जानकारी केवल सुरक्षा और आपात स्थिति में सीमित उपयोग के लिए रखी जाती है।
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70">
                <UserCheck className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-slate-900">
                {isHi ? '2. जानकारी का उपयोग कैसे होता है' : '2. How We Use the Information'}
              </h2>
            </div>

            <div className="space-y-6 text-slate-700">
              {!isHi && (
                <>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                      <h3 className="text-lg font-bold text-emerald-900 mb-3">2.1 Main Purposes</h3>
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Processing and managing player and district association registrations.</li>
                        <li>Organising training sessions, trials, tournaments and kabaddi development programmes.</li>
                        <li>Maintaining contact with members regarding schedules, notices and important updates.</li>
                        <li>Preparing identity cards, certificates and official records.</li>
                        <li>Maintaining official membership records and compliance reporting.</li>
                        <li>Responding to queries, complaints or support requests.</li>
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-6">
                      <h3 className="text-lg font-bold text-amber-900 mb-3">2.2 Additional Uses</h3>
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Improving coaching methods and player development plans.</li>
                        <li>Creating non‑commercial promotional material to showcase kabaddi activities across Jharkhand (photos / videos may be used with appropriate consent).</li>
                        <li>Complying with directions from district, state or national sports bodies and legal authorities.</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    आपकी जानकारी का उपयोग सदस्यता और जिला संघ पंजीकरण को संसाधित करने, प्रशिक्षण सत्र, ट्रायल, टूर्नामेंट और कबड्डी विकास कार्यक्रमों के आयोजन, समय‑सारिणी, नोटिस और महत्वपूर्ण अपडेट भेजने, आईडी कार्ड व प्रमाण‑पत्र तैयार करने, आधिकारिक रेकॉर्ड व अनुपालन रिपोर्टिंग तथा आपकी शंकाओं और शिकायतों के समाधान के लिए किया जाता है। इसके अतिरिक्त, कोचिंग और खिलाड़ी विकास योजनाओं में सुधार, झारखंड भर की कबड्डी गतिविधियों को दिखाने हेतु गैर‑वाणिज्यिक प्रचार सामग्री तैयार करने तथा जिला / राज्य / राष्ट्रीय खेल निकायों और कानूनी प्राधिकरणों के निर्देशों के अनुपालन के लिए भी सीमित रूप से जानकारी उपयोग की जा सकती है।
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 3: Information Sharing */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70">
                <Eye className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-slate-900">
                {isHi ? '3. जानकारी साझा करना एवं प्रकटीकरण' : '3. Information Sharing & Disclosure'}
              </h2>
            </div>

            <div className="space-y-6 text-slate-700">
              {!isHi && (
                <>
                  <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                      <h3 className="text-lg font-bold text-emerald-900 mb-3">3.1 When We Share</h3>
                      <ul className="space-y-3 list-disc list-inside">
                        <li>With tournament organisers, district / state associations or AKFI when registration details are required.</li>
                        <li>With basic service providers such as payment gateways or hosting services that help us run our systems (under confidentiality obligations).</li>
                        <li>With medical professionals or emergency responders where it is necessary to protect life or health.</li>
                        <li>With government or law‑enforcement agencies when legally required.</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-6">
                      <h3 className="text-lg font-bold text-rose-700 mb-3">3.2 What We Do Not Do</h3>
                      <p className="font-semibold text-rose-900 mb-3">JSKA will not:</p>
                      <ul className="space-y-2 list-disc list-inside text-rose-900">
                        <li>Sell or rent your personal data to commercial advertisers.</li>
                        <li>Share your contact details for unrelated marketing campaigns.</li>
                        <li>Disclose sensitive medical information except in emergencies or when required by law.</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    आपकी जानकारी केवल आवश्यक होने पर ही साझा की जाती है, जैसे टूर्नामेंट आयोजकों, जिला / राज्य संघों या AKFI के साथ पंजीकरण विवरण प्रदान करना, भुगतान या होस्टिंग जैसी बुनियादी सेवाएँ देने वाले सेवा‑प्रदाताओं के साथ सिस्टम चलाने हेतु आवश्यक जानकारी साझा करना (उचित गोपनीयता शर्तों के साथ), आपात स्थिति में चिकित्सा टीम या आपदा‑प्रतिसाद दल के साथ और क़ानून द्वारा आवश्यक होने पर सरकारी या क़ानून‑प्रवर्तन एजेंसियों के साथ। JSKA आपका व्यक्तिगत डेटा किसी व्यावसायिक विज्ञापनदाता को नहीं बेचता / किराये पर नहीं देता और संवेदनशील चिकित्सा जानकारी को केवल आपात स्थितियों या कानूनी दायित्व के तहत ही साझा करता है।
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 4: Data Security */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70">
                <Lock className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-slate-900">
                {isHi ? '4. डेटा सुरक्षा एवं भंडारण अवधि' : '4. Data Security & Retention'}
              </h2>
            </div>

            <div className="space-y-6 text-slate-700">
              {!isHi && (
                <>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                      <h3 className="text-lg font-bold text-emerald-900 mb-3">4.1 Protection Measures</h3>
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Access to member data is restricted to authorised JSKA officials for specific duties.</li>
                        <li>Digital records are stored on secured systems with reasonable technical and organisational safeguards.</li>
                        <li>Physical documents, where maintained, are stored in controlled locations.</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-6">
                      <h3 className="text-lg font-bold text-amber-900 mb-3">4.2 Retention</h3>
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Basic registration and result records may be retained for as long as needed for sporting, legal or archival purposes.</li>
                        <li>Financial records are kept for the period required under applicable law.</li>
                        <li>Where data is no longer required, JSKA will take reasonable steps to delete or anonymise it.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">4.3 Data Incident Response</h3>
                    <p className="leading-relaxed">
                      If JSKA becomes aware of any significant unauthorised access to member data, we will, where practicable, inform affected individuals and take steps to contain and investigate the issue.
                    </p>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    सदस्य डेटा तक पहुँच केवल अधिकृत JSKA अधिकारियों तक सीमित है और रेकॉर्ड सुरक्षित प्रणालियों में संग्रहीत किए जाते हैं। बुनियादी पंजीकरण, परिणाम और वित्तीय रेकॉर्ड को उतनी अवधि तक रखा जा सकता है जितनी खेल, कानूनी या अभिलेखी प्रयोजनों के लिए आवश्यक हो। जब किसी डेटा की आवश्यकता नहीं रह जाती, तो उसे हटाने या गुमनाम करने के लिए उचित कदम उठाए जाते हैं। यदि कभी गंभीर अनधिकृत पहुँच या डेटा उल्लंघन का पता चलता है, तो जहाँ संभव हो प्रभावित सदस्यों को सूचित किया जाएगा और स्थिति को नियंत्रित व जाँचने के लिए आवश्यक कार्यवाही की जाएगी।
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 5: Your Rights */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70">
                <FileText className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-slate-900">
                {isHi ? '5. आपके विकल्प और अधिकार' : '5. Your Choices & Rights'}
              </h2>
            </div>

            <div className="space-y-6 text-slate-700">
              {!isHi && (
                <>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                      <h3 className="text-lg font-bold text-emerald-900 mb-3">5.1 Member Rights</h3>
                      <ul className="space-y-3 list-disc list-inside">
                        <li>Request access to the personal information held about you.</li>
                        <li>Ask for correction of inaccurate or incomplete details.</li>
                        <li>Request deletion of certain data, subject to legal and organisational requirements.</li>
                        <li>Withdraw consent for non‑essential uses such as promotional photos or marketing messages.</li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-6">
                      <h3 className="text-lg font-bold text-amber-900 mb-3">5.2 How to Exercise These Rights</h3>
                      <p className="leading-relaxed">
                        You can exercise your rights by contacting JSKA using the details given in the Contact section below. We may ask for reasonable proof of identity before acting on a request.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">5.3 Minors</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>For members under 18 years, consent of a parent or legal guardian is mandatory.</li>
                      <li>Parents / guardians may review, correct or request deletion of their ward&apos;s information.</li>
                    </ul>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    आपको अपने बारे में संग्रहीत व्यक्तिगत जानकारी की प्रति देखने, गलत या अधूरी जानकारी को सुधारने, कुछ डेटा को हटाने (जहाँ कानूनी या संगठनात्मक दायित्व इसकी अनुमति दें) और प्रचारात्मक फोटो या संदेशों जैसे गैर‑आवश्यक उपयोगों के लिए दी गई सहमति वापस लेने का अधिकार है। 18 वर्ष से कम आयु के सदस्यों के लिए पंजीकरण और डेटा से संबंधित सभी अधिकार उनके माता‑पिता या वैधानिक अभिभावक के माध्यम से प्रयोग किए जाएँगे, जो आवश्यकता पड़ने पर जानकारी देखने, सुधारने या हटाने का अनुरोध कर सकते हैं।
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section 6: Website & Cookies */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70">
                <Database className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-slate-900">
                {isHi ? '6. वेबसाइट एवं ऑनलाइन सेवाएँ' : '6. Website & Online Services'}
              </h2>
            </div>

            <div className="space-y-6 text-slate-700">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                {!isHi && (
                  <>
                    <h3 className="text-lg font-bold text-emerald-900 mb-3">6.1 Cookies &amp; Analytics</h3>
                    <p className="mb-4 leading-relaxed">
                      Our website may use basic cookies and analytics tools to understand usage patterns and improve user experience. These typically collect aggregated, non‑identifying information.
                    </p>
                    <p className="text-sm text-slate-600">
                      You can adjust your browser settings to control or block cookies; however, some features may not work correctly if cookies are disabled.
                    </p>
                  </>
                )}
                {isHi && (
                  <p className="leading-relaxed">
                    हमारी वेबसाइट उपयोग‑पैटर्न समझने और अनुभव बेहतर करने के लिए बुनियादी कुकीज़ और एनालिटिक्स टूल का उपयोग कर सकती है, जो सामान्यतः समेकित और पहचान‑रहित जानकारी एकत्र करते हैं। आप अपने ब्राउज़र की सेटिंग्स में जाकर कुकीज़ को नियंत्रित या ब्लॉक कर सकते हैं, लेकिन ऐसा करने पर कुछ सुविधाएँ ठीक से कार्य नहीं कर सकतीं।
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Section 7: Changes & Contact */}
          <section className="rounded-[28px] border border-amber-200/70 bg-white/80 p-8 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.45)] backdrop-blur md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70">
                <Mail className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="text-3xl font-oswald font-bold uppercase tracking-tight text-slate-900">
                {isHi ? '7. परिवर्तन एवं संपर्क जानकारी' : '7. Changes & Contact Information'}
              </h2>
            </div>

            <div className="space-y-6 text-slate-700">
              {!isHi && (
                <>
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                    <h3 className="text-lg font-bold text-emerald-900 mb-3">7.1 Updates to This Policy</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>JSKA may revise this Privacy Policy from time to time.</li>
                      <li>When changes are made, the updated policy and &quot;Last Updated&quot; date will be posted on the website.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-amber-100 bg-amber-50/70 p-6">
                    <h3 className="text-lg font-bold text-amber-900 mb-3">7.2 Contact Details</h3>
                    <div className="rounded-2xl border border-amber-200 bg-white/70 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Jharkhand State Kabaddi Association (JSKA)</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Email:</strong> jharkhandstatekabaddi@gmail.com</p>
                        <p><strong>Address:</strong> Retired Rly Colony, Gomoh, Dhanbad, Jharkhand 828401</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    JSKA समय‑समय पर इस प्राइवेसी पॉलिसी में संशोधन कर सकता है। जब भी बदलाव किए जाएँगे, अद्यतन नीति और "Last Updated" तिथि वेबसाइट पर प्रकाशित की जाएगी।
                  </p>
                  <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Jharkhand State Kabaddi Association (JSKA)</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Email:</strong> jharkhandstatekabaddi@gmail.com</p>
                      <p><strong>Address:</strong> Retired Rly Colony, Gomoh, Dhanbad, Jharkhand 828401</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Acceptance Statement */}
          <section className="relative overflow-hidden rounded-[32px] border border-emerald-200 bg-gradient-to-br from-emerald-900 via-slate-900 to-amber-900 p-10 text-center text-white shadow-2xl">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute -top-16 left-8 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
              <div className="absolute -bottom-16 right-8 h-44 w-44 rounded-full bg-amber-300/30 blur-2xl" />
            </div>
            <div className="relative z-10">
              <Shield className="mx-auto mb-6 h-16 w-16 text-amber-300" />
              <h3 className="text-3xl font-oswald font-bold uppercase tracking-tight">
                {isHi ? 'JSKA के साथ आपकी गोपनीयता' : 'Your Privacy with JSKA'}
              </h3>
              {!isHi && (
                <>
                  <p className="mx-auto mt-5 max-w-3xl text-lg text-amber-50/90">
                    By registering with Jharkhand State Kabaddi Association (JSKA), you agree that your information may be used in the manner described in this Privacy Policy.
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                      to="/register"
                      className="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
                    >
                      Player Registration
                    </Link>
                    <Link
                      to="/affiliated-districts"
                      className="px-8 py-4 bg-white/90 text-slate-900 font-bold rounded-xl hover:bg-white transition-all shadow-lg shadow-white/10"
                    >
                      District Associations
                    </Link>
                  </div>
                </>
              )}
              {isHi && (
                <>
                  <p className="mx-auto mt-5 max-w-3xl text-lg text-amber-50/90">
                    JSKA में पंजीकरण कराते समय आप यह स्वीकार करते हैं कि आपकी जानकारी का उपयोग इस प्राइवेसी पॉलिसी में बताए गए तरीके से किया जा सकता है।
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link
                      to="/register"
                      className="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-xl hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
                    >
                      खिलाड़ी पंजीकरण
                    </Link>
                    <Link
                      to="/affiliated-districts"
                      className="px-8 py-4 bg-white/90 text-slate-900 font-bold rounded-xl hover:bg-white transition-all shadow-lg shadow-white/10"
                    >
                      जिला संघ सूची
                    </Link>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Legal Disclaimer */}
          <div className="text-center text-sm text-slate-600">
            {!isHi && (
              <>
                <p>This Privacy Policy is intended to align with applicable Indian law relating to information technology and data protection.</p>
                <p className="mt-2">© {new Date().getFullYear()} Jharkhand State Kabaddi Association (JSKA). All rights reserved.</p>
              </>
            )}
            {isHi && (
              <>
                <p>यह प्राइवेसी पॉलिसी भारत में सूचना प्रौद्योगिकी तथा डेटा संरक्षण से संबंधित लागू क़ानूनों की मंशा के अनुरूप तैयार की गई है।</p>
                <p className="mt-2">© {new Date().getFullYear()} Jharkhand State Kabaddi Association (JSKA). सर्वाधिकार सुरक्षित।</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;
