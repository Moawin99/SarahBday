import { useState, useEffect } from 'react'
import './BirthdayPage.css'
import laboImg from '../assets/labo.jpg'
import nurseImg from '../assets/nurse.jpeg'
import thatGirlImg from '../assets/that_girl.jpeg'
import italyImg from '../assets/italy.jpg'
import smileImg from '../assets/smile.jpeg'
import swagImg from '../assets/swag.webp'
import brainImg from '../assets/brain.jpeg'

const favorites = [
  {
    id: 'smile',
    image: smileImg,
    title: 'The Smile :)',
    desc: 'One of my favorite things about you',
  },
  {
    id: 'brain',
    image: brainImg,
    title: 'The Brain',
    desc: 'To the girl who has the best head on her shoulders',
  },
  {
    id: 'fragrance',
    image: laboImg,
    title: 'Fragrances',
    desc: 'Perfume collector & scent connoisseur',
  },
  {
    id: 'fashion',
    image: thatGirlImg,
    title: 'Fashionista',
    desc: 'Everyones personal stylist with impeccable taste',
  },
  {
    id: 'italy',
    image: italyImg,
    title: 'Italy (one day)',
    desc: 'Goba goba ghoul',
  },
  {
    id: 'bieber',
    image: swagImg,
    title: 'Swag & Swag II',
    desc: 'Bieber fever since forever',
  },
  {
    id: 'nurse',
    image: nurseImg,
    title: 'Nurse',
    desc: 'The most badass nurse I know',
  },
]

const NAMES = ['Cutie', 'Sarah', 'Sweet Girl']
const FLIP_DURATION = 5000

export default function BirthdayPage() {
  const [confetti, setConfetti] = useState(false)
  const [nameIndex, setNameIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true)
      setTimeout(() => {
        setNameIndex((i) => (i + 1) % NAMES.length)
        setIsFlipping(false)
      }, FLIP_DURATION)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleCelebrate = () => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000)
  }

  const nextIndex = (nameIndex + 1) % NAMES.length

  return (
    <div className="birthday-page">
      {confetti && <div className="confetti-burst" aria-hidden="true" />}

      <header className="birthday-header">
        <span className="date-badge">February 10th</span>
        <h1 className="birthday-title">
          Happy Birthday,{' '}
          <span className="name-flip-wrapper">
            {isFlipping ? (
              <>
                <span className="name-flip-sizer" aria-hidden="true">
                  {NAMES[nameIndex]}!
                </span>
                <span
                  className="name-flip name-flip-in"
                  key={`in-${nextIndex}`}
                >
                  {NAMES[nextIndex]}!
                </span>
                <span
                  className="name-flip name-flip-out"
                  key={`out-${nameIndex}`}
                >
                  {NAMES[nameIndex]}!
                </span>
              </>
            ) : (
              <span className="name-accent" key={nameIndex}>
                {NAMES[nameIndex]}!
              </span>
            )}
          </span>
        </h1>
        <p className="birthday-subtitle">
          A very tism birthday present
        </p>
        <button className="celebrate-btn" onClick={handleCelebrate}>
          🎉 Celebrate!
        </button>
      </header>

      <section className="favorites-section">
        <h2>What makes you, you?</h2>
        <div className="favorites-grid">
          {favorites.map((fav) => (
            <article key={fav.id} className="favorite-card">
              <img
                src={fav.image}
                alt=""
                className={`favorite-image ${fav.id === 'nurse' ? 'favorite-image--top' : ''}`}
              />
              <h3>{fav.title}</h3>
              <p>{fav.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wish-section">
        <div className="wish-card">
          <h2>Wishing you...</h2>
          <p>
            The best sushi dinners, the freshest fragrances, a fuller closet,
            bieber tickets, grace for you and those around you, and another year with all the blessings
            and growth!
          </p>
          <p className="sign-off">Have the most amazing day!</p>
        </div>
      </section>

      <footer className="birthday-footer">
        Can't wait to see you!
      </footer>
    </div>
  )
}
