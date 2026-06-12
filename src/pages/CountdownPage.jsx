import { useState, useEffect } from 'react'
import './CountdownPage.css'
import { TOGETHER_PHOTOS } from '../data/togetherPhotos'

// Set this to your next visit date, e.g. new Date('2026-07-15T00:00:00')
// Leave as null to show the "no flight booked" message
const TARGET_DATE = new Date('2026-07-03T00:00:00')

function getTimeLeft(target) {
  const now = new Date()
  const diff = target - now

  if (diff <= 0) return null

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownPage() {
  const initialTimeLeft = TARGET_DATE ? getTimeLeft(TARGET_DATE) : null
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft)
  const [arrived, setArrived] = useState(initialTimeLeft === null && !!TARGET_DATE)

  useEffect(() => {
    if (!TARGET_DATE) return

    const tick = () => {
      const t = getTimeLeft(TARGET_DATE)
      if (!t) {
        setArrived(true)
        setTimeLeft(null)
      } else {
        setTimeLeft(t)
      }
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const showArrived = arrived || (TARGET_DATE && !timeLeft)

  return (
    <div className="countdown-page">
      <div className="countdown-hearts" aria-hidden="true">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="countdown-floating-heart" style={{ '--i': i }}>
            ✈️
          </span>
        ))}
      </div>

      <header className="countdown-header">
        <span className="countdown-badge">NY 🫱🏽‍🫲🏾 LA</span>
        <h1>Until We're Together Cutie :)</h1>
      </header>

      <section className="countdown-content">
        {showArrived ? (
          <div className="countdown-arrived">
            <div className="countdown-arrived-emoji">🥹</div>
            <h2>You're here!</h2>
            <p>Finally, finally, finally.</p>
          </div>
        ) : !TARGET_DATE ? (
          <div className="countdown-no-date">
            <div className="countdown-plane-emoji">✈️</div>
            <h2>No flights booked yet...</h2>
            <p>Looks like someone still hasn't sorted their ticket.</p>
            <p className="countdown-nudge">The countdown is waiting. So am I.</p>
          </div>
        ) : (
          <div className="countdown-timer">
            <div className="countdown-unit">
              <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-label">days</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-label">hours</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">minutes</span>
            </div>
            <span className="countdown-sep">:</span>
            <div className="countdown-unit">
              <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">seconds</span>
            </div>
          </div>
        )}
      </section>

      <section className="countdown-gallery">
        <h2 className="countdown-gallery-title">Us 🩷</h2>
        <div className="countdown-grid">
          {TOGETHER_PHOTOS.map((src, i) => (
            <div key={i} className="countdown-grid-item">
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <footer className="countdown-footer">
        Every second counts 🩷
      </footer>
    </div>
  )
}
