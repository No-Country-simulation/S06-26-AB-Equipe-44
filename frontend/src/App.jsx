import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Analise from './pages/Analise'

export default function App() {
  const [idioma, setIdioma] = useState('PT')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home idioma={idioma} setIdioma={setIdioma} />} />
        <Route path="/analise" element={<Analise idioma={idioma} setIdioma={setIdioma} />} />
      </Routes>
    </BrowserRouter>
  )
}