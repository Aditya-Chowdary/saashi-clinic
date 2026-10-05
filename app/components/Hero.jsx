'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Calendar, Phone, CheckCircle } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-50 via-teal-50/10 to-emerald-50/15 pt-20 overflow-hidden">
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-teal-200/20 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-emerald-200/20 rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.span variants={itemVariants} className="text-teal-600 font-semibold text-xs tracking-wider uppercase bg-teal-50 px-4 py-1.5 rounded-full border border-teal-100 w-fit block">
            Saashi Clinic • Visakhapatnam
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            We Talk, <br />
            Teach & <span className="text-teal-600">Heal.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 font-semibold italic">
            Skill beats theory.
          </motion.p>
          <motion.p variants={itemVariants} className="text-base text-slate-500 max-w-lg leading-relaxed">
            Clinical excellence where patient conversation and instruction are valued as part of treatment. Our practitioners focus on explaining recovery paths clearly and treating childhood and skeletal disorders.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <Button as="a" href="tel:9100192367" variant="primary" className="h-14 px-8 rounded-full text-base font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Call: 9100192367</span>
            </Button>
            <Button as="a" href="#services" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold bg-white border-slate-200 text-slate-700">
              Our Services
            </Button>
          </motion.div>
        </motion.div>

        {/* Dynamic Philosophy Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="w-full max-w-md aspect-square bg-gradient-to-tr from-teal-600 to-emerald-500 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between p-8 text-white">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            
            <div className="z-10 space-y-2">
              <span className="text-xs uppercase tracking-widest text-teal-100 font-semibold">Our Approach</span>
              <h3 className="text-2xl font-bold">Practical Healing</h3>
            </div>

            <div className="z-10 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-200 mt-0.5 shrink-0" />
                <p className="text-sm"><strong>Clear Conversations:</strong> Ensuring parent and patient understanding.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-teal-200 mt-0.5 shrink-0" />
                <p className="text-sm"><strong>Hands-on Skill:</strong> Over two decades of specialized training and academic practice.</p>
              </div>
            </div>

            <div className="z-10 border-t border-white/20 pt-4 flex items-center justify-between text-xs text-teal-100">
              <span>Isakhathota Junction</span>
              <span>Visakhapatnam</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}