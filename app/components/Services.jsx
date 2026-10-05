'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@heroui/react';
import { Activity, Smile, BookOpen, Layers } from 'lucide-react';

const specialtiesList = [
  {
    icon: Smile,
    title: 'Pediatric Care & Consultations',
    desc: 'Childhood developmental diagnostics, vaccinations, preventive checkups, and guidance for parents from professional pediatric educators.'
  },
  {
    icon: Layers,
    title: 'Orthopedic Trauma Solutions',
    desc: 'Emergency fracture treatments, bone reconstructions, and clinical alignment strategies designed to recover physical functionality.'
  },
  {
    icon: Activity,
    title: 'Joint Replacement & Mobility',
    desc: 'Minimally invasive joint reconstructions, arthritic pain management solutions, and personalized physical mechanics plans.'
  },
  {
    icon: BookOpen,
    title: 'Patient Teaching Programs',
    desc: 'Consultative sessions explaining physiological causes of skeletal or pediatric challenges, reducing long-term health anomalies.'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-teal-600 font-semibold text-xs tracking-wider uppercase bg-teal-100/50 px-3.5 py-1.5 rounded-full w-fit mx-auto block">
            Specialized Care
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Our Clinical Offerings</h2>
          <p className="text-slate-600 text-sm">
            Focusing on specialized child healthcare, orthopedic joint alignment, and trauma services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {specialtiesList.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                {/* HeroUI v3 Card */}
                <Card variant="default" className="p-6 border border-slate-100 bg-white hover:border-teal-200 transition-all duration-300 h-full flex flex-col justify-between">
                  <Card.Header className="flex items-center gap-4 p-0">
                    <div className="p-3 bg-teal-50 rounded-xl text-teal-600 h-fit border border-teal-100/50">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <Card.Title className="font-bold text-slate-900 text-lg">{service.title}</Card.Title>
                  </Card.Header>
                  <Card.Content className="p-0 mt-4 flex-grow">
                    <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                  </Card.Content>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}