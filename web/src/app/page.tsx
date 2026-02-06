"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Droplets, 
  Plus, 
  Check, 
  Flame, 
  CheckCircle2, 
  Trophy, 
  ArrowRight,
  Smartphone,
  ChevronRight,
  Camera,
  Utensils,
  Search,
  Star,
  Home,
  User,
  PieChart,
  Lightbulb,
  Moon,
  Shield,
  Heart,
  Sparkles
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';

// --- EXACT MOBILE LIGHT MODE REPLICAS ---

const MobileHeader = () => (
  <div className="flex justify-between items-center py-3 px-1">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 bg-white rounded-[10px] flex items-center justify-center shadow-sm relative overflow-hidden border border-black/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <Utensils className="text-primary relative z-10" size={18} />
        <div className="absolute top-0.5 right-0.5 z-20">
          <Sparkles className="text-[#f59e0b] fill-[#f59e0b]" size={10} />
        </div>
      </div>
      <span className="text-xl font-[900] tracking-tighter text-primary">KOUL</span>
    </div>
    
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-[20px] bg-white/40 backdrop-blur-md border border-white/90 flex items-center justify-center shadow-sm">
        <Moon size={18} className="text-[#94a3b8]" />
      </div>
      <div className="w-10 h-10 rounded-[20px] bg-white/30 backdrop-blur-md border border-white/90 flex items-center justify-center overflow-hidden shadow-sm">
        <img src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" className="w-5 h-5" alt="G" />
      </div>
    </div>
  </div>
);

const MobileHero = () => (
  <div className="bg-white/30 backdrop-blur-md rounded-[32px] p-5 mb-6 border border-white/90 shadow-sm relative overflow-hidden mt-4">
    <div className="flex justify-between items-center mb-4 relative z-10">
      <div />
      <div className="bg-white/40 backdrop-blur-md rounded-xl px-3 py-1.5 border border-white/20 flex items-center gap-1.5">
        <Zap size={14} className="text-[#f59e0b] fill-[#f59e0b]" />
        <span className="text-[#f59e0b] font-extrabold text-[11px]">3 Jours</span>
      </div>
    </div>
    <div className="space-y-2 relative z-10">
      <h2 className="text-[28px] leading-[34px] font-[900] tracking-tight text-[#0f172a]">
        Scanni sa7nek, <br />
        <span className="text-[#2563eb]">Ebni badnek.</span>
      </h2>
      <p className="text-sm font-semibold text-[#475569] mt-2 leading-5 max-w-[90%]">
        AI ychouf sa7nek, ygollek chnoua fi kerchek. 🇹🇳
      </p>
    </div>
  </div>
);

