import pandas as pd
import io
import requests

# URLs directas dos ficheiros raw do GitHub
URLS = {
    "concentracao": "https://raw.githubusercontent.com/wongola-bit/appbit/main/dataset-visent/tensores/tensor_concentracao.csv",
    "fluxo_vias": "https://raw.githubusercontent.com/wongola-bit/appbit/main/dataset-visent/tensores/tensor_fluxo_vias.csv",
    "antenas": "https://raw.githubusercontent.com/wongola-bit/appbit/main/dataset-visent/referencias/antenas_flp.csv",
    "assinantes": "https://raw.githubusercontent.com/wongola-bit/appbit/main/dataset-visent/referencias/assinantes.csv",
}

def carregar_dataset(nome: str) -> pd.DataFrame:
    """Carrega um dataset do GitHub directamente em memória."""
    url = URLS.get(nome)
    if not url:
        raise ValueError(f"Dataset '{nome}' não encontrado.")
    response = requests.get(url)
    response.raise_for_status()
    return pd.read_csv(io.StringIO(response.text))

def obter_concentracao_por_municipio() -> list:
    """Retorna concentração média de pessoas por município."""
    df = carregar_dataset("concentracao")
    resumo = df.groupby("municipio").agg(
        concentracao_media=("n_usuarios", "mean"),
        lat=("lat", "mean"),
        lon=("lon", "mean"),
        congestionamento=("congestionamento_medio", "mean"),
        n_sessoes=("n_sessoes", "mean")
    ).reset_index()
    return resumo.to_dict(orient="records")

def obter_concentracao_por_cluster() -> list:
    """Retorna concentração por cluster/zona dentro dos municípios."""
    df = carregar_dataset("concentracao")
    resumo = df.groupby(["municipio", "cluster"]).agg(
        concentracao_media=("n_usuarios", "mean"),
        lat=("lat", "mean"),
        lon=("lon", "mean"),
        congestionamento=("congestionamento_medio", "mean"),
    ).reset_index()
    return resumo.to_dict(orient="records")

def obter_resumo_visent() -> dict:
    """Retorna um resumo dos dados Vísent para o agente de IA usar."""
    municipios = obter_concentracao_por_municipio()
    resumo = []
    for m in municipios:
        resumo.append(
            f"- {m['municipio']}: concentração média de {m['concentracao_media']:.0f} utilizadores, "
            f"congestionamento médio de {m['congestionamento']:.2f}"
        )
    return {
        "municipios": municipios,
        "resumo_texto": "\n".join(resumo)
    }