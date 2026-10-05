'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextField, Label, Input, Button } from '@heroui/react';
import { Calendar, Phone } from 'lucide-react';

export default function Appointment() {
  const [submitted, setSubmitted] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="appointment" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100"
        >
          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-950">Connect with Saashi Clinic</h2>
            <p className="text-slate-600 text-sm">Submit your phone number or dial us directly to arrange a consultation slot with our specialists.</p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 bg-emerald-50 text-emerald-800 rounded-3xl text-center border border-emerald-100"
            >
              <h3 className="text-lg font-bold font-semibold">Inquiry Details Submitted</h3>
              <p className="text-sm mt-1 text-emerald-600">A care assistant will contact you soon on the provided details.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* HeroUI v3 Compound Form Syntax */}
                <TextField type="text" isRequired className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Patient Name</Label>
                  <Input placeholder="John Doe" className="bg-white border border-slate-200 rounded-xl" />
                </TextField>

                <TextField type="tel" isRequired className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Phone Number</Label>
                  <Input placeholder="9100192367" className="bg-white border border-slate-200 rounded-xl" />
                </TextField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField type="date" isRequired className="flex flex-col gap-1.5">
                  <Label className="text-sm font-semibold text-slate-700">Select Date</Label>
                  <Input className="bg-white border border-slate-200 rounded-xl text-slate-600" />
                </TextField>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Select Specialty Unit</label>
                  <select className="h-12 px-3 bg-white border border-slate-200 rounded-xl text-slate-700 outline-none text-sm font-medium">
                    <option>Pediatrics (Dr. Geshmanjali)</option>
                    <option>Orthopedics / Trauma (Dr. Sunil)</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full h-14 rounded-xl font-bold text-base mt-4 shadow-sm flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Request Appointment Callback</span>
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}