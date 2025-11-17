import React from 'react'

const data = [
  { cls: 'Warrior', role: 'Tank/Arms', vibe: 'High skill, durable, party hero', races: 'Human, Dwarf, Orc, Tauren' },
  { cls: 'Priest', role: 'Healer/Shadow', vibe: 'Safest healer, strong wanding, fear careful', races: 'Human, Dwarf, Undead, Troll' },
  { cls: 'Hunter', role: 'Ranged DPS', vibe: 'Safest soloer, traps + pet, mana watch', races: 'Night Elf, Dwarf, Orc, Troll' },
  { cls: 'Mage', role: 'Ranged DPS', vibe: 'Control king, kiting god, clothy risk', races: 'Human, Gnome, Undead, Troll' },
  { cls: 'Rogue', role: 'Melee DPS', vibe: 'Control + escape, punishing mistakes', races: 'Human, Gnome, Undead, Orc' },
  { cls: 'Paladin', role: 'Tank/Healer', vibe: 'Alliance only, ultra safe support', races: 'Human, Dwarf' },
  { cls: 'Shaman', role: 'Support/Healer', vibe: 'Horde only, totems clutch', races: 'Orc, Troll, Tauren' },
  { cls: 'Druid', role: 'Hybrid', vibe: 'Versatile, stealth, travel form saves lives', races: 'Night Elf, Tauren' },
]

export default function ClassesRaces() {
  return (
    <section id="classes" className="relative py-16 md:py-24 bg-slate-900">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Classes & Races</h2>
            <p className="mt-2 text-slate-300 md:text-lg">Quick signals for each class and recommended races.</p>
          </div>
          <a href="#quiz" className="text-emerald-300 hover:text-emerald-200 text-sm">Take the class quiz →</a>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((d) => (
            <div key={d.cls} className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 hover:border-emerald-400/40 transition">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold text-lg">{d.cls}</h3>
                <span className="text-xs px-2 py-1 rounded bg-slate-700/60 text-slate-200">{d.role}</span>
              </div>
              <p className="mt-2 text-slate-300/90 text-sm">{d.vibe}</p>
              <p className="mt-3 text-emerald-300 text-sm">Races: {d.races}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
