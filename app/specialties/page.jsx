'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Card, Tabs } from '@heroui/react';
import {
  Smile, Bone, Shield, Activity, Baby, Stethoscope,
  HeartHandshake, Plus, ChevronRight, Footprints, Users, Handshake,
} from 'lucide-react';
import ortho_paed from '../../public/images/paed-ortho.jpeg';

/* Image with graceful fallback. Parent must be `relative` with a height. */
function Photo({ src, alt, emoji = '🩺', className = '', priority = false }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#F5A623]/30 to-[#D9531D]/20 text-6xl ${className}`}>
        {emoji}
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={() => setFailed(true)} className={`object-cover ${className}`} />
  );
}

/* ---------- DATA ---------- */

// Life-stage explorer: one slider, the page tells you who looks after you at that age.
const stages = [
  { from: 0, to: 2, label: 'Babies & infants', team: 'ped', emoji: '🍼',
    text: 'Rolling, sitting, first steps and first words. We track growth and milestones, and check hips and feet early.',
    tags: ['Milestone checks', 'Growth charts', 'Hip & foot checks'] },
  { from: 3, to: 12, label: 'School years', team: 'both', emoji: '🎒',
    text: 'Fast growth, falls from playgrounds, flat feet, and the odd limp. Growing bones heal differently, so children need child-focused care.',
    tags: ['Fractures in children', 'In-toeing & limping', 'Nutrition'] },
  { from: 13, to: 19, label: 'Teens & sport', team: 'both', emoji: '⚽',
    text: 'Growth spurts, sports injuries and posture worries. Our two teams plan care together while bones are still growing.',
    tags: ['Sports injuries', 'Scoliosis checks', 'Growth-plate injuries'] },
  { from: 20, to: 39, label: 'Young adults', team: 'orth', emoji: '🏃',
    text: 'Ligament tears, desk-job back pain and old injuries that never settled. Most improve with the right plan, and not all need surgery.',
    tags: ['Ligament injuries', 'Back & neck pain', 'Fracture care'] },
  { from: 40, to: 59, label: 'Mid-life', team: 'orth', emoji: '🚶',
    text: 'Stiff knees, sore shoulders and the first signs of joint wear. Early advice often keeps you moving longer.',
    tags: ['Knee & hip pain', 'Shoulder problems', 'Strength plans'] },
  { from: 60, to: 90, label: 'Later life', team: 'orth', emoji: '🌳',
    text: 'Fall prevention, fragile bones and joint replacement. We explain every option, recovery time included, before you decide.',
    tags: ['Joint replacement', 'Fracture & fall care', 'Bone strength'] },
];

const teamInfo = {
  ped: { name: 'Paediatric team', color: '#F5A623' },
  orth: { name: 'Orthopaedic team', color: '#D9531D' },
  both: { name: 'Both teams, together', color: '#4A2E1B' },
};

const together = [
  'Fractures near growth plates',
  'Clubfoot and hip checks in babies',
  'Scoliosis in teenagers',
  'Limps and walking changes in children',
];

const concerns = [
  { who: 'For parents', icon: Baby, items: [
    { q: "My child isn't walking or talking like other kids their age.", a: 'Every child moves at their own pace. We check milestones against your child’s age and explain what is typical, what is worth watching, and what needs a closer look.' },
    { q: 'My toddler is a picky eater and I worry about growth.', a: 'We measure height and weight over time rather than judging one meal, then suggest simple food changes that fit your family.' },
    { q: 'My child walks with their feet turned in, or limps.', a: 'Many leg and foot shapes straighten out as children grow. We examine how your child moves and tell you clearly if anything needs treatment.' },
  ] },
  { who: 'For adults', icon: Bone, items: [
    { q: 'My knee hurts on stairs and I’ve started avoiding walks.', a: 'We find out whether it is wear in the joint, a ligament, or muscle weakness. Many cases improve without surgery.' },
    { q: 'I had a fall and I’m not sure if it’s a fracture.', a: 'Pain that stops you using a limb, swelling, or a changed shape needs an exam and imaging. Come in rather than wait.' },
    { q: 'I’m scared of joint replacement surgery.', a: 'That is a very common feeling. We walk you through the procedure, recovery time, and alternatives before you decide anything.' },
  ] },
];

