'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion';
import {
  Phone, ChevronRight, ChevronLeft, Sparkles, ArrowRight, ShieldCheck, Plus, MapPin,
  MessageCircle, Baby, Bone, Quote, GraduationCap, Clock,
  HeartHandshake, Smile, Ear, Activity, Navigation,
} from 'lucide-react';
import paediatrics from '../public/images/paedatric.jpeg';
import ortho from '../public/images/ORTHO.jpeg';
import geshmanjali from '../public/images/Dr.geshmanjali.jpeg';
import sunil from '../public/images/Dr.sunil.jpeg';
import clinic from '../public/images/clinic.jpeg';

const src = (m) => (typeof m === 'object' && m !== null ? m.src : m);

/* ---------- Content (edit here) ---------- */
const PHONE = '919100192367';
const wa = (msg = 'Hello Saashi Clinic, I would like to book an appointment.') =>
  `https://api.whatsapp.com/send?phone=${PHONE}&text=${encodeURIComponent(msg)}`;
const WA = wa();
const MAPS = 'https://www.google.com/maps/search/?api=1&query=Saashi+Clinic+Isakhathota+Junction+Visakhapatnam';
const LINKS = { about: '/about' };
const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;
const IMG = {
  child: src(paediatrics) || U('photo-1516627145497-ae6968895b74'),
  ortho: src(ortho) || U('photo-1519494026892-80bbd2d6fd0d'),
  geshmanjali: src(geshmanjali) || U('photo-1559839734-2b71ea197ec2'),
  sunil: src(sunil) || U('photo-1622253692010-333f2da6031d'),
  talk: U('photo-1527613426441-4da17471b66d'),
  kids: U('photo-1502086223501-7ea6ecd79368'),
  // Hero: put your real clinic photo at public/images/clinic.jpeg (portrait 4:5 works best)
  clinic: src(clinic) || U('photo-1519494026892-80bbd2d6fd0d', 1200),
};

// Timings: day index (0 = Sunday) -> [[openHour, closeHour], ...] in IST
const HOURS = { 1: [[10, 13], [17, 20]], 2: [[10, 13], [17, 20]], 3: [[10, 13], [17, 20]], 4: [[10, 13], [17, 20]], 5: [[10, 13], [17, 20]], 6: [[10, 14]], 0: [] };
const TIMETABLE = [
  { days: 'Monday - Friday', t: '10 AM - 1 PM, 5 PM - 8 PM', idx: [1, 2, 3, 4, 5] },
  { days: 'Saturday', t: '10 AM - 2 PM', idx: [6] },
  { days: 'Sunday', t: 'Emergencies and prior call bookings', idx: [0] },
];

const concerns = [
  { label: 'Slow growth', who: 0 },
  { label: 'Missed milestones', who: 0 },
  { label: 'Fussy eating', who: 0 },
  { label: 'Knee pain', who: 1 },
  { label: 'Hip pain', who: 1 },
  { label: 'Fracture or injury', who: 1 },
];

const doctors = [
  { img: IMG.geshmanjali, name: 'Dr. Geshmanjali', short: 'Paediatrics', role: 'Paediatrician & Associate Professor', icon: Baby },
  { img: IMG.sunil, name: 'Dr. Sunil', short: 'Orthopaedics', role: 'Trauma & Joint Replacement Surgeon', icon: Bone },
];

const quick = [
  { icon: MessageCircle, t: 'Book on WhatsApp', d: '9100192367', href: WA },
  { icon: Phone, t: 'Call the clinic', d: 'Urgent bone injuries: call first', href: 'tel:+919100192367' },
  { icon: MapPin, t: 'Find us', d: 'Isakhathota Junction, Visakhapatnam', href: MAPS },
];

const worries = [
  { icon: Baby, q: 'Is my child growing and developing normally?', a: 'Growth and milestone checks with clear, jargon-free answers.' },
  { icon: Bone, q: 'My knee or hip hurts every day.', a: 'We find the cause first. Many problems improve without surgery.' },
  { icon: Ear, q: 'I just want someone to explain it properly.', a: 'Every visit includes time to ask questions and understand your plan.' },
];

