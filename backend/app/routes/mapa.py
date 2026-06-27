from fastapi import APIRouter

router = APIRouter()

@router.get("/mapa")
async def obter_mapa():
    return {
        "regioes": [
            # Angola — 21 Províncias
            {"regiao": "Luanda", "pais": "Angola", "lat": -8.8368, "lng": 13.2343, "concentracao": 95, "cobertura_rede": 90, "indicadores": {"empregabilidade": 60, "formacao": 55, "saude_mental": 45, "mentorias": 40, "iniciativas_sociais": 50}},
            {"regiao": "Benguela", "pais": "Angola", "lat": -12.5763, "lng": 13.4055, "concentracao": 75, "cobertura_rede": 75, "indicadores": {"empregabilidade": 50, "formacao": 45, "saude_mental": 40, "mentorias": 35, "iniciativas_sociais": 45}},
            {"regiao": "Huambo", "pais": "Angola", "lat": -12.7761, "lng": 15.7392, "concentracao": 70, "cobertura_rede": 55, "indicadores": {"empregabilidade": 40, "formacao": 35, "saude_mental": 30, "mentorias": 25, "iniciativas_sociais": 35}},
            {"regiao": "Huíla", "pais": "Angola", "lat": -14.9177, "lng": 13.4920, "concentracao": 65, "cobertura_rede": 50, "indicadores": {"empregabilidade": 35, "formacao": 30, "saude_mental": 28, "mentorias": 22, "iniciativas_sociais": 30}},
            {"regiao": "Bié", "pais": "Angola", "lat": -12.3522, "lng": 17.0761, "concentracao": 60, "cobertura_rede": 45, "indicadores": {"empregabilidade": 30, "formacao": 28, "saude_mental": 25, "mentorias": 20, "iniciativas_sociais": 25}},
            {"regiao": "Malanje", "pais": "Angola", "lat": -9.5400, "lng": 16.3410, "concentracao": 55, "cobertura_rede": 40, "indicadores": {"empregabilidade": 28, "formacao": 25, "saude_mental": 22, "mentorias": 18, "iniciativas_sociais": 22}},
            {"regiao": "Uíge", "pais": "Angola", "lat": -7.6094, "lng": 15.0614, "concentracao": 50, "cobertura_rede": 38, "indicadores": {"empregabilidade": 25, "formacao": 22, "saude_mental": 20, "mentorias": 15, "iniciativas_sociais": 20}},
            {"regiao": "Cabinda", "pais": "Angola", "lat": -5.5500, "lng": 12.2000, "concentracao": 45, "cobertura_rede": 60, "indicadores": {"empregabilidade": 55, "formacao": 40, "saude_mental": 35, "mentorias": 30, "iniciativas_sociais": 38}},
            {"regiao": "Zaire", "pais": "Angola", "lat": -6.1000, "lng": 12.8667, "concentracao": 35, "cobertura_rede": 30, "indicadores": {"empregabilidade": 22, "formacao": 18, "saude_mental": 18, "mentorias": 12, "iniciativas_sociais": 18}},
            {"regiao": "Cuanza Norte", "pais": "Angola", "lat": -9.2833, "lng": 14.6667, "concentracao": 40, "cobertura_rede": 35, "indicadores": {"empregabilidade": 25, "formacao": 20, "saude_mental": 20, "mentorias": 15, "iniciativas_sociais": 20}},
            {"regiao": "Cuanza Sul", "pais": "Angola", "lat": -10.7200, "lng": 14.4500, "concentracao": 50, "cobertura_rede": 42, "indicadores": {"empregabilidade": 30, "formacao": 25, "saude_mental": 22, "mentorias": 18, "iniciativas_sociais": 24}},
            {"regiao": "Lunda Norte", "pais": "Angola", "lat": -8.7000, "lng": 19.9167, "concentracao": 38, "cobertura_rede": 28, "indicadores": {"empregabilidade": 20, "formacao": 15, "saude_mental": 15, "mentorias": 10, "iniciativas_sociais": 15}},
            {"regiao": "Lunda Sul", "pais": "Angola", "lat": -10.2833, "lng": 20.4167, "concentracao": 32, "cobertura_rede": 25, "indicadores": {"empregabilidade": 18, "formacao": 12, "saude_mental": 12, "mentorias": 8, "iniciativas_sociais": 12}},
            {"regiao": "Moxico", "pais": "Angola", "lat": -11.8500, "lng": 19.9167, "concentracao": 28, "cobertura_rede": 20, "indicadores": {"empregabilidade": 15, "formacao": 10, "saude_mental": 10, "mentorias": 8, "iniciativas_sociais": 10}},
            {"regiao": "Cuando Cubango", "pais": "Angola", "lat": -14.7000, "lng": 19.2167, "concentracao": 25, "cobertura_rede": 18, "indicadores": {"empregabilidade": 12, "formacao": 8, "saude_mental": 8, "mentorias": 6, "iniciativas_sociais": 8}},
            {"regiao": "Cunene", "pais": "Angola", "lat": -16.7333, "lng": 15.6167, "concentracao": 30, "cobertura_rede": 22, "indicadores": {"empregabilidade": 15, "formacao": 10, "saude_mental": 10, "mentorias": 8, "iniciativas_sociais": 10}},
            {"regiao": "Namibe", "pais": "Angola", "lat": -15.1961, "lng": 12.1522, "concentracao": 28, "cobertura_rede": 35, "indicadores": {"empregabilidade": 22, "formacao": 18, "saude_mental": 15, "mentorias": 12, "iniciativas_sociais": 15}},
            {"regiao": "Bengo", "pais": "Angola", "lat": -9.1000, "lng": 13.7333, "concentracao": 42, "cobertura_rede": 55, "indicadores": {"empregabilidade": 35, "formacao": 28, "saude_mental": 25, "mentorias": 20, "iniciativas_sociais": 28}},
            {"regiao": "Icolo e Bengo", "pais": "Angola", "lat": -9.1667, "lng": 13.8333, "concentracao": 38, "cobertura_rede": 50, "indicadores": {"empregabilidade": 30, "formacao": 25, "saude_mental": 22, "mentorias": 18, "iniciativas_sociais": 24}},
            {"regiao": "Cuando", "pais": "Angola", "lat": -14.6500, "lng": 17.9000, "concentracao": 22, "cobertura_rede": 15, "indicadores": {"empregabilidade": 10, "formacao": 8, "saude_mental": 8, "mentorias": 5, "iniciativas_sociais": 8}},
            {"regiao": "Moxico Leste", "pais": "Angola", "lat": -12.5000, "lng": 21.5000, "concentracao": 18, "cobertura_rede": 12, "indicadores": {"empregabilidade": 8, "formacao": 6, "saude_mental": 6, "mentorias": 4, "iniciativas_sociais": 6}},

            # Brasil — Regiões do Dataset Vísent CDRView
            {"regiao": "São Paulo", "pais": "Brasil", "lat": -23.5505, "lng": -46.6333, "concentracao": 95, "cobertura_rede": 92, "indicadores": {"empregabilidade": 65, "formacao": 70, "saude_mental": 50, "mentorias": 55, "iniciativas_sociais": 60}},
            {"regiao": "Rio de Janeiro", "pais": "Brasil", "lat": -22.9068, "lng": -43.1729, "concentracao": 90, "cobertura_rede": 88, "indicadores": {"empregabilidade": 58, "formacao": 62, "saude_mental": 45, "mentorias": 48, "iniciativas_sociais": 55}},
            {"regiao": "Salvador", "pais": "Brasil", "lat": -12.9714, "lng": -38.5014, "concentracao": 75, "cobertura_rede": 70, "indicadores": {"empregabilidade": 42, "formacao": 45, "saude_mental": 35, "mentorias": 30, "iniciativas_sociais": 40}},
            {"regiao": "Fortaleza", "pais": "Brasil", "lat": -3.7172, "lng": -38.5433, "concentracao": 72, "cobertura_rede": 65, "indicadores": {"empregabilidade": 38, "formacao": 40, "saude_mental": 32, "mentorias": 28, "iniciativas_sociais": 35}},
            {"regiao": "Manaus", "pais": "Brasil", "lat": -3.1190, "lng": -60.0217, "concentracao": 65, "cobertura_rede": 55, "indicadores": {"empregabilidade": 35, "formacao": 30, "saude_mental": 28, "mentorias": 22, "iniciativas_sociais": 30}},
            {"regiao": "Recife", "pais": "Brasil", "lat": -8.0476, "lng": -34.8770, "concentracao": 70, "cobertura_rede": 68, "indicadores": {"empregabilidade": 40, "formacao": 42, "saude_mental": 33, "mentorias": 29, "iniciativas_sociais": 38}},
            {"regiao": "Belém", "pais": "Brasil", "lat": -1.4558, "lng": -48.5044, "concentracao": 68, "cobertura_rede": 60, "indicadores": {"empregabilidade": 36, "formacao": 32, "saude_mental": 28, "mentorias": 24, "iniciativas_sociais": 32}},

            # América Latina
            {"regiao": "Bogotá", "pais": "Colômbia", "lat": 4.7110, "lng": -74.0721, "concentracao": 88, "cobertura_rede": 80, "indicadores": {"empregabilidade": 55, "formacao": 58, "saude_mental": 42, "mentorias": 45, "iniciativas_sociais": 50}},
            {"regiao": "Lima", "pais": "Peru", "lat": -12.0464, "lng": -77.0428, "concentracao": 85, "cobertura_rede": 75, "indicadores": {"empregabilidade": 50, "formacao": 52, "saude_mental": 38, "mentorias": 40, "iniciativas_sociais": 45}},
            {"regiao": "Buenos Aires", "pais": "Argentina", "lat": -34.6037, "lng": -58.3816, "concentracao": 90, "cobertura_rede": 85, "indicadores": {"empregabilidade": 60, "formacao": 65, "saude_mental": 48, "mentorias": 50, "iniciativas_sociais": 55}},
            {"regiao": "Santiago", "pais": "Chile", "lat": -33.4489, "lng": -70.6693, "concentracao": 87, "cobertura_rede": 88, "indicadores": {"empregabilidade": 62, "formacao": 66, "saude_mental": 50, "mentorias": 52, "iniciativas_sociais": 58}},
            {"regiao": "Cidade do México", "pais": "México", "lat": 19.4326, "lng": -99.1332, "concentracao": 95, "cobertura_rede": 82, "indicadores": {"empregabilidade": 55, "formacao": 60, "saude_mental": 44, "mentorias": 46, "iniciativas_sociais": 52}}
        ]
    }