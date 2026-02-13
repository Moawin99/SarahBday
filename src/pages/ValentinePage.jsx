import { useState, useRef, useCallback } from 'react'
import './ValentinePage.css'
import flowerDogImg from '../assets/flower_dog.jpeg'
import dogSmileImg from '../assets/dogSmile.jpg'

const FLOWER_EMOJIS = ['🌸', '🌺', '🌷', '🌼', '🌻', '💐', '🌹', '🪷']

export default function ValentinePage() {
  const [saidYes, setSaidYes] = useState(false)
  const [showFlowers, setShowFlowers] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState(null)
  const noButtonRef = useRef(null)

  const moveNoButton = useCallback(() => {
    const button = noButtonRef.current
    if (!button || saidYes) return

    const buttonRect = button.getBoundingClientRect()
    const padding = 60
    const newX = padding + Math.random() * (window.innerWidth - buttonRect.width - padding * 2)
    const newY = padding + Math.random() * (window.innerHeight - buttonRect.height - padding * 2)
    setNoButtonPos({ x: newX, y: newY })
  }, [saidYes])

  const handleNoButtonHover = useCallback(
    (e) => {
      if (saidYes) return
      const button = noButtonRef.current
      if (!button) return

      const buttonRect = button.getBoundingClientRect()
      const cursorX = e.clientX
      const cursorY = e.clientY
      const buttonCenterX = buttonRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top + buttonRect.height / 2

      const distance = Math.hypot(cursorX - buttonCenterX, cursorY - buttonCenterY)
      if (distance < 100) {
        moveNoButton()
      }
    },
    [saidYes, moveNoButton]
  )

  const handleTouchMove = useCallback(
    (e) => {
      if (saidYes || !e.touches?.[0]) return
      const button = noButtonRef.current
      if (!button) return

      const touch = e.touches[0]
      const buttonRect = button.getBoundingClientRect()
      const touchX = touch.clientX
      const touchY = touch.clientY
      const buttonCenterX = buttonRect.left + buttonRect.width / 2
      const buttonCenterY = buttonRect.top + buttonRect.height / 2

      const distance = Math.hypot(touchX - buttonCenterX, touchY - buttonCenterY)
      if (distance < 120) {
        moveNoButton()
      }
    },
    [saidYes, moveNoButton]
  )

  const handleYesClick = () => {
    setSaidYes(true)
    setShowFlowers(true)
  }

  return (
    <div
      className="valentine-page"
      onMouseMove={handleNoButtonHover}
      onTouchMove={handleTouchMove}
    >
      <div className="valentine-hearts" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="floating-heart" style={{ '--i': i }}>
            ❤️
          </span>
        ))}
      </div>

      {showFlowers && (
        <div className="flower-emojis" aria-hidden="true">
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className="flower-emoji"
              style={{
                left: `${5 + (i * 4) % 90}%`,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {FLOWER_EMOJIS[i % FLOWER_EMOJIS.length]}
            </span>
          ))}
        </div>
      )}

      <header className="valentine-header">
        <span className="valentine-badge">February 14th</span>
        <h1>Happy Valentine's Day</h1>
      </header>

      <section className="valentine-content">
        <div className="valentine-card valentine-ask-card">
          <h2>Will you be my valentine?</h2>
          <div className="valentine-image-wrapper">
            <img
              src={saidYes ? dogSmileImg : flowerDogImg}
              alt=""
              className={`valentine-main-image ${saidYes ? 'valentine-image-reveal' : ''}`}
            />
          </div>
          {!saidYes ? (
            <div className="valentine-buttons">
              <button className="valentine-btn valentine-btn-yes" onClick={handleYesClick}>
                Yes
              </button>
              <button
                ref={noButtonRef}
                className="valentine-btn valentine-btn-no"
                style={
                  noButtonPos
                    ? {
                        position: 'fixed',
                        left: noButtonPos.x,
                        top: noButtonPos.y,
                        transform: 'none',
                      }
                    : undefined
                }
              >
                No
              </button>
            </div>
          ) : (
            <p className="valentine-yes-message">Yay! Happy Valentine's Day!</p>
          )}
        </div>
      </section>

      <footer className="valentine-footer">
        Come on now. I couldn't only do your birthday 😃
      </footer>
    </div>
  )
}