const specialities = [
  { img: IMG.child, badge: 'Paediatrics', icon: Baby, title: 'Child health & development', desc: 'Growth assessment, developmental monitoring and nutrition counselling from a senior academic.', pts: ['Milestone checks', 'Growth tracking', 'Diet guidance'], who: 'Dr. Geshmanjali' },
  { img: IMG.ortho, badge: 'Orthopaedics', icon: Bone, title: 'Trauma, bones & joints', desc: 'Fracture stabilisation, joint replacement and reconstructive bone surgery.', pts: ['Fracture care', 'Hip & knee replacement', 'Bone reconstruction'], who: 'Dr. Sunil' },
];

const why = [
  { icon: HeartHandshake, t: 'Time to listen', d: 'No rushed consults. You leave knowing what is wrong and what happens next.' },
  { icon: GraduationCap, t: 'Teaching-led care', d: 'Paediatric care shaped by an Associate Professor of Paediatrics.' },
  { icon: ShieldCheck, t: 'Surgical skill', d: 'Precise trauma and joint procedures, planned around your life.' },
  { icon: Smile, t: 'Child-friendly space', d: 'A calm clinic where check-ups feel more like a chat.' },
];

const steps = [
  { t: 'Message us', d: 'Tap WhatsApp and tell us what is troubling you or your child.' },
  { t: 'Get a time', d: 'We confirm a slot with the right specialist.' },
  { t: 'Understand', d: 'Your doctor examines, explains and answers every question.' },
  { t: 'Recover', d: 'Follow a clear plan, with the clinic one message away.' },
];

// NOTE: replace these with real, approved patient reviews before launch.
const reviews = [
  { img: IMG.child, tag: 'Paediatrics', quote: "Dr. Geshmanjali explained my child's growth markers so clearly. Her teaching approach is reassuring.", author: 'Srinivas Rao, Parent' },
  { img: IMG.ortho, tag: 'Orthopaedics', quote: "Dr. Sunil's surgical and diagnostic skill restored my mobility after a severe hip injury.", author: 'K. Satish, Joint patient' },
  { img: IMG.talk, tag: 'Our approach', quote: 'I appreciate the time taken to explain the underlying anatomy. It makes a big difference.', author: 'Mary Josephine, Patient' },
];

const faqs = [
  { q: 'Which doctor should I see?', a: 'Dr. Geshmanjali for child health, growth and development. Dr. Sunil for bones, joints, fractures and injuries.' },
  { q: 'Can I get an urgent orthopaedic consult?', a: 'Yes. For trauma cases, call 9100192367 to arrange a priority evaluation.' },
  { q: 'What are the clinic timings?', a: 'Monday to Friday 10 AM - 1 PM and 5 PM - 8 PM, Saturday 10 AM - 2 PM. Sunday is for emergencies and prior call bookings.' },
  { q: 'How do I book?', a: 'Message us on WhatsApp at 9100192367 and we will help you pick a time.' },
];

const marquee = ['Paediatrics', 'Orthopaedics', 'Joint replacement', 'Trauma care', 'Growth monitoring', 'Fracture stabilisation'];