const steps = [
  { title: 'We listen first', desc: 'You tell us the symptoms and history. For children, we also ask about birth, milestones and daily habits.' },
  { title: 'We examine and test', desc: 'A hands-on exam, plus X-rays or other scans only when they will change the plan.' },
  { title: 'We explain in plain words', desc: 'You leave knowing what we found, your options, and what recovery looks like.' },
];

const specialtyCards = {
  ped: [
    { icon: Smile, title: 'Developmental Monitoring', text: 'Child health assessments, milestone monitoring, and regular paediatrician consultations.', tone: 'amber' },
    { icon: Shield, title: 'Nutritional Mapping', text: 'Growth tracking and dietary advice matched to each stage of your child’s development.', tone: 'amber' },
  ],
  orth: [
    { icon: Bone, title: 'Trauma Treatment', text: 'Care for serious injuries, fracture stabilisation, and bone reconstruction surgery.', tone: 'orange' },
    { icon: Activity, title: 'Joint Replacements', text: 'Precise hip and knee replacement surgery to restore movement and function.', tone: 'orange' },
  ],
};

const tones = {
  amber: 'bg-[#F5A623]/10 text-[#F5A623]',
  orange: 'bg-[#D9531D]/10 text-[#D9531D]',
};

/* ---------- COMPONENTS ---------- */

function SpecialtyPanel({ id, img, emoji, alt }) {
  return (
    <Tabs.Panel id={id} className="w-full">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        <motion.div key={id} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative lg:col-span-2 min-h-[220px] sm:min-h-[280px] rounded-3xl overflow-hidden">
          <Photo src={img} alt={alt} emoji={emoji} className="h-full w-full" />
        </motion.div>
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {specialtyCards[id].map(({ icon: Icon, title, text, tone }) => (
            <Card key={title} variant="default"
              className="p-6 border border-[#EAE6DF] bg-white h-full flex flex-col transition-transform duration-300 hover:-translate-y-1">
              <Card.Header className="flex items-center gap-4 p-0">
                <div className={`p-3 rounded-xl ${tones[tone]}`}><Icon className="w-6 h-6" /></div>
                <Card.Title className="font-extrabold text-[#4A2E1B] text-base">{title}</Card.Title>
              </Card.Header>
              <Card.Content className="p-0 mt-4 flex-grow text-sm leading-relaxed text-slate-600">{text}</Card.Content>
            </Card>
          ))}
        </div>
      </div>
    </Tabs.Panel>
  );
}

