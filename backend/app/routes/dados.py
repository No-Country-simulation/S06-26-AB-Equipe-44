from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.agent import consultar_agente

router = APIRouter()

class ConsultaRequest(BaseModel):
    consulta: str
    filtros: dict = {}
    idioma: str = "pt"

@router.post("/dados")
async def consultar_dados(request: ConsultaRequest):
    try:
        pergunta = request.consulta
        if request.filtros.get("regiao"):
            pergunta += f" Foca-te na região: {request.filtros['regiao']}"
        if request.filtros.get("indicador"):
            pergunta += f" Indicador de interesse: {request.filtros['indicador']}"

        resposta = consultar_agente(pergunta)

        return {
            "resposta_ia": resposta,
            "dados": [],
            "fontes": ["Dataset Vísent CDRView", "Orivis AI"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))