from fastapi import APIRouter

router = APIRouter()

@router.get("/mapa")
async def obter_mapa():
    return {
        "regioes": [
            {
                "regiao": "Luanda",
                "lat": -8.8368,
                "lng": 13.2343,
                "concentracao": 85,
                "cobertura_rede": 90,
                "indicadores": {
                    "empregabilidade": 60,
                    "formacao": 55,
                    "saude_mental": 45,
                    "mentorias": 40,
                    "iniciativas_sociais": 50
                }
            },
            {
                "regiao": "Huambo",
                "lat": -12.7761,
                "lng": 15.7392,
                "concentracao": 60,
                "cobertura_rede": 55,
                "indicadores": {
                    "empregabilidade": 40,
                    "formacao": 35,
                    "saude_mental": 30,
                    "mentorias": 25,
                    "iniciativas_sociais": 35
                }
            }
        ]
    }