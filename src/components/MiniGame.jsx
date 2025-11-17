import React, { useEffect, useMemo, useRef, useState } from 'react'

// Simple dodge mini-game: avoid skulls, grab potions. WoW HC themed.
export default function MiniGame() {
  const canvasRef = useRef(null)
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(1) // HC: one life, but we show a heart as buffer visual
  const [message, setMessage] = useState('Survive for 30 seconds!')

  const settings = useMemo(() => ({
    width: 900,
    height: 260,
    player: { r: 12, speed: 4 },
    skull: { r: 10, rate: 60 }, // frames between spawns
    potion: { r: 8, rate: 240 },
    duration: 30_000, // ms
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let last = performance.now()
    let elapsed = 0

    const player = { x: 60, y: settings.height / 2, vx: 0, vy: 0 }
    const skulls = []
    const potions = []
    let frame = 0
    let over = false

    function reset() {
      skulls.length = 0
      potions.length = 0
      player.x = 60; player.y = settings.height / 2
      setScore(0)
      setLives(1)
      setMessage('Survive for 30 seconds!')
      elapsed = 0
      frame = 0
      over = false
    }

    function spawnSkull() {
      skulls.push({ x: settings.width + 20, y: 20 + Math.random() * (settings.height - 40), vx: 2 + Math.random() * 2 })
    }
    function spawnPotion() {
      potions.push({ x: settings.width + 20, y: 20 + Math.random() * (settings.height - 40), vx: 2 })
    }

    function key(e) {
      const k = e.key.toLowerCase()
      const s = settings.player.speed
      if (k === 'arrowup' || k === 'w') player.vy = -s
      if (k === 'arrowdown' || k === 's') player.vy = s
      if (k === 'arrowleft' || k === 'a') player.vx = -s
      if (k === 'arrowright' || k === 'd') player.vx = s
    }
    function keyUp(e) {
      const k = e.key.toLowerCase()
      if (['arrowup','w','arrowdown','s'].includes(k)) player.vy = 0
      if (['arrowleft','a','arrowright','d'].includes(k)) player.vx = 0
    }

    function loop(now) {
      const dt = now - last
      last = now
      if (!running) { raf = requestAnimationFrame(loop); return }
      if (over) { raf = requestAnimationFrame(loop); return }

      elapsed += dt
      frame++

      // Spawn
      if (frame % settings.skull.rate === 0) spawnSkull()
      if (frame % settings.potion.rate === 0) spawnPotion()

      // Move
      player.x += player.vx
      player.y += player.vy
      player.x = Math.max(settings.player.r, Math.min(settings.width - settings.player.r, player.x))
      player.y = Math.max(settings.player.r, Math.min(settings.height - settings.player.r, player.y))

      skulls.forEach(s => s.x -= s.vx)
      potions.forEach(p => p.x -= p.vx)

      // Collisions
      function dist(a, b) { const dx = a.x - b.x, dy = a.y - b.y; return Math.hypot(dx, dy) }
      for (let i = skulls.length - 1; i >= 0; i--) {
        const s = skulls[i]
        if (s.x < -30) { skulls.splice(i, 1); continue }
        if (dist(player, s) < settings.player.r + settings.skull.r) {
          // RIP
          setLives(v => Math.max(0, v - 1))
          over = true
          setMessage('You died! HC claimed another soul.')
        }
      }
      for (let i = potions.length - 1; i >= 0; i--) {
        const p = potions[i]
        if (p.x < -30) { potions.splice(i, 1); continue }
        if (dist(player, p) < settings.player.r + settings.potion.r) {
          potions.splice(i, 1)
          setScore(v => v + 10)
          setMessage('Potion grabbed! +10 score')
        }
      }

      // Win condition
      if (elapsed >= settings.duration) {
        over = true
        setMessage('Victory! You survived the gauntlet.')
      }

      // Draw
      ctx.clearRect(0,0,settings.width, settings.height)
      // background grid
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0,0,settings.width, settings.height)
      ctx.strokeStyle = 'rgba(16,185,129,0.15)'
      for (let x=0; x<settings.width; x+=30){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,settings.height); ctx.stroke() }
      for (let y=0; y<settings.height; y+=30){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(settings.width,y); ctx.stroke() }

      // player circle (adventurer)
      ctx.beginPath(); ctx.arc(player.x, player.y, settings.player.r, 0, Math.PI*2); ctx.fillStyle = '#22c55e'; ctx.fill()
      // skulls (red)
      skulls.forEach(s=>{ ctx.beginPath(); ctx.arc(s.x, s.y, settings.skull.r, 0, Math.PI*2); ctx.fillStyle = '#ef4444'; ctx.fill() })
      // potions (blue)
      potions.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x, p.y, settings.potion.r, 0, Math.PI*2); ctx.fillStyle = '#38bdf8'; ctx.fill() })

      setScore(v => v + 1) // time score

      raf = requestAnimationFrame(loop)
    }

    function start() {
      reset()
      setRunning(true)
    }

    window.addEventListener('keydown', key)
    window.addEventListener('keyup', keyUp)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', key)
      window.removeEventListener('keyup', keyUp)
    }
  }, [running, settings])

  return (
    <section id="minigame" className="relative py-16 md:py-24 bg-slate-950">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Hardcore Mini-Game</h2>
            <p className="mt-2 text-slate-300">Dodge skulls, grab potions, and survive the timer. Use WASD or arrow keys.</p>
          </div>
          <div className="text-right">
            <div className="text-emerald-300">Score: <span className="text-white font-semibold">{score}</span></div>
            <div className="text-rose-300">Lives: <span className="text-white font-semibold">{lives}</span></div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-4 overflow-x-auto">
          <canvas ref={canvasRef} width={900} height={260} className="block w-full h-auto" />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-slate-200">{message}</p>
            <div className="flex gap-3">
              <button onClick={()=>setRunning(true)} className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-900 font-semibold">Resume</button>
              <button onClick={()=>setRunning(false)} className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200">Pause</button>
              <button onClick={()=>setRunning(r=>!r)} className="px-4 py-2 rounded-lg border border-emerald-500/60 text-emerald-300">{running ? 'Stop' : 'Start'}</button>
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">Hardcore means one life — if you touch a skull, you die. Potions add score. Survive the full timer to win.</p>
      </div>
    </section>
  )
}