function Concern({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white border border-[#EAE6DF] overflow-hidden">
      <button onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9531D]">
        <span className="font-semibold text-[#4A2E1B] text-sm sm:text-base">“{q}”</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="shrink-0 mt-0.5 text-[#D9531D]">
          <Plus className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* The memorable moment: drag through a lifetime, see who cares for you at each age. */
function LifeStages() {
  const [age, setAge] = useState(8);
  const stage = stages.find((s) => age >= s.from && age <= s.to) || stages[0];
  const team = teamInfo[stage.team];
  const pct = (age / 90) * 100;

  return (
    <div className="max-w-5xl mx-auto rounded-[2rem] bg-white border border-[#EAE6DF] p-6 sm:p-10 shadow-sm">
      {/* Track: paediatric care covers early years, orthopaedic care grows from childhood onward */}
      <div className="space-y-2" aria-hidden>
       
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 pt-1">
          <span>Paediatric care</span><span>Orthopaedic care</span>
        </div>
      </div>

      <div className="relative mt-4">
        <label htmlFor="age" className="sr-only">Choose an age</label>
        <input id="age" type="range" min={0} max={90} value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full h-2 cursor-pointer accent-[#D9531D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E1B]" />
        <motion.div className="absolute -top-9 -translate-x-1/2 bg-[#4A2E1B] text-white text-xs font-bold px-3 py-1 rounded-full pointer-events-none whitespace-nowrap"
          style={{ left: `${Math.min(Math.max(pct, 6), 94)}%` }}>
          {age === 90 ? '90+' : age} {age === 1 ? 'year' : 'years'}
        </motion.div>
      </div>

      <div className="mt-8 min-h-[220px] sm:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div key={stage.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-[auto_1fr] gap-5 items-start">
            <div className="text-5xl sm:text-6xl" aria-hidden>{stage.emoji}</div>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-2xl font-extrabold text-[#4A2E1B]">{stage.label}</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: team.color }}>
                  {team.name}
                </span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">{stage.text}</p>
              <ul className="flex flex-wrap gap-2 pt-1">
                {stage.tags.map((t) => (
                  <li key={t} className="text-xs font-semibold text-[#4A2E1B] bg-[#FCFAF6] border border-[#EAE6DF] px-3 py-1.5 rounded-full">{t}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Specialties() {
  const reduce = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };
  const inView = { initial: 'hidden', whileInView: 'visible', viewport: { once: true }, variants: reveal };

  return (
    <div className="pb-24 space-y-20 md:space-y-28 overflow-x-hidden">

      {/* HERO */}
      <section className="pt-14 md:pt-20 px-5 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-center lg:text-left">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-block text-[#D9531D] font-extrabold text-xs tracking-wider uppercase bg-[#D9531D]/10 px-3 py-1 rounded-full">
            Clinical Divisions
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#4A2E1B] leading-[1.1]">
            One clinic for growing children and healing bones
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-600 max-w-xl mx-auto lg:mx-0 text-base leading-relaxed">
            Our paediatric and orthopaedic teams look after child wellness milestones and complex recovery, with clear answers at every step.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a href="#lifetime"
              className="inline-flex items-center gap-2 bg-[#D9531D] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#b94416] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]">
              Find care for your age <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#concerns"
              className="inline-flex items-center gap-2 border border-[#4A2E1B]/20 text-[#4A2E1B] font-bold text-sm px-6 py-3 rounded-full hover:bg-[#4A2E1B]/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]">
              See common worries
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
            <Photo src={ortho_paed} alt="Doctor examining a smiling child" emoji="👩🏽‍⚕️" priority className="h-full w-full" />
          </div>
          <motion.div animate={reduce ? {} : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-2 sm:-left-6 bottom-8 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#EAE6DF]">
            <span className="p-2 rounded-xl bg-[#F5A623]/15 text-[#F5A623]"><Stethoscope className="w-5 h-5" /></span>
            <span className="text-xs font-bold text-[#4A2E1B]">Paediatric<br />check-ups</span>
          </motion.div>
          <motion.div animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-2 sm:-right-6 top-8 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#EAE6DF]">
            <span className="p-2 rounded-xl bg-[#D9531D]/10 text-[#D9531D]"><Bone className="w-5 h-5" /></span>
            <span className="text-xs font-bold text-[#4A2E1B]">Bone &amp; joint<br />care</span>
          </motion.div>
        </motion.div>
      </section>

      {/* LIFE STAGES: concept section */}
      <section id="lifetime" className="px-5 sm:px-6 scroll-mt-24">
        <motion.div {...inView} className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A2E1B]">Care that moves with your age</h2>
          <p className="text-slate-600 text-sm md:text-base">Slide to an age and see which team looks after you, and what we usually help with.</p>
        </motion.div>
        <motion.div {...inView}><LifeStages /></motion.div>
      </section>

      {/* TABS */}
      <section className="px-5 sm:px-6 max-w-7xl mx-auto">
        <Tabs className="w-full flex flex-col items-center">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Medical Specialties">
              <Tabs.Tab id="ped">👶🏻 Paediatric<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="orth">🦴Orthopaedic<Tabs.Indicator /></Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <SpecialtyPanel id="ped" img="/images/paediatrics.jpg" emoji="👶🏻" alt="Paediatrician checking a toddler" />
          <SpecialtyPanel id="orth" img="/images/orthopaedics.jpg" emoji="🦴" alt="Orthopaedic surgeon reviewing an X-ray" />
        </Tabs>
      </section>

      {/* WHERE THE TWO TEAMS MEET */}
      <section className="px-5 sm:px-6 max-w-6xl mx-auto">
        <motion.div {...inView} className="text-center space-y-3 max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 text-[#D9531D] font-extrabold text-xs uppercase bg-[#D9531D]/10 px-3 py-1 rounded-full">
            <Handshake className="w-4 h-4" /> Under one roof
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A2E1B]">Some problems need both teams</h2>
          <p className="text-slate-600 text-sm md:text-base">A child’s bones are still growing, so the best care often comes from a bone specialist and a child specialist working together.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
          <motion.div {...inView}
            className="order-1 md:order-none rounded-3xl bg-[#F5A623]/10 border border-[#F5A623]/30 p-7 md:pr-12 md:py-12 space-y-3">
            <Users className="w-7 h-7 text-[#F5A623]" />
            <h3 className="font-extrabold text-[#4A2E1B] text-lg">Paediatric team</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Growth, nutrition, development and everyday child health.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: reduce ? 1 : 0.92 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="order-2 md:order-none relative z-10 rounded-3xl bg-[#4A2E1B] text-[#FCFAF6] p-7 sm:p-8 md:-mx-6 shadow-xl space-y-4">
            <Footprints className="w-7 h-7 text-[#F5A623]" />
            <h3 className="font-extrabold text-lg">Where they work together</h3>
            <ul className="space-y-2.5">
              {together.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-[#EAE6DF]">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#F5A623] shrink-0" />{t}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...inView}
            className="order-3 md:order-none rounded-3xl bg-[#D9531D]/10 border border-[#D9531D]/30 p-7 md:pl-12 md:py-12 space-y-3">
            <Bone className="w-7 h-7 text-[#D9531D]" />
            <h3 className="font-extrabold text-[#4A2E1B] text-lg">Orthopaedic team</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Fractures, joints, spine, sports injuries and surgery.</p>
          </motion.div>
        </div>
      </section>

      {/* COMMON WORRIES */}
      <section id="concerns" className="py-16 md:py-24 px-5 sm:px-6 bg-[#FCFAF6] scroll-mt-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div {...inView} className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-[#D9531D] font-extrabold text-xs uppercase bg-[#D9531D]/10 px-3 py-1 rounded-full">
              <HeartHandshake className="w-4 h-4" /> You’re not alone
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A2E1B]">Does this sound familiar?</h2>
            <p className="text-slate-600 text-sm md:text-base">These are the worries we hear most. Tap one to see how we would approach it.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {concerns.map(({ who, icon: Icon, items }) => (
              <div key={who} className="space-y-4">
                <h3 className="flex items-center gap-2 font-extrabold text-[#4A2E1B] text-lg">
                  <Icon className="w-5 h-5 text-[#D9531D]" /> {who}
                </h3>
                {items.map((c) => <Concern key={c.q} {...c} />)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISIT STEPS: the connecting line draws itself */}
      <section className="px-5 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div {...inView} className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A2E1B]">Your visit, step by step</h2>
            <p className="text-slate-600 text-sm md:text-base">A typical consultation, designed to put communication first.</p>
          </motion.div>
          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div aria-hidden initial={{ scaleX: reduce ? 1 : 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ originX: 0 }}
              className="hidden md:block absolute top-9 left-[16%] right-[16%] h-0.5 bg-[#D9531D]/40" />
            {steps.map((s, i) => (
              <motion.li key={s.title}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative bg-white p-7 rounded-3xl border border-[#EAE6DF] space-y-3 text-center md:text-left">
                <span className="mx-auto md:mx-0 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#D9531D] text-white text-lg font-black">{i + 1}</span>
                <h3 className="text-lg font-bold text-[#4A2E1B]">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

    </div>
  );
}