import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/40 to-slate-950/80" />

      <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            WoW Classic Hardcore
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_6px_30px_rgba(16,185,129,0.25)]">
            Survive. Thrive. Earn your Immortality.
          </h1>
          <p className="mt-4 text-slate-200/90 md:text-lg max-w-2xl">
            A clean, gamer-built guide for World of Warcraft Classic Hardcore. Learn the safest paths, best classes and races, and master survival tactics. Try the class picker quiz and a fun mini challenge at the end.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#tips" className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold transition">Survival Tips</a>
            <a href="#quiz" className="px-5 py-2.5 rounded-lg border border-slate-700/80 hover:border-slate-600 text-slate-200 transition">Find Your Class</a>
          </div>
        </div>
      </div>
    </section>
  )
}
