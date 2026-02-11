import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, AlertCircle, FileText, Users, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Language } from '../translations';

const TermsConditions: React.FC<{ lang: Language }> = ({ lang }) => {
  const isHi = lang === 'hi';
  return (
    <>
    <Helmet>
      <title>
        {isHi
          ? 'नियम एवं शर्तें | झारखंड राज्य कबड्डी संघ (JSKA)'
          : 'Terms & Conditions | Jharkhand State Kabaddi Association (JSKA)'}
      </title>
      <meta
        name="description"
        content={
          isHi
            ? 'झारखंड राज्य कबड्डी संघ (JSKA) के खिलाड़ियों और जिला संघों के लिए नियम, शर्तें और अनुशासन नीति।'
            : 'Official terms and conditions for players, district associations, membership and conduct under Jharkhand State Kabaddi Association (JSKA).'
        }
      />
      <meta
        name="keywords"
        content="JSKA terms and conditions, kabaddi rules jharkhand, jharkhand state kabaddi association terms, district kabaddi association rules"
      />
    </Helmet>

    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-blue-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 inline-block">
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-800/50 border border-blue-700 text-orange-400 text-xs font-bold tracking-widest uppercase">
                <Shield className="w-4 h-4 mr-2" />
                Legal Terms & Regulations
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-oswald font-bold mb-6 text-white uppercase tracking-tight">
              {isHi ? 'नियम एवं शर्तें' : 'Terms & Conditions'}
            </h1>
            {!isHi && (
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                These Terms &amp; Conditions apply to individual players, parents or guardians, coaches, and district kabaddi associations working with Jharkhand State Kabaddi Association (JSKA).
              </p>
            )}
            {isHi && (
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                ये नियम और शर्तें व्यक्तिगत खिलाड़ियों, अभिभावकों, कोचों और JSKA के साथ कार्यरत जिला कबड्डी संघों पर लागू होती हैं।
              </p>
            )}
            <p className="text-sm text-blue-300/60 mt-4 font-medium">Last Updated: February 11, 2026</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Introduction */}
          <div className="mb-12 p-8 bg-white border border-orange-100 rounded-3xl shadow-sm">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-3">Important Notice</h2>
                {!isHi && (
                  <p className="text-slate-700 leading-relaxed">
                    By registering or participating with Jharkhand State Kabaddi Association (JSKA), you (player / parent / guardian / district representative) agree to follow all rules, regulations and policies framed by JSKA and recognised by the Amateur Kabaddi Federation of India (AKFI). Breach of these terms may lead to disciplinary action, including suspension or cancellation of membership or affiliation.
                  </p>
                )}
                {isHi && (
                  <p className="text-slate-700 leading-relaxed text-sm">
                    महत्वपूर्ण सूचना: JSKA के साथ पंजीकरण या भागीदारी करते समय आप (खिलाड़ी / अभिभावक / अधिकृत प्रतिनिधि) यह स्वीकार करते हैं कि आप झारखंड स्टेट कबड्डी एसोसिएशन (AKFI मान्यता प्राप्त) के सभी नियमों और नीतियों का पालन करेंगे। किसी भी उल्लंघन की स्थिति में सदस्यता / संबद्धता निलंबन या समाप्ति जैसे अनुशासनात्मक कदम लिए जा सकते हैं। यह पेज अंग्रेज़ी और हिन्दी दोनों में जानकारी देता है; किसी भी अंतर की स्थिति में अंग्रेज़ी संस्करण को आधिकारिक माना जाएगा।
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 1: Membership Terms */}
          <div className="mb-12 bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-oswald font-bold text-blue-900 uppercase tracking-tight">
                {isHi ? '1. सदस्यता नियम' : '1. Membership Terms'}
              </h2>
            </div>

            <div className="space-y-8 text-slate-700">
              {!isHi && (
                <>
                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">1.1 Registration &amp; Eligibility</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>All details filled in the registration form must be correct and verifiable.</li>
                      <li>Members must submit valid identity proof (such as Aadhaar) and active contact information.</li>
                      <li>Admission is subject to approval of the JSKA management committee and may be refused without assigning any reason.</li>
                      <li>JSKA may seek additional documents for age, address or eligibility verification.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">1.2 Membership Duration &amp; Renewal</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Membership is normally valid for one competitive season or one year from the approval date, unless otherwise notified by JSKA.</li>
                      <li>Continuation in the next season requires timely renewal as notified by JSKA.</li>
                      <li>JSKA will publish renewal timelines through official notices or online announcements.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-red-500 bg-red-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-red-700 mb-4">1.3 Leaving JSKA / Discontinuation</h3>
                    <div className="space-y-4">
                      <p className="font-bold text-red-900 flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        Members who wish to discontinue must inform JSKA in writing at least 14 (fourteen) days in advance.
                      </p>
                      <ul className="space-y-2 list-disc list-inside ml-7 text-red-800">
                        <li>Applications for discontinuation may be submitted by email or written letter to the JSKA committee.</li>
                        <li>Leaving without proper notice may be treated as violation of membership terms.</li>
                        <li>Depending on the severity, JSKA may impose actions such as:
                          <ul className="ml-6 mt-2 space-y-1 list-disc list-inside">
                            <li>Restriction on re‑joining for a defined period</li>
                            <li>Non‑issuance of participation or experience certificates</li>
                            <li>Intimation to district / state kabaddi authorities, if required</li>
                          </ul>
                        </li>
                        <li>During the notice period, members must honour all existing commitments (training, matches, tournaments etc.).</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    सदस्यता लेते समय दिए गए सभी विवरण सही, पूर्ण और सत्यापन योग्य होना आवश्यक है। सदस्यता JSKA प्रबंधन समिति की स्वीकृति पर निर्भर करती है और समिति बिना कारण बताए आवेदन अस्वीकार कर सकती है। सामान्यतः सदस्यता एक प्रतिस्पर्धी सत्र / एक वर्ष के लिए मान्य रहती है तथा अगले सत्र के लिए समय पर नवीनीकरण आवश्यक है।
                  </p>
                  <p className="leading-relaxed">
                    यदि कोई सदस्य JSKA छोड़ना चाहता है तो उसे कम से कम 14 दिन पहले ई‑मेल या लिखित आवेदन के माध्यम से सूचना देनी होगी। बिना सूचना छोड़े जाने की स्थिति में इसे नियमों का उल्लंघन माना जा सकता है और भविष्य की सदस्यता, प्रमाण‑पत्र या संबद्ध अवसरों पर प्रतिबंध लगाया जा सकता है।
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: AKFI & Association Regulations */}
          <div className="mb-12 bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-oswald font-bold text-blue-900 uppercase tracking-tight">
                {isHi ? '2. संघ एवं AKFI नियम' : '2. Association & AKFI Regulations'}
              </h2>
            </div>

            <div className="space-y-8 text-slate-700">
              {!isHi && (
                <>
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-6">
                    <p className="text-blue-900 leading-relaxed font-medium">
                      <strong className="text-blue-900">Note:</strong> District kabaddi associations in Jharkhand function under the guidance of Jharkhand State Kabaddi Association (JSKA) and follow the rules of the Amateur Kabaddi Federation of India (AKFI). All training, competitions and selections are organised in line with these regulations.
                    </p>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">2.1 Compliance With Rules</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>All matches and practice sessions are conducted as per the latest AKFI laws of the game.</li>
                      <li>Members may be required to submit age and eligibility certificates as per association norms.</li>
                      <li>Use of banned substances or methods is strictly prohibited.</li>
                      <li>Members are encouraged to read detailed kabaddi rules and guidelines issued by JSKA and AKFI.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">2.2 Code of Conduct</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Members must maintain discipline, respect coaches and officials, and display fair play at all times.</li>
                      <li>Abusive language, violence or harassment of any kind will not be tolerated.</li>
                      <li>Decisions of referees and officials must be accepted in the spirit of the game.</li>
                      <li>Damage to the reputation of JSKA in public or on social media may invite disciplinary action.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-blue-600 bg-blue-50 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">2.3 Playing for Other Clubs / NOC</h3>
                    <div className="space-y-4">
                      <p className="font-bold text-blue-900 flex items-start gap-2">
                        <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        Any JSKA registered member who wishes to represent another club or district must first obtain written permission / NOC from JSKA.
                      </p>
                      <ul className="space-y-2 list-disc list-inside ml-7 text-blue-800">
                        <li>Requests for NOC should be submitted in writing well before the proposed event.</li>
                        <li>JSKA may approve, modify or refuse such requests based on player commitments and regulations.</li>
                        <li>Participating elsewhere without consent may lead to suspension or cancellation of JSKA membership.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">2.4 Tournaments &amp; Selections</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Team selection for any championship will be carried out by authorised selectors / coaches of JSKA.</li>
                      <li>Selection decisions are final and must be respected by all participants.</li>
                      <li>Members must wear prescribed kit and safety gear during matches and official practice.</li>
                    </ul>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    झारखंड के जिला कबड्डी संघ JSKA के मार्गदर्शन में कार्य करते हैं और Amateur Kabaddi Federation of India (AKFI) के नियमों का पालन करते हैं। सभी प्रशिक्षण सत्र, प्रतियोगिताएँ और चयन इन्हीं नियमों के अनुरूप आयोजित किए जाते हैं।
                  </p>
                  <p className="leading-relaxed">
                    खिलाड़ियों से अपेक्षा की जाती है कि वे मैदान के भीतर और बाहर अनुशासन, सम्मान और निष्पक्ष खेल दिखाएँ। बिना लिखित अनुमति किसी अन्य क्लब या टीम के लिए आधिकारिक प्रतिनित्व करना अनुमन्य नहीं है; ऐसा करने पर सदस्यता निलंबित या समाप्त की जा सकती है।
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Training & Facility Usage */}
          <div className="mb-12 bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-oswald font-bold text-blue-900 uppercase tracking-tight">
                {isHi ? '3. प्रशिक्षण एवं सुविधाएँ' : '3. Training & Facilities'}
              </h2>
            </div>

            <div className="space-y-8 text-slate-700">
              {!isHi && (
                <>
                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">3.1 Attendance</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Regular attendance in practice sessions is expected from every registered player.</li>
                      <li>Selection for tournaments or special camps may depend on attendance, fitness and discipline.</li>
                      <li>Members should inform coaches in advance in case of unavoidable absence.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">3.2 Facility Rules</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Grounds, mats and equipment of JSKA must be used carefully and kept clean.</li>
                      <li>Any damage to property should be reported immediately; repair costs may be recovered from responsible persons.</li>
                      <li>Only authorised members and staff are allowed to use association facilities.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">3.3 Health &amp; Safety</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Participation in kabaddi and related activities is at the member&apos;s own risk.</li>
                      <li>Members should disclose pre‑existing medical conditions to coaches and avoid playing when unfit.</li>
                      <li>JSKA recommends that players maintain personal medical / sports insurance where possible.</li>
                    </ul>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    सभी पंजीकृत खिलाड़ियों से अपेक्षा की जाती है कि वे नियमित रूप से अभ्यास सत्रों में भाग लें। टूर्नामेंट या विशेष शिविरों के चयन में उपस्थिति, फिटनेस और अनुशासन महत्वपूर्ण मानदंड होंगे।
                  </p>
                  <p className="leading-relaxed">
                    JSKA के मैदान, मैट और उपकरणों की देखभाल और स्वच्छता की जिम्मेदारी सभी सदस्यों की साझा होगी। किसी भी प्रकार की क्षति की सूचना तुरंत देनी होगी और आवश्यक होने पर क्षतिपूर्ति संबंधित व्यक्ति से ली जा सकती है। खेल में भाग लेना स्वैच्छिक है तथा स्वास्थ्य संबंधी अंतिम जिम्मेदारी खिलाड़ी / अभिभावक की होगी।
                  </p>
                </div>
              )}
            </div>
          </div>


          {/* Section 4: Disciplinary Actions */}
          <div className="mb-12 bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-3xl font-oswald font-bold text-blue-900 uppercase tracking-tight">
                {isHi ? '4. अनुशासन एवं सदस्यता समाप्ति' : '4. Discipline & Termination'}
              </h2>
            </div>

            <div className="space-y-8 text-slate-700">
              {!isHi && (
                <>
                  <div className="pl-6 border-l-4 border-red-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">5.1 Grounds for Action</h3>
                    <p className="mb-3">The JSKA committee may take disciplinary action in cases including (but not limited to):</p>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Violation of these terms, JSKA rules or AKFI regulations.</li>
                      <li>Misconduct, abuse, harassment or behaviour bringing the game or association into disrepute.</li>
                      <li>Playing for other clubs / teams without required permission.</li>
                      <li>Deliberate damage to property or facilities of JSKA.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-red-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">5.2 Types of Action</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Verbal or written warnings.</li>
                      <li>Temporary suspension from training, matches or events.</li>
                      <li>Levy of penalties or recovery of damages, where applicable.</li>
                      <li>Termination of membership and blocking of future registration.</li>
                      <li>Reporting serious matters to higher authorities or law‑enforcement.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-red-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">5.3 Appeal</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Members may submit a written appeal against disciplinary decisions within a reasonable time as notified by JSKA.</li>
                      <li>The decision of the designated appeals body / committee of JSKA shall be final.</li>
                    </ul>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    यदि कोई सदस्य इन नियमों, JSKA के आंतरिक नियमों या AKFI के विनियमों का उल्लंघन करता है, दुर्व्यवहार या उत्पीड़न करता है, खेल या संघ की साख को नुकसान पहुँचाता है या बिना अनुमति अन्य क्लब / टीम के लिए खेलता है, तो उसके विरुद्ध अनुशासनात्मक कार्रवाई की जा सकती है।
                  </p>
                  <p className="leading-relaxed">
                    ऐसी कार्रवाई में चेतावनी, अस्थायी निलंबन, जुर्माना, क्षतिपूर्ति वसूली या सदस्यता समाप्ति तथा भविष्य की पंजीकरण पर रोक शामिल हो सकती है। सदस्य निर्धारित समय‑सीमा के भीतर लिखित अपील कर सकते हैं, परंतु अंतिम निर्णय JSKA की नामित अपील समिति का होगा।
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: General Provisions */}
          <div className="mb-12 bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-oswald font-bold text-blue-900 uppercase tracking-tight">
                {isHi ? '5. सामान्य प्रावधान' : '5. General Provisions'}
              </h2>
            </div>

            <div className="space-y-8 text-slate-700">
              {!isHi && (
                <>
                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">5.1 Amendments</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>JSKA reserves the right to modify these terms and any associated policies at any time.</li>
                      <li>Updated terms will be published on official platforms or notice boards.</li>
                      <li>Continued participation after such updates will be treated as acceptance of the revised terms.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">5.2 Data &amp; Privacy</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>Member information is collected and used in accordance with the JSKA Privacy Policy.</li>
                      <li>Basic details may be shared with district / state associations and tournament organisers when required.</li>
                      <li>Members are encouraged to review the separate Privacy Policy page for full details.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">5.3 Governing Law &amp; Jurisdiction</h3>
                    <ul className="space-y-3 list-disc list-inside">
                      <li>These terms are governed by the laws of India.</li>
                      <li>Any disputes shall fall under the jurisdiction of competent courts in Jharkhand.</li>
                    </ul>
                  </div>

                  <div className="pl-6 border-l-4 border-orange-500/30">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">5.4 Contact</h3>
                    <p>For questions about these terms, please reach out to:</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-4">
                      <p className="font-bold text-blue-900">Jharkhand State Kabaddi Association (JSKA)</p>
                      <p className="text-sm mt-2"><strong>Email:</strong> jharkhandstatekabaddi@gmail.com</p>
                      <p className="text-sm"><strong>Location:</strong> Retired Rly Colony, Gomoh, Dhanbad, Jharkhand 828401</p>
                    </div>
                  </div>
                </>
              )}

              {isHi && (
                <div className="space-y-4">
                  <p className="leading-relaxed">
                    JSKA समय‑समय पर इन नियमों और संबंधित नीतियों में परिवर्तन कर सकता है तथा संशोधित नियमों की सूचना आधिकारिक नोटिस या ऑनलाइन माध्यमों से दी जाएगी। ऐसे अद्यतन के बाद भी JSKA की गतिविधियों में भाग लेते रहना संशोधित नियमों की स्वीकृति मानी जाएगी।
                  </p>
                  <p className="leading-relaxed">
                    सदस्य जानकारी और डेटा का संग्रह एवं उपयोग अलग से प्रकाशित JSKA प्राइवेसी पॉलिसी के अनुसार होगा। किसी भी विवाद की स्थिति में लागू भारतीय क़ानून लागू होंगे और न्याय क्षेत्र झारखंड की उपयुक्त न्यायालयों का रहेगा।
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 6: Specific Terms for Players */}
          <div className="mb-12 bg-white border border-slate-200 rounded-3xl shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-oswald font-bold text-blue-900 uppercase tracking-tight">
                {isHi ? '6. खिलाड़ियों के लिए अतिरिक्त नियम' : '6. Additional Terms for Players'}
              </h2>
            </div>

            <div className="space-y-4 text-slate-700">
              {!isHi && (
                <ul className="space-y-3 list-disc list-inside">
                  <li>Players must participate only through proper JSKA registration and may not represent unauthorised teams in official events without permission.</li>
                  <li>Attendance, fitness and discipline will be key criteria for selection in district or higher‑level teams.</li>
                  <li>Players must wear prescribed kit and follow safety instructions of coaches and officials.</li>
                  <li>Any injury or health issue must be reported immediately to the coach / staff.</li>
                  <li>Misuse of JSKA ID card, certificate or name (for example, for non‑approved tournaments) is strictly prohibited.</li>
                </ul>
              )}

              {isHi && (
                <p className="leading-relaxed">
                  खिलाड़ी केवल JSKA के विधिवत पंजीकरण के बाद ही संघ द्वारा स्वीकृत प्रतियोगिताओं में भाग ले सकते हैं और बिना अनुमति किसी भी अनधिकृत टीम या टूर्नामेंट के लिए आधिकारिक प्रतिनिधित्व नहीं कर सकते। जिला या उच्च स्तरीय टीमों के चयन में निरंतर उपस्थिति, शारीरिक क्षमता और अनुशासन प्रमुख मानदंड होंगे। खिलाड़ियों के लिए निर्धारित किट, ड्रेस‑कोड और सुरक्षा निर्देशों का पालन अनिवार्य है तथा किसी भी प्रकार की चोट या स्वास्थ्य संबंधी समस्या होने पर तुरंत कोच / स्टाफ को सूचित करना आवश्यक है। JSKA के आईडी कार्ड, प्रमाण‑पत्र या नाम का गलत या भ्रामक उपयोग (जैसे गैर‑स्वीकृत आयोजनों में) सख्ती से प्रतिबंधित है।
                </p>
              )}
            </div>
          </div>

          {/* Acceptance Statement */}
          <div className="bg-blue-900 rounded-3xl p-10 text-center shadow-xl shadow-blue-900/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="relative z-10">
              <Shield className="w-16 h-16 text-orange-400 mx-auto mb-6" />
              <h3 className="text-3xl font-oswald font-bold text-white mb-6 uppercase tracking-tight">
                {isHi ? 'नियमों की स्वीकृति' : 'Acceptance of Terms'}
              </h3>
              {!isHi && (
                <>
                  <p className="text-blue-100 leading-relaxed max-w-3xl mx-auto mb-10 text-lg">
                    By completing the Player Registration process with Jharkhand State Kabaddi Association (JSKA), you confirm that you have read, understood and agree to these Terms &amp; Conditions and all applicable kabaddi regulations.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to="/register"
                      className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                    >
                      I Agree - Player Registration
                    </Link>
                    <Link
                      to="/affiliated-districts"
                      className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-white/10"
                    >
                      District Associations
                    </Link>
                  </div>
                </>
              )}

              {isHi && (
                <>
                  <p className="text-blue-100 leading-relaxed max-w-3xl mx-auto mb-10 text-lg">
                    खिलाड़ी पंजीकरण प्रक्रिया पूरी करते समय आप यह घोषित करते हैं कि आपने इन सभी नियमों और शर्तों को सावधानीपूर्वक पढ़ लिया है, उन्हें समझ लिया है और उनका पालन करने के लिए सहमत हैं।
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link
                      to="/register"
                      className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                    >
                      मैं सहमत हूँ - खिलाड़ी पंजीकरण
                    </Link>
                    <Link
                      to="/affiliated-districts"
                      className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-white/10"
                    >
                      जिला संघ सूची
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default TermsConditions;
