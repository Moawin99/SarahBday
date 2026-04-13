import { Routes, Route } from 'react-router-dom'
import BirthdayPage from './pages/BirthdayPage'
import ValentinePage from './pages/ValentinePage'
import CountdownPage from './pages/CountdownPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BirthdayPage />} />
      <Route path="/valentine" element={<ValentinePage />} />
      <Route path="/countdown" element={<CountdownPage />} />
    </Routes>
  )
}

export default App
