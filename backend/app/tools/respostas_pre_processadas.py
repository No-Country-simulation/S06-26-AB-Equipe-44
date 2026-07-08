RESPOSTAS_PRE_PROCESSADAS = {
    "situação huambo": """
**Província do Huambo — Análise Orivis AI**

**IOT: 34/100 — Necessita Intervenção**

**Indicadores:**
- Empregabilidade: 40% — Médio
- Formação: 35% — Crítico  
- Saúde Mental: 30% — Crítico
- Cobertura de Rede: 55% — Médio
- Mentorias: 25% — Crítico

**Recomendação GMAAE:**
Huambo tem alta concentração populacional (1.8M habitantes) mas indicadores sociais críticos. 
Prioridade: programas de formação técnica e mentoria jovem.

*Fonte: Dataset Vísent CDRView + INE Angola*
    """,
    "provincia mais critica angola": """
**Análise de Prioridades — Angola**

Com base no IOT, as províncias mais críticas são:
1. Moxico Leste — IOT: 6/100
2. Cuando — IOT: 8/100  
3. Cuando Cubango — IOT: 10/100

Estas regiões combinam baixa cobertura de rede com alta taxa de desemprego e pobreza.

*Fonte: Dataset Vísent CDRView + INE Angola + OMS*
    """,
    "onde investir formação angola": """
**Onde Investir em Formação — Angola**

Regiões prioritárias por potencial vs necessidade:
1. **Bié** — 1.8M habitantes, cobertura 45%, formação crítica (28%)
2. **Malanje** — 1M habitantes, cobertura 40%, formação crítica (25%)
3. **Uíge** — 1.5M habitantes, cobertura 38%, formação crítica (22%)

Estas regiões têm população significativa mas lacunas graves em formação e conectividade.

*Fonte: Dataset Vísent CDRView + INE Angola*
    """
}

def verificar_resposta_pre_processada(pergunta: str):
    pergunta_lower = pergunta.lower()
    for chave, resposta in RESPOSTAS_PRE_PROCESSADAS.items():
        if chave in pergunta_lower:
            print(f"[PRE-PROCESSADO] Resposta encontrada para: {pergunta[:50]}")
            return resposta
    return None