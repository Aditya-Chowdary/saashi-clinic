'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Card, Tabs } from '@heroui/react';
import {
  Smile, Bone, Shield, Activity, Baby, Stethoscope,
  HeartHandshake, Plus, ChevronRight,
} from 'lucide-react';

/* Image with a graceful fallback, so the page looks fine before photos are added.
   Put your photos in /public/images/ using the file names used below. */
function Photo({ src, alt, emoji = '🩺', className = '', priority = false }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#F5A623]/30 to-[#D9531D]/20 text-6xl ${className}`}
      >
        {emoji}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, 50vw"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

const concerns = [
  {
    who: 'For parents',
    icon: Baby,
    items: [
      { q: "My child isn't walking or talking like other kids their age.", a: 'Every child moves at their own pace. We check milestones against your child’s age and explain what is typical, what is worth watching, and what needs a closer look.' },
      { q: 'My toddler is a picky eater and I worry about growth.', a: 'We measure height and weight over time rather than judging one meal, then suggest simple food changes that fit your family.' },
      { q: 'My child walks with their feet turned in, or limps.', a: 'Many leg and foot shapes straighten out as children grow. We examine how your child moves and tell you clearly if anything needs treatment.' },
    ],
  },
  {
    who: 'For adults',
    icon: Bone,
    items: [
      { q: 'My knee hurts on stairs and I’ve started avoiding walks.', a: 'We find out whether it is wear in the joint, a ligament, or muscle weakness. Many cases improve without surgery.' },
      { q: 'I had a fall and I’m not sure if it’s a fracture.', a: 'Pain that stops you using a limb, swelling, or a changed shape needs an exam and imaging. Come in rather than wait.' },
      { q: 'I’m scared of joint replacement surgery.', a: 'That is a very common feeling. We walk you through the procedure, recovery time, and alternatives before you decide anything.' },
    ],
  },
];

const steps = [
  { title: 'Diagnostic Discussion', desc: 'We sit down together to discuss symptoms, medical history, and childhood development factors.' },
  { title: 'Comprehensive Testing', desc: 'Using advanced diagnostic tracking models to assess bone structure or neonatal parameters.' },
  { title: 'Active Teaching Guidance', desc: 'We explain our findings clearly, helping you understand your recovery path.' },
];

const specialtyCards = {
  ped: [
    { icon: Smile, title: 'Developmental Monitoring', text: 'Comprehensive child health assessments, developmental milestone monitoring, and regular pediatrician consultations.', tone: 'amber' },
    { icon: Shield, title: 'Nutritional Mapping', text: 'Growth parameter analysis and pediatric dietary recommendations, aligned with child development stages.', tone: 'amber' },
  ],
  orth: [
    { icon: Bone, title: 'Trauma Treatment', text: 'Treatment for severe physical trauma, fracture stabilization, and bone reconstruction surgeries.', tone: 'orange' },
    { icon: Activity, title: 'Joint Replacements', text: 'Precise surgical care for hip and knee replacements to help restore movement and structural function.', tone: 'orange' },
  ],
};

const tones = {
  amber: 'bg-[#F5A623]/10 text-[#F5A623]',
  orange: 'bg-[#D9531D]/10 text-[#D9531D]',
};

function SpecialtyPanel({ id, img, emoji, alt }) {
  return (
    <Tabs.Panel id={id} className="w-full">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative lg:col-span-2 min-h-[220px] sm:min-h-[280px] rounded-3xl overflow-hidden"
        >
          <Photo src={img} alt={alt} emoji={emoji} className="h-full w-full" />
        </motion.div>

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {specialtyCards[id].map(({ icon: Icon, title, text, tone }) => (
            <Card key={title} variant="default" className="p-6 border border-[#EAE6DF] bg-white h-full flex flex-col transition-transform duration-300 hover:-translate-y-1">
              <Card.Header className="flex items-center gap-4 p-0">
                <div className={`p-3 rounded-xl ${tones[tone]}`}>
                  <Icon className="w-6 h-6" />
                </div>
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
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#D9531D]"
      >
        <span className="font-semibold text-[#4A2E1B] text-sm sm:text-base">“{q}”</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="shrink-0 mt-0.5 text-[#D9531D]">
          <Plus className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 text-sm leading-relaxed text-slate-600"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Specialties() {
  const reduce = useReducedMotion();
  const reveal = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <div className="pb-24 space-y-20 md:space-y-28 overflow-x-hidden">

      {/* HERO: headline + photo with floating badges */}
      <section className="pt-14 md:pt-20 px-5 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5 text-center lg:text-left">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block text-[#D9531D] font-extrabold text-xs tracking-wider uppercase bg-[#D9531D]/10 px-3 py-1 rounded-full">
            Clinical Divisions
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#4A2E1B] leading-[1.1]">
            One clinic for growing children and healing bones
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-slate-600 max-w-xl mx-auto lg:mx-0 text-base leading-relaxed">
            Our paediatric and orthopaedic teams look after child wellness milestones and complex recovery, with clear answers at every step.
          </motion.p>
          <motion.a
            href="#concerns"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-[#D9531D] text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-[#b94416] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]"
          >
            See common worries <ChevronRight className="w-4 h-4" />
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
            <Photo src="/images/hero-doctor-child.jpg" alt="Doctor examining a smiling child" emoji="👩🏽‍⚕️" priority className="h-full w-full" />
          </div>
          <motion.div
            animate={reduce ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-2 sm:-left-6 bottom-8 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#EAE6DF]"
          >
            <span className="p-2 rounded-xl bg-[#F5A623]/15 text-[#F5A623]"><Stethoscope className="w-5 h-5" /></span>
            <span className="text-xs font-bold text-[#4A2E1B]">Paediatric<br />check-ups</span>
          </motion.div>
          <motion.div
            animate={reduce ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-2 sm:-right-6 top-8 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#EAE6DF]"
          >
            <span className="p-2 rounded-xl bg-[#D9531D]/10 text-[#D9531D]"><Bone className="w-5 h-5" /></span>
            <span className="text-xs font-bold text-[#4A2E1B]">Bone &amp; joint<br />care</span>
          </motion.div>
        </motion.div>
      </section>

      {/* TABS */}
      <section className="px-5 sm:px-6 max-w-7xl mx-auto">
        <Tabs className="w-full flex flex-col items-center">
          <Tabs.ListContainer>
            <Tabs.List aria-label="Medical Specialties">
              <Tabs.Tab id="ped">👶🏻 Paediatric Department<Tabs.Indicator /></Tabs.Tab>
              <Tabs.Tab id="orth">🦴 Orthopaedic Division<Tabs.Indicator /></Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <SpecialtyPanel id="ped" img="/images/paediatrics.jpg" emoji="👶🏻" alt="Paediatrician checking a toddler" />
          <SpecialtyPanel id="orth" img="/images/orthopaedics.jpg" emoji="🦴" alt="Orthopaedic surgeon reviewing an X-ray" />
        </Tabs>
      </section>

      {/* RELATABLE: common worries */}
      <section id="concerns" className="py-16 md:py-24 px-5 sm:px-6 bg-[#FCFAF6]">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="text-center space-y-3 max-w-2xl mx-auto">
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

      {/* JOURNEY */}
      <section className="px-5 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal} className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A2E1B]">Your visit, step by step</h2>
            <p className="text-slate-600 text-sm md:text-base">A typical consultation, designed to put communication first.</p>
          </motion.div>

          <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="hidden md:block absolute top-9 left-[16%] right-[16%] h-0.5 bg-[#EAE6DF]" aria-hidden />
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative bg-white p-7 rounded-3xl border border-[#EAE6DF] space-y-3 text-center md:text-left"
              >
                <span className="mx-auto md:mx-0 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#D9531D] text-white text-lg font-black">{i + 1}</span>
                <h3 className="text-lg font-bold text-[#4A2E1B]">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA with photo */}
      <section className="px-5 sm:px-6 max-w-6xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reveal}
          className="grid grid-cols-1 md:grid-cols-2 bg-[#4A2E1B] text-[#FCFAF6] rounded-[2rem] overflow-hidden"
        >
          <div className="p-8 sm:p-12 space-y-4 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold">Not sure which team to see?</h2>
            <p className="text-[#EAE6DF] text-sm leading-relaxed">Tell us what you’ve noticed. We’ll point you to the right specialist, and you can ask any question you have.</p>
            <a href="/contact" className="mt-2 inline-flex w-fit items-center gap-2 bg-[#F5A623] text-[#4A2E1B] font-bold text-sm px-6 py-3 rounded-full hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Book a consultation <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="relative min-h-[220px]">
            <Photo src="/images/family-clinic.jpg" alt="Family talking with their doctor" emoji="👨‍👩‍👧" className="h-full w-full" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}