/* ---------- Helpers ---------- */
function useClinicStatus() {
  const [s, setS] = useState(null);
  useEffect(() => {
    const calc = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const day = ist.getDay();
      const h = ist.getHours() + ist.getMinutes() / 60;
      const open = (HOURS[day] || []).some(([a, b]) => h >= a && h < b);
      setS({ open, day });
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, []);
  return s;
}

/* ---------- Building blocks ---------- */
function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function Head({ pill, title, text }) {
  return (
    <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
      <span className="inline-block rounded-full bg-[#D9531D]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#D9531D]">{pill}</span>
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {text && <p className="text-sm text-slate-600 md:text-base">{text}</p>}
    </Reveal>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white transition-colors ${open ? 'border-[#D9531D]' : 'border-[#EAE6DF]'}`}>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9531D]">
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="shrink-0 text-[#D9531D]"><Plus className="h-5 w-5" /></motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{a}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* The memorable element: a child's height chart that grows as you scroll */
function GrowthChart() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const cm = useTransform(p, (v) => `${Math.round(50 + v * 130)} cm`);
  return (
    <div className="pointer-events-none fixed left-3 top-1/2 z-30 hidden h-[56vh] -translate-y-1/2 select-none xl:block" aria-hidden>
      <div className="relative h-full w-9 rounded-full border border-[#4A2E1B]/15 bg-white/70 backdrop-blur">
        <div className="absolute inset-y-3 left-0 right-0 [background-image:repeating-linear-gradient(to_bottom,#4A2E1B33_0,#4A2E1B33_1px,transparent_1px,transparent_14px)]" />
        <motion.div style={{ scaleY: p }} className="absolute inset-x-[13px] bottom-3 top-3 origin-bottom rounded-full bg-gradient-to-t from-[#D9531D] to-[#F5A623]" />
        <motion.div style={{ bottom: useTransform(p, (v) => `calc(${v * 100}% * 0.92 + 8px)`) }} className="absolute left-full ml-2 flex items-center gap-1">
          <span className="h-0.5 w-3 bg-[#D9531D]" />
          <motion.span className="rounded-md bg-[#4A2E1B] px-2 py-0.5 text-[10px] font-black text-[#FCFAF6]">{cm}</motion.span>
        </motion.div>
      </div>
      <p className="mt-2 w-9 text-center text-[9px] font-bold uppercase leading-tight tracking-wide text-[#4A2E1B]/50">Growing</p>
    </div>
  );
}

function Heartbeat({ reduce }) {
  return (
    <svg viewBox="0 0 320 40" className="mx-auto h-8 w-full max-w-xs text-[#D9531D] lg:mx-0" fill="none" aria-hidden>
      <motion.path
        d="M0 22 H70 L80 22 L90 6 L104 36 L116 14 L124 22 H190 L200 22 L210 8 L222 34 L232 16 L240 22 H320"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 }}
      />
    </svg>
  );
}

function OpenBadge() {
  const s = useClinicStatus();
  if (!s) return <span className="h-7 w-28 rounded-full bg-[#EAE6DF]/60" aria-hidden />;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-extrabold ${s.open ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
      <span className="relative flex h-2.5 w-2.5">
        {s.open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:hidden" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s.open ? 'bg-emerald-600' : 'bg-slate-500'}`} />
      </span>
      {s.open ? 'Open now' : 'Closed now'}
    </span>
  );
}

