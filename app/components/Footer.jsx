'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, ArrowUpRight, ArrowUp, MessageCircle } from 'lucide-react';
import logoImg from '../../public/images/logo.png';

// Handle Next.js static asset object wrapper resolution safely
const logoSrc = typeof logoImg === 'object' && logoImg !== null ? logoImg.src : logoImg;

const WA_LINK =
  'https://wa.me/919100192367?text=Hello%20Saashi%20Clinic,%20I%20would%20like%20to%20book%20an%20appointment.';
const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Saashi+Clinic+Isakhathota+Junction+Visakhapatnam';

// Edit these to match your real routes
const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Reveal the footer content once, when it scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      ref={ref}
      className={`sf-root relative overflow-hidden bg-[#4A2E1B] text-[#EAE6DF] ${visible ? 'sf-in' : ''}`}
    >
      {/* Animated top accent line */}
      <div className="sf-line absolute inset-x-0 top-0 h-[3px]" />

      {/* Ambient glow */}
      <div className="sf-blob sf-blob-a pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[#D9531D]/25 blur-3xl" />
      <div className="sf-blob sf-blob-b pointer-events-none absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-[#F5A623]/15 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* Call-to-action band */}
        <div
          className="sf-reveal mb-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm md:flex-row md:items-center md:p-8"
          style={{ '--i': 0 }}
        >
          <div>
            <h3 className="text-xl font-extrabold text-white md:text-2xl">
              Need to see a doctor for your child?
            </h3>
            <p className="mt-1 text-sm text-[#EAE6DF]/70">
              Message us on WhatsApp and we will help you book a visit.
            </p>
          </div>

          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="sf-cta group relative inline-flex shrink-0 items-center gap-2 rounded-full bg-[#F5A623] px-6 py-3 text-sm font-bold text-[#4A2E1B] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <MessageCircle className="h-4 w-4" />
            Book on WhatsApp
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sf-reveal space-y-4 lg:col-span-1" style={{ '--i': 1 }}>
            <div className="flex items-center gap-3">
              <div className="sf-logo rounded-xl">
                <img src={logoSrc} alt="" className="h-11 w-11 object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-extrabold uppercase tracking-tight text-white">
                  Saashi Clinic
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#F5A623]">
                  Paediatric &amp; Orthopaedics
                </span>
              </div>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-[#EAE6DF]/70">
              We talk, teach &amp; heal. Skill beats theory. Specialised paediatric and
              paediatric-to-adult orthopaedic care in Visakhapatnam.
            </p>
          </div>

          {/* Quick links */}
          <div className="sf-reveal space-y-4" style={{ '--i': 2 }}>
            <h4 className="text-sm font-bold text-[#F5A623]">Quick links</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="sf-link text-[#EAE6DF]/80 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location */}
          <div className="sf-reveal space-y-4" style={{ '--i': 3 }}>
            <h4 className="text-sm font-bold text-[#F5A623]">Visit us</h4>
            <a
              href={MAP_LINK}
              target="_blank"
              rel="noreferrer"
              className="sf-card group flex items-start gap-3 rounded-xl p-3 -m-3 text-xs leading-relaxed"
            >
              <span className="sf-icon mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9531D]/15 text-[#D9531D]">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-bold text-white">Saashi Clinic</span>
                <span className="block text-[#EAE6DF]/80">Beside Swagrama Foods,</span>
                <span className="block text-[#EAE6DF]/80">Isakhathota Junction,</span>
                <span className="block text-[#EAE6DF]/80">Visakhapatnam - 530022</span>
                <span className="mt-1.5 inline-flex items-center gap-1 text-[#F5A623]">
                  Get directions
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </div>

          {/* Contact */}
          <div className="sf-reveal space-y-4" style={{ '--i': 4 }}>
            <h4 className="text-sm font-bold text-[#F5A623]">Contact</h4>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="sf-card group flex items-start gap-3 rounded-xl p-3 -m-3 text-xs"
            >
              <span className="sf-icon sf-ring relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D9531D]/15 text-[#D9531D]">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-bold text-white">WhatsApp us</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-base font-extrabold text-[#F5A623]">
                  9100192367
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="sf-reveal mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-[#EAE6DF]/50 sm:flex-row"
          style={{ '--i': 5 }}
        >
          <p>&copy; {new Date().getFullYear()} Saashi Clinic. All rights reserved.</p>
          <button
            type="button"
            onClick={backToTop}
            className="sf-top group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[#EAE6DF]/80 transition-colors duration-300 hover:border-[#F5A623] hover:text-[#F5A623] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5A623]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      <style>{`
        /* Staggered entrance, plays once when the footer enters the viewport */
        .sf-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1);
          transition-delay: calc(var(--i, 0) * 100ms);
        }
        .sf-in .sf-reveal { opacity: 1; transform: none; }

        /* Flowing gradient line along the top edge */
        .sf-line {
          background: linear-gradient(90deg, #D9531D, #F5A623, #D9531D, #F5A623);
          background-size: 300% 100%;
          animation: sf-flow 8s linear infinite;
        }
        @keyframes sf-flow { to { background-position: -300% 0; } }

        /* Slow drifting background glow */
        .sf-blob-a { animation: sf-drift-a 14s ease-in-out infinite alternate; }
        .sf-blob-b { animation: sf-drift-b 18s ease-in-out infinite alternate; }
        @keyframes sf-drift-a { to { transform: translate(60px, 40px) scale(1.15); } }
        @keyframes sf-drift-b { to { transform: translate(-50px, -30px) scale(1.1); } }

        /* WhatsApp button soft pulse */
        .sf-cta::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 9999px;
          box-shadow: 0 0 0 0 rgba(245,166,35,.55);
          animation: sf-pulse 2.6s ease-out infinite;
          pointer-events: none;
        }
        @keyframes sf-pulse {
          0% { box-shadow: 0 0 0 0 rgba(245,166,35,.55); }
          70%, 100% { box-shadow: 0 0 0 14px rgba(245,166,35,0); }
        }

        /* Phone icon ring */
        .sf-ring::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: 9999px;
          border: 1.5px solid #D9531D;
          animation: sf-ping 2.4s cubic-bezier(0,0,.2,1) infinite;
        }
        @keyframes sf-ping {
          0% { transform: scale(1); opacity: .7; }
          80%, 100% { transform: scale(1.7); opacity: 0; }
        }

        /* Hover: icon fills, card nudges */
        .sf-card { transition: background-color .3s ease, transform .3s ease; }
        .sf-card:hover { background-color: rgba(255,255,255,.04); transform: translateX(3px); }
        .sf-icon { transition: background-color .3s ease, color .3s ease, transform .3s ease; }
        .sf-card:hover .sf-icon { background-color: #D9531D; color: #fff; transform: rotate(-8deg) scale(1.08); }

        /* Logo tilt */
        .sf-logo { transition: transform .4s cubic-bezier(.2,.7,.2,1); }
        .sf-logo:hover { transform: rotate(-6deg) scale(1.06); }

        /* Link underline that grows from the left */
        .sf-link {
          display: inline-block;
          background: linear-gradient(#F5A623, #F5A623) left bottom / 0% 1.5px no-repeat;
          padding-bottom: 2px;
          transition: background-size .35s ease, color .25s ease, transform .25s ease;
        }
        .sf-link:hover { background-size: 100% 1.5px; transform: translateX(4px); }

        @media (prefers-reduced-motion: reduce) {
          .sf-reveal { opacity: 1; transform: none; transition: none; }
          .sf-line, .sf-blob, .sf-cta::after, .sf-ring::after { animation: none; }
          .sf-card, .sf-icon, .sf-logo, .sf-link { transition: none; }
        }
      `}</style>
    </footer>
  );
}