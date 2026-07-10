import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Analise from './pages/Analise'
import SplashScreen from './components/SplashScreen'

export default function App() {
  const [idioma, setIdioma] = useState('PT')
  const [showSplash, setShowSplash] = useState(true)

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home idioma={idioma} setIdioma={setIdioma} />} />
        <Route path="/analise" element={<Analise idioma={idioma} setIdioma={setIdioma} />} />
      </Routes>
    </BrowserRouter>
  )
}