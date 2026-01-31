'use client'

import { useEffect, useState } from 'react'

export default function Stats() {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    workers: 0,
    experience: 0
  })

  useEffect(() => {
    const targetCounts = {
      projects: 1500,
      clients: 790,
      workers: 450,
      experience: 10
    }

    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setCounters({
        projects: Math.floor(targetCounts.projects * progress),
        clients: Math.floor(targetCounts.clients * progress),
        workers: Math.floor(targetCounts.workers * progress),
        experience: Math.floor(targetCounts.experience * progress)
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setCounters(targetCounts)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  const stats = [
    { number: counters.projects, label: 'Projects Completed', icon: 'fas fa-building' },
    { number: counters.clients, label: 'Satisfied Clients', icon: 'fas fa-smile' },
    { number: counters.workers, label: 'Expert Workers', icon: 'fas fa-users' },
    { number: counters.experience, label: 'Years Experience', icon: 'fas fa-calendar-alt' }
  ]

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <i className={stat.icon} style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '1rem' }}></i>
            <span className="number">{stat.number}+</span>
            <div className="label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
