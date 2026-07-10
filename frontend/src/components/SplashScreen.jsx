import { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'

export default function SplashScreen({ onFinish }) {
  const [saindo, setSaindo] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setSaindo(true), 2600)
    const t2 = setTimeout(() => onFinish(), 3100)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onFinish])

  return (
    <div
      onClick={() => { setSaindo(true); setTimeout(onFinish, 400) }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'linear-gradient(135deg, #0A1233 0%, #142868 60%, #1D4ED8 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontFamily: 'Inter, sans-serif',
        opacity: saindo ? 0 : 1, transition: 'opacity 0.4s ease',
      }}
    >
      <img
        src={Logo}
        alt="Orivis AI"
        style={{
          width: '72px', height: '72px', borderRadius: '18px', marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          animation: 'orivis-pulse 1.8s ease-in-out infinite'
        }}
      />
      <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>
        Orivis AI
      </h1>
      <p style={{ color: '#93C5FD', fontSize: '14px', maxWidth: '320px', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
        Uma IA que cruza dados públicos de vários países para revelar onde investir primeiro.
      </p>
      <div style={{ marginTop: '32px', width: '160px', height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#60A5FA', animation: 'orivis-load 2.6s linear forwards' }} />
      </div>

      <style>{`
        @keyframes orivis-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes orivis-load {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}