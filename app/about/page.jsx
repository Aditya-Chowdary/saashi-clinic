'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, animate, useReducedMotion } from 'framer-motion';
import {
  HeartHandshake, GraduationCap, ShieldCheck, Baby, Bone, Activity, Stethoscope, Wrench, Users,
  ChevronLeft, ChevronRight, ChevronDown, MapPin, Phone, Clock, CalendarCheck,
  MessageCircle, ArrowUpRight,
} from 'lucide-react';
// Doctor photo (path is relative to app/about/page.jsx)
import geshmanjali from '../../public/images/Dr.geshmanjali.jpeg';
import sunil from '../../public/images/Dr.sunil.jpeg';

/* ---------- doctors section ---------- */
const geshmanjaliImg =
  typeof geshmanjali === 'object' && geshmanjali !== null ? geshmanjali.src : geshmanjali;
const sunilImg =
  typeof sunil === 'object' && sunil !== null ? sunil.src : sunil;

const waLink =
  'https://api.whatsapp.com/send?phone=919100192367&text=Hello%20Saashi%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.';

const doctors = [
  {
    name: 'Dr. Geshmanjali',
    role: 'Paediatrician & Professor',
    badge: {
      icon: GraduationCap,
      label: 'Associate Professor',
      title: 'Teaches future doctors',
      text: 'Teaching keeps her care in line with current clinical guidelines and drug safety updates.',
    },
    desc: 'Associate Professor of Paediatrics, focused on how children grow and develop. She spends time with parents so every visit ends with clear next steps.',
    img:
      geshmanjaliImg ||
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    focus: [
      {
        icon: Baby,
        label: 'Developmental screening',
        text: 'Checks milestones like speech, movement and learning, so concerns are caught early.',
      },
      {
        icon: Activity,
        label: 'Growth monitoring',
        text: 'Tracks height, weight and head size against standard growth charts at each visit.',
      },
      {
        icon: Stethoscope,
        label: 'Diagnostics',
        text: 'Careful examination and tests to find the cause of fevers, infections and other illness.',
      },
      {
        icon: Users,
        label: 'Parent education',
        text: 'Time to explain what to expect and what to do at home.',
      },
    ],
  },
  {
    name: 'Dr. Sunil',
    role: 'Trauma & Joint Replacement Surgeon',
    badge: {
      icon: Bone,
      label: 'Orthopaedic surgeon',
      title: 'Hands-on surgical care',
      text: 'Treats fractures, joint problems and bone alignment with precise surgical technique.',
    },
    desc: 'Orthopaedic surgeon for complex trauma, bone alignment and joint replacement, with a focus on getting you moving again safely.',
    img: sunilImg || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    focus: [
      {
        icon: Bone,
        label: 'Trauma & fractures',
        text: 'Treatment for broken bones and serious injuries, from accidents to sports.',
      },
      {
        icon: Activity,
        label: 'Bone alignment',
        text: 'Corrects bones and joints that are out of position so they work properly.',
      },
      {
        icon: Wrench,
        label: 'Joint replacement',
        text: 'Replaces a damaged joint with an implant to reduce pain and restore movement.',
      },
    ],
  },
];

