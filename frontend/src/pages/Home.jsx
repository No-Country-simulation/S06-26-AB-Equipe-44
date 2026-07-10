import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { consultarDados } from '../services/api'
import { Send, MapPin, BarChart2, Heart, GraduationCap, Wifi, FileText, Globe, Map } from 'lucide-react'
import Logo from '../assets/logo.png'

const sugestoes = [
  { icone: MapPin, texto: 'Onde investir primeiro em Angola?', cor: '#1D4ED8' },
  { icone: BarChart2, texto: 'Comparar Huambo e Benguela', cor: '#7C3AED' },
  { icone: Heart, texto: 'Regiões com défice de Saúde Mental', cor: '#DC2626' },
  { icone: GraduationCap, texto: 'Onde faltam programas de Formação?', cor: '#059669' },
  { icone: Wifi, texto: 'Onde falta cobertura digital?', cor: '#D97706' },
  { icone: FileText, texto: 'Gerar relatório de prioridades', cor: '#0891B2' },
]

const estatisticas = [
  { label: 'Regiões analisadas', valor: '34' },
  { label: 'Fontes de dados', valor: '4' },
  { label: 'Última actualização', valor: '08/07/2026' },
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

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => navigate('/analise', { state: { vista: 'mapa' } })}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500' }}
          >
            <Map size={14} /> Mapa
          </button>
          <button
            onClick={() => navigate('/analise', { state: { vista: 'indicadores' } })}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500' }}
          >
            <BarChart2 size={14} /> Indicadores
          </button>
        </div>
      </header>

      {/* Hero */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '80px 2rem 40px', textAlign: 'center' }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '20px', padding: '4px 14px', marginBottom: '24px' }}>
          <Globe size={12} color="#1D4ED8" />
          <span style={{ fontSize: '12px', color: '#1D4ED8', fontWeight: '500' }}>App BiT B2G — Hackathon 2026</span>
        </div>

        <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#1F2937', margin: '0 0 12px', lineHeight: 1.2 }}>
          Inteligência Territorial<br />
          <span style={{ color: '#1D4ED8' }}>para Decisões Públicas</span>
        </h1>

        <p style={{ color: '#6B7280', fontSize: '16px', margin: '0 0 48px', lineHeight: 1.6 }}>
          Olá! Sou o Orivis AI.<br />
          Faça uma pergunta sobre dados territoriais de Angola, Brasil e América Latina.
        </p>

        {/* Caixa de pergunta */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #E5E7EB', padding: '16px', marginBottom: '24px' }}>
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
                background: loading || !pergunta.trim() ? '#E5E7EB' : '#1D4ED8',
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

        {/* Sugestões */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '48px' }}>
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

        {/* Estatísticas */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {estatisticas.map(({ label, valor }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1F2937' }}>{valor}</p>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#9CA3AF' }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Fontes */}
        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {['Vísent CDRView', 'INE Angola', 'IBGE Brasil', 'OMS'].map(f => (
            <span key={f} style={{ fontSize: '11px', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}