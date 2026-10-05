'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone, MessageCircle, Navigation, ChevronRight,
  Home, Info, Stethoscope, Mail, MapPin,
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import logoImg from '../../public/images/logo.png';
const logoSrc = typeof logoImg === 'object' && logoImg !== null ? logoImg.src : logoImg;

const PHONE = '919100192367';
const WA = `https://api.whatsapp.com/send?phone=${PHONE}&text=Hello%20Saashi%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.`;
const TEL = `tel:+${PHONE}`;
const MAP = 'https://www.google.com/maps/search/?api=1&query=Saashi+Clinic+Isakhathota+Junction+Visakhapatnam';

const menuItems = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'About Us', path: '/about', icon: Info },
  { label: 'Specialties', path: '/specialties', icon: Stethoscope },
  { label: 'Contact Us', path: '/contact', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  const isActive = (p) => (p === '/' ? pathname === '/' : pathname?.startsWith(p));

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const solid = isScrolled && !isOpen;
  const bar = 'block h-0.5 w-5 rounded-full bg-[#4A2E1B] origin-center transition-all duration-300';
  const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9531D]';

  const ui = (
    <>
      <nav
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${solid ? 'bg-[#FCFAF6]/95 backdrop-blur-md border-b border-[#EAE6DF] shadow-sm' : 'bg-transparent border-b border-transparent'}`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 transition-all duration-300 ${solid ? 'h-14 md:h-16' : 'h-16 md:h-20'}`}>

          {/* Brand */}
          <Link href="/" aria-label="Saashi Clinic home" className={`flex items-center gap-2.5 min-w-0 rounded-xl ${focus}`}>
            <img 
              src={logoSrc} 
              alt="Saashi Clinic Logo" 
              className={`shrink-0 transition-all duration-300 object-contain ${solid ? 'w-15 h-15' : 'w-15 h-15 md:w-15 md:h-15'}`} 
            />
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-extrabold text-sm md:text-lg tracking-tight uppercase text-[#4A2E1B] truncate">Saashi Clinic</span>
              <span className="text-[8px] md:text-[9px] tracking-wider md:tracking-widest uppercase font-bold text-[#D9531D] truncate">Paediatric &amp; Orthopaedics</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-bold">
            {menuItems.map(({ label, path }) => (
              <Link key={path} href={path} aria-current={isActive(path) ? 'page' : undefined}
                className={`relative px-3 lg:px-3.5 py-2 rounded-full whitespace-nowrap transition-colors ${focus} ${isActive(path) ? 'text-[#D9531D]' : 'text-[#4A2E1B]/85 hover:text-[#D9531D] hover:bg-[#EAE6DF]/40'}`}>
                {isActive(path) && (
                  <motion.span layoutId="navPill" className="absolute inset-0 rounded-full bg-[#D9531D]/10" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                )}
                <span className="relative">{label}</span>
              </Link>
            ))}

            {/* Separate contact button */}
            <div className="flex items-center gap-2 ml-2 lg:ml-3">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 h-10 px-4 lg:px-5 rounded-full bg-[#D9531D] text-white text-xs font-extrabold shadow-md shadow-[#D9531D]/25 transition-all hover:bg-[#c24a19] hover:-translate-y-0.5 ${focus}`}>
                <MessageCircle className="w-4 h-4" />
                <span className="whitespace-nowrap">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mobile: quick call + hamburger */}
          <div className="md:hidden flex items-center shrink-0">
            <a href={TEL} aria-label="Call the clinic" className={`p-2.5 rounded-full text-[#D9531D] hover:bg-[#D9531D]/10 ${focus}`}><Phone className="w-5 h-5" /></a>
            <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close menu' : 'Open menu'} aria-expanded={isOpen} aria-controls="mobile-menu"
              className={`flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#EAE6DF]/50 transition-colors ${focus}`}>
              <span className="flex flex-col gap-[5px]">
                <span className={`${bar} ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`${bar} ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
                <span className={`${bar} ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>

        <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[#F5A623] to-[#D9531D]" aria-hidden />
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu"
            initial={{ clipPath: 'circle(0px at calc(100% - 36px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 36px) 32px)' }}
            exit={{ clipPath: 'circle(0px at calc(100% - 36px) 32px)' }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#FCFAF6] overflow-y-auto overscroll-contain">
            <div className="relative min-h-full flex flex-col px-5 pt-20 pb-6">
              <ul className="space-y-1">
                {menuItems.map(({ label, path, icon: Icon }, i) => (
                  <motion.li key={path} initial={{ opacity: 0, x: reduce ? 0 : 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease: 'easeOut' }}>
                    <Link href={path} onClick={() => setIsOpen(false)} aria-current={isActive(path) ? 'page' : undefined}
                      className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-bold transition-colors ${isActive(path) ? 'bg-[#D9531D]/10 text-[#D9531D]' : 'text-[#4A2E1B] active:bg-[#EAE6DF]/50'}`}>
                      <Icon className="w-5 h-5 shrink-0" />
                      <span className="flex-1">{label}</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div initial={{ opacity: 0, y: reduce ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.5, duration: 0.45 }} className="mt-auto pt-8 space-y-2.5">
                <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 h-12 rounded-xl bg-[#D9531D] text-white font-bold text-sm shadow-md shadow-[#D9531D]/25 active:scale-[0.98] transition-transform">
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a href={TEL} className="flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-[#4A2E1B] text-[#4A2E1B] font-bold text-xs active:bg-[#4A2E1B] active:text-white transition-colors"><Phone className="w-4 h-4" /> Call</a>
                  <a href={MAP} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-[#4A2E1B] text-[#4A2E1B] font-bold text-xs active:bg-[#4A2E1B] active:text-white transition-colors"><Navigation className="w-4 h-4" /> Directions</a>
                </div>
                <p className="flex items-start justify-center gap-1.5 pt-2 text-[11px] leading-snug text-slate-500 text-center">
                  <MapPin className="w-3.5 h-3.5 text-[#D9531D] shrink-0 mt-px" /> Beside Swagrama Foods, Isakhathota Junction, Visakhapatnam
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // Rendering into <body> keeps the header pinned even if a parent layout
  // element has a transform, filter or overflow that would break position: fixed.
  return mounted ? createPortal(ui, document.body) : ui;
}