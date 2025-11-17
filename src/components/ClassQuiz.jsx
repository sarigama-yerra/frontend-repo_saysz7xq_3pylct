import React, { useMemo, useState } from 'react'

const QUESTIONS = [
  {
    q: 'What pace do you prefer?',
    options: [
      { label: 'Methodical and safe', score: { Paladin: 2, Priest: 2, Druid: 1 } },
      { label: 'Balanced with control', score: { Hunter: 2, Mage: 2, Shaman: 1 } },
      { label: 'High risk, high reward', score: { Rogue: 2, Warrior: 2 } },
    ],
  },
  {
    q: 'Pick your safety net:',
    options: [
      { label: 'Heals & bubbles', score: { Paladin: 3, Priest: 2, Druid: 1 } },
      { label: 'Crowd control & kiting', score: { Mage: 3, Hunter: 2 } },
      { label: 'Escape tools', score: { Rogue: 3, Druid: 2 } },
    ],
  },
  {
    q: 'Preferred role at cap?',
    options: [
      { label: 'Healer/support', score: { Priest: 2, Paladin: 2, Shaman: 2, Druid: 2 } },
      { label: 'Tank/Frontline', score: { Warrior: 3, Paladin: 1, Druid: 1 } },
      { label: 'DPS carry', score: { Mage: 2, Rogue: 2, Hunter: 2 } },
    ],
  },
  {
    q: 'Faction lock-in?',
    options: [
      { label: 'Alliance', score: { Paladin: 3, Human: 1, Dwarf: 1, NightElf: 1 } },
      { label: 'Horde', score: { Shaman: 3, Orc: 1, Troll: 1, Tauren: 1 } },
      { label: "Either's fine", score: { Mage: 1, Priest: 1, Warrior: 1, Rogue: 1, Hunter: 1, Druid: 1 } },
    ],
  },
]

const CLASS_DESCRIPTIONS = {
  Warrior: 'Hardcore tank king. Demands patience, gear, and group play. Master pulls and cooldowns.',
  Priest: 'Safest healer. Strong wanding, control, and panic buttons. Shadow is steady solo.',
  Hunter: 'Safest solo journey. Pet tanking, traps, and kiting make danger manageable.',
  Mage: 'Control master. Kites forever, but cloth is punishing. Always plan your path.',
  Rogue: 'Escape artist. Stealth scouting saves lives. Mistakes can be costly in melee.',
  Paladin: 'Alliance only. Ultra safe with bubbles and heals. Slow but unkillable vibe.',
  Shaman: 'Horde only. Totems and utility shine. Healer/support path is very safe.',
  Druid: 'Swiss army knife. Bear/tankiness, cat speed, heal safety. Travel Form is life.',
}

const RACE_SUGGESTIONS = {
  Alliance: {
    Warrior: 'Human or Dwarf',
    Priest: 'Dwarf (Fear Ward) or Human',
    Hunter: 'Night Elf or Dwarf',
    Mage: 'Gnome or Human',
    Rogue: 'Human or Gnome',
    Paladin: 'Human or Dwarf',
    Druid: 'Night Elf',
  },
  Horde: {
    Warrior: 'Orc or Tauren',
    Priest: 'Undead or Troll',
    Hunter: 'Orc or Troll',
    Mage: 'Undead or Troll',
    Rogue: 'Undead or Orc',
    Shaman: 'Orc or Troll',
    Druid: 'Tauren',
  },
}

export default function ClassQuiz() {
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const allAnswered = useMemo(() => Object.keys(answers).length === QUESTIONS.length, [answers])

  function selectAnswer(qIdx, optIdx) {
    setAnswers((a) => ({ ...a, [qIdx]: optIdx }))
  }

  function computeResult() {
    const tally = {}
    Object.entries(answers).forEach(([qIdx, optIdx]) => {
      const opt = QUESTIONS[qIdx].options[optIdx]
      Object.entries(opt.score).forEach(([key, val]) => {
        tally[key] = (tally[key] || 0) + val
      })
    })

    // determine faction hint
    const factionScore = { Alliance: tally.Human + tally.Dwarf + tally.NightElf || 0, Horde: tally.Orc + tally.Troll + tally.Tauren || 0 }

    // best class
    const classOnly = Object.fromEntries(Object.entries(tally).filter(([k]) => k in CLASS_DESCRIPTIONS))
    const best = Object.entries(classOnly).sort((a, b) => b[1] - a[1])[0]?.[0]

    const faction = factionScore.Alliance === factionScore.Horde ? 'Either' : (factionScore.Alliance > factionScore.Horde ? 'Alliance' : 'Horde')

    if (!best) return

    const raceHint = faction === 'Either' ? 'Any faction works — pick aesthetics!' : RACE_SUGGESTIONS[faction][best] || 'Any'

    setResult({
      best,
      faction,
      desc: CLASS_DESCRIPTIONS[best],
      raceHint,
    })
  }

  function reset() {
    setAnswers({})
    setResult(null)
  }

  return (
    <section id="quiz" className="relative py-16 md:py-24 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_60%)]" />
      <div className="relative max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Find Your Hardcore Class</h2>
        <p className="mt-2 text-slate-300 md:text-lg">Answer a few quick questions. We’ll suggest a class and a race direction.</p>

        {!result && (
          <div className="mt-8 space-y-6">
            {QUESTIONS.map((item, qIdx) => (
              <div key={qIdx} className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
                <p className="text-white font-medium">{qIdx + 1}. {item.q}</p>
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {item.options.map((opt, optIdx) => {
                    const active = answers[qIdx] === optIdx
                    return (
                      <button
                        key={optIdx}
                        onClick={() => selectAnswer(qIdx, optIdx)}
                        className={`text-left px-4 py-3 rounded-xl border transition ${active ? 'bg-emerald-500 text-slate-900 border-emerald-400' : 'bg-slate-900/40 text-slate-200 border-slate-700/60 hover:border-slate-500'}`}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3">
              <button
                disabled={!allAnswered}
                onClick={computeResult}
                className={`px-5 py-2.5 rounded-lg font-semibold transition ${allAnswered ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-400' : 'bg-slate-700/60 text-slate-300 cursor-not-allowed'}`}
              >
                See My Class
              </button>
              <button onClick={reset} className="px-5 py-2.5 rounded-lg border border-slate-700/60 text-slate-200 hover:border-slate-500">Reset</button>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-slate-800/40 p-6">
            <p className="text-sm text-emerald-300">Suggested Class</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">{result.best}</h3>
            <p className="mt-2 text-slate-200">{result.desc}</p>
            <p className="mt-3 text-emerald-300">Faction: <span className="text-white">{result.faction}</span></p>
            <p className="text-emerald-300">Race tip: <span className="text-white">{result.raceHint}</span></p>
            <div className="mt-6 flex gap-3">
              <a href="#classes" className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold">Compare Classes</a>
              <button onClick={reset} className="px-4 py-2 rounded-lg border border-slate-700/60 text-slate-200">Try Again</button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
