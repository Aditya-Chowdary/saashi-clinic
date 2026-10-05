'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform, useMotionValue,
} from 'framer-motion';
import {
  Phone, ChevronRight, ChevronLeft, Sparkles, ArrowRight, ShieldCheck, Plus, MapPin,
  MessageCircle, Baby, Bone, Quote, GraduationCap, Clock, Check,
  HeartHandshake, Smile, Navigation,
} from 'lucide-react';
import paediatrics from '../public/images/paedatric.jpeg';
import ortho from '../public/images/ORTHO.jpeg';
import geshmanjali from '../public/images/Dr.geshmanjali.jpeg';
import sunil from '../public/images/Dr.sunil.jpeg';
import clinic from '../public/images/clinic.jpeg';
const src = (m) => (typeof m === 'object' && m !== null ? m.src : m);
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
  clinic: src(clinic) || U('photo-1519494026892-80bbd2d6fd0d', 1200),
};

// Timings: day index (0 = Sunday) -> [[openHour, closeHour], ...] in IST
const HOURS = { 1: [[10, 13], [17, 20]], 2: [[10, 13], [17, 20]], 3: [[10, 13], [17, 20]], 4: [[10, 13], [17, 20]], 5: [[10, 13], [17, 20]], 6: [[10, 14]], 0: [] };
const TIMETABLE = [
  { days: 'Monday - Friday', t: '10 AM - 1 PM, 5 PM - 8 PM', idx: [1, 2, 3, 4, 5] },
  { days: 'Saturday', t: '10 AM - 2 PM', idx: [6] },
  { days: 'Sunday', t: 'Emergencies and prior call bookings', idx: [0] },
];

const doctors = [
  { img: IMG.geshmanjali, name: 'Dr. Geshmanjali', short: 'Paediatrics', role: 'Paediatrician & Associate Professor', icon: Baby },
  { img: IMG.sunil, name: 'Dr. Sunil', short: 'Orthopaedics', role: 'Trauma & Joint Replacement Surgeon', icon: Bone },
];

const concerns = [
  { label: 'Slow growth', who: 0 },
  { label: 'Missed milestones', who: 0 },
  { label: 'Fussy eating', who: 0 },
  { label: 'Knee pain', who: 1 },
  { label: 'Hip pain', who: 1 },
  { label: 'Fracture or injury', who: 1 },
];

const quick = [
  { icon: MessageCircle, t: 'Book on WhatsApp', d: '9100192367', href: WA },
  { icon: Phone, t: 'Call the clinic', d: 'Urgent bone injuries: call first', href: 'tel:+919100192367' },
  { icon: MapPin, t: 'Find us', d: 'Isakhathota Junction, Visakhapatnam', href: MAPS },
];