/* Tooltip: pure CSS hover and keyboard focus, so it works without extra libraries */
function Tip({ title, text, children, className = '' }) {
  return (
    <span className={`group/tip relative inline-flex ${className}`} tabIndex={0}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 w-56 -translate-x-1/2 translate-y-1 scale-95 rounded-xl bg-[#4A2E1B] p-3 text-left opacity-0 shadow-2xl ring-1 ring-[#F5A623]/40 transition duration-200 ease-out group-hover/tip:translate-y-0 group-hover/tip:scale-100 group-hover/tip:opacity-100 group-focus/tip:translate-y-0 group-focus/tip:scale-100 group-focus/tip:opacity-100"
      >
        <span className="block text-xs font-bold text-[#F5A623]">{title}</span>
        <span className="mt-1 block text-[11px] font-normal leading-snug text-[#EAE6DF]">
          {text}
        </span>
        <span className="absolute left-1/2 top-full -mt-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-[#F5A623]/40 bg-[#4A2E1B]" />
      </span>
    </span>
  );
}

function DoctorRow({ doc, index }) {
  const reduce = useReducedMotion();
  const reversed = index % 2 === 1;
  const BadgeIcon = doc.badge.icon;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="grid grid-cols-1 items-center gap-10 md:grid-cols-[320px_1fr] md:gap-14"
    >
      {/* Portrait: fixed ratio so both doctors always match */}
      <div className={`relative mx-auto w-full max-w-[320px] ${reversed ? 'md:order-2' : ''}`}>
        {/* Offset accent frame */}
        <div
          className={`absolute inset-0 rounded-[28px] border-2 border-[#F5A623]/50 bg-[#F5A623]/10 transition-transform duration-500 ${
            reversed ? '-translate-x-3 translate-y-3' : 'translate-x-3 translate-y-3'
          }`}
        />
        <div className="group relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#EAE6DF] shadow-lg">
          <img
            src={doc.img}
            alt={doc.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#4A2E1B]/60 to-transparent" />
        </div>

        {/* Floating credential badge with tooltip (outside the overflow-hidden box) */}
        <Tip title={doc.badge.title} text={doc.badge.text} className="absolute -bottom-4 left-4">
          <span className="inline-flex cursor-help items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#4A2E1B] shadow-lg ring-1 ring-[#EAE6DF] transition-transform duration-300 hover:-translate-y-0.5">
            <BadgeIcon className="h-4 w-4 text-[#D9531D]" />
            {doc.badge.label}
          </span>
        </Tip>
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div className="space-y-1.5">
          <h3 className="text-3xl font-extrabold tracking-tight text-[#4A2E1B] md:text-4xl">
            {doc.name}
          </h3>
          <p className="text-sm font-bold text-[#D9531D]">{doc.role}</p>
        </div>

        <p className="max-w-lg text-sm leading-relaxed text-slate-600">{doc.desc}</p>

        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500">Areas of care (hover for details)</p>
          <div className="flex flex-wrap gap-2.5">
            {doc.focus.map((f) => {
              const Icon = f.icon;
              return (
                <Tip key={f.label} title={f.label} text={f.text}>
                  <span className="inline-flex cursor-help items-center gap-2 rounded-full border border-[#EAE6DF] bg-white px-3.5 py-2 text-xs font-bold text-[#4A2E1B] transition-all duration-300 group-hover/tip:border-[#D9531D] group-hover/tip:bg-[#D9531D] group-hover/tip:text-white group-focus/tip:border-[#D9531D] group-focus/tip:bg-[#D9531D] group-focus/tip:text-white">
                    <Icon className="h-3.5 w-3.5" />
                    {f.label}
                  </span>
                </Tip>
              );
            })}
          </div>
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-[#D9531D] px-6 py-3 text-sm font-extrabold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C2481A] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D9531D]"
        >
          <CalendarCheck className="h-4 w-4" />
          Book with {doc.name.split(' ')[0]} {doc.name.split(' ')[1]}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}

function DoctorsSection() {
  return (
    <section className="mx-auto max-w-5xl space-y-20 px-6">
      {doctors.map((doc, i) => (
        <DoctorRow key={doc.name} doc={doc} index={i} />
      ))}
    </section>
  );
}

/* ---------- about page ---------- */
const WA = 'https://api.whatsapp.com/send?phone=919100192367&text=Hello%20Saashi%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.';

/* ---------- data ---------- */
const marquee = ['Child health', 'Growth & development', 'Fractures & trauma', 'Joint replacement', 'Evidence-based care'];

const stats = [
  { n: 2, label: 'Specialist doctors' },
  { n: 2, label: 'Departments under one roof' },
  { n: 6, label: 'Days open each week' },
];

const pillars = [
  { icon: HeartHandshake, title: 'Patient-centred empathy', desc: 'No rushed consults. We take time to understand, explain and instruct.' },
  { icon: GraduationCap, title: 'Evidence-based academics', desc: 'Led by an Associate Professor, so our paediatric care follows validated clinical guidelines.' },
  { icon: ShieldCheck, title: 'Surgical mastery', desc: 'Precise joint adjustments and trauma corrections with orthopaedic accuracy.' },
];

const services = [
  { icon: Baby, title: 'Child health check-ups', desc: 'Routine reviews and care for everyday childhood illness.' },
  { icon: Activity, title: 'Developmental screening', desc: 'Milestone checks for speech, movement and learning.' },
  { icon: Stethoscope, title: 'Growth monitoring', desc: 'Height, weight and head size tracked against growth charts.' },
  { icon: Bone, title: 'Fracture & trauma care', desc: 'Treatment for broken bones and serious injuries.' },
  { icon: ShieldCheck, title: 'Bone alignment', desc: 'Correction of bones and joints that are out of position.' },
  { icon: Wrench, title: 'Joint replacement', desc: 'Replacing damaged joints to reduce pain and restore movement.' },
];

const gallery = [
  { title: 'Nurturing paediatrics zone', label: 'Fear-free, child-friendly environment', img: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800' },
  { title: 'Sterilised orthopaedic suite', label: 'Equipped for joint and bone diagnostics', img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800' },
  { title: 'Empathetic counselling hub', label: 'Where we sit to talk, teach & heal', img: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800' },
];

const principles = [
  { title: 'Empathetic connection', text: 'Our doctors sit down to talk and understand your needs first.' },
  { title: 'Academic standards', text: 'Diagnostic models and teaching parameters drawn from GITAM clinical frameworks.' },
  { title: 'Practical precision', text: 'Physical problems treated with precise orthopaedic surgical technique.' },
];

const steps = [
  { title: 'Message us', text: 'Send a WhatsApp message to book a time that suits you.' },
  { title: 'Consult', text: 'Your doctor listens, examines and explains in plain language.' },
  { title: 'Treat', text: 'You get a clear plan: medicines, therapy or surgery where needed.' },
  { title: 'Follow up', text: 'We review progress and answer your questions.' },
];

const timings = [
  { day: 'Monday - Friday', time: '10:00 AM - 1:00 PM | 5:00 PM - 8:00 PM' },
  { day: 'Saturday', time: '10:00 AM - 2:00 PM' },
  { day: 'Sunday', time: 'Emergency & prior call bookings only', accent: true },
];

const faqs = [
  { q: 'How do I book an appointment?', a: 'Message us on WhatsApp at 9100192367 and we will help you pick a time.' },
  { q: 'Which doctor should I see?', a: 'Dr. Geshmanjali for child health, growth and development. Dr. Sunil for bones, joints, fractures and injuries.' },
  { q: 'Do you treat children and adults?', a: 'Paediatric care is for children. Orthopaedic care covers children through adults.' },
  { q: 'What are your timings?', a: 'Monday to Friday 10 AM - 1 PM and 5 PM - 8 PM, Saturday 10 AM - 2 PM. On Sunday we see emergencies and prior call bookings only.' },
  { q: 'Where is the clinic?', a: 'Beside Swagrama Foods, Isakhathota Junction, Visakhapatnam - 530022.' },
];

/* ---------- helpers ---------- */
const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' } }),
};

function Reveal({ i = 0, className = '', children }) {
  return (
    <motion.div variants={fade} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionHead({ tag, title, sub, light }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
      <span className={`mx-auto block w-fit rounded-full px-4 py-1.5 text-xs font-extrabold ${light ? 'bg-white/10 text-[#F5A623]' : 'bg-[#D9531D]/10 text-[#D9531D]'}`}>{tag}</span>
      <h2 className={`text-3xl font-extrabold tracking-tight md:text-4xl ${light ? 'text-white' : 'text-[#4A2E1B]'}`}>{title}</h2>
      {sub && <p className={`text-sm leading-relaxed md:text-base ${light ? 'text-[#EAE6DF]' : 'text-slate-600'}`}>{sub}</p>}
    </Reveal>
  );
}

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}</span>;
}

function useOpenNow() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const check = () => {
      const p = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
      const d = p.find((x) => x.type === 'weekday').value;
      const t = (+p.find((x) => x.type === 'hour').value % 24) * 60 + +p.find((x) => x.type === 'minute').value;
      const weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(d);
      setOpen(weekday ? (t >= 600 && t < 780) || (t >= 1020 && t < 1200) : d === 'Sat' ? t >= 600 && t < 840 : false);
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
}

/* Scroll-snap carousel: swipe on touch, arrows on desktop, autoplay that pauses on hover */
function Carousel({ children, itemClass }) {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = (dir) => {
    const el = ref.current;
    if (!el || !el.firstChild) return;
    const step = el.firstChild.getBoundingClientRect().width + 24;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (dir > 0 && end) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && el.scrollLeft <= 4) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
    else el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => go(1), 4500);
    return () => clearInterval(id);
  }, [paused, reduce]);

  const btn = 'flex h-11 w-11 items-center justify-center rounded-full border border-[#EAE6DF] bg-white text-[#4A2E1B] shadow-sm transition hover:border-[#D9531D] hover:bg-[#D9531D] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9531D]';

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)}>
      <div ref={ref} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {React.Children.map(children, (c) => (
          <div className={`shrink-0 snap-start ${itemClass}`}>{c}</div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <button type="button" aria-label="Previous" onClick={() => go(-1)} className={btn}><ChevronLeft className="h-5 w-5" /></button>
        <button type="button" aria-label="Next" onClick={() => go(1)} className={btn}><ChevronRight className="h-5 w-5" /></button>
      </div>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white transition-colors ${open ? 'border-[#D9531D]' : 'border-[#EAE6DF]'}`}>
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold text-[#4A2E1B]">
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 text-[#D9531D] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- page ---------- */
export default function About() {
  const [faqOpen, setFaqOpen] = useState(0);
  const openNow = useOpenNow();
  const reduce = useReducedMotion();
  const [d1, d2] = doctors;

  return (
    <div className="overflow-x-hidden bg-[#FCFAF6]">
      {/* 1. HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#4A2E1B_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#F5A623]/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#D9531D]/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          {/* Left: message */}
          <div className="space-y-7 text-center lg:text-left">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-full bg-[#D9531D]/10 px-4 py-1.5 text-xs font-extrabold text-[#D9531D]">
              Paediatric &amp; orthopaedic clinic, Visakhapatnam
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl font-extrabold leading-[1.05] tracking-tight text-[#4A2E1B] sm:text-6xl xl:text-7xl">
              We talk,<br />teach &amp; <span className="text-[#D9531D]">heal.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mx-auto max-w-lg text-sm leading-relaxed text-slate-600 md:text-base lg:mx-0">
              Two specialists, one clinic. Child health with Dr. Geshmanjali, bone and joint care with Dr. Sunil, and time to listen at every visit. Skill beats theory.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start justify-center">
              <a href={WA} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D9531D] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#D9531D]/25 transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"><MessageCircle className="h-4 w-4" />Book on WhatsApp</a>
              <a href="#doctors" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#4A2E1B]/20 px-7 py-3.5 text-sm font-extrabold text-[#4A2E1B] transition hover:border-[#D9531D] hover:text-[#D9531D] sm:w-auto">Meet our doctors</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mx-auto flex max-w-md justify-between gap-4 border-t border-[#4A2E1B]/10 pt-6 lg:mx-0">
              {stats.map((x) => (
                <div key={x.label} className="text-left">
                  <p className="text-3xl font-extrabold text-[#D9531D]"><CountUp to={x.n} /></p>
                  <p className="text-[11px] font-bold leading-tight text-slate-500">{x.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: doctor portraits */}
          <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[560px]">
            <motion.div animate={reduce ? {} : { rotate: 360 }} transition={{ duration: 60, ease: 'linear', repeat: Infinity }} className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#D9531D]/30" />
            {[
              { doc: d1, pos: 'left-0 top-0 z-10', delay: 0.25, drift: -10 },
              { doc: d2, pos: 'right-0 bottom-0 z-20', delay: 0.45, drift: 10 },
            ].map(({ doc, pos, delay, drift }) => (
              <motion.div key={doc.name} initial={{ opacity: 0, y: 50, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay, ease: 'easeOut' }} className={`absolute w-[54%] ${pos}`}>
                <motion.div animate={reduce ? {} : { y: [0, drift, 0] }} transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }} className="group relative aspect-[3/4] overflow-hidden rounded-b-3xl rounded-t-full border-[6px] border-white bg-[#EAE6DF] shadow-2xl shadow-[#4A2E1B]/20">
                  <img src={doc.img} alt={doc.name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#4A2E1B]/85 to-transparent" />
                  <div className="absolute inset-x-2 bottom-3 text-center text-white">
                    <p className="text-xs font-extrabold sm:text-sm">{doc.name}</p>
                    <p className="text-[10px] text-[#F5A623] sm:text-xs">{doc.role.split(' & ')[0]}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }} className="absolute right-0 top-8 z-30 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-extrabold text-[#4A2E1B] shadow-lg sm:text-xs">
              <GraduationCap className="h-4 w-4 text-[#D9531D]" />Associate Professor
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }} className="absolute bottom-10 left-0 z-30 flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[11px] font-extrabold text-[#4A2E1B] shadow-lg sm:text-xs">
              <Bone className="h-4 w-4 text-[#D9531D]" />Orthopaedic surgeon
            </motion.div>
          </div>
        </div>
      </section>

     {/* Marquee ribbon */}
      <div className="overflow-hidden bg-[#4A2E1B] py-4">
        <motion.div animate={reduce ? {} : { x: ['0%', '-50%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }} className="flex w-max whitespace-nowrap">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-10 pr-10 text-sm font-bold text-[#EAE6DF]">
              {t}<span className="h-1.5 w-1.5 rotate-45 bg-[#F5A623]" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* 2. VALUES */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 md:pt-24 md:pb-24">
        <SectionHead tag="What we stand for" title="Care built on three promises" sub="Every visit is shaped by the same principles, whichever doctor you see." />
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} i={i} className="h-full">
                <div className="group h-full rounded-3xl border border-[#EAE6DF] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#D9531D] hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9531D]/10 text-[#D9531D] transition group-hover:bg-[#D9531D] group-hover:text-white"><Icon className="h-6 w-6" /></div>
                  <h3 className="text-lg font-bold text-[#4A2E1B]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* 3. DOCTORS */}
      <section id="doctors" className="scroll-mt-20 pb-16 md:pb-24">
        <SectionHead tag="Our doctors" title="The specialists behind your care" />
        <DoctorsSection />
      </section>

      {/* 4. WHY ACADEMICS */}
      <section className="border-y border-[#EAE6DF]/40 bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <span className="block w-fit rounded-full bg-[#D9531D]/10 px-4 py-1.5 text-xs font-extrabold text-[#D9531D]">The teaching advantage</span>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#4A2E1B] md:text-4xl">Why it matters that your doctor is also a teacher</h2>
            <p className="text-sm leading-relaxed text-slate-600">Dr. Geshmanjali is an Associate Professor of Paediatrics. A doctor who teaches the next generation must stay current with treatment standards, drug safety updates and clinical methods.</p>
            <p className="text-sm leading-relaxed text-slate-600">That rigour carries into Saashi Clinic: evidence-based paediatric pathways and trauma care grounded in clinical science, not just diagnostic theory.</p>
          </Reveal>
          <div className="grid gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} i={i}>
                  <div className="flex items-start gap-4 rounded-2xl border border-[#EAE6DF]/60 bg-white p-5 shadow-sm transition hover:translate-x-1 hover:shadow-md">
                    <div className="shrink-0 rounded-xl bg-[#D9531D]/10 p-3 text-[#D9531D]"><Icon className="h-5 w-5" /></div>
                    <div><h3 className="font-bold text-[#4A2E1B]">{p.title}</h3><p className="mt-1 text-xs leading-relaxed text-slate-500">{p.desc}</p></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SERVICES CAROUSEL */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionHead tag="What we treat" title="Care for children and for bones and joints" sub="Swipe or use the arrows to browse." />
        <Carousel itemClass="w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="group h-full rounded-3xl border border-[#EAE6DF] bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#D9531D] hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5A623]/20 text-[#4A2E1B] transition group-hover:rotate-6 group-hover:bg-[#D9531D] group-hover:text-white"><Icon className="h-6 w-6" /></div>
                <h3 className="text-lg font-bold text-[#4A2E1B]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            );
          })}
        </Carousel>
      </section>

      {/* 6. GALLERY CAROUSEL */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHead tag="Our atmosphere" title="A safe, welcoming clinic" sub="Spaces designed so children and injured patients feel comfortable and secure." />
          <Carousel itemClass="w-[88%] md:w-[calc(50%-12px)]">
            {gallery.map((g) => (
              <div key={g.title} className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#EAE6DF] shadow-sm">
                <img src={g.img} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="text-base font-extrabold">{g.title}</h3>
                  <p className="mt-0.5 text-xs text-[#EAE6DF]">{g.label}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* 7. PRINCIPLES */}
      <section className="relative overflow-hidden bg-[#4A2E1B] px-6 py-16 text-[#FCFAF6] md:py-24">
        <div className="absolute inset-0 opacity-5 [background-image:radial-gradient(#F5A623_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="relative mx-auto max-w-5xl">
          <SectionHead light tag="Core code" title="How we practise care" sub="Practical precision, with open and direct conversations." />
          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} i={i} className="h-full">
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#F5A623]/50 hover:bg-white/10">
                  <h3 className="text-lg font-bold text-[#F5A623]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#EAE6DF]/80">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PATIENT JOURNEY */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <SectionHead tag="Your visit" title="What to expect, step by step" />
        <div className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-gradient-to-r from-[#F5A623] to-[#D9531D] md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.title} i={i} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#D9531D] text-lg font-extrabold text-white shadow-lg ring-8 ring-[#FCFAF6]">{i + 1}</div>
              <div>
                <h3 className="text-base font-bold text-[#4A2E1B]">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-slate-50 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHead tag="Questions" title="Frequently asked" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} i={i}>
                <FaqItem q={f.q} a={f.a} open={faqOpen === i} onToggle={() => setFaqOpen(faqOpen === i ? -1 : i)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}