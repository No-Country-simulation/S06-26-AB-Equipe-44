import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { obterMapa } from '../services/api'

const corPorIOT = (indicadores) => {
  const iot = Math.round(Object.values(indicadores).reduce((a, b) => a + b, 0) / Object.values(indicadores).length)
  if (iot >= 70) return '#10B981'
  if (iot >= 40) return '#F59E0B'
  return '#EF4444'
}

const calcularIOT = (indicadores) => {
  const valores = Object.values(indicadores)
  return Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
}

const nivelIOT = (iot) => {
  if (iot >= 70) return 'Alto Potencial'
  if (iot >= 40) return 'Potencial Moderado'
  return 'Necessita Intervenção'
}

export default function Mapa() {
  const [regioes, setRegioes] = useState([])
  const [loading, setLoading] = useState(true)
  const [regiaoActiva, setRegiaoActiva] = useState(null)
  const [paisFiltro, setPaisFiltro] = useState('Todos')

  useEffect(() => {
    obterMapa().then(data => {
      setRegioes(data.regioes)
      setLoading(false)
    })
  }, [])

  const paises = ['Todos', ...new Set(regioes.map(r => r.pais))]
  const regioesFiltradas = paisFiltro === 'Todos' ? regioes : regioes.filter(r => r.pais === paisFiltro)

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #E5E7EB', borderTop: '4px solid #1D4ED8', borderRadius: '50%', margin: '0 auto 16px' }} />
        <p style={{ color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>A carregar mapa...</p>
      </div>
    </div>
  )

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Título */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#1F2937', fontSize: '24px', fontWeight: '700', margin: 0 }}>Mapa Territorial</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0' }}>Visualização geográfica de desigualdades e oportunidades</p>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {paises.map(p => (
          <button key={p} onClick={() => setPaisFiltro(p)} style={{
            padding: '6px 14px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500',
            background: paisFiltro === p ? '#1D4ED8' : '#E5E7EB',
            color: paisFiltro === p ? 'white' : '#374151'
          }}>{p}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: regiaoActiva ? '1fr 320px' : '1fr', gap: '16px' }}>

        {/* Mapa */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', height: '560px' }}>
          <MapContainer center={[-5, 15]} zoom={3} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            {regioesFiltradas.map(regiao => {
              const iot = calcularIOT(regiao.indicadores)
              const cor = corPorIOT(regiao.indicadores)
              return (
                <CircleMarker
                  key={regiao.regiao}
                  center={[regiao.lat, regiao.lng]}
                  radius={Math.max(8, regiao.concentracao / 8)}
                  fillColor={cor}
                  color="white"
                  weight={2}
                  fillOpacity={0.85}
                  eventHandlers={{ click: () => setRegiaoActiva(regiao) }}
                >
                  <Tooltip>
                    <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '140px' }}>
                      <strong style={{ fontSize: '14px' }}>{regiao.regiao}</strong>
                      <p style={{ margin: '2px 0', fontSize: '12px', color: '#6B7280' }}>{regiao.pais}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px' }}>IOT: <strong style={{ color: cor }}>{iot}/100</strong></p>
                      <p style={{ margin: '2px 0', fontSize: '12px' }}>Rede: {regiao.cobertura_rede}%</p>
                    </div>
                  </Tooltip>
                </CircleMarker>
              )
            })}
          </MapContainer>
        </div>

        {/* Painel lateral — detalhe da região */}
        {regiaoActiva && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>{regiaoActiva.regiao}</h3>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#6B7280' }}>{regiaoActiva.pais}</p>
              </div>
              <button onClick={() => setRegiaoActiva(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '18px' }}>✕</button>
            </div>

            {/* IOT */}
            <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Índice de Oportunidade Territorial</p>
              <p style={{ margin: 0, fontSize: '40px', fontWeight: '700', color: corPorIOT(regiaoActiva.indicadores) }}>{calcularIOT(regiaoActiva.indicadores)}<span style={{ fontSize: '16px', color: '#9CA3AF' }}>/100</span></p>
              <span style={{ background: corPorIOT(regiaoActiva.indicadores), color: 'white', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                {nivelIOT(calcularIOT(regiaoActiva.indicadores))}
              </span>
            </div>

            {/* Indicadores */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { key: 'concentracao', label: 'Concentração Populacional', valor: regiaoActiva.concentracao },
                { key: 'cobertura_rede', label: 'Cobertura de Rede', valor: regiaoActiva.cobertura_rede },
                ...Object.entries(regiaoActiva.indicadores).map(([key, valor]) => ({
                  key, valor,
                  label: { empregabilidade: 'Empregabilidade', formacao: 'Formação', saude_mental: 'Saúde Mental', mentorias: 'Mentorias', iniciativas_sociais: 'Iniciativas Sociais' }[key]
                }))
              ].map(({ key, label, valor }) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{label}</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#1F2937' }}>{valor}%</span>
                  </div>
                  <div style={{ background: '#F3F4F6', borderRadius: '4px', height: '6px' }}>
                    <div style={{ background: valor >= 50 ? '#10B981' : valor >= 30 ? '#F59E0B' : '#EF4444', width: `${valor}%`, height: '6px', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legenda */}
      <div style={{ display: 'flex', gap: '24px', marginTop: '16px', padding: '12px 16px', background: 'white', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', width: 'fit-content' }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Legenda IOT:</p>
        {[{ cor: '#10B981', label: 'Alto Potencial (≥70)' }, { cor: '#F59E0B', label: 'Moderado (40-69)' }, { cor: '#EF4444', label: 'Crítico (<40)' }].map(({ cor, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cor }} />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}