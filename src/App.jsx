import { Routes, Route } from 'react-router-dom'
import BirthdayPage from './pages/BirthdayPage'
import ValentinePage from './pages/ValentinePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BirthdayPage />} />
      <Route path="/valentine" element={<ValentinePage />} />
    </Routes>
  )
}

export default App
