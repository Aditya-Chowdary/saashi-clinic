'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin, Phone, MessageCircle, Calendar, HeartPulse, Plus, Baby, Bone,
  HelpCircle, ClipboardList, FileText, Pill, Syringe, CheckCircle2, AlertTriangle, ChevronRight, Navigation,
} from 'lucide-react';

/* ---------- Content (edit here) ---------- */
const PHONE = '919100192367';
const TEL = `tel:+${PHONE}`;
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=Saashi+Clinic+Isakhathota+Junction+Visakhapatnam';
const MAP_EMBED = 'https://www.google.com/maps?q=Isakhathota+Junction+Visakhapatnam&output=embed';
const waUrl = (text) => `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(text)}`;

const UNITS = ['Paediatrics (Dr. Geshmanjali)', 'Orthopaedics (Dr. Sunil)', 'Not sure yet'];

const symptoms = [
  { label: 'Child’s growth or development', unit: 0, icon: Baby },
  { label: 'Child’s feeding or nutrition', unit: 0, icon: Baby },
  { label: 'Fracture or a recent injury', unit: 1, icon: Bone },
  { label: 'Knee, hip or joint pain', unit: 1, icon: Bone },
  { label: 'Planning a joint replacement', unit: 1, icon: Bone },
  { label: 'I’m not sure', unit: 2, icon: HelpCircle },
];

const bring = [
  { icon: FileText, t: 'Past reports', d: 'Blood tests, scans and X-rays, if you have them.' },
  { icon: Pill, t: 'Current medicines', d: 'Bring the strips or a photo of the labels.' },
  { icon: Syringe, t: 'Child’s health records', d: 'Vaccination card and earlier growth charts.' },
  { icon: ClipboardList, t: 'Your questions', d: 'Write them down so nothing gets missed.' },
];

const faqs = [
  { q: 'How can I book an emergency orthopaedic appointment?', a: 'For urgent orthopaedic or trauma needs, call the clinic on 9100192367 for priority scheduling.' },
  { q: 'Do I need a prior appointment for paediatric check-ups?', a: 'Walk-ins are welcome during regular hours, but booking helps ensure dedicated consultation time with Dr. Geshmanjali.' },
  { q: 'Are online or tele-consultations available?', a: 'We offer paediatric tele-consultations for simple follow-ups. Message us on WhatsApp to check availability.' },
];

const inputCls = 'w-full h-12 px-4 bg-white border border-[#EAE6DF] rounded-xl text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#D9531D] focus:ring-4 focus:ring-[#D9531D]/15';