/* Interactive "which doctor?" helper */
function DoctorFinder() {
  const [sel, setSel] = useState(null);
  const d = sel !== null ? doctors[concerns[sel].who] : null;
  return (
    <div className="mx-auto grid max-w-5xl gap-6 rounded-[2rem] border border-[#EAE6DF] bg-white p-5 shadow-xl shadow-[#4A2E1B]/5 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      <div className="space-y-4">
        <p className="text-sm font-bold text-slate-500">Tap what is troubling you</p>
        <div className="flex flex-wrap gap-2.5">
          {concerns.map((c, i) => (
            <button key={c.label} onClick={() => setSel(i)} aria-pressed={sel === i}
              className={`rounded-full border-2 px-4 py-2.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B] ${sel === i ? 'border-[#D9531D] bg-[#D9531D] text-white' : 'border-[#EAE6DF] bg-[#FCFAF6] hover:border-[#D9531D]/50'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[190px] rounded-3xl bg-[#FCFAF6] p-5" aria-live="polite">
        <AnimatePresence mode="wait">
          {d ? (
            <motion.div key={sel} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="space-y-4">
              <div className="flex items-center gap-4">
                <img src={d.img} alt={d.name} className="h-16 w-16 rounded-2xl object-cover object-top" />
                <div>
                  <p className="text-xs font-bold text-slate-500">You may want to see</p>
                  <p className="text-lg font-extrabold">{d.name}</p>
                  <p className="text-sm text-[#D9531D]">{d.short}</p>
                </div>
              </div>
              <a href={wa(`Hello Saashi Clinic, I would like to see ${d.name} about: ${concerns[sel].label.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D9531D] text-sm font-black text-white transition hover:bg-[#c24a19]">
                <MessageCircle className="h-4 w-4" /> Book with {d.name}
              </a>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-[150px] flex-col items-center justify-center gap-2 text-center text-sm text-slate-500">
              <Activity className="h-7 w-7 text-[#D9531D]" />
              Pick a concern and we will point you to the right doctor.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const section = 'px-5 py-16 sm:px-6 md:py-24';

/* ---------- Page ---------- */
export default function Home() {
  const reduce = useReducedMotion();
  const [cur, setCur] = useState(0);
  const status = useClinicStatus();

  useEffect(() => {
    const t = setInterval(() => setCur((p) => (p + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, [cur]);
  const go = (d) => setCur((p) => (p + d + reviews.length) % reviews.length);

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };
  const r = reviews[cur];

  return (
    <div className="overflow-x-hidden bg-[#FCFAF6] pb-20 text-[#4A2E1B] md:pb-0">
      <GrowthChart />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFAF6] to-[#EAE6DF]/40 px-5 pb-24 pt-10 sm:px-6 md:pb-32 md:pt-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#4A2E1B_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#D9531D]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#F5A623]/15 blur-3xl" />

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="space-y-6 text-center lg:text-left">
            <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#D9531D]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#D9531D]">
                <Sparkles className="h-3.5 w-3.5" /> We talk, teach &amp; heal
              </span>
              <OpenBadge />
            </motion.div>
            <motion.h1 variants={item} className="text-4xl font-black leading-[1.08] tracking-tight sm:text-6xl xl:text-7xl">
              Healthy kids.<br />Strong bones.<br /><span className="text-[#D9531D]">Real answers.</span>
            </motion.h1>
            <motion.div variants={item}><Heartbeat reduce={reduce} /></motion.div>
            <motion.p variants={item} className="mx-auto max-w-lg text-base leading-relaxed text-slate-600 md:text-lg lg:mx-0">
              A paediatrician and an orthopaedic surgeon, together in Visakhapatnam, with senior teaching experience and practical clinical skill.
            </motion.p>
            <motion.div variants={item} className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#D9531D] px-8 text-sm font-black text-white shadow-lg shadow-[#D9531D]/25 transition hover:-translate-y-0.5 hover:bg-[#c24a19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]"><Phone className="h-4 w-4" />Book on WhatsApp</a>
              <Link href={LINKS.about} className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-[#4A2E1B] px-8 text-sm font-black transition hover:bg-[#4A2E1B] hover:text-[#FCFAF6]">Meet our doctors <ArrowRight className="h-4 w-4" /></Link>
            </motion.div>
          </div>

          {/* Single clinic photo */}
          <motion.div variants={item} className="relative mx-auto w-full max-w-sm pb-10 sm:max-w-md lg:max-w-lg">
            {/* offset outline frame */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] rounded-t-[12rem] border-2 border-[#D9531D]/40" aria-hidden />

            {/* main clinic photo */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] rounded-t-[12rem] border-[6px] border-white shadow-2xl shadow-[#4A2E1B]/20">
              <motion.img
                src={IMG.clinic}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = IMG.clinicFallback; }}
                alt="Saashi Clinic reception and consultation area"
                className="h-full w-full object-cover"
                initial={{ scale: reduce ? 1 : 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/40 via-transparent to-transparent" />
            </div>

            {/* floating card: space */}
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-3 top-24 flex items-center gap-3 rounded-2xl border border-[#EAE6DF] bg-white px-3.5 py-3 shadow-xl sm:-left-8"
            >
              <span className="rounded-xl bg-[#F5A623]/15 p-2 text-[#F5A623]"><Smile className="h-5 w-5" /></span>
              <span className="text-xs font-bold leading-tight">Calm, child-friendly<br /><span className="font-medium text-slate-500">consultation space</span></span>
            </motion.div>

            {/* floating card: location */}
            <motion.a
              href={MAPS} target="_blank" rel="noopener noreferrer"
              animate={reduce ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-3 bottom-4 flex items-center gap-3 rounded-2xl bg-[#4A2E1B] px-4 py-3 text-white shadow-xl sm:-right-8"
            >
              <span className="rounded-xl bg-white/10 p-2 text-[#F5A623]"><MapPin className="h-5 w-5" /></span>
              <span className="text-xs font-bold leading-tight">Saashi Clinic<br /><span className="font-medium text-[#EAE6DF]/80">Isakhathota Junction, Vizag</span></span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* QUICK ACTIONS */}
      <div className="relative z-10 -mt-14 px-5 sm:px-6">
        <Reveal className="mx-auto grid max-w-5xl gap-3 rounded-3xl border border-[#EAE6DF] bg-white p-3 shadow-xl shadow-[#4A2E1B]/10 sm:grid-cols-3">
          {quick.map(({ icon: Icon, t, d, href }) => (
            <a key={t} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-[#FCFAF6]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#D9531D]/10 text-[#D9531D] transition group-hover:bg-[#D9531D] group-hover:text-white"><Icon className="h-5 w-5" /></span>
              <span className="min-w-0"><span className="block text-sm font-extrabold">{t}</span><span className="block truncate text-xs text-slate-500">{d}</span></span>
            </a>
          ))}
        </Reveal>
      </div>

      {/* MARQUEE */}
      <div className="mt-16 overflow-hidden bg-[#4A2E1B] py-4 text-[#FCFAF6]" aria-hidden>
        <motion.div animate={reduce ? {} : { x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="flex w-max whitespace-nowrap text-sm font-bold">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10 pr-10">{m}<span className="h-1.5 w-1.5 rotate-45 bg-[#F5A623]" /></span>
          ))}
        </motion.div>
      </div>

      {/* WORRIES */}
      <section className={section}>
        <div className="mx-auto max-w-6xl space-y-12">
          <Head pill="You’re not alone" title="Does this sound like you?" text="Most people arrive with the same few worries. Here is how we help." />
          <div className="grid gap-5 md:grid-cols-3">
            {worries.map(({ icon: Icon, q, a }, i) => (
              <Reveal key={q} delay={i * 0.1}>
                <div className="group h-full space-y-4 rounded-3xl border border-[#EAE6DF] bg-white p-7 transition-all hover:-translate-y-1.5 hover:border-[#D9531D]/30 hover:shadow-xl">
                  <span className="inline-flex rounded-2xl bg-[#D9531D]/10 p-3 text-[#D9531D] transition group-hover:rotate-6 group-hover:bg-[#D9531D] group-hover:text-white"><Icon className="h-6 w-6" /></span>
                  <h3 className="text-lg font-extrabold leading-snug">“{q}”</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIALITIES */}
      <section className={`${section} bg-white`}>
        <div className="mx-auto max-w-6xl space-y-12">
          <Head pill="Our focus" title="Two specialities, one caring clinic" />
          <div className="grid gap-8 md:grid-cols-2">
            {specialities.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.12}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#EAE6DF] bg-[#FCFAF6] transition-shadow hover:shadow-xl">
                    <div className="relative h-60 overflow-hidden sm:h-72">
                      <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-extrabold shadow"><Icon className="h-3.5 w-3.5 text-[#D9531D]" />{s.badge}</span>
                    </div>
                    <div className="flex flex-1 flex-col space-y-4 p-6 sm:p-7">
                      <h3 className="text-2xl font-extrabold">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{s.desc}</p>
                      <ul className="flex flex-wrap gap-2">{s.pts.map((p) => <li key={p} className="rounded-full bg-[#F5A623]/15 px-3 py-1.5 text-xs font-bold">{p}</li>)}</ul>
                      <Link href={LINKS.about} className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-extrabold text-[#D9531D]">With {s.who}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className={section}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-[#4A2E1B]/15">
              <img src={IMG.talk} alt="Doctor talking with a patient" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <motion.div animate={reduce ? {} : { y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-5 right-4 rounded-2xl bg-[#4A2E1B] px-5 py-4 text-white shadow-xl sm:right-8">
              <p className="text-sm font-black">We talk, teach &amp; heal</p>
              <p className="text-xs text-[#F5A623]">Skill beats theory</p>
            </motion.div>
          </Reveal>

          <div className="space-y-8">
            <Reveal className="space-y-3 text-center lg:text-left">
              <span className="inline-block rounded-full bg-[#D9531D]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#D9531D]">Why Saashi Clinic</span>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">Care that feels different</h2>
            </Reveal>
            <div className="space-y-3">
              {why.map(({ icon: Icon, t, d }, i) => (
                <Reveal key={t} delay={i * 0.08}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition hover:border-[#EAE6DF] hover:bg-white hover:shadow-md">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9531D]/10 text-[#D9531D] transition group-hover:bg-[#D9531D] group-hover:text-white"><Icon className="h-6 w-6" /></span>
                    <div><h3 className="font-extrabold">{t}</h3><p className="mt-0.5 text-sm leading-relaxed text-slate-600">{d}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="relative overflow-hidden bg-[#4A2E1B] px-5 py-16 text-[#FCFAF6] sm:px-6 md:py-24">
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#F5A623_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative mx-auto max-w-5xl space-y-12">
          <Reveal className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#F5A623]">Meet the team</span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">Two senior specialists</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {doctors.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.1}>
                <Link href={LINKS.about} className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-[#F5A623]/50 hover:bg-white/10">
                  <img src={d.img} alt={d.name} loading="lazy" className="h-24 w-24 shrink-0 rounded-2xl object-cover object-top sm:h-28 sm:w-28" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold">{d.name}</h3>
                    <p className="text-sm text-[#F5A623]">{d.role}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#EAE6DF]/80">View profile<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={section}>
        <div className="mx-auto max-w-6xl space-y-12">
          <Head pill="How it works" title="From first message to recovery" text="Four simple steps. No confusing paperwork." />
          <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ scaleX: reduce ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} style={{ originX: 0 }} className="absolute left-[12%] right-[12%] top-9 hidden h-0.5 bg-gradient-to-r from-[#F5A623] to-[#D9531D] lg:block" aria-hidden />
            {steps.map((s, i) => (
              <motion.li key={s.t} initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }} className="relative space-y-3 text-center">
                <span className="relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#D9531D] text-2xl font-black text-white shadow-lg shadow-[#D9531D]/25 ring-8 ring-[#FCFAF6]">{i + 1}</span>
                <h3 className="text-lg font-extrabold">{s.t}</h3>
                <p className="mx-auto max-w-[16rem] text-sm text-slate-600">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* REVIEWS */}
      <section className={`${section} bg-white`}>
        <div className="mx-auto max-w-5xl space-y-12">
          <Head pill="Patient feedback" title="What patients say" />
          <div className="relative">
            <div className="grid overflow-hidden rounded-[2rem] border border-[#EAE6DF] bg-[#FCFAF6] shadow-xl md:grid-cols-[0.9fr_1.1fr]">
              <AnimatePresence mode="wait">
                <motion.div key={cur} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="contents">
                  <div className="relative h-56 md:h-auto md:min-h-[340px]">
                    <img src={r.img} alt={r.tag} className="absolute inset-0 h-full w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-[#F5A623] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#4A2E1B]">{r.tag}</span>
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
                    <Quote className="h-8 w-8 text-[#D9531D]" />
                    <p className="text-lg font-semibold leading-relaxed sm:text-xl">{r.quote}</p>
                    <span className="text-sm font-extrabold text-[#D9531D]">{r.author}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button onClick={() => go(-1)} aria-label="Previous review" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#EAE6DF] bg-white transition hover:border-[#D9531D] hover:bg-[#D9531D] hover:text-white"><ChevronLeft className="h-5 w-5" /></button>
              <div className="flex gap-2">
                {reviews.map((_, i) => <button key={i} onClick={() => setCur(i)} aria-label={`Review ${i + 1}`} className={`h-2.5 rounded-full transition-all ${cur === i ? 'w-7 bg-[#D9531D]' : 'w-2.5 bg-[#EAE6DF]'}`} />)}
              </div>
              <button onClick={() => go(1)} aria-label="Next review" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#EAE6DF] bg-white transition hover:border-[#D9531D] hover:bg-[#D9531D] hover:text-white"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT US: live timetable + location */}
      <section className={section}>
        <div className="mx-auto max-w-6xl space-y-12">
          <Head pill="Visit us" title="Clinic hours & location" />
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full space-y-3 rounded-[2rem] border border-[#EAE6DF] bg-white p-6 sm:p-8">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xl font-extrabold"><Clock className="h-5 w-5 text-[#D9531D]" />Timings</h3>
                  <OpenBadge />
                </div>
                {TIMETABLE.map((row) => {
                  const today = status && row.idx.includes(status.day);
                  return (
                    <div key={row.days} className={`flex flex-col gap-0.5 rounded-2xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between ${today ? 'border-[#D9531D] bg-[#D9531D]/5' : 'border-[#EAE6DF]'}`}>
                      <span className="flex items-center gap-2 text-sm font-extrabold">{row.days}{today && <span className="rounded-full bg-[#D9531D] px-2 py-0.5 text-[10px] font-black text-white">Today</span>}</span>
                      <span className="text-sm text-slate-600">{row.t}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <a href={MAPS} target="_blank" rel="noopener noreferrer" className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden rounded-[2rem] border border-[#EAE6DF] bg-[#EAE6DF]/50 p-6 sm:p-8">
                <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#4A2E1B14_1px,transparent_1px),linear-gradient(90deg,#4A2E1B14_1px,transparent_1px)] [background-size:36px_36px]" />
                <div className="absolute left-[18%] top-[30%] h-3 w-[60%] -rotate-12 rounded-full bg-white/80" />
                <div className="absolute left-[45%] top-[8%] h-[70%] w-3 rotate-12 rounded-full bg-white/80" />
                <div className="absolute left-[46%] top-[34%]">
                  <span className="absolute -inset-3 animate-ping rounded-full bg-[#D9531D]/40 motion-reduce:hidden" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#D9531D] text-white shadow-xl"><MapPin className="h-5 w-5" /></span>
                </div>
                <div className="relative rounded-2xl bg-white p-4 shadow-lg">
                  <p className="font-extrabold">Saashi Clinic</p>
                  <p className="text-sm text-slate-600">Isakhathota Junction, Visakhapatnam</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#D9531D]"><Navigation className="h-4 w-4" />Get directions<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${section} !pt-0`}>
        <div className="mx-auto max-w-3xl space-y-10">
          <Head pill="Good to know" title="Questions, answered" />
          <Reveal className="space-y-3">{faqs.map((f) => <Faq key={f.q} {...f} />)}</Reveal>
        </div>
      </section>

      {/* Desktop floating WhatsApp button */}
      <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 hidden md:block">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#D9531D] opacity-40 motion-reduce:hidden" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#D9531D] text-white shadow-xl transition-transform hover:scale-110"><MessageCircle className="h-6 w-6" /></span>
      </a>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#EAE6DF] bg-white/95 p-3 backdrop-blur md:hidden">
        <a href="tel:+919100192367" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border-2 border-[#4A2E1B] text-sm font-black"><Phone className="h-4 w-4" />Call</a>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#D9531D] text-sm font-black text-white"><MessageCircle className="h-4 w-4" />WhatsApp</a>
      </div>
    </div>
  );
}