import { useState, useEffect } from 'react'
import './CountdownPage.css'

import together1 from '../assets/together/IMG_4300.jpeg'
import together2 from '../assets/together/IMG_9908.JPG'
import together3 from '../assets/together/IMG_4298.jpeg'
import together4 from '../assets/together/together-car.jpeg'
import together5 from '../assets/together/together-car-angle.jpeg'
import together6 from '../assets/together/favorite.jpeg'
import together7 from '../assets/together/40D34224-3E27-4D2D-9B31-80F42E9CF7A9_1_102_a.jpeg'
import together8 from '../assets/together/4F802B95-D71F-46F6-9551-6B15569DDD26_1_102_a.jpeg'
import together9 from '../assets/together/A0B66C12-1BEF-4071-8C41-2D712C44D5DF_1_105_c.jpeg'
import together10 from '../assets/together/1FEF0AC2-C133-4029-A831-BF40301223BD_1_105_c.jpeg'
import together11 from '../assets/together/EA7FFCB3-6FC0-4E0A-8DB8-C4285729205C_1_105_c.jpeg'
import together12 from '../assets/together/91C1C768-5D14-49FC-ABA7-225247E8CD93_1_105_c.jpeg'
import together13 from '../assets/together/9C097BFF-3F68-475F-93B3-F4257EAC731E_1_105_c.jpeg'
import together14 from '../assets/together/98CF4299-3275-48B6-9029-3A5F3DF9F22D_1_105_c.jpeg'
import together15 from '../assets/together/AF2B5BC8-D956-465B-8A5F-4B187EBB908C_1_105_c.jpeg'
import together16 from '../assets/together/584391C9-CEDB-47BE-B769-4E1B20BFD097_1_105_c.jpeg'
import together17 from '../assets/together/BE10E958-E9C9-42A1-9305-C9FD4034609C_1_105_c.jpeg'
import together18 from '../assets/together/C2DCF588-3FAD-439C-A720-E6A5BF5266E8_1_105_c.jpeg'

const TOGETHER_PHOTOS = [
  together1, together2, together3, together4, together5, together6,
  together7, together8, together9, together10, together11, together12,
  together13, together14, together15, together16, together17, together18,
]

// Set this to your next visit date, e.g. new Date('2026-07-15T00:00:00')
// Leave as null to show the "no flight booked" message
// const TARGET_DATE = new Date('2026-04-26T00:00:00')
const TARGET_DATE = new Date('2026-04-26T00:00:00')

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
  const [timeLeft, setTimeLeft] = useState(TARGET_DATE ? getTimeLeft(TARGET_DATE) : null)
  const [arrived, setArrived] = useState(false)

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
        {arrived ? (
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
