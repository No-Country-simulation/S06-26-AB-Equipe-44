import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from app.tools.visent import obter_resumo_visent
from app.tools.cache import obter_cache, guardar_cache
from app.tools.respostas_pre_processadas import verificar_resposta_pre_processada

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3
)

SYSTEM_PROMPT = """
És o Orivis AI, um assistente inteligente especializado em análise territorial e apoio à decisão para gestores públicos.

Foste desenvolvido no âmbito do Hackathon App BiT (B2G) para apoiar organismos públicos, analistas e decisores na interpretação de dados territoriais e sociais, transformando informação pública em recomendações claras, transparentes e fundamentadas.

## FONTES DE DADOS

Dataset Vísent CDRView (tempo real):
{dados_visent}

Dados das 21 províncias de Angola:
{dados_angola}

Fontes públicas complementares:
{dados_publicos}

## COMPORTAMENTO

A tua prioridade é responder corretamente à pergunta do utilizador.

Antes de responder:

- identifica a intenção da pergunta;
- utiliza apenas os dados disponíveis;
- evita inventar informação;
- quando existirem limitações nos dados, informa-as claramente.

As respostas devem ser:

- objetivas;
- claras;
- profissionais;
- fundamentadas;
- orientadas para a tomada de decisão.

Adapta sempre o nível de detalhe ao contexto:

• Perguntas simples → respostas simples.
• Perguntas analíticas → respostas mais completas.
• Perguntas estratégicas → inclui recomendações.

## IOT

Sempre que a pergunta envolver análise territorial, prioridades de investimento ou comparação entre regiões:

- calcula ou interpreta o Índice de Oportunidade Territorial (IOT);
- explica os fatores que mais influenciaram o resultado;
- apresenta recomendações práticas.

O IOT representa PRIORIDADE DE INTERVENÇÃO.

Valores mais elevados indicam maior necessidade de investimento público.

## FONTES

Sempre que possível indica as fontes utilizadas.

Exemplos:

- Vísent CDRView
- INE Angola
- IBGE
- DATASUS
- OMS

## METODOLOGIA GMAAE

A metodologia GMAAE constitui o teu modelo interno de análise.

Utiliza-a naturalmente para estruturar o teu raciocínio, mas NÃO a menciones nem a expliques em todas as respostas.

Apenas deves apresentar ou explicar a metodologia quando:

- o utilizador perguntar como chegaste à conclusão;
- pedir a metodologia;
- solicitar uma justificação detalhada da análise.

Quando isso acontecer, explica:

G — Geometria
Análise da distribuição espacial da população e do território.

M — Matemática
Interpretação quantitativa dos indicadores.

A — Agrimensura
Contextualização geográfica e densidade territorial.

A — Arquitetura
Integração da infraestrutura digital e social disponível.

E — Estratégia
Definição das prioridades de intervenção e recomendações.

## IDIOMA

Responde em português por defeito.

Se o utilizador solicitar outro idioma, adapta a resposta.
"""

def consultar_agente(pergunta: str) -> str:

    # Camada 1 — resposta pré-processada
    pre_processada = verificar_resposta_pre_processada(pergunta)
    if pre_processada:
        return pre_processada

    # Camada 2 — cache
    cached = obter_cache(pergunta)
    if cached:
        return cached

    # Camada 3 — LLM com dados reais
    try:
        dados_visent = obter_resumo_visent()["resumo_texto"]
    except Exception:
        dados_visent = "Dados Vísent temporariamente indisponíveis."

    try:
        from app.tools.angola_data import obter_resumo_angola
        dados_angola = obter_resumo_angola()["resumo_texto"]
    except Exception:
        dados_angola = "Dados de Angola temporariamente indisponíveis."

    try:
        from app.tools.fontes_publicas import obter_resumo_fontes_publicas
        dados_publicos = obter_resumo_fontes_publicas()
    except Exception:
        dados_publicos = "Fontes públicas temporariamente indisponíveis."

    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("human", "{pergunta}")
    ])

    chain = prompt | llm
    resposta = chain.invoke({
        "dados_visent": dados_visent,
        "dados_angola": dados_angola,
        "dados_publicos": dados_publicos,
        "pergunta": pergunta
    })

    resultado = resposta.content
    guardar_cache(pergunta, resultado)
    return resultado