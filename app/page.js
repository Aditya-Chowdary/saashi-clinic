'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView, animate } from 'framer-motion';
import {
  Phone, ChevronRight, ChevronLeft, Activity, Sparkles, ArrowDown, ShieldCheck,
  Heart, Star, Plus, MapPin, MessageCircle, Baby, Bone, Ear, Quote,
} from 'lucide-react';
import Logo from './components/Logo';

/* ---------- Content (edit here) ---------- */
const WA = 'https://api.whatsapp.com/send?phone=919100192367&text=Hello%20Saashi%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.';
const TEL = 'tel:+919100192367';
const MAP = 'https://www.google.com/maps/search/?api=1&query=Saashi+Clinic+Isakhathota+Junction+Visakhapatnam';
const U = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;
const IMG = {
  child: U('photo-1516627145497-ae6968895b74'),
  ortho: U('photo-1519494026892-80bbd2d6fd0d'),
  talk: U('photo-1527613426441-4da17471b66d'),
  kids: U('photo-1502086223501-7ea6ecd79368'),
  surgeon: U('photo-1576091160399-112ba8d25d1d'),
};

const slides = [
  { img: IMG.child, tag: 'Paediatrics', title: 'A calm, child-friendly space', sub: 'Check-ups that feel more like a chat than a clinic visit.', quote: "Dr. Geshmanjali explained my child's growth markers so clearly. Her teaching approach is reassuring.", author: 'Srinivas Rao, Parent' },
  { img: IMG.ortho, tag: 'Orthopaedics', title: 'Back on your feet', sub: 'Joint replacement and trauma care, planned around your life.', quote: "Dr. Sunil's surgical and diagnostic skill restored my mobility after a severe hip injury.", author: 'K. Satish, Joint patient' },
  { img: IMG.talk, tag: 'Our approach', title: 'We talk, teach & heal', sub: 'You understand your condition before you decide anything.', quote: 'I appreciate the time taken to explain the underlying anatomy. It makes a big difference.', author: 'Mary Josephine, Patient' },
];

const worries = [
  { icon: Baby, q: 'Is my child growing and developing normally?', a: 'Paediatric growth and milestone checks with clear, jargon-free answers.' },
  { icon: Bone, q: 'My knee or hip hurts every day.', a: 'Find the cause first. Many problems improve without surgery.' },
  { icon: Ear, q: 'I just want someone to explain it properly.', a: 'Every consultation includes time to ask questions and understand your plan.' },
];

const stats = [
  { to: 20, suffix: '+', label: 'Years in academic teaching' },
  { to: 15, suffix: 'k+', label: 'Patients treated' },
  { to: 2, suffix: '', label: 'Specialists under one roof' },
  { to: 24, suffix: '/7', label: 'WhatsApp messaging' },
];

const steps = [
  { t: 'Message us', d: 'Tap WhatsApp and tell us what is troubling you or your child.' },
  { t: 'Get a time', d: 'We confirm an appointment slot with the right specialist.' },
  { t: 'Understand', d: 'Your doctor examines, explains and answers every question.' },
  { t: 'Recover', d: 'Follow a clear plan, with the clinic one message away.' },
];

const faqs = [
  { q: 'How does Saashi Clinic practise paediatric monitoring?', a: 'We track developmental progress, growth metrics and general wellness. Dr. Geshmanjali guides you through key childhood milestones to support long-term health.' },
  { q: 'What treatments do you offer for trauma or fractures?', a: 'We treat high-velocity fractures, bone reconstruction and joint replacements to help you regain your range of motion.' },
  { q: 'Can I get an urgent orthopaedic consult?', a: 'Yes. For trauma cases, call 9100192367 to arrange a priority orthopaedic evaluation.' },
];

/* ---------- Small building blocks ---------- */
function Reveal({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Head({ pill, title, text, light }) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto space-y-3">
      <span className={`inline-block font-extrabold text-xs uppercase tracking-wider px-4 py-1.5 rounded-full ${light ? 'text-[#F5A623] bg-white/10' : 'text-[#D9531D] bg-[#D9531D]/10'}`}>{pill}</span>
      <h2 className="text-3xl md:text-5xl font-black tracking-tight">{title}</h2>
      <p className={`text-sm md:text-base ${light ? 'text-[#EAE6DF]/80' : 'text-slate-600'}`}>{text}</p>
    </Reveal>
  );
}

