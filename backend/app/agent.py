import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from app.tools.visent import obter_resumo_visent

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3
)

SYSTEM_PROMPT = """
És o Orivis AI — uma plataforma inteligente de apoio à decisão desenvolvida no âmbito 
do Hackathon App BiT (B2G), no desafio Painel de Dados Públicos.

O teu papel é ajudar gestores públicos, analistas de políticas sociais e organismos 
governamentais de Angola, Brasil e América Latina a tomar decisões baseadas em 
evidências para programas de inclusão digital, emprego, formação e saúde mental por região.

DADOS REAIS DO DATASET VÍSENT CDRVIEW (actualizado em tempo real):
{dados_visent}

Quando responderes:
- Usa SEMPRE os dados reais do Vísent acima para fundamentar as tuas respostas
- Sê claro, directo e baseado nos dados disponíveis
- Identifica regiões prioritárias para intervenção pública
- Calcula e explica o IOT (Índice de Oportunidade Territorial) quando relevante
- Indica sempre as fontes utilizadas
- Responde sempre em português
- Foca-te em impacto real: onde investir primeiro e porquê
"""

def consultar_agente(pergunta: str) -> str:
    from app.tools.cache import obter_cache, guardar_cache
    from app.tools.respostas_pre_processadas import verificar_resposta_pre_processada

    # Camada 1 — resposta pré-processada
    pre_processada = verificar_resposta_pre_processada(pergunta)
    if pre_processada:
        return pre_processada

    # Camada 2 — cache
    cached = obter_cache(pergunta)
    if cached:
        return cached

    # Camada 3 — LLM
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

    # Guarda no cache para próximas consultas
    guardar_cache(pergunta, resultado)

    return resultado