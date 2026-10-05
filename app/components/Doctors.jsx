'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@heroui/react';
import { BookOpen } from 'lucide-react';

export default function Doctors() {
  const specialists = [
    {
      emoji: '👶🏻',
      name: 'Dr. Geshmanjali',
      role: 'Pediatrician & Professor',
      desc: 'An Associate Professor of Pediatrics. Highly focused on childhood development tracking, neonatal healthcare guidance, nutrition, and child clinical wellness. Dedicated to helping parents understand child development.',
      academic: 'Associate Professor & Consultant Pediatrician',
    },
    {
      emoji: '🦴',
      name: 'Dr. Sunil',
      role: 'Trauma & Joint Replacement Surgeon',
      desc: 'Expert orthopedic surgeon specializing in high-velocity trauma solutions, complex fracture corrections, and advanced joint reconstructions. Focused on treating structural and joint issues systematically.',
      academic: 'Trauma & Joint Reconstruction Specialist',
    }
  ];

  return (
    <section id="doctors" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-teal-600 font-semibold text-xs tracking-wider uppercase bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100 w-fit mx-auto block">
            Our Medical Team
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Meet Our Specialists</h2>
          <p className="text-slate-600 text-sm">
            Consult with specialists who combine clinical academic background with extensive hands-on surgical and diagnostic skill.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {specialists.map((doc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="h-full"
            >
              {/* HeroUI v3 Composed Card Pattern */}
              <Card variant="default" className="p-8 border border-slate-100 hover:border-teal-200 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between">
                <Card.Header className="flex-col items-start gap-4 p-0">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-100">
                      {doc.emoji}
                    </div>
                    <div>
                      <Card.Title className="text-xl md:text-2xl font-bold text-slate-900">{doc.name}</Card.Title>
                      <Card.Description className="text-teal-600 text-sm font-semibold">{doc.role}</Card.Description>
                    </div>
                  </div>
                </Card.Header>

                <Card.Content className="p-0 mt-5 flex-grow">
                  <p className="text-slate-600 text-sm leading-relaxed">{doc.desc}</p>
                </Card.Content>

                <div className="border-t border-slate-100 mt-6 pt-6 flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>{doc.academic}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}