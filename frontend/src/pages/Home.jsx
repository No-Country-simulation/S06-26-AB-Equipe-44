import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { consultarDados } from '../services/api'
import { Send, MapPin, BarChart2, Heart, GraduationCap, Wifi, FileText, Map, Sparkles, ArrowRight } from 'lucide-react'
import Logo from '../assets/logo.png'

const sugestoes = [
  { icone: MapPin, texto: 'Onde investir primeiro em Angola?', cor: '#1D4ED8' },
  { icone: BarChart2, texto: 'Comparar Huambo e Benguela', cor: '#7C3AED' },
  { icone: Heart, texto: 'Regiões com défice de Saúde Mental', cor: '#DC2626' },
  { icone: GraduationCap, texto: 'Onde faltam programas de Formação?', cor: '#059669' },
  { icone: Wifi, texto: 'Onde falta cobertura digital?', cor: '#D97706' },
  { icone: FileText, texto: 'Gerar relatório de prioridades', cor: '#0891B2' },
]

export default function Home({ idioma, setIdioma }) {
  const [pergunta, setPergunta] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const enviar = async (texto) => {
    const consulta = texto || pergunta
    if (!consulta.trim()) return

    setLoading(true)
    try {
      const data = await consultarDados(consulta, {}, idioma)
      navigate('/analise', {
        state: {
          pergunta: consulta,
          resposta: data.resposta_ia,
          fontes: data.fontes
        }
      })
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <header style={{
        background: 'linear-gradient(120deg, #0A1233 0%, #142868 100%)',
        padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px', boxShadow: '0 2px 12px rgba(10,18,51,0.25)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={Logo} alt="Orivis AI" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
          <div>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>Orivis AI</span>
            <span style={{ color: '#93C5FD', fontSize: '11px', display: 'block', lineHeight: 1 }}>Centro de Inteligência Territorial</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '72px 2rem 56px', textAlign: 'center' }}>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'linear-gradient(120deg, #EFF6FF, #F5F3FF)', border: '1px solid #BFDBFE',
          borderRadius: '20px', padding: '4px 14px', marginBottom: '24px'
        }}>
          <Sparkles size={12} color="#1D4ED8" />
          <span style={{ fontSize: '12px', color: '#1D4ED8', fontWeight: '600' }}>App BiT B2G — Hackathon 2026</span>
        </div>

        <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#1F2937', margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          Inteligência Territorial<br />
          <span style={{ background: 'linear-gradient(90deg, #1D4ED8, #7C3AED)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            para Decisões Públicas
          </span>
        </h1>

        <p style={{ color: '#6B7280', fontSize: '16px', margin: '0 0 40px', lineHeight: 1.6 }}>
          Olá! Sou o Orivis AI. Faça uma pergunta sobre dados territoriais<br />
          de Angola, Brasil e América Latina.
        </p>

        {/* Caixa de pergunta */}
        <div style={{
          background: 'white', borderRadius: '18px', boxShadow: '0 8px 32px rgba(29,78,216,0.08)',
          border: '1px solid #E5E7EB', padding: '18px', marginBottom: '16px'
        }}>
          <textarea
            value={pergunta}
            onChange={e => setPergunta(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar() } }}
            placeholder="Onde devo investir primeiro? Qual região tem maior défice de conectividade?..."
            rows={3}
            style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: '15px', color: '#1F2937', fontFamily: 'Inter, sans-serif', lineHeight: '1.6', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F3F4F6' }}>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Enter para enviar · Shift+Enter para nova linha</span>
            <button
              onClick={() => enviar()}
              disabled={loading || !pergunta.trim()}
              style={{
                background: loading || !pergunta.trim() ? '#E5E7EB' : 'linear-gradient(120deg, #1D4ED8, #2563EB)',
                color: loading || !pergunta.trim() ? '#9CA3AF' : 'white',
                border: 'none', borderRadius: '10px', padding: '10px 20px',
                cursor: loading || !pergunta.trim() ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '14px', fontWeight: '600'
              }}
            >
              {loading ? 'A analisar...' : <><Send size={14} /> Analisar</>}
            </button>
          </div>
        </div>

        {/* Acesso directo — sem precisar de perguntar nada */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
          <button
            onClick={() => navigate('/analise', { state: { vista: 'mapa' } })}
            style={{
              background: 'linear-gradient(120deg, #0A1233, #142868)', border: 'none', borderRadius: '14px',
              padding: '18px', cursor: 'pointer', textAlign: 'left', color: 'white',
              display: 'flex', flexDirection: 'column', gap: '8px', transition: 'transform 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Map size={20} color="#93C5FD" />
            <div>
              <p style={{ margin: 0, fontWeight: '700', fontSize: '14px' }}>Explorar Mapa</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#93C5FD' }}>Ver regiões sem perguntar nada</p>
            </div>
            <ArrowRight size={14} color="#93C5FD" style={{ marginTop: '4px' }} />
          </button>

          <button
            onClick={() => navigate('/analise', { state: { vista: 'indicadores' } })}
            style={{
              background: 'white', border: '1px solid #E5E7EB', borderRadius: '14px',
              padding: '18px', cursor: 'pointer', textAlign: 'left',
              display: 'flex', flexDirection: 'column', gap: '8px', transition: 'transform 0.15s, border-color 0.15s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#1D4ED8' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#E5E7EB' }}
          >
            <BarChart2 size={20} color="#1D4ED8" />
            <div>
              <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#1F2937' }}>Ver Indicadores</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>Painel completo por região</p>
            </div>
            <ArrowRight size={14} color="#1D4ED8" style={{ marginTop: '4px' }} />
          </button>
        </div>

        {/* Sugestões */}
        <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px', textAlign: 'left' }}>
          Ou pergunta algo como
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '40px' }}>
          {sugestoes.map(({ icone: Icone, texto, cor }, i) => (
            <button
              key={i}
              onClick={() => enviar(texto)}
              style={{
                background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px',
                padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: '10px',
                transition: 'all 0.2s', fontSize: '13px', color: '#374151'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = cor; e.currentTarget.style.background = '#F8FAFC' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = 'white' }}
            >
              <div style={{ background: `${cor}15`, borderRadius: '6px', padding: '6px', flexShrink: 0 }}>
                <Icone size={14} color={cor} />
              </div>
              {texto}
            </button>
          ))}
        </div>

        <p style={{ fontSize: '11px', color: '#D1D5DB' }}>
          Dados públicos verificados · cruzando múltiplas fontes oficiais
        </p>
      </div>
    </div>
  )
}