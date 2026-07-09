import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { obterMapa } from '../services/api'

const calcularIOT = (indicadores) => {
  const valores = Object.values(indicadores)
  return Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
}

const nivelIOT = (iot) => {
  if (iot <= 20) return 'Baixa prioridade'
  if (iot <= 40) return 'Prioridade moderada'
  if (iot <= 60) return 'Prioridade elevada'
  if (iot <= 80) return 'Alta prioridade'
  return 'Prioridade crítica'
}

const corPorIOT = (iot) => {
  if (iot <= 20) return '#10B981'
  if (iot <= 40) return '#84CC16'
  if (iot <= 60) return '#F59E0B'
  if (iot <= 80) return '#F97316'
  return '#EF4444'
}

// URL do GeoJSON no nosso repositório GitHub
const GEOJSON_URL = 'https://raw.githubusercontent.com/No-Country-simulation/S06-26-AB-Equipe-44/main/data/angola.geojson'

export default function Mapa({ idioma }) {
  const [regioes, setRegioes] = useState([])
  const [geoJson, setGeoJson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [regiaoActiva, setRegiaoActiva] = useState(null)
  const [paisFiltro, setPaisFiltro] = useState('Todos')

  useEffect(() => {
    Promise.all([
      obterMapa(),
      fetch(GEOJSON_URL).then(r => r.json()).catch(() => null)
    ]).then(([mapaData, geoData]) => {
      setRegioes(mapaData.regioes)
      setGeoJson(geoData)
      setLoading(false)
    })
  }, [])

  const paises = ['Todos', ...new Set(regioes.map(r => r.pais))]
  const regioesFiltradas = paisFiltro === 'Todos' ? regioes : regioes.filter(r => r.pais === paisFiltro)

  const estiloProvincia = (feature) => {
    const nome = feature.properties.name
    const regiao = regioes.find(r => r.regiao === nome)
    const iot = regiao?.iot ?? 50
    return {
      fillColor: corPorIOT(iot),
      fillOpacity: 0.7,
      color: 'white',
      weight: 1.5
    }
  }

  const aoClicarProvincia = (feature, layer) => {
    const nome = feature.properties.name
    const regiao = regioes.find(r => r.regiao === nome)
    if (regiao) {
      layer.on('click', () => setRegiaoActiva(regiao))
      layer.bindTooltip(`
        <div style="font-family:Inter,sans-serif;min-width:140px">
          <strong style="font-size:14px">${nome}</strong>
          <p style="margin:2px 0;font-size:12px;color:#6B7280">Angola</p>
          <p style="margin:4px 0 0;font-size:13px">IOT: <strong style="color:${corPorIOT(regiao.iot)}">${regiao.iot}/100</strong></p>
          <p style="margin:2px 0;font-size:12px">${regiao.iot_classificacao}</p>
        </div>
      `, { permanent: false })
    }
  }

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

      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#1F2937', fontSize: '24px', fontWeight: '700', margin: 0 }}>Mapa Territorial</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0' }}>Visualização geográfica de desigualdades e oportunidades</p>
      </div>

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

        <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', height: '560px' }}>
          <MapContainer center={[-11.5, 17.5]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />

            {/* GeoJSON das províncias de Angola */}
            {geoJson && (paisFiltro === 'Todos' || paisFiltro === 'Angola') && (
              <GeoJSON
                data={geoJson}
                style={estiloProvincia}
                onEachFeature={aoClicarProvincia}
              />
            )}

            {/* Círculos para Brasil e LATAM */}
            {regioesFiltradas
              .filter(r => r.pais !== 'Angola')
              .map(regiao => (
                <CircleMarker
                  key={regiao.regiao}
                  center={[regiao.lat, regiao.lng]}
                  radius={Math.max(8, regiao.concentracao / 8)}
                  fillColor={corPorIOT(regiao.iot)}
                  color="white"
                  weight={2}
                  fillOpacity={0.85}
                  eventHandlers={{ click: () => setRegiaoActiva(regiao) }}
                >
                  <Tooltip>
                    <div style={{ fontFamily: 'Inter, sans-serif', minWidth: '140px' }}>
                      <strong style={{ fontSize: '14px' }}>{regiao.regiao}</strong>
                      <p style={{ margin: '2px 0', fontSize: '12px', color: '#6B7280' }}>{regiao.pais}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px' }}>IOT: <strong style={{ color: corPorIOT(regiao.iot) }}>{regiao.iot}/100</strong></p>
                    </div>
                  </Tooltip>
                </CircleMarker>
              ))}
          </MapContainer>
        </div>

        {regiaoActiva && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1F2937' }}>{regiaoActiva.regiao}</h3>
                <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#6B7280' }}>{regiaoActiva.pais}</p>
              </div>
              <button onClick={() => setRegiaoActiva(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '18px' }}>✕</button>
            </div>

            <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '16px', marginBottom: '16px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 4px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em' }}>IOT</p>
              <p style={{ margin: 0, fontSize: '40px', fontWeight: '700', color: corPorIOT(regiaoActiva.iot) }}>
                {regiaoActiva.iot}<span style={{ fontSize: '16px', color: '#9CA3AF' }}>/100</span>
              </p>
              <span style={{ background: corPorIOT(regiaoActiva.iot), color: 'white', padding: '3px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                {regiaoActiva.iot_classificacao}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {regiaoActiva.iot_breakdown?.slice(0, 5).map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>{item.seta}</span> {item.indicador}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: item.critico ? '#EF4444' : '#10B981' }}>{item.valor_real}%</span>
                  </div>
                  <div style={{ background: '#F3F4F6', borderRadius: '4px', height: '5px' }}>
                    <div style={{ background: item.critico ? '#EF4444' : '#10B981', width: `${item.valor_real}%`, height: '5px', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '24px', marginTop: '16px', padding: '12px 16px', background: 'white', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', width: 'fit-content' }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: '600' }}>Legenda IOT:</p>
        {[
          { cor: '#10B981', label: 'Baixa prioridade (0-20)' },
          { cor: '#84CC16', label: 'Moderada (21-40)' },
          { cor: '#F59E0B', label: 'Elevada (41-60)' },
          { cor: '#F97316', label: 'Alta (61-80)' },
          { cor: '#EF4444', label: 'Crítica (81-100)' }
        ].map(({ cor, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: cor }} />
            <span style={{ fontSize: '12px', color: '#6B7280' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}