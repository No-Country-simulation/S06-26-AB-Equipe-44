def calcular_iot(indicadores: dict, concentracao: float, populacao: int = 0) -> dict:
    
    # Passo 1 — converter indicadores em necessidades (N = 100 - indicador)
    n_emprego      = 100 - indicadores.get("empregabilidade", 50)
    n_formacao     = 100 - indicadores.get("formacao", 50)
    n_saude        = 100 - indicadores.get("saude_mental", 50)
    n_mentorias    = 100 - indicadores.get("mentorias", 50)
    n_iniciativas  = 100 - indicadores.get("iniciativas_sociais", 50)
    n_cobertura    = 100 - indicadores.get("cobertura_rede", 50)

    # Passo 2 — calcular INS (Índice de Necessidade Social)
    ins = (
        0.25 * n_emprego +
        0.20 * n_formacao +
        0.20 * n_saude +
        0.15 * n_mentorias +
        0.10 * n_iniciativas +
        0.10 * n_cobertura
    )

    # Passo 3 — adicionar factor populacional (concentração normalizada 0-1)
    concentracao_normalizada = min(concentracao / 100, 1.0)
    iot = round(0.80 * ins + 0.20 * concentracao_normalizada * 100)
    iot = max(0, min(100, iot))

    # Passo 4 — classificação
    if iot <= 20:
        classificacao = "Baixa prioridade"
        cor = "#10B981"
    elif iot <= 40:
        classificacao = "Prioridade moderada"
        cor = "#84CC16"
    elif iot <= 60:
        classificacao = "Prioridade elevada"
        cor = "#F59E0B"
    elif iot <= 80:
        classificacao = "Alta prioridade"
        cor = "#F97316"
    else:
        classificacao = "Prioridade crítica"
        cor = "#EF4444"

    # Passo 5 — breakdown por indicador com setas
    breakdown = []
    for key, valor in indicadores.items():
        necessidade = 100 - valor
        labels = {
            "empregabilidade": "Empregabilidade",
            "formacao": "Formação",
            "saude_mental": "Saúde Mental",
            "mentorias": "Mentorias",
            "iniciativas_sociais": "Iniciativas Sociais",
            "cobertura_rede": "Cobertura Digital"
        }
        breakdown.append({
            "indicador": labels.get(key, key),
            "valor_real": valor,
            "necessidade": round(necessidade),
            "seta": "⬇" if necessidade >= 50 else "⬆",
            "critico": necessidade >= 60
        })

    breakdown.sort(key=lambda x: x["necessidade"], reverse=True)

    return {
        "iot": iot,
        "ins": round(ins),
        "classificacao": classificacao,
        "cor": cor,
        "breakdown": breakdown,
        "concentracao_populacional": concentracao
    }