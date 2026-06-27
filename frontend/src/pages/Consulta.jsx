import { useState } from 'react'
import { consultarDados } from '../services/api'
import { Send, Bot, User, Loader } from 'lucide-react'

const perguntasSugeridas = [
  'Onde devo investir primeiro em programas de formação em Angola?',
  'Quais regiões têm maior concentração populacional mas menor cobertura de rede?',
  'Que províncias angolanas necessitam de intervenção urgente em saúde mental?',
  'Onde há maior potencial de empregabilidade não aproveitado no Brasil?',
  'Quais regiões da América Latina têm melhor IOT?',
]

export default function Consulta({ idioma }) {
  const [consulta, setConsulta] = useState('')
  const [historico, setHistorico] = useState([])
  const [loading, setLoading] = useState(false)
  const [regiao, setRegiao] = useState('')
  const [indicador, setIndicador] = useState('')

  const enviar = async (texto) => {
    const pergunta = texto || consulta
    if (!pergunta.trim()) return

    setHistorico(prev => [...prev, { tipo: 'user', texto: pergunta }])
    setConsulta('')
    setLoading(true)

    try {
      const filtros = {}
      if (regiao) filtros.regiao = regiao
      if (indicador) filtros.indicador = indicador

      const data = await consultarDados(pergunta, filtros, idioma)

      setHistorico(prev => [...prev, {
        tipo: 'ai',
        texto: data.resposta_ia,
        fontes: data.fontes
      }])
    } catch (error) {
      setHistorico(prev => [...prev, {
        tipo: 'ai',
        texto: 'Ocorreu um erro ao processar a consulta. Por favor tenta novamente.',
        fontes: []
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', maxWidth: '900px', margin: '0 auto' }}>

      {/* Título */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ color: '#1F2937', fontSize: '24px', fontWeight: '700', margin: 0 }}>Consulta Inteligente</h1>
        <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0 0' }}>Faz perguntas em linguagem natural ao Orivis AI</p>
      </div>

      {/* Filtros opcionais */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>Filtros opcionais:</span>
        <input
          placeholder="Região (ex: Luanda)"
          value={regiao}
          onChange={e => setRegiao(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', color: '#1F2937', width: '180px' }}
        />
        <select
          value={indicador}
          onChange={e => setIndicador(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', color: '#1F2937' }}
        >
          <option value="">Todos os indicadores</option>
          <option value="empregabilidade">Empregabilidade</option>
          <option value="formacao">Formação</option>
          <option value="saude_mental">Saúde Mental</option>
          <option value="mentorias">Mentorias</option>
          <option value="iniciativas_sociais">Iniciativas Sociais</option>
        </select>
      </div>

      {/* Histórico de conversa */}
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: '16px', minHeight: '400px', maxHeight: '500px', overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {historico.length === 0 && (
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <div style={{ width: '56px', height: '56px', background: '#EFF6FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Bot size={28} color="#1D4ED8" />
            </div>
            <h3 style={{ color: '#1F2937', fontSize: '16px', fontWeight: '600', margin: '0 0 8px' }}>Como posso ajudar?</h3>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 24px' }}>Faz uma pergunta sobre dados territoriais ou escolhe uma sugestão abaixo.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '500px', margin: '0 auto' }}>
              {perguntasSugeridas.map((p, i) => (
                <button key={i} onClick={() => enviar(p)} style={{
                  background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: '8px',
                  padding: '10px 16px', cursor: 'pointer', fontSize: '13px', color: '#374151',
                  textAlign: 'left', transition: 'all 0.2s'
                }}
                  onMouseEnter={e => e.target.style.background = '#EFF6FF'}
                  onMouseLeave={e => e.target.style.background = '#F8FAFC'}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {historico.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', flexDirection: msg.tipo === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
              background: msg.tipo === 'user' ? '#1D4ED8' : '#10B981',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {msg.tipo === 'user' ? <User size={18} color="white" /> : <Bot size={18} color="white" />}
            </div>
            <div style={{ maxWidth: '75%' }}>
              <div style={{
                background: msg.tipo === 'user' ? '#1D4ED8' : '#F8FAFC',
                color: msg.tipo === 'user' ? 'white' : '#1F2937',
                borderRadius: msg.tipo === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                padding: '12px 16px', fontSize: '14px', lineHeight: '1.6',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.texto}
              </div>
              {msg.fontes && msg.fontes.length > 0 && (
                <div style={{ marginTop: '6px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {msg.fontes.map((fonte, j) => (
                    <span key={j} style={{ fontSize: '11px', color: '#6B7280', background: '#F3F4F6', padding: '2px 8px', borderRadius: '10px' }}>
                      📎 {fonte}
                    </span>
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
            <div style={{ background: '#F8FAFC', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', display: 'flex', gap: '4px', alignItems: 'center' }}>
              <Loader size={16} color="#6B7280" style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '14px', color: '#6B7280' }}>Orivis AI está a analisar...</span>
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
          placeholder="Escreve a tua pergunta aqui... (Enter para enviar)"
          rows={2}
          style={{ flex: 1, border: 'none', outline: 'none', resize: 'none', fontSize: '14px', color: '#1F2937', fontFamily: 'Inter, sans-serif', lineHeight: '1.5' }}
        />
        <button
          onClick={() => enviar()}
          disabled={loading || !consulta.trim()}
          style={{
            background: loading || !consulta.trim() ? '#E5E7EB' : '#1D4ED8',
            color: loading || !consulta.trim() ? '#9CA3AF' : 'white',
            border: 'none', borderRadius: '8px', padding: '10px 16px',
            cursor: loading || !consulta.trim() ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500'
          }}
        >
          <Send size={16} />
          Enviar
        </button>
      </div>
    </div>
  )
}