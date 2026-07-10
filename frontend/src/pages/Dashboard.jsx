import { useState, useEffect } from 'react'
import { obterMapa } from '../services/api'
import { Briefcase, GraduationCap, Brain, Users, Sprout, Wifi, UserRound } from 'lucide-react'
import ExportarPDF from '../components/ExportarPDF'

const icones = {
  empregabilidade: Briefcase,
  formacao: GraduationCap,
  saude_mental: Brain,
  mentorias: Users,
  iniciativas_sociais: Sprout,
  cobertura_rede: Wifi,
}

const labels = {
  empregabilidade: 'Empregabilidade',
  formacao: 'Formação',
  saude_mental: 'Saúde Mental',
  mentorias: 'Mentorias',
  iniciativas_sociais: 'Iniciativas Sociais',
  cobertura_rede: 'Cobertura Digital',
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

  const paises = [...new Set(regioes.map(r => r.pais))]
  const regioesFiltradas = paisFiltro === 'Todos' ? regioes : regioes.filter(r => r.pais === paisFiltro)

  const iot = regiaoSelecionada?.iot ?? 0
  const iotCor = regiaoSelecionada?.iot_cor ?? '#F59E0B'
  const iotClassificacao = regiaoSelecionada?.iot_classificacao ?? ''
  const iotBreakdown = regiaoSelecionada?.iot_breakdown ?? []

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #E5E7EB', borderTop: '4px solid #1D4ED8', borderRadius: '50%', margin: '0 auto 16px' }} />
        <p style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>A carregar dados...</p>
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>

    {/* Título */}
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
  <div>
    <h1 style={{ color: '#1F2937', fontSize: '24px', fontWeight: '700', margin: 0 }}>Painel de Dados Públicos</h1>
    <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0' }}>App BiT B2G — Orivis AI</p>
  </div>
  <ExportarPDF regiao={regiaoSelecionada} idioma={idioma} />
</div>

      {/* Selector de região — dois níveis */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>Região:</label>

        {paisFiltro === 'Todos' ? (
          <select
            defaultValue=""
            onChange={e => {
              const pais = e.target.value
              if (pais) {
                setPaisFiltro(pais)
                const primeira = regioes.find(r => r.pais === pais)
                setRegiaoSelecionada(primeira)
              }
            }}
            style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#1F2937', background: 'white', cursor: 'pointer', width: '280px' }}
          >
            <option value="" disabled>Selecciona um país...</option>
            {paises.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => { setPaisFiltro('Todos'); setRegiaoSelecionada(null) }}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', background: 'white', cursor: 'pointer', fontSize: '13px', color: '#374151' }}
            >
              ← {paisFiltro}
            </button>
            <select
              onChange={e => setRegiaoSelecionada(regioes.find(r => r.regiao === e.target.value))}
              value={regiaoSelecionada?.regiao ?? ''}
              style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', color: '#1F2937', background: 'white', cursor: 'pointer', width: '280px' }}
            >
              {regioesFiltradas.map(r => (
                <option key={r.regiao} value={r.regiao}>{r.regiao}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Estado vazio — nenhum país seleccionado */}
      {!regiaoSelecionada && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '48px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ width: '56px', height: '56px', background: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <UserRound size={28} color="#1D4ED8" />
          </div>
          <h3 style={{ color: '#1F2937', fontSize: '16px', fontWeight: '600', margin: '0 0 8px' }}>Selecciona um país para começar</h3>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>Escolhe um país no selector acima para ver os indicadores territoriais.</p>

          {/* Cards de países disponíveis */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '32px', maxWidth: '600px', margin: '32px auto 0' }}>
            {paises.map(p => {
              const regioesPais = regioes.filter(r => r.pais === p)
              const iotMedio = Math.round(regioesPais.reduce((a, r) => a + r.iot, 0) / regioesPais.length)
              const cor = iotMedio >= 60 ? '#EF4444' : iotMedio >= 40 ? '#F59E0B' : '#10B981'
              return (
                <div
                  key={p}
                  onClick={() => { setPaisFiltro(p); setRegiaoSelecionada(regioesPais[0]) }}
                  style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1D4ED8'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}
                >
                  <p style={{ margin: '0 0 4px', fontWeight: '600', color: '#1F2937', fontSize: '14px' }}>{p}</p>
                  <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#6B7280' }}>{regioesPais.length} regiões</p>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: cor, background: `${cor}15`, padding: '2px 8px', borderRadius: '10px' }}>
                    IOT médio: {iotMedio}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {regiaoSelecionada && (
        <>
          {/* IOT — elemento central */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>

            {/* Círculo IOT */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: `conic-gradient(${iotCor} ${iot * 3.6}deg, #F3F4F6 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '30px', fontWeight: '700', color: iotCor, lineHeight: 1 }}>{iot}</span>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>/ 100</span>
                </div>
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '12px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>IOT</p>
            </div>

            {/* Info região */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1F2937', margin: '0 0 4px' }}>{regiaoSelecionada.regiao}</h2>
              <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 12px' }}>{regiaoSelecionada.pais}</p>
              <span style={{ background: iotCor, color: 'white', padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                {iotClassificacao}
              </span>
              <div style={{ marginTop: '20px', display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UserRound size={16} color="#6B7280" />
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Concentração</p>
                    <p style={{ margin: 0, fontWeight: '700', color: '#1F2937' }}>{regiaoSelecionada.concentracao}%</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wifi size={16} color="#6B7280" />
                  <div>
                    <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase' }}>Cobertura de Rede</p>
                    <p style={{ margin: 0, fontWeight: '700', color: '#1F2937' }}>{regiaoSelecionada.indicadores.cobertura_rede}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* IOT Breakdown */}
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '20px', minWidth: '240px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Motivos da classificação</p>
              {iotBreakdown.slice(0, 4).map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14px' }}>{item.seta}</span>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>{item.indicador}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: item.critico ? '#EF4444' : '#10B981' }}>
                    {item.valor_real}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Cards de indicadores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {Object.entries(regiaoSelecionada.indicadores).map(([key, valor]) => {
              const Icone = icones[key]
              if (!Icone) return null
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