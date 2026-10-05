'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, Tooltip, Chip, Button } from '@heroui/react';
import { BookOpen, ShieldCheck, HeartHandshake, GraduationCap } from 'lucide-react';

// Static assets and configurations declared globally to avoid scoping or render allocation errors
const waLink = "https://api.whatsapp.com/send?phone=919100192367&text=Hello%20Saashi%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.";

const scrollReveal = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const doctors = [
  {
    emoji: "👶🏻",
    name: "Dr. Geshmanjali",
    role: "Pediatrician & Professor",
    chipText: "Pediatric Head",
    desc: "Associate Professor of Pediatrics. Highly focused on childhood developmental screening, baby metrics monitoring, pediatric diagnostics, and parent education paths.",
    academic: "Pediatric Care Educator",
    tip: "Childhood Growth and Development Expert",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
  },
  {
    emoji: "🦴",
    name: "Dr. Sunil",
    role: "Trauma & Joint Replacement Surgeon",
    chipText: "Orthopedic Chief",
    desc: "Specialized Orthopedic Surgeon focused on complex trauma treatments, bone alignments, and joint replacement procedures.",
    academic: "Joint & Fracture Care Expert",
    tip: "Orthopedic Structural Alignment Surgeon",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
  }
];

const galleryItems = [
  { title: "Nurturing Pediatrics Zone", label: "Fear-free child-friendly environment", img: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600" },
  { title: "Sterilized Orthopaedic Suite", label: "Equipped for structural joint diagnostics", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" },
  { title: "Empathetic Counselling Hub", label: "Where we sit to talk, teach & heal", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600" }
];

const valuePillars = [
  { 
    icon: HeartHandshake, 
    title: "Patient-Centered Empathy", 
    desc: "We don't believe in rushed consults. We devote active time to understand, explain, and instruct." 
  },
  { 
    icon: GraduationCap, 
    title: "Evidence-Based Academics", 
    desc: "Headed by an Associate Professor, our pediatric models strictly mirror validated clinical guidelines." 
  },
  { 
    icon: ShieldCheck, 
    title: "Surgical Mastery", 
    desc: "Hands-on, precise joint adjustments and trauma corrections directed with orthopedic accuracy." 
  }
];

const principles = [
  { title: "Empathetic Connection", text: "Providing healthcare where our practitioners sit down to talk and understand your medical needs first." },
  { title: "Academic Standards", text: "Leveraging diagnostic models and ongoing teaching parameters directly from GITAM clinical frameworks." },
  { title: "Practical Precision", text: "Treating critical physical challenges using precise orthopedic surgical techniques." }
];

export default function About() {
  return (
    <div className="pb-24 space-y-24 bg-[#FCFAF6]">
      
      {/* SECTION 1: About Hero */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center space-y-4">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#D9531D] font-extrabold text-xs tracking-wider uppercase bg-[#D9531D]/10 px-4 py-1.5 rounded-full w-fit mx-auto block">
          Our Team & Mission
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold text-[#4A2E1B] tracking-tight leading-tight">
          Combining Clinical Academics <br />
          With <span className="text-[#D9531D]">Empathetic Healing</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Learn about our senior specialists who bring deep practical skill, continuous surgical experience, and active academic teaching to Visakhapatnam.
        </motion.p>
      </section>

      {/* SECTION 2: Doctors Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {doctors.map((doc, idx) => (
            <motion.div 
              key={idx}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal}
              className="h-full"
            >
              <Card variant="default" className="p-8 border border-[#EAE6DF] bg-[#FCFAF6] hover:border-[#D9531D] hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between">
                <Card.Header className="flex-col items-start gap-4 p-0">
                  <div className="flex items-center gap-4 justify-between w-full">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#EAE6DF]/40 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                        {doc.emoji}
                      </div>
                      <div>
                        <Tooltip content={doc.tip} placement="top">
                          <Card.Title className="text-2xl font-bold text-[#4A2E1B] cursor-pointer hover:text-[#D9531D] transition-colors">{doc.name}</Card.Title>
                        </Tooltip>
                        <Card.Description className="text-[#D9531D] font-bold text-xs">{doc.role}</Card.Description>
                      </div>
                    </div>
                    <Chip size="sm" className="bg-[#F5A623]/20 text-[#4A2E1B] font-bold text-[10px] uppercase tracking-wider">{doc.chipText}</Chip>
                  </div>
                </Card.Header>

                <Card.Content className="p-0 mt-6 flex-grow space-y-4">
                  <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4 border border-[#EAE6DF]/40 shadow-sm">
                    {/* Rendered cleanly using safe native HTML element with no domains restriction */}
                    <img src={doc.img} alt={doc.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{doc.desc}</p>
                </Card.Content>

                <Card.Footer className="p-0 mt-6 pt-6 border-t border-[#EAE6DF] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                    <BookOpen className="w-4 h-4 text-[#F5A623]" />
                    <span>{doc.academic}</span>
                  </div>
                  <Button as="a" href={waLink} target="_blank" size="sm" className="bg-[#D9531D] text-white font-extrabold text-xs rounded-lg px-4 py-2 hover:bg-[#D9531D]/90">
                    Schedule Visit
                  </Button>
                </Card.Footer>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Why Academics Matter */}
      <section className="bg-slate-50 py-24 px-6 border-y border-[#EAE6DF]/30 relative">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal} className="space-y-6">
            <span className="text-[#D9531D] font-extrabold text-xs tracking-wider uppercase bg-[#D9531D]/10 px-3.5 py-1.5 rounded-full w-fit block">
              The Teaching Advantage
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#4A2E1B] tracking-tight leading-tight">
              Why Having Medical Educators <br />
              As Your Direct Doctors Matters
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dr. Geshmanjali serves as an Associate Professor of Pediatrics. When a treating doctor is also actively teaching the next generation of physicians, they must remain integrated with international treatment standards, drug safety updates, and clinical methodologies.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              This academic rigor is directly integrated into Saashi Clinic. You receive evidence-based pediatric pathways and trauma care based on precise clinical science—not just diagnostic theories.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal} className="grid grid-cols-1 gap-6">
            {valuePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#EAE6DF]/40 shadow-sm flex gap-4 items-start">
                  <div className="p-3 bg-[#D9531D]/10 rounded-xl text-[#D9531D] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#4A2E1B] text-base">{pillar.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Our Clinical Environment Gallery */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-[#D9531D] font-extrabold text-xs uppercase bg-[#D9531D]/10 px-3 py-1 rounded-full w-fit mx-auto block">Our Atmosphere</span>
          <h2 className="text-3xl font-extrabold text-[#4A2E1B] tracking-tight">Our Safe, Welcoming Clinic Environment</h2>
          <p className="text-slate-600 text-sm">Tour the spaces designed to make children and physical trauma patients feel comfortable and secure.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {galleryItems.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group space-y-3"
            >
              <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-[#EAE6DF]/30 shadow-sm">
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="px-1">
                <h4 className="font-extrabold text-[#4A2E1B] text-sm group-hover:text-[#D9531D] transition-colors">{item.title}</h4>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-0.5">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Clinic Principles */}
      <section className="bg-[#4A2E1B] text-[#FCFAF6] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#F5A623_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal}
            className="text-center space-y-3"
          >
            <span className="text-[#F5A623] font-extrabold text-xs tracking-widest bg-white/10 px-4 py-1.5 rounded-full w-fit mx-auto block uppercase font-bold">Core Code</span>
            <h2 className="text-3xl font-extrabold tracking-tight">How We Practice Care</h2>
            <p className="text-[#EAE6DF] text-sm">Integrating practical precision with direct and open clinical conversations.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((pr, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#F5A623]/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-[#F5A623]">{pr.title}</h3>
                <p className="text-sm text-[#EAE6DF]/80 leading-relaxed">{pr.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Timings Table */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-3xl mx-auto space-y-12">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal}
            className="text-center space-y-3"
          >
            <span className="text-[#D9531D] font-extrabold text-xs uppercase bg-[#D9531D]/10 px-3 py-1 rounded-full w-fit mx-auto block">Availability</span>
            <h2 className="text-3xl font-extrabold text-[#4A2E1B] tracking-tight">Clinic Operating Timings</h2>
            <p className="text-slate-600 text-sm">Check our daily clinic operational hours and schedule your visits accordingly.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollReveal}
            className="border border-[#EAE6DF] rounded-3xl overflow-hidden shadow-sm"
          >
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#4A2E1B] text-[#FCFAF6] font-bold">
                  <th className="p-4">Day</th>
                  <th className="p-4">Timings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE6DF] text-slate-700">
                <tr className="bg-[#FCFAF6]">
                  <td className="p-4 font-bold">Monday - Friday</td>
                  <td className="p-4">10:00 AM - 1:00 PM | 5:00 PM - 8:00 PM</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">Saturday</td>
                  <td className="p-4">10:00 AM - 2:00 PM</td>
                </tr>
                <tr className="bg-[#FCFAF6]">
                  <td className="p-4 font-bold">Sunday</td>
                  <td className="p-4 text-[#D9531D] font-bold">Emergency & Prior Call Bookings Only</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

    </div>
  );
}