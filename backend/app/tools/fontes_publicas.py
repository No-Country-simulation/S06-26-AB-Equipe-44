DADOS_PUBLICOS = {
    "angola": {
        "fonte": "INE Angola — Instituto Nacional de Estatística (2023)",
        "provincias": {
            "Luanda":         {"populacao": 9292000, "taxa_desemprego": 32, "taxa_alfabetizacao": 85, "acesso_saude": 70, "indice_pobreza": 28},
            "Benguela":       {"populacao": 2521000, "taxa_desemprego": 38, "taxa_alfabetizacao": 72, "acesso_saude": 55, "indice_pobreza": 42},
            "Huambo":         {"populacao": 2354000, "taxa_desemprego": 42, "taxa_alfabetizacao": 68, "acesso_saude": 48, "indice_pobreza": 52},
            "Huíla":          {"populacao": 2497000, "taxa_desemprego": 45, "taxa_alfabetizacao": 65, "acesso_saude": 45, "indice_pobreza": 55},
            "Bié":            {"populacao": 1884000, "taxa_desemprego": 48, "taxa_alfabetizacao": 60, "acesso_saude": 40, "indice_pobreza": 62},
            "Malanje":        {"populacao": 1090000, "taxa_desemprego": 50, "taxa_alfabetizacao": 58, "acesso_saude": 38, "indice_pobreza": 65},
            "Uíge":           {"populacao": 1511000, "taxa_desemprego": 52, "taxa_alfabetizacao": 55, "acesso_saude": 35, "indice_pobreza": 68},
            "Cabinda":        {"populacao": 856000,  "taxa_desemprego": 30, "taxa_alfabetizacao": 78, "acesso_saude": 62, "indice_pobreza": 35},
            "Zaire":          {"populacao": 594000,  "taxa_desemprego": 55, "taxa_alfabetizacao": 50, "acesso_saude": 30, "indice_pobreza": 72},
            "Cuanza Norte":   {"populacao": 490000,  "taxa_desemprego": 53, "taxa_alfabetizacao": 52, "acesso_saude": 32, "indice_pobreza": 70},
            "Cuanza Sul":     {"populacao": 1881000, "taxa_desemprego": 47, "taxa_alfabetizacao": 62, "acesso_saude": 42, "indice_pobreza": 58},
            "Lunda Norte":    {"populacao": 862000,  "taxa_desemprego": 56, "taxa_alfabetizacao": 48, "acesso_saude": 28, "indice_pobreza": 75},
            "Lunda Sul":      {"populacao": 537000,  "taxa_desemprego": 58, "taxa_alfabetizacao": 45, "acesso_saude": 25, "indice_pobreza": 78},
            "Moxico":         {"populacao": 796000,  "taxa_desemprego": 60, "taxa_alfabetizacao": 42, "acesso_saude": 22, "indice_pobreza": 80},
            "Cuando Cubango": {"populacao": 534000,  "taxa_desemprego": 62, "taxa_alfabetizacao": 40, "acesso_saude": 20, "indice_pobreza": 82},
            "Cunene":         {"populacao": 990000,  "taxa_desemprego": 58, "taxa_alfabetizacao": 44, "acesso_saude": 24, "indice_pobreza": 78},
            "Namibe":         {"populacao": 471000,  "taxa_desemprego": 44, "taxa_alfabetizacao": 66, "acesso_saude": 44, "indice_pobreza": 55},
            "Bengo":          {"populacao": 397000,  "taxa_desemprego": 40, "taxa_alfabetizacao": 70, "acesso_saude": 50, "indice_pobreza": 48},
            "Icolo e Bengo":  {"populacao": 350000,  "taxa_desemprego": 42, "taxa_alfabetizacao": 68, "acesso_saude": 48, "indice_pobreza": 50},
            "Cuando":         {"populacao": 280000,  "taxa_desemprego": 64, "taxa_alfabetizacao": 38, "acesso_saude": 18, "indice_pobreza": 85},
            "Moxico Leste":   {"populacao": 220000,  "taxa_desemprego": 66, "taxa_alfabetizacao": 35, "acesso_saude": 15, "indice_pobreza": 88},
        }
    },
    "brasil": {
        "fonte": "IBGE / DATASUS (2023)",
        "municipios": {
            "Florianopolis": {"populacao": 537213, "taxa_desemprego": 8,  "taxa_alfabetizacao": 98, "acesso_saude": 85, "indice_pobreza": 5},
            "Sao Jose":      {"populacao": 262507, "taxa_desemprego": 9,  "taxa_alfabetizacao": 97, "acesso_saude": 82, "indice_pobreza": 7},
            "Biguacu":       {"populacao": 72124,  "taxa_desemprego": 10, "taxa_alfabetizacao": 96, "acesso_saude": 78, "indice_pobreza": 9},
            "Palhoca":       {"populacao": 194756, "taxa_desemprego": 9,  "taxa_alfabetizacao": 96, "acesso_saude": 80, "indice_pobreza": 8},
        }
    },
    "oms": {
        "fonte": "OMS — Organização Mundial de Saúde (2023)",
        "indicadores_saude_mental": {
            "angola":  {"prevalencia_depressao": 4.2, "prevalencia_ansiedade": 4.8, "acesso_tratamento": 12},
            "brasil":  {"prevalencia_depressao": 5.8, "prevalencia_ansiedade": 9.3, "acesso_tratamento": 35},
            "latam":   {"prevalencia_depressao": 5.0, "prevalencia_ansiedade": 7.0, "acesso_tratamento": 28},
        }
    }
}

def obter_resumo_fontes_publicas() -> str:
    angola = DADOS_PUBLICOS["angola"]
    brasil = DADOS_PUBLICOS["brasil"]
    oms = DADOS_PUBLICOS["oms"]

    linhas = [f"\nFONTE: {angola['fonte']}"]
    for prov, dados in angola["provincias"].items():
        linhas.append(
            f"- {prov}: população {dados['populacao']:,}, "
            f"desemprego {dados['taxa_desemprego']}%, "
            f"alfabetização {dados['taxa_alfabetizacao']}%, "
            f"acesso saúde {dados['acesso_saude']}%, "
            f"pobreza {dados['indice_pobreza']}%"
        )

    linhas.append(f"\nFONTE: {brasil['fonte']}")
    for mun, dados in brasil["municipios"].items():
        linhas.append(
            f"- {mun}: população {dados['populacao']:,}, "
            f"desemprego {dados['taxa_desemprego']}%, "
            f"acesso saúde {dados['acesso_saude']}%"
        )

    linhas.append(f"\nFONTE: {oms['fonte']}")
    for regiao, dados in oms["indicadores_saude_mental"].items():
        linhas.append(
            f"- {regiao.capitalize()}: depressão {dados['prevalencia_depressao']}%, "
            f"ansiedade {dados['prevalencia_ansiedade']}%, "
            f"acesso a tratamento {dados['acesso_tratamento']}%"
        )

    return "\n".join(linhas)

def obter_fontes_utilizadas() -> list:
    return [
        "Dataset Vísent CDRView",
        "INE Angola (2023)",
        "IBGE / DATASUS Brasil (2023)",
        "OMS — Organização Mundial de Saúde (2023)",
        "Orivis AI"
    ]