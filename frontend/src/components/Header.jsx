import { Link, useLocation } from 'react-router-dom'

export default function Header({ idioma, setIdioma }) {
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Dashboard' },
    { path: '/mapa', label: 'Mapa' },
    { path: '/consulta', label: 'Consulta IA' },
  ]

  return (
    <header style={{ background: '#1D4ED8', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: '#10B981', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', fontSize: '14px' }}>O</div>
        <span style={{ color: 'white', fontWeight: '700', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>Orivis AI</span>
        <span style={{ color: '#93C5FD', fontSize: '12px', marginLeft: '4px' }}>App BiT B2G</span>
      </div>

      <nav style={{ display: 'flex', gap: '8px' }}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? 'white' : '#93C5FD',
              textDecoration: 'none',
              padding: '6px 16px',
              borderRadius: '6px',
              background: location.pathname === link.path ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div style={{ display: 'flex', gap: '6px' }}>
        {['PT', 'EN', 'ES'].map(lang => (
          <button
            key={lang}
            onClick={() => setIdioma(lang)}
            style={{
              background: idioma === lang ? 'white' : 'transparent',
              color: idioma === lang ? '#1D4ED8' : 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px',
              padding: '3px 10px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    </header>
  )
}