/* ---------- Blocks ---------- */
function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Head({ pill, title, text }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto space-y-3">
      <span className="inline-block text-[#D9531D] font-extrabold text-xs uppercase tracking-wider bg-[#D9531D]/10 px-4 py-1.5 rounded-full">{pill}</span>
      <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#4A2E1B]">{title}</h2>
      {text && <p className="text-sm md:text-base text-slate-600">{text}</p>}
    </Reveal>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#FCFAF6] border border-[#EAE6DF] rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-[#4A2E1B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9531D]">
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-[#D9531D] shrink-0"><Plus className="w-5 h-5" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Page ---------- */
export default function Contact() {
  const reduce = useReducedMotion();
  const formRef = useRef(null);
  const [picked, setPicked] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', unit: 0, time: 'Any time', note: '' });
  const [sent, setSent] = useState(null);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const useRecommendation = () => {
    setForm({ ...form, unit: symptoms[picked].unit });
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const submit = (e) => {
    e.preventDefault();
    const text =
      `Hello Saashi Clinic, I would like to request an appointment.\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\nSpeciality: ${UNITS[form.unit]}\n` +
      `Preferred time: ${form.time}` + (form.note ? `\nConcern: ${form.note}` : '');
    const url = waUrl(text);
    setSent(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quick = [
    { icon: MessageCircle, t: 'WhatsApp', d: 'Fastest way to book', href: waUrl('Hello Saashi Clinic, I would like to book an appointment.'), ext: true, primary: true },
    { icon: Phone, t: 'Call us', d: '9100192367', href: TEL },
    { icon: Navigation, t: 'Get directions', d: 'Open in Google Maps', href: MAP_LINK, ext: true },
  ];

  return (
    <div className="bg-[#FCFAF6] text-[#4A2E1B] overflow-x-hidden">

      {/* HERO + QUICK ACTIONS */}
      <section className="relative px-5 sm:px-6 pt-16 md:pt-24 pb-20 bg-gradient-to-b from-[#FCFAF6] to-[#EAE6DF]/30">
        <div className="absolute -top-10 -left-16 w-72 h-72 bg-[#D9531D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center space-y-5">
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
            Let’s find the right time<br className="hidden sm:block" /> for you
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-slate-600 max-w-xl mx-auto md:text-lg">
            Message us, call us or send a request below. We will get back to you and arrange your visit.
          </motion.p>

          <div className="grid sm:grid-cols-3 gap-4 pt-6 text-left">
            {quick.map(({ icon: Icon, t, d, href, ext, primary }, i) => (
              <motion.a
                key={t} href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
                className={`group flex items-center gap-4 rounded-3xl p-5 border transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531D] ${primary ? 'bg-[#D9531D] text-white border-[#D9531D] shadow-lg shadow-[#D9531D]/25' : 'bg-white border-[#EAE6DF]'}`}
              >
                <span className={`p-3 rounded-2xl ${primary ? 'bg-white/20' : 'bg-[#D9531D]/10 text-[#D9531D]'}`}><Icon className="w-6 h-6" /></span>
                <span className="flex-1">
                  <span className="block font-extrabold">{t}</span>
                  <span className={`block text-sm ${primary ? 'text-white/85' : 'text-slate-500'}`}>{d}</span>
                </span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.a>
            ))}
          </div>

          <p className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500 pt-2">
            <AlertTriangle className="w-4 h-4 text-[#D9531D] shrink-0" />
            For a life-threatening emergency, go to the nearest hospital or dial 112.
          </p>
        </div>
      </section>

      {/* WHO SHOULD I SEE */}
      <section className="py-20 md:py-24 px-5 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-10">
          <Head pill="Not sure where to start?" title="What brings you in?" text="Pick the closest match and we’ll point you to the right doctor." />
          <Reveal className="flex flex-wrap justify-center gap-3">
            {symptoms.map(({ label, icon: Icon }, i) => (
              <button
                key={label} onClick={() => setPicked(i)} aria-pressed={picked === i}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold border-2 transition-all hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531D] ${picked === i ? 'bg-[#4A2E1B] text-white border-[#4A2E1B]' : 'bg-[#FCFAF6] border-[#EAE6DF] text-[#4A2E1B] hover:border-[#D9531D]'}`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </Reveal>
          <AnimatePresence mode="wait">
            {picked !== null && (
              <motion.div key={picked} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="bg-[#FCFAF6] border border-[#EAE6DF] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
                <span className="p-3 w-fit rounded-2xl bg-[#F5A623]/15 text-[#D9531D]"><CheckCircle2 className="w-7 h-7" /></span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">We suggest</p>
                  <p className="text-xl font-extrabold">{symptoms[picked].unit === 2 ? 'Message us and we’ll guide you' : UNITS[symptoms[picked].unit]}</p>
                </div>
                <button onClick={useRecommendation} className="h-12 px-6 rounded-full bg-[#D9531D] text-white font-bold text-sm hover:bg-[#c24a19] transition-colors">Use this in the form</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FORM + DETAILS */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          <Reveal className="lg:col-span-2 space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Send a request</h2>
              <p className="text-slate-600 text-sm leading-relaxed">Fill in the form and your message opens in WhatsApp, ready to send. It takes under a minute.</p>
            </div>
            {[
              { icon: MapPin, t: 'Clinic address', d: 'Beside Swagrama Foods, Isakhathota Junction, Visakhapatnam - 530022' },
              { icon: Phone, t: 'Call or text', d: '9100192367', href: TEL },
            ].map(({ icon: Icon, t, d, href }) => (
              <div key={t} className="flex gap-4">
                <span className="p-3 h-fit bg-[#EAE6DF]/50 rounded-xl text-[#D9531D]"><Icon className="w-6 h-6" /></span>
                <div>
                  <h3 className="font-bold text-sm">{t}</h3>
                  {href ? <a href={href} className="text-sm text-[#D9531D] font-extrabold hover:underline">{d}</a> : <p className="text-sm text-slate-600 mt-1 leading-relaxed">{d}</p>}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div ref={formRef} className="bg-white p-6 sm:p-10 rounded-[2rem] border border-[#EAE6DF] shadow-xl shadow-[#4A2E1B]/5 scroll-mt-24">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4 py-6">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><CheckCircle2 className="w-9 h-9" /></motion.span>
                    <h3 className="text-2xl font-extrabold">Almost done!</h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto">Your message is ready in WhatsApp. Tap send there and we’ll reply to arrange your visit.</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <a href={sent} target="_blank" rel="noopener noreferrer" className="h-12 px-6 inline-flex items-center justify-center rounded-full bg-[#D9531D] text-white font-bold text-sm">Open WhatsApp again</a>
                      <button onClick={() => { setSent(null); setForm({ name: '', phone: '', unit: 0, time: 'Any time', note: '' }); }} className="h-12 px-6 rounded-full border-2 border-[#EAE6DF] font-bold text-sm hover:border-[#D9531D]">Send another</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="w-5 h-5 text-[#D9531D]" />
                      <h3 className="text-lg font-extrabold">Request an appointment</h3>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-bold text-slate-700">Patient name</span>
                        <input required value={form.name} onChange={set('name')} placeholder="Full name" autoComplete="name" className={inputCls} />
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-bold text-slate-700">Phone number</span>
                        <input required type="tel" inputMode="numeric" pattern="[0-9]{10}" title="Enter a 10-digit mobile number" value={form.phone} onChange={set('phone')} placeholder="10-digit number" autoComplete="tel" className={inputCls} />
                      </label>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-bold text-slate-700">Speciality</span>
                        <select value={form.unit} onChange={(e) => setForm({ ...form, unit: Number(e.target.value) })} className={inputCls}>
                          {UNITS.map((u, i) => <option key={u} value={i}>{u}</option>)}
                        </select>
                      </label>
                      <label className="space-y-1.5 block">
                        <span className="text-xs font-bold text-slate-700">Preferred time</span>
                        <select value={form.time} onChange={set('time')} className={inputCls}>
                          {['Any time', 'Morning', 'Afternoon', 'Evening'].map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </label>
                    </div>
                    <label className="space-y-1.5 block">
                      <span className="text-xs font-bold text-slate-700">What would you like help with? (optional)</span>
                      <textarea rows={3} value={form.note} onChange={set('note')} placeholder="For example: knee pain for two weeks" className={`${inputCls} h-auto py-3 resize-none`} />
                    </label>
                    <button type="submit" className="w-full h-14 rounded-xl bg-[#D9531D] text-white font-black text-sm shadow-lg shadow-[#D9531D]/25 flex items-center justify-center gap-2 transition hover:bg-[#c24a19] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]">
                      <Calendar className="w-5 h-5" /> Send request on WhatsApp
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BEFORE YOUR VISIT */}
      <section className="py-20 md:py-28 px-5 sm:px-6 bg-[#4A2E1B] text-[#FCFAF6] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative max-w-6xl mx-auto space-y-12">
          <Reveal className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block text-[#F5A623] font-extrabold text-xs uppercase tracking-wider bg-white/10 px-4 py-1.5 rounded-full">Before your visit</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">What to bring with you</h2>
            <p className="text-sm md:text-base text-[#EAE6DF]/80">A few things that help your doctor give you better answers.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bring.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.1}>
                <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-6 space-y-3 transition-colors hover:border-[#F5A623]/50">
                  <span className="inline-flex p-3 rounded-2xl bg-[#F5A623]/15 text-[#F5A623]"><Icon className="w-6 h-6" /></span>
                  <h3 className="font-extrabold">{t}</h3>
                  <p className="text-sm text-[#EAE6DF]/80 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MAP + DIRECTIONS */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-10 items-center">
          <Reveal className="lg:col-span-2 space-y-5">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Easy to find</h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">We are at Isakhathota Junction in Visakhapatnam, directly beside Swagrama Foods. The clinic is easy to reach, with convenient parking.</p>
            <ul className="space-y-3 text-sm font-semibold">
              {['Look for Swagrama Foods at the junction', 'The clinic is right beside it', 'Parking is available nearby'].map((s, i) => (
                <li key={s} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9531D] text-white text-xs font-black">{i + 1}</span>{s}</li>
              ))}
            </ul>
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#4A2E1B] text-white font-bold text-sm hover:bg-[#D9531D] transition-colors"><Navigation className="w-4 h-4" /> Get directions</a>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="relative h-72 sm:h-96 rounded-[2rem] overflow-hidden border border-[#EAE6DF] shadow-xl bg-[#EAE6DF]/40">
              <iframe title="Saashi Clinic location map" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 w-full h-full border-0" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-5 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <Head pill="FAQs" title="Common scheduling questions" text="Quick answers about booking and visiting." />
          <Reveal className="space-y-3">{faqs.map((f) => <Faq key={f.q} {...f} />)}</Reveal>
        </div>
      </section>

      {/* CLOSING STRIP */}
      <section className="px-5 sm:px-6 py-16 md:py-20">
        <Reveal className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-br from-[#D9531D] to-[#b94416] text-white p-8 sm:p-14 text-center space-y-5">
          <h2 className="text-3xl md:text-4xl font-black">Still have a question?</h2>
          <p className="text-white/90 max-w-lg mx-auto">Just ask. A short message is all we need to get started.</p>
          <a href={waUrl('Hello Saashi Clinic, I have a question.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-[#4A2E1B] font-black text-sm hover:bg-[#F5A623] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <MessageCircle className="w-5 h-5" /> Ask on WhatsApp
          </a>
        </Reveal>
      </section>
    </div>
  );
}