import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Mapa from './pages/Mapa'
import Consulta from './pages/Consulta'

export default function App() {
  const [idioma, setIdioma] = useState('PT')

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
        <Header idioma={idioma} setIdioma={setIdioma} />
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard idioma={idioma} />} />
            <Route path="/mapa" element={<Mapa idioma={idioma} />} />
            <Route path="/consulta" element={<Consulta idioma={idioma} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}