function Counter({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-[#EAE6DF] rounded-2xl overflow-hidden">
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

const btnPrimary = 'inline-flex items-center justify-center gap-2.5 h-14 px-8 rounded-full text-sm font-black bg-[#D9531D] text-white shadow-lg shadow-[#D9531D]/25 transition-all hover:-translate-y-0.5 hover:bg-[#c24a19] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]';

/* ---------- Page ---------- */
export default function Home() {
  const reduce = useReducedMotion();
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [cur]);
  const go = (d) => setCur((p) => (p + d + slides.length) % slides.length);
  const toServices = (e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); };

  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } };
  const item = { hidden: { opacity: 0, y: reduce ? 0 : 26 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };
  const marquee = ['Paediatrics', 'Orthopaedics', 'Joint replacement', 'Trauma care', 'Growth monitoring', 'Fracture stabilisation'];

  return (
    <div className="overflow-x-hidden bg-[#FCFAF6] text-[#4A2E1B]">

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center px-5 sm:px-6 py-16 bg-gradient-to-b from-[#FCFAF6] to-[#EAE6DF]/30">
        <div className="absolute top-10 -left-20 w-80 h-80 bg-[#D9531D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#F5A623]/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <motion.div variants={item} className="inline-flex items-center gap-2 text-[#D9531D] font-extrabold text-xs uppercase tracking-wider bg-[#D9531D]/10 px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> We talk, teach &amp; heal
            </motion.div>
            <motion.h1 variants={item} className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight">
              Healthy kids.<br />Strong bones.<br />
              <span className="text-[#D9531D]">Real answers.</span>
            </motion.h1>
            <motion.p variants={item} className="text-base md:text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Saashi Clinic brings a paediatrician and an orthopaedic surgeon together in Visakhapatnam, with senior teaching experience and practical clinical skill.
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href={WA} target="_blank" rel="noopener noreferrer" className={btnPrimary}><Phone className="w-4 h-4" /> Book on WhatsApp</a>
              <a href="#services" onClick={toServices} className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full text-sm font-black border-2 border-[#4A2E1B] hover:bg-[#4A2E1B] hover:text-[#FCFAF6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531D]">
                Explore services <ArrowDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Photo collage with floating cards */}
          <motion.div variants={item} className="relative mx-auto w-full max-w-lg">
            <div className="grid grid-cols-5 grid-rows-5 gap-3 h-[420px] sm:h-[500px]">
              <div className="col-span-3 row-span-5 rounded-[2rem] overflow-hidden shadow-2xl"><img src={IMG.child} alt="Child at a paediatric check-up" className="w-full h-full object-cover" /></div>
              <div className="col-span-2 row-span-3 rounded-[2rem] overflow-hidden shadow-xl"><img src={IMG.ortho} alt="Orthopaedic care" className="w-full h-full object-cover" /></div>
              <div className="col-span-2 row-span-2 rounded-[2rem] bg-[#4A2E1B] flex items-center justify-center"><Logo className="w-20 h-20" /></div>
            </div>
            <motion.div animate={reduce ? {} : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute -left-2 sm:-left-8 bottom-10 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#EAE6DF] flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#F5A623]/15 text-[#F5A623]"><Star className="w-5 h-5 fill-[#F5A623]/30" /></span>
              <span className="text-xs font-bold leading-tight">Dr. Geshmanjali<br /><span className="font-medium text-slate-500">Paediatrics, Professor</span></span>
            </motion.div>
            <motion.div animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-2 sm:-right-6 top-8 bg-white rounded-2xl px-4 py-3 shadow-xl border border-[#EAE6DF] flex items-center gap-3">
              <span className="p-2 rounded-xl bg-[#D9531D]/10 text-[#D9531D]"><ShieldCheck className="w-5 h-5" /></span>
              <span className="text-xs font-bold leading-tight">Dr. Sunil<br /><span className="font-medium text-slate-500">Orthopaedic Surgeon</span></span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="bg-[#4A2E1B] text-[#FCFAF6] py-4 overflow-hidden" aria-hidden>
        <motion.div animate={reduce ? {} : { x: ['0%', '-50%'] }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="flex w-max gap-10 text-sm font-bold whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">{m}<Heart className="w-3.5 h-3.5 text-[#F5A623]" /></span>
          ))}
        </motion.div>
      </div>

      {/* RELATABLE */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-14">
          <Head pill="You’re not alone" title="Does this sound like you?" text="Most people arrive with the same few worries. Here is how we help." />
          <div className="grid md:grid-cols-3 gap-6">
            {worries.map(({ icon: Icon, q, a }, i) => (
              <Reveal key={q} delay={i * 0.12}>
                <div className="h-full bg-white rounded-3xl border border-[#EAE6DF] p-7 space-y-4 transition-all hover:-translate-y-1.5 hover:shadow-xl hover:border-[#D9531D]/30">
                  <span className="inline-flex p-3 rounded-2xl bg-[#D9531D]/10 text-[#D9531D]"><Icon className="w-6 h-6" /></span>
                  <h3 className="text-lg font-extrabold leading-snug">“{q}”</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 md:py-28 px-5 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-14">
          <Head pill="Our focus" title="Two specialities, one caring clinic" text="We address childhood milestones and orthopaedic corrections with dedicated clinical skill." />
          <div className="grid md:grid-cols-2 gap-10">
            {[
              { img: IMG.kids, badge: 'Dr. Geshmanjali', title: 'Paediatric diagnostics', desc: 'Growth assessment, developmental monitoring and nutritional counselling from a senior academic instructor.', pts: ['Milestone checks', 'Growth tracking', 'Diet guidance'] },
              { img: IMG.surgeon, badge: 'Dr. Sunil', title: 'Orthopaedic trauma & joints', desc: 'Joint replacements, fracture stabilisation and reconstructive bone surgery.', pts: ['Fracture care', 'Hip & knee replacement', 'Bone reconstruction'] },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.15}>
                <article className="group">
                  <div className="relative h-72 sm:h-80 rounded-[2rem] overflow-hidden shadow-lg">
                    <img src={s.img} alt={s.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 bg-[#FCFAF6] font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow">{s.badge}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-extrabold group-hover:text-[#D9531D] transition-colors">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.pts.map((p) => <li key={p} className="text-xs font-bold bg-[#F5A623]/15 text-[#4A2E1B] px-3 py-1.5 rounded-full">{p}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-[#4A2E1B] text-[#FCFAF6] py-20 md:py-28 px-5 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative max-w-6xl mx-auto space-y-14">
          <Head light pill="Our legacy" title="Experience you can lean on" text="Academic teaching backgrounds, combined with hands-on joint and trauma care." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center hover:border-[#F5A623]/50 transition-colors">
                  <p className="text-4xl md:text-6xl font-black text-[#F5A623]"><Counter to={s.to} suffix={s.suffix} /></p>
                  <p className="mt-2 text-xs md:text-sm font-bold text-[#EAE6DF]">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-14">
          <Head pill="How it works" title="From first message to recovery" text="Four simple steps. No confusing paperwork." />
          <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block absolute top-9 left-[12%] right-[12%] h-0.5 bg-[#EAE6DF]" aria-hidden />
            {steps.map((s, i) => (
              <motion.li key={s.t} initial={{ opacity: 0, y: reduce ? 0 : 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className="relative text-center space-y-3">
                <span className="relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-[#D9531D] text-white text-2xl font-black shadow-lg shadow-[#D9531D]/25 ring-8 ring-[#FCFAF6]">{i + 1}</span>
                <h3 className="font-extrabold text-lg">{s.t}</h3>
                <p className="text-sm text-slate-600 max-w-[16rem] mx-auto">{s.d}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CAROUSEL */}
      <section className="py-20 md:py-28 px-5 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-12">
          <Head pill="Patient feedback" title="Stories from our waiting room" text="A look inside the clinic and what patients say about their care." />
          <div className="relative group">
            <div className="relative h-[460px] sm:h-[500px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#4A2E1B]">
              <AnimatePresence mode="wait">
                <motion.div key={cur} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="absolute inset-0">
                  <img src={slides[cur].img} alt={slides[cur].title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4A2E1B] via-[#4A2E1B]/60 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-12 text-white space-y-3 max-w-3xl">
                    <span className="inline-block bg-[#F5A623] text-[#4A2E1B] font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">{slides[cur].tag}</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold leading-tight">{slides[cur].title}</h3>
                    <p className="text-sm md:text-base text-[#EAE6DF]/90">{slides[cur].sub}</p>
                    <div className="border-t border-white/20 pt-4">
                      <Quote className="w-5 h-5 text-[#F5A623] mb-1" />
                      <p className="text-sm md:text-base italic font-medium">{slides[cur].quote}</p>
                      <span className="text-xs text-[#F5A623] font-bold mt-2 block">{slides[cur].author}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {[['left-3', ChevronLeft, -1, 'Previous slide'], ['right-3', ChevronRight, 1, 'Next slide']].map(([pos, Ic, d, label]) => (
              <button key={label} onClick={() => go(d)} aria-label={label} className={`absolute ${pos} top-1/3 sm:top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#FCFAF6]/90 flex items-center justify-center shadow-md z-20 hover:scale-105 transition sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100`}>
                <Ic className="w-6 h-6" />
              </button>
            ))}
            <div className="flex justify-center gap-2.5 mt-6">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCur(i)} aria-label={`Go to slide ${i + 1}`} className={`h-3 rounded-full transition-all duration-300 ${cur === i ? 'bg-[#D9531D] w-7' : 'bg-[#EAE6DF] w-3'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <Head pill="Good to know" title="Questions, answered" text="Quick answers before you book." />
          <Reveal className="space-y-3">{faqs.map((f) => <Faq key={f.q} {...f} />)}</Reveal>
        </div>
      </section>

      {/* FINAL CTA + LOCATION */}
      <section className="px-5 sm:px-6 pb-20 md:pb-28">
        <Reveal className="max-w-6xl mx-auto grid lg:grid-cols-5 bg-[#4A2E1B] text-[#FCFAF6] rounded-[2rem] md:rounded-[3rem] overflow-hidden">
          <div className="lg:col-span-3 p-8 sm:p-14 space-y-5">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">Ready to feel better? Let’s talk.</h2>
            <p className="text-[#EAE6DF]/90 max-w-lg">Send us a message and we will find the right appointment for you or your child.</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full font-black text-sm bg-[#F5A623] text-[#4A2E1B] hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><MessageCircle className="w-4 h-4" /> Chat on WhatsApp</a>
              <a href={TEL} className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full font-black text-sm border-2 border-white/40 hover:bg-white/10 transition-colors"><Phone className="w-4 h-4" /> 9100192367</a>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 sm:p-12 flex flex-col justify-center gap-4">
            <span className="p-3 w-fit rounded-2xl bg-[#F5A623]/15 text-[#F5A623]"><MapPin className="w-6 h-6" /></span>
            <h3 className="text-xl font-extrabold">Find us</h3>
            <p className="text-sm text-[#EAE6DF] leading-relaxed">Beside Swagrama Foods,<br />Isakhathota Junction,<br />Visakhapatnam, Andhra Pradesh</p>
            <a href={MAP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#F5A623] hover:underline w-fit">Open in Maps <ChevronRight className="w-4 h-4" /></a>
          </div>
        </Reveal>
      </section>

      {/* Floating WhatsApp button */}
      <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50">
        <span className="absolute inset-0 rounded-full bg-[#D9531D] opacity-40 animate-ping motion-reduce:hidden" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#D9531D] text-white shadow-xl hover:scale-110 transition-transform"><MessageCircle className="w-6 h-6" /></span>
      </a>
    </div>
  );
}