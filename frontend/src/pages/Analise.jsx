import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { consultarDados, obterMapa } from '../services/api'
import { Send, Bot, User, ArrowLeft, Map, BarChart2 } from 'lucide-react'
import Dashboard from './Dashboard'
import Mapa from './Mapa'
import Logo from '../assets/logo.png'

export default function Analise({ idioma, setIdioma }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [historico, setHistorico] = useState([])
  const [consulta, setConsulta] = useState('')
  const [loading, setLoading] = useState(false)
  const [vista, setVista] = useState('chat')

  useEffect(() => {
    if (location.state?.pergunta) {
      setHistorico([
        { tipo: 'user', texto: location.state.pergunta },
        { tipo: 'ai', texto: location.state.resposta, fontes: location.state.fontes }
      ])
    }
  }, [])

  const enviar = async () => {
    if (!consulta.trim()) return
    setHistorico(prev => [...prev, { tipo: 'user', texto: consulta }])
    setConsulta('')
    setLoading(true)
    try {
      const data = await consultarDados(consulta, {}, idioma)
      setHistorico(prev => [...prev, { tipo: 'ai', texto: data.resposta_ia, fontes: data.fontes }])
    } catch {
      setHistorico(prev => [...prev, { tipo: 'ai', texto: 'Erro ao processar. Tenta novamente.', fontes: [] }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ background: '#1D4ED8', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <ArrowLeft size={14} /> Início
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={Logo} alt="Orivis AI" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
            <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>Orivis AI</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '4px' }}>
          {[
            { id: 'chat', label: 'Consulta IA', icone: Bot },
            { id: 'mapa', label: 'Mapa', icone: Map },
            { id: 'indicadores', label: 'Indicadores', icone: BarChart2 },
          ].map(({ id, label, icone: Icone }) => (
            <button key={id} onClick={() => setVista(id)} style={{
              background: vista === id ? 'white' : 'transparent',
              color: vista === id ? '#1D4ED8' : 'white',
              border: 'none', borderRadius: '6px', padding: '6px 14px',
              cursor: 'pointer', fontSize: '13px', fontWeight: '500',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <Icone size={14} /> {label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['PT', 'EN', 'ES'].map(lang => (
            <button key={lang} onClick={() => setIdioma(lang)} style={{
              background: idioma === lang ? 'white' : 'transparent',
              color: idioma === lang ? '#1D4ED8' : 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '4px', padding: '3px 10px',
              cursor: 'pointer', fontSize: '12px', fontWeight: '600'
            }}>{lang}</button>
          ))}
        </div>
      </header>

      {/* Conteúdo */}
      <div style={{ flex: 1, overflow: 'hidden' }}>

        {vista === 'chat' && (
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 2rem', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column' }}>

            {/* Histórico */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '16px' }}>
              {historico.map((msg, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', flexDirection: msg.tipo === 'user' ? 'row-reverse' : 'row' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, background: msg.tipo === 'user' ? '#1D4ED8' : '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {msg.tipo === 'user' ? <User size={18} color="white" /> : <Bot size={18} color="white" />}
                  </div>
                  <div style={{ maxWidth: '75%' }}>
                    <div style={{
                      background: msg.tipo === 'user' ? '#1D4ED8' : 'white',
                      color: msg.tipo === 'user' ? 'white' : '#1F2937',
                      borderRadius: msg.tipo === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                      padding: '12px 16px', fontSize: '14px', lineHeight: '1.6',
                      whiteSpace: 'pre-wrap', boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                    }}>
                      {msg.texto}
                    </div>
                    {msg.fontes?.length > 0 && (
                      <div style={{ marginTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {msg.fontes.map((f, j) => (
                          <span key={j} style={{ fontSize: '11px', color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: '10px' }}>📎 {f}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={18} color="white" />
                  </div>
                  <div style={{ background: 'white', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', fontSize: '14px', color: '#6B7280', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    Orivis AI está a analisar...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <textarea
                value={consulta}
                onChange={e => setConsulta(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }}
                placeholder="Continua a conversa..."
                rows={2}
                style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: '#1F2937', fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}
              />
              <button onClick={enviar} disabled={loading || !consulta.trim()} style={{
                background: loading || !consulta.trim() ? '#E5E7EB' : '#1D4ED8',
                color: loading || !consulta.trim() ? '#9CA3AF' : 'white',
                border: 'none', borderRadius: '8px', padding: '10px 16px',
                cursor: loading || !consulta.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500'
              }}>
                <Send size={16} /> Enviar
              </button>
            </div>
          </div>
        )}

        {vista === 'mapa' && (
          <div style={{ padding: '24px 2rem' }}>
            <Mapa idioma={idioma} />
          </div>
        )}

        {vista === 'indicadores' && (
          <div style={{ padding: '24px 2rem' }}>
            <Dashboard idioma={idioma} />
          </div>
        )}
      </div>
    </div>
  )
}