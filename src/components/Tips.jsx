import React from 'react'

const tips = [
  {
    title: 'Rule #1: Live to Level Another Day',
    body: 'If a pull feels bad, it is bad. Reset, LoS, use cooldowns, or simply run. There is no shame in survival.'
  },
  {
    title: 'Know Your Danger Zones',
    body: 'Avoid high-variance quests early (escort chains, crowded caves, elite hubs). Farm safer areas and do greens when in doubt.'
  },
  {
    title: 'Consumables Are Lives',
    body: 'Carry health/mana pots, bandages, food, elixirs. Pre-pot on risky pulls. Keep a Free Action Potion for stuns/roots.'
  },
  {
    title: 'Crowd Control > DPS',
    body: 'Sheep, sap, root, fear (careful), kite. CC reduces incoming damage which prevents panic deaths.'
  },
  {
    title: 'Situational Awareness',
    body: 'Zoom your camera, watch for patrols, read mob abilities, and avoid leashing into social packs.'
  },
  {
    title: 'Keybind Your Panic Buttons',
    body: 'Healthstone, pot, major defensive, sprint, feign, vanish, shadowmeld—bind them and practice.'
  }
]

export default function Tips() {
  return (
    <section id="tips" className="relative py-16 md:py-24 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Hardcore Survival Tips</h2>
        <p className="mt-2 text-slate-300 md:text-lg">Concise, proven advice from countless runs and rip clips.</p>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((t, i) => (
            <div key={i} className="group rounded-2xl border border-emerald-400/20 bg-slate-800/40 backdrop-blur-sm p-6 hover:border-emerald-400/40 transition">
              <h3 className="text-white font-semibold text-lg group-hover:text-emerald-300 transition">{t.title}</h3>
              <p className="mt-2 text-slate-300/90 text-sm leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
