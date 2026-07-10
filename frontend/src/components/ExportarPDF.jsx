import { useState } from 'react'
import jsPDF from 'jspdf'
import { FileText } from 'lucide-react'

export default function ExportarPDF({ regiao, idioma }) {
  const [loading, setLoading] = useState(false)

  const gerar = async () => {
    if (!regiao) return
    setLoading(true)

    const doc = new jsPDF()
    const cor = regiao.iot >= 80 ? [239, 68, 68] : regiao.iot >= 60 ? [249, 115, 22] : regiao.iot >= 40 ? [245, 158, 11] : [16, 185, 129]

    // Cabeçalho
    doc.setFillColor(29, 78, 216)
    doc.rect(0, 0, 210, 35, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Orivis AI', 15, 15)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Painel de Dados Públicos — App BiT B2G', 15, 23)
    doc.text(`Relatório gerado em ${new Date().toLocaleDateString('pt-PT')}`, 15, 30)

    // Título da região
    doc.setTextColor(31, 41, 55)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(regiao.regiao, 15, 50)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(107, 114, 128)
    doc.text(regiao.pais, 15, 58)

    // IOT
    doc.setFillColor(...cor)
    doc.roundedRect(15, 65, 80, 35, 4, 4, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text(`${regiao.iot}`, 35, 85)
    doc.setFontSize(10)
    doc.text('/ 100', 55, 85)
    doc.setFontSize(9)
    doc.text('ÍNDICE DE OPORTUNIDADE TERRITORIAL', 17, 93)

    // Classificação
    doc.setFontSize(11)
    doc.setTextColor(...cor)
    doc.setFont('helvetica', 'bold')
    doc.text(regiao.iot_classificacao?.toUpperCase() ?? '', 105, 80)

    // Linha separadora
    doc.setDrawColor(229, 231, 235)
    doc.line(15, 108, 195, 108)

    // Indicadores
    doc.setTextColor(31, 41, 55)
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.text('Indicadores Territoriais', 15, 118)

    const labels = {
      empregabilidade: 'Empregabilidade',
      formacao: 'Formação',
      saude_mental: 'Saúde Mental',
      mentorias: 'Mentorias',
      iniciativas_sociais: 'Iniciativas Sociais',
      cobertura_rede: 'Cobertura Digital'
    }

    let y = 128
    Object.entries(regiao.indicadores).forEach(([key, valor]) => {
      const corBarra = valor >= 50 ? [16, 185, 129] : valor >= 30 ? [245, 158, 11] : [239, 68, 68]
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(107, 114, 128)
      doc.text(labels[key] ?? key, 15, y)
      doc.setTextColor(31, 41, 55)
      doc.setFont('helvetica', 'bold')
      doc.text(`${valor}%`, 160, y)
      // Barra
      doc.setFillColor(243, 244, 246)
      doc.roundedRect(15, y + 2, 140, 4, 2, 2, 'F')
      doc.setFillColor(...corBarra)
      doc.roundedRect(15, y + 2, 140 * valor / 100, 4, 2, 2, 'F')
      y += 14
    })

    // Linha separadora
    doc.setDrawColor(229, 231, 235)
    doc.line(15, y + 4, 195, y + 4)
    y += 14

    // Motivos do IOT
    if (regiao.iot_breakdown?.length > 0) {
      doc.setFontSize(13)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(31, 41, 55)
      doc.text('Motivos da Classificação', 15, y)
      y += 10

      regiao.iot_breakdown.slice(0, 4).forEach(item => {
        doc.setFontSize(10)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(107, 114, 128)
        doc.text(`${item.seta} ${item.indicador}: ${item.valor_real}%`, 15, y)
        y += 8
      })
      y += 4
    }

    // Recomendação
    doc.setDrawColor(229, 231, 235)
    doc.line(15, y, 195, y)
    y += 10
    doc.setFontSize(13)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(31, 41, 55)
    doc.text('Dados de Concentração', 15, y)
    y += 10
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(107, 114, 128)
    doc.text(`Concentração populacional: ${regiao.concentracao}%`, 15, y)
    y += 8
    doc.text(`População estimada: ${regiao.populacao?.toLocaleString('pt-PT') ?? 'N/D'}`, 15, y)

    // Fontes
    y += 16
    doc.setFontSize(9)
    doc.setTextColor(156, 163, 175)
    doc.text('Fontes: Dataset Vísent CDRView · INE Angola · IBGE Brasil · OMS', 15, y)
    doc.text('Metodologia: GMAAE — Geometria, Matemática, Agrimensura, Arquitectura, Estratégia', 15, y + 6)

    // Rodapé
    doc.setFillColor(29, 78, 216)
    doc.rect(0, 282, 210, 15, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.text('Orivis AI — Hackathon App BiT B2G 2026', 15, 291)
    doc.text('orivis.ai', 175, 291)

    doc.save(`orivis-ai-${regiao.regiao.toLowerCase().replace(/ /g, '-')}.pdf`)
    setLoading(false)
  }

  return (
    <button
      onClick={gerar}
      disabled={!regiao || loading}
      style={{
        background: !regiao ? '#E5E7EB' : '#1D4ED8',
        color: !regiao ? '#9CA3AF' : 'white',
        border: 'none', borderRadius: '8px',
        padding: '8px 16px', cursor: !regiao ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', gap: '6px',
        fontSize: '13px', fontWeight: '500'
      }}
    >
      <FileText size={14} />
      {loading ? 'A gerar...' : 'Exportar PDF'}
    </button>
  )
}