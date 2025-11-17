import React from 'react'
import Hero from './components/Hero'
import Tips from './components/Tips'
import ClassesRaces from './components/ClassesRaces'
import ClassQuiz from './components/ClassQuiz'
import MiniGame from './components/MiniGame'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero with Spline cover */}
      <Hero />

      {/* Content sections */}
      <Tips />
      <ClassesRaces />
      <ClassQuiz />

      {/* Mini game at the bottom */}
      <MiniGame />

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-400">For gamers, by gamers. Stay safe out there — and may your deeds be remembered.</p>
          <a href="#top" className="inline-block mt-3 text-emerald-300 hover:text-emerald-200">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
