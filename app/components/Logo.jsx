'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Logo({ className = "w-12 h-12" }) {
  return (
    <motion.div 
      className={`relative select-none overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Image 
        src="/images/logo.png" 
        alt="Saashi Clinic Logo" 
        fill
        sizes="(max-width: 768px) 100px, 150px"
        className="object-contain"
        priority
      />
    </motion.div>
  );
}