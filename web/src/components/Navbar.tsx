import React from 'react';
import { Smartphone, Utensils, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-center">
      <div className="w-full max-w-5xl flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[28px] px-6 py-3 border border-white/40 dark:border-white/10 shadow-2xl shadow-black/5">
        <div className="flex items-center gap-2">
          <div className="relative w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center shadow-lg shadow-primary/30 overflow-hidden group">
            <Utensils className="text-white relative z-10" size={22} />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1 right-1 z-20"
            >
              <Sparkles className="text-warning fill-warning" size={12} />
            </motion.div>
          </div>
          <span className="text-2xl font-black tracking-tighter ml-1 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">KOUL</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-black text-xs uppercase tracking-[0.2em]">Features</a>
          <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-black text-xs uppercase tracking-[0.2em]">About</a>
          <a href="#faq" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-black text-xs uppercase tracking-[0.2em]">FAQ</a>
        </div>

        <button className="bg-primary hover:bg-primary/90 text-white px-7 py-3 rounded-[20px] font-black text-sm flex items-center gap-2 transition-all shadow-xl shadow-primary/20 active:scale-95 group">
          CONNECTI <Smartphone size={18} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>
    </nav>
  );
};
