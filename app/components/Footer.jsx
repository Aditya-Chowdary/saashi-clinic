import React from 'react';
import Link from 'next/link';
import { HeartPulse, Phone, MapPin, ExternalLink } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const waLink = "https://wa.me/919100192367?text=Hello%20Saashi%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.";

  return (
    <footer className="bg-[#4A2E1B] text-[#EAE6DF] pt-16 pb-12 border-t border-[#4A2E1B]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        
        {/* Clinical details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Logo className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-white uppercase">Saashi Clinic</span>
              <span className="text-[8px] text-[#F5A623] tracking-widest uppercase">Paediatric & Orthopaedics</span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-[#EAE6DF]/70 max-w-xs">
            We talk, teach & heal. Skill beats theory. Leading specialized pediatrics and pediatric-to-adult orthopedic care in Visakhapatnam.
          </p>
        </div>

        {/* Location coordinates */}
        <div className="space-y-4">
          <h4 className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">Our Practice</h4>
          <div className="flex items-start gap-2.5 text-xs leading-relaxed">
            <MapPin className="w-5 h-5 text-[#D9531D] shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold">Saashi Clinic</p>
              <p>Beside Swagrama Foods,</p>
              <p>Isakhathota Junction,</p>
              <p>Visakhapatnam - 530022</p>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Actions */}
        <div className="space-y-4">
          <h4 className="text-[#F5A623] font-bold text-xs uppercase tracking-widest">Connect</h4>
          <div className="flex items-start gap-2.5 text-xs">
            <Phone className="w-5 h-5 text-[#D9531D] shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-bold">Direct Messaging</p>
              <a 
                href={waLink} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[#F5A623] hover:underline text-base font-extrabold block mt-1 flex items-center gap-1.5"
              >
                <span>9100192367</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-[#EAE6DF]/40">
        &copy; {new Date().getFullYear()} Saashi Clinic. All rights reserved.
      </div>
    </footer>
  );
}