const MobileWaterTracker = () => {
  const [cups, setCups] = useState(4);
  const target = 12;
  const isComplete = cups >= target;
  const progress = Math.min(cups / target, 1);

  return (
    <div className={cn(
      "relative h-[340px] rounded-[32px] p-4 flex flex-col justify-between transition-all duration-700 overflow-hidden",
      isComplete ? "bg-[#2563eb]" : "bg-white/30 backdrop-blur-md border border-white/90"
    )}>
      <div className="relative z-10 flex items-center gap-2">
        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", isComplete ? "bg-white/20" : "bg-[#2563eb]/10")}>
          <Droplets size={12} className={isComplete ? "text-white fill-white" : "text-[#2563eb] fill-[#2563eb]"} />
        </div>
        <span className={cn("text-[10px] font-[900] tracking-widest uppercase", isComplete ? "text-white" : "text-[#2563eb]")}>
          ERWI 3ROUGEK
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center flex-1 justify-center py-4">
        <p className={cn("text-[13px] font-bold text-center mb-4 leading-tight h-10 flex items-center justify-center", isComplete ? "text-white/90" : "text-[#475569]")}>
          {isComplete ? "M3allem! 3L Safia! 🌊" : cups >= 6 ? "Chtar el thnia! Zidha gartou3. 🚰" : "Dabouza 0.5L 3asbeh? 💧"}
        </p>

        <div className="relative w-[110px] h-[210px] flex items-center justify-center mt-2">
          {/* Bottle Neck */}
          <div className={cn("absolute top-[5px] w-[45px] h-[25px] border-[2.5px] rounded-t-lg", isComplete ? "border-white/50 bg-white/20" : "border-[#0f172a]/10 bg-black/5")} />
          <div className={cn("absolute top-0 w-[50px] h-[10px] rounded-sm", isComplete ? "bg-white" : "bg-[#2563eb]")} />
          
          {/* Bottle Body */}
          <div className={cn("absolute bottom-0 w-[105px] h-[180px] border-[2.5px] rounded-[18px] overflow-hidden transition-colors", isComplete ? "border-white/50 bg-white/10" : "border-[#0f172a]/10 bg-black/5")}>
            <motion.div 
              animate={{ height: `${progress * 100}%` }}
              className={cn("absolute bottom-0 w-full transition-colors duration-500", isComplete ? "bg-white" : "bg-[#3b82f6]")}
              style={{ opacity: isComplete ? 0.9 : 0.8 }}
            />
            {/* Bottle Label */}
            <div className={cn("absolute top-[45%] left-0 right-0 h-6 flex items-center justify-center z-20", isComplete ? "bg-black/20 text-white" : "bg-[#fdfcf0] text-[#2563eb]")}>
              <span className="text-[12px] font-[900] tracking-tighter uppercase">3L SAFIA</span>
            </div>
          </div>
          
          <button 
            onClick={() => !isComplete && setCups(c => c + 1)}
            className={cn("absolute -right-7 bottom-0 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all", isComplete ? "bg-white text-[#2563eb]" : "bg-[#e11d48] text-white")}
          >
            {isComplete ? <Check size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
          </button>
        </div>
      </div>

      <div className="relative z-10 text-center pb-1">
        <span className={cn("text-2xl font-[900]", isComplete ? "text-white" : "text-[#2563eb]")}>
          {(cups * 0.25).toFixed(1)}L
          <span className={cn("text-[13px] ml-1 font-bold", isComplete ? "text-white/85" : "text-[#475569]")}>/ 3L Goal</span>
        </span>
      </div>
    </div>
  );
};

const MobileDailyChallenge = () => {
  const [completed, setCompleted] = useState(false);
  return (
    <button onClick={() => setCompleted(!completed)} className="w-full text-left outline-none">
      <div className={cn(
        "h-[170px] p-4 flex flex-col justify-between rounded-[28px] border backdrop-blur-md transition-all duration-500 relative overflow-hidden",
        completed ? "border-[#10b981]/50 bg-[#10b981]/5 shadow-sm" : "bg-white/60 border-white/90 shadow-sm"
      )}>
        <div className={cn("absolute -right-8 -top-5 w-28 h-28 rounded-full blur-2xl opacity-[0.16] transition-colors", completed ? "bg-[#10b981]" : "bg-[#e11d48]")} />
        
        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-1.5">
            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", completed ? "bg-[#10b981]" : "bg-[#e11d48]/20")}>
              {completed ? <CheckCircle2 size={12} className="text-white" strokeWidth={3} /> : <Flame size={12} className="text-[#e11d48] fill-[#e11d48]" />}
            </div>
            <span className={cn("text-[10px] font-[900] uppercase tracking-widest", completed ? "text-[#10b981]" : "text-[#e11d48]")}>
              {completed ? 'MOUHEMA TEMET' : 'TAHADI L\'YOUM'}
            </span>
          </div>
          {completed && <Trophy size={14} className="text-[#f59e0b] fill-[#f59e0b]" />}
        </div>
        
        <div className="relative z-10">
          <h3 className="text-lg font-[900] mb-1.5 text-[#0f172a]">
            {completed ? "W7ach Safi! 🦁" : "Na9es Khobz l'youm"}
          </h3>
          <p className="text-[13px] font-[700] text-[#475569] leading-[18px]">
            {completed ? "Khidhet 50 XP jdid" : "Zid 30g Protéine f'foutour l'youm bech t9awi badnek"}
          </p>
        </div>

        <div className="flex items-center gap-2.5 relative z-10">
          <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
            <motion.div animate={{ width: completed ? '100%' : '30%' }} className={cn("h-full rounded-full transition-colors", completed ? "bg-[#10b981]" : "bg-[#e11d48]")} />
          </div>
          {!completed && <ArrowRight size={14} className="text-[#475569]" />}
        </div>
      </div>
    </button>
  );
};

const MobileTipCard = () => (
  <div className="bg-white/45 backdrop-blur-md rounded-[28px] p-4 h-[148px] flex flex-col justify-between border border-white/90 shadow-sm relative overflow-hidden mt-3">
    <div className="absolute -right-7 -top-5 w-24 h-24 rounded-full bg-[#f59e0b] opacity-[0.18] blur-xl" />
    <div className="absolute left-0 top-4 w-1 h-11 bg-[#f59e0b] rounded-r-md" />
    <div className="flex justify-between items-center relative z-10">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#f59e0b]/20">
          <Lightbulb size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
        </div>
        <span className="text-[10px] font-[900] text-[#f59e0b] uppercase tracking-widest">KLEM KBAR</span>
      </div>
      <div className="bg-[#f59e0b]/18 border border-[#f59e0b]/60 rounded-full px-2 py-1 text-[9px] font-[900] text-[#f59e0b] tracking-wider">
        HIKMA
      </div>
    </div>
    <div className="flex-1 flex items-center relative z-10">
      <p className="text-[13px] font-[800] text-[#475569] leading-[18px] italic line-clamp-4">
        "El zit zitouna dhheb, ama mgharfa barka tekfi! Ma tgharraghach. 🫒"
      </p>
    </div>
  </div>
);

const MobileTrendingDish = () => (
  <div className="bg-white/60 backdrop-blur-md rounded-[28px] p-4 border border-white/90 shadow-sm mb-6">
    <div className="flex items-center gap-1.5 mb-3">
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#e11d48]/20">
        <Utensils size={12} className="text-[#e11d48]" />
      </div>
      <span className="text-[10px] font-[900] text-[#e11d48] uppercase tracking-widest">BNEEN 🔥</span>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex-1 pr-3">
        <h3 className="text-lg font-bold text-[#0f172a] mb-1">Kafteji Royal 🌶️</h3>
        <p className="text-[13px] font-semibold text-[#475569] leading-[18px]">7ar w mcharwret, ama rod belek 3al zit!</p>
      </div>
      <div className="w-14 h-14 rounded-2xl bg-white/50 border border-black/5 flex items-center justify-center">
        <Utensils size={28} className="text-[#0f172a]" />
      </div>
    </div>
  </div>
);

const MobileFeaturesList = () => {
    const features = [
        { title: 'Sawar w 7alel', sub: 'Macros f\'thania', icon: Camera, color: '#2563eb' },
        { title: 'AI 100% Tounsi', sub: 'Ya3ref l\'Kousksi', icon: Zap, color: '#f59e0b' },
        { title: 'Khousousia Safia', sub: 'Data mkhabya', icon: Shield, color: '#10b981' },
        { title: 'Sa7tek Labes', sub: 'Ahdef tounes', icon: Heart, color: '#e11d48' },
    ];
    
    return (
        <div className="pb-10">
            <h3 className="text-xl font-[900] text-[#0f172a] mb-5 px-1">3lech KOUL?</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
                {features.map((f, i) => (
                    <div key={i} className="min-w-[140px] w-[140px] h-[140px] bg-white/30 backdrop-blur-md border border-white/90 rounded-[24px] p-4 flex flex-col justify-between shrink-0">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${f.color}15` }}>
                            <f.icon size={24} style={{ color: f.color }} />
                        </div>
                        <div>
                            <p className="text-sm font-[900] text-[#0f172a] leading-tight mb-0.5">{f.title}</p>
                            <p className="text-[11px] font-[600] text-[#475569] opacity-70">{f.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN LANDING PAGE ---

export default function LandingPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-[#fdfcf0] dark:bg-[#030712] transition-colors duration-500">
      <div className="liquid-bg opacity-40" />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563eb]"></span>
                </span>
                L'application #1 fi Tounes 🇹🇳
              </div>
              
              <h1 className="text-6xl md:text-8xl xl:text-[110px] font-black tracking-tighter leading-[0.85] mb-8 text-slate-900 dark:text-white">
                Mekelti <br />
                <span className="text-[#2563eb] italic">fi jibi.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-bold max-w-xl leading-relaxed">
                El nutritionniste mta3ek el personnel, m3ak fi kol blasa. Sawwer sa7nek, KOUL ya3ref kol chay.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-8">
                <button className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white px-10 py-5 rounded-[28px] font-black text-xl flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.25)] active:scale-95 group">
                  Abda l-Audit <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex gap-3">
                  <GlassCard className="w-16 h-16 flex items-center justify-center p-0 rounded-2xl cursor-pointer bg-white/50 border-white/50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Apple_logo_black.svg" className="w-7 h-7 dark:invert" alt="App Store" />
                  </GlassCard>
                  <GlassCard className="w-16 h-16 flex items-center justify-center p-0 rounded-2xl cursor-pointer bg-white/50 border-white/50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Google_Play_Store_badge_EN.svg" className="w-7 h-7" alt="Play Store" />
                  </GlassCard>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-16">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-full border-[6px] border-[#fdfcf0] dark:border-[#030712] bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i*2}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-[#f59e0b]">
                    {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="currentColor" strokeWidth={0} />)}
                  </div>
                  <p className="text-sm font-black mt-1 text-slate-900 dark:text-white uppercase tracking-wider">+12k Users fi Tounes</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content: THE MOBILE APP PREVIEW (iPhone 17 Pro Max Style) */}
          <div className="lg:col-span-6 xl:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              {/* iPhone 17 Pro Max Frame - Blue Titanium */}
              <div className="mx-auto w-[320px] md:w-[400px] bg-[#1e293b] p-3 rounded-[60px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[10px] border-[#334155] relative overflow-hidden h-[680px] md:h-[820px]">
                {/* Metallic Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-blue-400/5 pointer-events-none" />
                
                {/* Screen Content Container */}
                <div className="h-full w-full rounded-[48px] relative overflow-hidden bg-white">
                  {/* Dynamic Multi-color Background */}
                  <div className="absolute inset-0 opacity-40 blur-[100px] pointer-events-none">
                    <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#fb7185] rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-[#38bdf8] rounded-full animate-bounce" />
                    <div className="absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-[#f59e0b] rounded-full" />
                    <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-[#10b981] rounded-full" />
                  </div>

                  {/* Fixed Status Bar & Header Wrapper */}
                  <div className="absolute top-0 inset-x-0 z-[70] pt-10 px-5">
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-[20px] z-[80] flex items-center justify-center">
                       <div className="w-1 h-1 bg-blue-500 rounded-full absolute right-4" />
                    </div>

                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-4 mb-2 mt-4">
                      <span className="font-black text-[#0f172a] text-[11px]">9:41</span>
                      <div className="flex gap-1.5 items-center">
                         <div className="w-5 h-2.5 border border-[#0f172a]/20 rounded-[3px] p-[1px]">
                            <div className="w-full h-full bg-[#0f172a]/60 rounded-[1px]" />
                         </div>
                      </div>
                    </div>
                    {/* Header */}
                    <MobileHeader />
                  </div>

                  {/* Scrollable Content with Auto-Scroll Animation */}
                  <div className="h-full w-full overflow-y-auto no-scrollbar pt-[130px] pb-32 relative z-10">
                    <div className="animate-auto-scroll">
                      <div className="px-5">
                        <MobileHero />

                        {/* Bento Grid */}
                        <div className="flex gap-3 mb-6">
                           <div className="flex-1">
                              <MobileWaterTracker />
                           </div>
                           <div className="flex-1">
                              <MobileDailyChallenge />
                              <MobileTipCard />
                           </div>
                        </div>

                        {/* Trending Section */}
                        <MobileTrendingDish />
                        
                        {/* Features Section */}
                        <MobileFeaturesList />

                        {/* Duplicate content for seamless loop feel in demo */}
                        <div className="opacity-50 pt-10">
                          <MobileHero />
                          <div className="h-40" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fixed Bottom Navigation */}
                  <div className="absolute bottom-8 inset-x-6 z-[70]">
                    <div className="bg-white/70 backdrop-blur-3xl rounded-[40px] border border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-around px-2 py-2.5">
                       <div className="flex-1 flex flex-col items-center justify-center h-14 relative">
                          <div className="absolute inset-2 bg-[#2563eb]/10 rounded-full" />
                          <Home size={26} className="text-[#2563eb] relative z-10" strokeWidth={2.5} />
                       </div>
                       <div className="flex-1 flex flex-col items-center justify-center h-14">
                          <Camera size={26} className="text-[#94a3b8]" strokeWidth={2} />
                       </div>
                       <div className="flex-1 flex flex-col items-center justify-center h-14">
                          <PieChart size={26} className="text-[#94a3b8]" strokeWidth={2} />
                       </div>
                       <div className="flex-1 flex flex-col items-center justify-center h-14">
                          <User size={26} className="text-[#94a3b8]" strokeWidth={2} />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="py-20 px-6 text-center border-t border-slate-900/5 dark:border-white/5 relative z-10 bg-white/20 dark:bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
           <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center shadow-lg shadow-[#2563eb]/20">
              <Utensils size={16} className="text-white" />
           </div>
           <span className="text-2xl font-[900] tracking-tighter text-slate-900 dark:text-white">KOUL</span>
        </div>
        <p className="text-slate-500 font-bold text-sm tracking-wide">© 2026 KOUL TUNISIA - ABDA L-AUDIT M3ANA.</p>
      </footer>
    </main>
  );
}