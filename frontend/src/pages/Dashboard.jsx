import { useState, useEffect } from 'react'
import { obterMapa } from '../services/api'
import { Briefcase, GraduationCap, Brain, Users, Sprout, Wifi, Users2 } from 'lucide-react'

const calcularIOT = (indicadores) => {
  const valores = Object.values(indicadores)
  return Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
}

const corIOT = (iot) => {
  if (iot >= 70) return '#10B981'
  if (iot >= 40) return '#F59E0B'
  return '#EF4444'
}

const nivelIOT = (iot) => {
  if (iot >= 70) return 'Alto Potencial'
  if (iot >= 40) return 'Potencial Moderado'
  return 'Necessita Intervenção'
}

const icones = {
  empregabilidade: Briefcase,
  formacao: GraduationCap,
  saude_mental: Brain,
  mentorias: Users,
  iniciativas_sociais: Sprout,
}

const labels = {
  empregabilidade: 'Empregabilidade',
  formacao: 'Formação',
  saude_mental: 'Saúde Mental',
  mentorias: 'Mentorias',
  iniciativas_sociais: 'Iniciativas Sociais',
}

const corCard = (valor) => {
  if (valor >= 50) return '#10B981'
  if (valor >= 30) return '#F59E0B'
  return '#EF4444'
}

export default function Dashboard() {
  const [regioes, setRegioes] = useState([])
  const [regiaoSelecionada, setRegiaoSelecionada] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paisFiltro, setPaisFiltro] = useState('Todos')

  useEffect(() => {
    obterMapa().then(data => {
      setRegioes(data.regioes)
      setRegiaoSelecionada(data.regioes[0])
      setLoading(false)
    })
  }, [])

  const paises = ['Todos', ...new Set(regioes.map(r => r.pais))]
  const regioesFiltradas = paisFiltro === 'Todos' ? regioes : regioes.filter(r => r.pais === paisFiltro)

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #E5E7EB', borderTop: '4px solid #1D4ED8', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>A carregar dados...</p>
      </div>
    </div>
  )

  const iot = regiaoSelecionada ? calcularIOT(regiaoSelecionada.indicadores) : 0

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Título e filtros */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ color: '#1F2937', fontSize: '24px', fontWeight: '700', margin: 0 }}>Painel de Dados Públicos</h1>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0' }}>App BiT B2G — Orivis AI</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {paises.map(p => (
            <button key={p} onClick={() => setPaisFiltro(p)} style={{
              padding: '6px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500',
              background: paisFiltro === p ? '#1D4ED8' : '#E5E7EB',
              color: paisFiltro === p ? 'white' : '#374151'
            }}>{p}</button>
          ))}
        </div>
      </div>

      {/* Selector de região */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Região:</label>
        <select
          onChange={e => setRegiaoSelecionada(regioes.find(r => r.regiao === e.target.value))}
          style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#1F2937', background: 'white', cursor: 'pointer', width: '280px' }}
        >
          {regioesFiltradas.map(r => (
            <option key={r.regiao} value={r.regiao}>{r.regiao} — {r.pais}</option>
          ))}
        </select>
      </div>

      {regiaoSelecionada && (
        <>
          {/* IOT — elemento central */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
            
            {/* Círculo IOT */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: `conic-gradient(${corIOT(iot)} ${iot * 3.6}deg, #F3F4F6 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '30px', fontWeight: '700', color: corIOT(iot), lineHeight: 1 }}>{iot}</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>/ 100</span>
                </div>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>IOT</p>
            </div>

            {/* Info região */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1F2937', margin: '0 0 4px' }}>{regiaoSelecionada.regiao}</h2>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 12px' }}>{regiaoSelecionada.pais}</p>
              <span style={{ background: corIOT(iot), color: 'white', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                {nivelIOT(iot)}
              </span>
              <div style={{ marginTop: '20px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users2 size={16} color="#6B7280" />
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Concentração</p>
                    <p style={{ margin: 0, fontWeight: '700', color: '#1F2937' }}>{regiaoSelecionada.concentracao}%</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wifi size={16} color="#6B7280" />
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Cobertura de Rede</p>
                    <p style={{ margin: 0, fontWeight: '700', color: '#1F2937' }}>{regiaoSelecionada.cobertura_rede}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recomendações rápidas */}
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', minWidth: '220px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Recomendações rápidas</p>
              {Object.entries(regiaoSelecionada.indicadores)
                .sort((a, b) => a[1] - b[1])
                .slice(0, 3)
                .map(([key]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>Investir em <strong>{labels[key]}</strong></p>
                  </div>
                ))}
            </div>
          </div>

          {/* Cards de indicadores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {Object.entries(regiaoSelecionada.indicadores).map(([key, valor]) => {
              const Icone = icones[key]
              return (
                <div key={key} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: `3px solid ${corCard(valor)}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ background: `${corCard(valor)}15`, borderRadius: '8px', padding: '8px' }}>
                      <Icone size={20} color={corCard(valor)} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: corCard(valor), background: `${corCard(valor)}15`, padding: '2px 8px', borderRadius: '10px' }}>
                      {valor >= 50 ? 'Bom' : valor >= 30 ? 'Médio' : 'Crítico'}
                    </span>
                  </div>
                  <p style={{ color: '#6B7280', fontSize: '12px', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{labels[key]}</p>
                  <p style={{ color: '#1F2937', fontSize: '32px', fontWeight: '700', margin: '0 0 12px', lineHeight: 1 }}>{valor}</p>
                  <div style={{ background: '#F3F4F6', borderRadius: '4px', height: '6px' }}>
                    <div style={{ background: corCard(valor), width: `${valor}%`, height: '6px', borderRadius: '4px', transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}