const specialities = [
  { img: IMG.child, badge: 'Paediatrics', icon: Baby, title: 'Child health & development', desc: 'Is your child growing, eating and learning at the right pace? Growth assessment, developmental monitoring and nutrition counselling from a senior academic.', pts: ['Milestone checks', 'Growth tracking', 'Diet guidance'], who: 'Dr. Geshmanjali' },
  { img: IMG.ortho, badge: 'Orthopaedics', icon: Bone, title: 'Trauma, bones & joints', desc: 'We find the cause of your pain first, and many problems improve without surgery. When surgery is needed, it is precise and planned around your life.', pts: ['Fracture care', 'Hip & knee replacement', 'Bone reconstruction'], who: 'Dr. Sunil' },
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
const heroLines = ['Healthy kids.', 'Strong bones.', 'Real answers.'];
const heroFacts = [
  { icon: ShieldCheck, t: 'Senior specialists' },
  { icon: Clock, t: 'Open Mon to Sat' },
  { icon: MessageCircle, t: 'Quick WhatsApp replies' },
];

const EASE = [0.22, 1, 0.36, 1];
const section = 'px-5 py-16 sm:px-6 md:py-24';

/* ====================== HELPERS ====================== */
function useClinicStatus() {
  const [s, setS] = useState(null);
  useEffect(() => {
    const calc = () => {
      const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const day = ist.getDay();
      const h = ist.getHours() + ist.getMinutes() / 60;
      setS({ open: (HOURS[day] || []).some(([a, b]) => h >= a && h < b), day });
    };
    calc();
    const t = setInterval(calc, 60000);
    return () => clearInterval(t);
  }, []);
  return s;
}

function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function Head({ pill, title, text, light = false, left = false }) {
  return (
    <Reveal className={`max-w-2xl space-y-3 ${left ? 'text-center lg:text-left' : 'mx-auto text-center'}`}>
      {pill && <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-extrabold ${light ? 'bg-white/10 text-[#F5A623]' : 'bg-[#D9531D]/10 text-[#D9531D]'}`}>{pill}</span>}
      <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {text && <p className={`text-sm md:text-base ${light ? 'text-[#EAE6DF]/80' : 'text-slate-600'}`}>{text}</p>}
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

/* ====================== HERO ====================== */
function RotatingBadge({ reduce }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-[#4A2E1B]/15 sm:h-28 sm:w-28">
      <motion.svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }} aria-hidden>
        <defs><path id="heroRing" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" /></defs>
        <text fill="#4A2E1B" fontSize="10" fontWeight="800">
          <textPath href="#heroRing" textLength="280" lengthAdjust="spacing">PAEDIATRICS • ORTHOPAEDICS •</textPath>
        </text>
      </motion.svg>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9531D] text-white sm:h-12 sm:w-12"><HeartHandshake className="h-4.5 w-4.5 sm:h-6 sm:w-6" /></span>
    </div>
  );
}

function FloatChip({ icon: Icon, title, sub, className, delay, reduce, style }) {
  return (
    <motion.div style={style} initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={`absolute z-20 ${className}`}>
      <motion.div animate={reduce ? {} : { y: [0, -9, 0] }} transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut' }} className="flex items-center gap-2 sm:gap-2.5 rounded-xl sm:rounded-2xl bg-white/95 p-2 sm:p-2.5 pr-3 sm:pr-4 shadow-xl shadow-[#4A2E1B]/15 backdrop-blur">
        <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#D9531D]/10 text-[#D9531D]"><Icon className="h-4 w-4 sm:h-5 sm:w-5" /></span>
        <span className="leading-tight">
          <span className="block text-xs font-extrabold">{title}</span>
          <span className="block text-[10px] text-slate-500 sm:text-xs">{sub}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const photoX = useTransform(sx, (v) => v * -14);
  const photoY = useTransform(sy, (v) => v * -14);
  const chipX = useTransform(sx, (v) => v * 24);
  const chipY = useTransform(sy, (v) => v * 24);
  const onMove = (e) => {
    if (reduce) return;
    const b = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - b.left) / b.width - 0.5);
    my.set((e.clientY - b.top) / b.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  const fade = (delay) => ({ initial: { opacity: 0, y: reduce ? 0 : 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE } });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFAF6] to-[#EAE6DF]/50 px-5 pb-24 pt-10 sm:px-6 md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#4A2E1B_1px,transparent_1px)] [background-size:22px_22px]" />
      <motion.div animate={reduce ? {} : { x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#D9531D]/10 blur-3xl" />
      <motion.div animate={reduce ? {} : { x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#F5A623]/20 blur-3xl" />
     
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Message */}
        <div className="space-y-7 text-center lg:text-left">
          <motion.div {...fade(0)} className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#D9531D]/10 px-4 py-1.5 text-xs font-extrabold text-[#D9531D]"><Sparkles className="h-3.5 w-3.5" /> We talk, teach &amp; heal</span>
            <OpenBadge />
          </motion.div>

          <h1 className="text-[2.4rem] font-black leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            {heroLines.map((l, i) => (
              <span key={l} className="block">
                {i < 2 ? (
                  <span className="block overflow-hidden pb-1.5">
                    <motion.span className="block" initial={{ y: reduce ? 0 : '110%' }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.15 + i * 0.13, ease: EASE }}>{l}</motion.span>
                  </span>
                ) : (
                  <span className="relative inline-block">
                    <span className="block overflow-hidden pb-2">
                      <motion.span className="block text-[#D9531D]" initial={{ y: reduce ? 0 : '110%' }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: 0.15 + i * 0.13, ease: EASE }}>{l}</motion.span>
                    </span>
                    <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full" fill="none" aria-hidden>
                      <motion.path d="M3 9 C 60 3, 150 3, 297 8" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" initial={{ pathLength: reduce ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }} />
                    </svg>
                  </span>
                )}
              </span>
            ))}
          </h1>

          <motion.p {...fade(0.7)} className="mx-auto max-w-lg text-base leading-relaxed text-slate-600 md:text-lg lg:mx-0">
            A paediatrician and an orthopaedic surgeon, together in Visakhapatnam, with senior teaching experience and practical clinical skill.
          </motion.p>
          
          {/* Hero Buttons: Reduced size on smaller screens */}
          <motion.div {...fade(0.85)} className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="group relative inline-flex h-11 sm:h-14 items-center justify-center gap-2 overflow-hidden rounded-full bg-[#D9531D] px-5 sm:px-8 text-xs sm:text-sm font-black text-white shadow-lg shadow-[#D9531D]/30 transition hover:-translate-y-0.5 hover:bg-[#c24a19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]">
              <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 transition-transform duration-700 group-hover:translate-x-[400%]" aria-hidden />
              <MessageCircle className="relative h-3.5 w-3.5 sm:h-4 sm:w-4" /><span className="relative">Book on WhatsApp</span>
            </a>
            <Link href={LINKS.about} className="inline-flex h-11 sm:h-14 items-center justify-center gap-2 rounded-full border-2 border-[#4A2E1B] px-5 sm:px-8 text-xs sm:text-sm font-black transition hover:bg-[#4A2E1B] hover:text-[#FCFAF6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531D]">
              Meet our doctors <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </motion.div>
          
          <motion.ul {...fade(1.05)} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 lg:justify-start">
            {heroFacts.map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-2 text-xs font-bold text-[#4A2E1B]/80 sm:text-sm"><Icon className="h-4 w-4 text-[#D9531D]" />{t}</li>
            ))}
          </motion.ul>
        </div>

        {/* Photo scene */}
        <div onMouseMove={onMove} onMouseLeave={onLeave} className="relative mx-auto w-full max-w-[21rem] px-2 sm:max-w-md lg:ml-auto lg:mr-0 lg:max-w-[30rem]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
            <motion.div animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="relative aspect-square h-[112%] rounded-full border-2 border-dashed border-[#D9531D]/25">
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D9531D]" />
              <span className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#F5A623]" />
            </motion.div>
          </div>

          <motion.div style={{ x: photoX, y: photoY }} className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-[#F5A623]/35 via-[#D9531D]/15 to-transparent blur-2xl" aria-hidden />
            <motion.div
              initial={{ clipPath: reduce ? 'inset(0% 0 0 0 round 2rem)' : 'inset(100% 0 0 0 round 2rem)' }}
              animate={{ clipPath: 'inset(0% 0 0 0 round 2rem)' }}
              transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-[#4A2E1B]/25"
            >
              <motion.img src={IMG.clinic} alt="Saashi Clinic building at Isakhathota Junction, Visakhapatnam" className="h-full w-full object-cover" initial={{ scale: reduce ? 1 : 1.18 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: 'easeOut' }} />
              {!reduce && (
                <motion.div aria-hidden style={{ skewX: -12 }} initial={{ x: '-150%' }} animate={{ x: '450%' }} transition={{ duration: 1.6, delay: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 7 }} className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              )}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#4A2E1B]/50 to-transparent" />
              
              {/* Reduced size maps badge trigger */}
              <motion.a href={MAPS} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: reduce ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.2, ease: EASE }} className="group absolute inset-x-2 bottom-2 sm:inset-x-4 sm:bottom-4 flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-white/95 p-2 sm:p-3 shadow-lg backdrop-blur transition hover:bg-white">
                <span className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#D9531D] text-white">
                  <span className="absolute inset-0 animate-ping rounded-lg sm:rounded-xl bg-[#D9531D]/40 motion-reduce:hidden" />
                  <MapPin className="relative h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="min-w-0 flex-1 leading-tight text-left">
                  <span className="block text-xs sm:text-sm font-extrabold">Saashi Clinic</span>
                  <span className="block truncate text-[10px] sm:text-xs text-slate-600">Isakhathota, Visakhapatnam</span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[10px] sm:text-xs font-extrabold text-[#D9531D]"><span className="hidden sm:inline">Directions</span><ArrowRight className="h-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" /></span>
              </motion.a>
            </motion.div>
          </motion.div>

          <FloatChip icon={Baby} title="Child health" sub="Dr. Geshmanjali" className="-left-3 top-[16%] sm:-left-10" delay={0.9} reduce={reduce} style={{ x: chipX, y: chipY }} />
          <FloatChip icon={Bone} title="Bones & joints" sub="Dr. Sunil" className="-right-3 top-[44%] sm:-right-10" delay={1.1} reduce={reduce} style={{ x: chipX, y: chipY }} />
          <motion.div style={{ x: chipX, y: chipY }} initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 1.3, ease: 'easeOut' }} className="absolute -right-2 -top-8 z-20 sm:-right-8 sm:-top-10">
            <RotatingBadge reduce={reduce} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ====================== SECTIONS ====================== */
function QuickActions() {
  return (
    <div className="relative z-10 -mt-14 px-5 sm:px-6">
      <Reveal className="mx-auto grid max-w-5xl gap-1 rounded-3xl border border-[#EAE6DF] bg-white p-3 shadow-xl shadow-[#4A2E1B]/10 sm:grid-cols-3 sm:gap-3">
        {quick.map(({ icon: Icon, t, d, href }) => (
          <a key={t} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-[#FCFAF6]">
            {/* Reduced icon scale on mobile */}
            <span className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-[#D9531D]/10 text-[#D9531D] transition group-hover:bg-[#D9531D] group-hover:text-white">
              <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
            </span>
            <span className="min-w-0 text-left">
              <span className="block text-sm font-extrabold">{t}</span>
              <span className="block truncate text-xs text-slate-500">{d}</span>
            </span>
          </a>
        ))}
      </Reveal>
    </div>
  );
}

function Marquee({ reduce }) {
  return (
    <div className="mt-16 overflow-hidden bg-[#4A2E1B] py-4 text-[#FCFAF6]" aria-hidden>
      <motion.div animate={reduce ? {} : { x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="flex w-max whitespace-nowrap text-sm font-bold">
        {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
          <span key={i} className="flex items-center gap-10 pr-10">{m}<span className="h-1.5 w-1.5 rotate-45 bg-[#F5A623]" /></span>
        ))}
      </motion.div>
    </div>
  );
}

function DoctorFinder() {
  const [sel, setSel] = useState(0);
  const d = doctors[concerns[sel].who];
  const Icon = d.icon;
  return (
    <section className={section}>
      <div className="mx-auto max-w-5xl space-y-10">
        <Head title="What brings you in?" text="Pick the closest match and we will point you to the right doctor." />
        <Reveal className="grid gap-8 rounded-[2rem] border border-[#EAE6DF] bg-white p-5 shadow-lg shadow-[#4A2E1B]/5 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="mb-3 text-center text-sm font-bold text-slate-500 lg:text-left">Tap what sounds like you</p>
            {/* Reduced button styling on mobile viewports */}
            <div className="flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {concerns.map((c, i) => (
                <button 
                  key={c.label} 
                  onClick={() => setSel(i)} 
                  aria-pressed={sel === i} 
                  className={`rounded-full border-2 px-3 py-1.5 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531D] ${
                    sel === i 
                      ? 'border-[#D9531D] bg-[#D9531D] text-white shadow-md shadow-[#D9531D]/25' 
                      : 'border-[#EAE6DF] hover:border-[#D9531D]/50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={d.name} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.3 }} className="rounded-3xl bg-[#FCFAF6] p-5">
              <div className="flex items-center gap-4 text-left">
                <img src={d.img} alt={d.name} className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top" />
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D9531D]"><Icon className="h-3.5 w-3.5" />{d.short}</p>
                  <h3 className="text-xl font-black">{d.name}</h3>
                  <p className="text-sm text-slate-600">{d.role}</p>
                </div>
              </div>
              {/* Reduced responsive height on smaller screens */}
              <a 
                href={wa(`Hello Saashi Clinic, I would like to book an appointment with ${d.name} for: ${concerns[sel].label}.`)} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-4 inline-flex h-10 sm:h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D9531D] text-xs sm:text-sm font-black text-white transition hover:bg-[#c24a19]"
              >
                <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Book with {d.name}
              </a>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function Specialities() {
  return (
    <section className={`${section} bg-white`}>
      <div className="mx-auto max-w-6xl space-y-16">
        <Head pill="Our focus" title="Two specialities, one caring clinic" />
        {specialities.map((s, i) => {
          const Icon = s.icon;
          return (
            <article key={s.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-[#4A2E1B]/15">
                  <motion.img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" initial={{ scale: 1.18 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-extrabold shadow"><Icon className="h-3.5 w-3.5 text-[#D9531D]" />{s.badge}</span>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="space-y-5 text-center lg:text-left">
                <h3 className="text-3xl font-black tracking-tight sm:text-4xl">{s.title}</h3>
                <p className="mx-auto max-w-lg leading-relaxed text-slate-600 lg:mx-0">{s.desc}</p>
                <ul className="mx-auto inline-grid gap-2.5 text-left sm:grid-cols-1">
                  {s.pts.map((p) => (
                    <li key={p} className="flex items-center gap-3 font-bold"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D9531D] text-white"><Check className="h-3.5 w-3.5" /></span>{p}</li>
                  ))}
                </ul>
                <div><Link href={LINKS.about} className="group inline-flex items-center gap-2 font-extrabold text-[#D9531D] text-sm sm:text-base">Meet {s.who}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WhyUs({ reduce }) {
  return (
    <section className={section}>
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
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
          <Head left title="Care that feels different" />
          <div className="space-y-3">
            {why.map(({ icon: Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <div className="group flex items-start text-left gap-4 rounded-2xl border border-transparent p-4 transition hover:border-[#EAE6DF] hover:bg-white hover:shadow-md">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D9531D]/10 text-[#D9531D] transition group-hover:bg-[#D9531D] group-hover:text-white"><Icon className="h-6 w-6" /></span>
                  <div><h3 className="font-extrabold">{t}</h3><p className="mt-0.5 text-sm leading-relaxed text-slate-600">{d}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF9] px-6 py-20 text-[#4A2E1B] md:py-28">
      {/* Subtle background grid matching the organic warmth of the logo */}
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#4A2E1B_1px,transparent_1px),linear-gradient(to_bottom,#4A2E1B_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      
      {/* Sweeping abstract curves echoing the shield & bottom arch from the logo */}
      <div className="absolute -left-16 -top-16 h-96 w-96 rounded-full border border-[#D45225]/10 pointer-events-none" />
      <div className="absolute -right-20 bottom-10 h-[500px] w-[500px] rounded-full border border-[#EFA125]/10 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl space-y-16">
        <Head light={false} pill="Meet the team" title="Two senior specialists" />
        
        <div className="grid gap-8 sm:grid-cols-2">
          {doctors.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.1}>
              <Link 
                href={LINKS.about} 
                className="group block relative overflow-hidden rounded-[2.5rem] border border-[#4A2E1B]/10 bg-white p-4 shadow-[0_12px_40px_rgba(74,46,27,0.03)] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D45225]/30 hover:shadow-[0_20px_50px_rgba(212,82,37,0.08)]"
              >
                {/* Reduced image footprint with a refined aspect ratio */}
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2rem] bg-[#4A2E1B]/5">
                  <img 
                    src={d.img} 
                    alt={d.name} 
                    loading="lazy" 
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105" 
                  />
                  {/* Subtle warm overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/10 to-transparent" />
                  
                  {/* Translucent pill badge utilizing the logo colors */}
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-[#4A2E1B] shadow-sm backdrop-blur-sm border border-[#D45225]/20">
                    <d.icon className="h-3.5 w-3.5 text-[#D45225]" />
                    {d.short}
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex items-center justify-between gap-4 px-3 py-5 text-left">
                  <div className="min-w-0">
                    <h3 className="text-lg font-extrabold tracking-tight text-[#4A2E1B] transition-colors duration-300 group-hover:text-[#D45225]">
                      {d.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#EFA125] mt-0.5">
                      {d.role}
                    </p>
                  </div>
                  
                  {/* Interactive Button */}
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#4A2E1B]/15 bg-[#FCFAF7] text-[#4A2E1B] transition-all duration-300 group-hover:border-[#D45225] group-hover:bg-[#D45225] group-hover:text-white group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ reduce }) {
  return (
    <section className={section}>
      <div className="mx-auto max-w-6xl space-y-14">
        <Head pill="How it works" title="From first message to recovery" text="Four simple steps. No confusing paperwork." />
        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
  );
}

function Reviews() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur((p) => (p + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, [cur]);
  const go = (d) => setCur((p) => (p + d + reviews.length) % reviews.length);
  const r = reviews[cur];
  return (
    <section className={`${section} bg-white`}>
      <div className="mx-auto max-w-5xl space-y-12">
        <Head pill="Patient feedback" title="What patients say" />
        <div>
          <div className="grid overflow-hidden rounded-[2rem] border border-[#EAE6DF] bg-[#FCFAF6] shadow-xl md:grid-cols-[0.9fr_1.1fr]">
            <AnimatePresence mode="wait">
              <motion.div key={cur} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="contents">
                <div className="relative h-56 md:h-auto md:min-h-[340px]">
                  <img src={r.img} alt={r.tag} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-[#F5A623] px-3 py-1 text-xs font-black text-[#4A2E1B]">{r.tag}</span>
                </div>
                <div className="flex flex-col justify-center gap-4 p-7 sm:p-10 text-left">
                  <Quote className="h-8 w-8 text-[#D9531D]" />
                  <p className="text-lg font-semibold leading-relaxed sm:text-xl">{r.quote}</p>
                  <span className="text-sm font-extrabold text-[#D9531D]">{r.author}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Responsive navigation buttons sizes */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous review" className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#EAE6DF] bg-white transition hover:border-[#D9531D] hover:bg-[#D9531D] hover:text-white">
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => <button key={i} onClick={() => setCur(i)} aria-label={`Review ${i + 1}`} className={`h-2 rounded-full transition-all ${cur === i ? 'w-6 sm:w-7 bg-[#D9531D]' : 'w-2 bg-[#EAE6DF]'}`} />)}
            </div>
            <button onClick={() => go(1)} aria-label="Next review" className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[#EAE6DF] bg-white transition hover:border-[#D9531D] hover:bg-[#D9531D] hover:text-white">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  const status = useClinicStatus();
  return (
    <section className={section}>
      <div className="mx-auto max-w-6xl space-y-12">
        <Head pill="Visit us" title="Clinic hours & location" />
        
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Timings Card */}
          <Reveal>
            <div className="h-full space-y-3 rounded-[2rem] border border-[#EAE6DF] bg-white p-6 sm:p-8 text-left">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-xl font-extrabold">
                  <Clock className="h-5 w-5 text-[#D9531D]" />Timings
                </h3>
                <OpenBadge />
              </div>
              {TIMETABLE.map((row) => {
                const today = status && row.idx.includes(status.day);
                return (
                  <div 
                    key={row.days} 
                    className={`flex flex-col gap-0.5 rounded-2xl border p-4 transition-colors sm:flex-row sm:items-center sm:justify-between ${
                      today ? 'border-[#D9531D] bg-[#D9531D]/5' : 'border-[#EAE6DF]'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-extrabold">
                      {row.days}
                      {today && (
                        <span className="rounded-full bg-[#D9531D] px-2 py-0.5 text-[10px] font-black text-white">
                          Today
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-slate-600">{row.t}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Interactive Map Card */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-[2rem] border border-[#EAE6DF] bg-[#EAE6DF]/30">
              
              {/* Real Google Maps Embed Iframe */}
              <iframe
                title="Saashi Clinic Location Map"
                src="https://maps.google.com/maps?q=Saashi%20Clinic,%20Isakhathota%20Junction,%20Visakhapatnam&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 h-full w-full border-0 grayscale opacity-90 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating Address Card with responsive padding & layouts */}
              <a 
                href={MAPS} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative m-3 sm:m-6 block rounded-2xl bg-white/95 p-4 sm:p-5 shadow-xl backdrop-blur-sm border border-[#EAE6DF] transition-all duration-300 hover:-translate-y-1 hover:border-[#D9531D]/30 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-extrabold text-slate-900 text-sm sm:text-base">Saashi Clinic</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">Isakhathota Junction, Visakhapatnam</p>
                  </div>
                  <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-[#D9531D] text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                </div>
                
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#D9531D]">
                    <Navigation className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Get directions
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#D9531D] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={`${section} !pt-0`}>
      <div className="mx-auto max-w-3xl space-y-10">
        <Head pill="Good to know" title="Questions, answered" />
        <Reveal className="space-y-3">{faqs.map((f) => <Faq key={f.q} {...f} />)}</Reveal>
      </div>
    </section>
  );
}

/* ====================== PAGE ====================== */
export default function Home() {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-x-hidden bg-[#FCFAF6] pb-24 text-[#4A2E1B] md:pb-0">
      <Hero />
      <QuickActions />
      <Marquee reduce={reduce} />
      <DoctorFinder />
      <Specialities />
      <WhyUs reduce={reduce} />
      <Team />
      <Process reduce={reduce} />
      <Reviews />
      <Visit />
      <FaqSection />

      {/* Desktop floating WhatsApp button */}
      <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-40 hidden md:block">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#D9531D] opacity-40 motion-reduce:hidden" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#D9531D] text-white shadow-xl transition-transform hover:scale-110"><MessageCircle className="h-6 w-6" /></span>
      </a>

      {/* Mobile sticky action bar: Sized down buttons for smaller screens */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-[#EAE6DF] bg-white/95 p-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <a href="tel:+919100192367" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border-2 border-[#4A2E1B] text-xs font-black"><Phone className="h-3.5 w-3.5" />Call</a>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#D9531D] text-xs font-black text-white"><MessageCircle className="h-3.5 w-3.5" />WhatsApp</a>
      </div>
    </div>
  );
}