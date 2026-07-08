from fastapi import APIRouter
from app.tools.iot import calcular_iot


router = APIRouter()

@router.get("/mapa")
async def obter_mapa():
    regioes_raw = [
        {"regiao": "Luanda", "pais": "Angola", "lat": -8.8368, "lng": 13.2343, "concentracao": 95, "populacao": 9292000, "indicadores": {"empregabilidade": 60, "formacao": 55, "saude_mental": 45, "mentorias": 40, "iniciativas_sociais": 50, "cobertura_rede": 90}},
        {"regiao": "Benguela", "pais": "Angola", "lat": -12.5763, "lng": 13.4055, "concentracao": 75, "populacao": 2521000, "indicadores": {"empregabilidade": 50, "formacao": 45, "saude_mental": 40, "mentorias": 35, "iniciativas_sociais": 45, "cobertura_rede": 75}},
        {"regiao": "Huambo", "pais": "Angola", "lat": -12.7761, "lng": 15.7392, "concentracao": 70, "populacao": 2354000, "indicadores": {"empregabilidade": 40, "formacao": 35, "saude_mental": 30, "mentorias": 25, "iniciativas_sociais": 35, "cobertura_rede": 55}},
        {"regiao": "Huíla", "pais": "Angola", "lat": -14.9177, "lng": 13.4920, "concentracao": 65, "populacao": 2497000, "indicadores": {"empregabilidade": 35, "formacao": 30, "saude_mental": 28, "mentorias": 22, "iniciativas_sociais": 30, "cobertura_rede": 50}},
        {"regiao": "Bié", "pais": "Angola", "lat": -12.3522, "lng": 17.0761, "concentracao": 60, "populacao": 1884000, "indicadores": {"empregabilidade": 30, "formacao": 28, "saude_mental": 25, "mentorias": 20, "iniciativas_sociais": 25, "cobertura_rede": 45}},
        {"regiao": "Malanje", "pais": "Angola", "lat": -9.5400, "lng": 16.3410, "concentracao": 55, "populacao": 1090000, "indicadores": {"empregabilidade": 28, "formacao": 25, "saude_mental": 22, "mentorias": 18, "iniciativas_sociais": 22, "cobertura_rede": 40}},
        {"regiao": "Uíge", "pais": "Angola", "lat": -7.6094, "lng": 15.0614, "concentracao": 50, "populacao": 1511000, "indicadores": {"empregabilidade": 25, "formacao": 22, "saude_mental": 20, "mentorias": 15, "iniciativas_sociais": 20, "cobertura_rede": 38}},
        {"regiao": "Cabinda", "pais": "Angola", "lat": -5.5500, "lng": 12.2000, "concentracao": 45, "populacao": 856000, "indicadores": {"empregabilidade": 55, "formacao": 40, "saude_mental": 35, "mentorias": 30, "iniciativas_sociais": 38, "cobertura_rede": 60}},
        {"regiao": "Zaire", "pais": "Angola", "lat": -6.1000, "lng": 12.8667, "concentracao": 35, "populacao": 594000, "indicadores": {"empregabilidade": 22, "formacao": 18, "saude_mental": 18, "mentorias": 12, "iniciativas_sociais": 18, "cobertura_rede": 30}},
        {"regiao": "Cuanza Norte", "pais": "Angola", "lat": -9.2833, "lng": 14.6667, "concentracao": 40, "populacao": 490000, "indicadores": {"empregabilidade": 25, "formacao": 20, "saude_mental": 20, "mentorias": 15, "iniciativas_sociais": 20, "cobertura_rede": 35}},
        {"regiao": "Cuanza Sul", "pais": "Angola", "lat": -10.7200, "lng": 14.4500, "concentracao": 50, "populacao": 1881000, "indicadores": {"empregabilidade": 30, "formacao": 25, "saude_mental": 22, "mentorias": 18, "iniciativas_sociais": 24, "cobertura_rede": 42}},
        {"regiao": "Lunda Norte", "pais": "Angola", "lat": -8.7000, "lng": 19.9167, "concentracao": 38, "populacao": 862000, "indicadores": {"empregabilidade": 20, "formacao": 15, "saude_mental": 15, "mentorias": 10, "iniciativas_sociais": 15, "cobertura_rede": 28}},
        {"regiao": "Lunda Sul", "pais": "Angola", "lat": -10.2833, "lng": 20.4167, "concentracao": 32, "populacao": 537000, "indicadores": {"empregabilidade": 18, "formacao": 12, "saude_mental": 12, "mentorias": 8, "iniciativas_sociais": 12, "cobertura_rede": 25}},
        {"regiao": "Moxico", "pais": "Angola", "lat": -11.8500, "lng": 19.9167, "concentracao": 28, "populacao": 796000, "indicadores": {"empregabilidade": 15, "formacao": 10, "saude_mental": 10, "mentorias": 8, "iniciativas_sociais": 10, "cobertura_rede": 20}},
        {"regiao": "Cuando Cubango", "pais": "Angola", "lat": -14.7000, "lng": 19.2167, "concentracao": 25, "populacao": 534000, "indicadores": {"empregabilidade": 12, "formacao": 8, "saude_mental": 8, "mentorias": 6, "iniciativas_sociais": 8, "cobertura_rede": 18}},
        {"regiao": "Cunene", "pais": "Angola", "lat": -16.7333, "lng": 15.6167, "concentracao": 30, "populacao": 990000, "indicadores": {"empregabilidade": 15, "formacao": 10, "saude_mental": 10, "mentorias": 8, "iniciativas_sociais": 10, "cobertura_rede": 22}},
        {"regiao": "Namibe", "pais": "Angola", "lat": -15.1961, "lng": 12.1522, "concentracao": 28, "populacao": 471000, "indicadores": {"empregabilidade": 22, "formacao": 18, "saude_mental": 15, "mentorias": 12, "iniciativas_sociais": 15, "cobertura_rede": 35}},
        {"regiao": "Bengo", "pais": "Angola", "lat": -9.1000, "lng": 13.7333, "concentracao": 42, "populacao": 397000, "indicadores": {"empregabilidade": 35, "formacao": 28, "saude_mental": 25, "mentorias": 20, "iniciativas_sociais": 28, "cobertura_rede": 55}},
        {"regiao": "Icolo e Bengo", "pais": "Angola", "lat": -9.1667, "lng": 13.8333, "concentracao": 38, "populacao": 350000, "indicadores": {"empregabilidade": 30, "formacao": 25, "saude_mental": 22, "mentorias": 18, "iniciativas_sociais": 24, "cobertura_rede": 50}},
        {"regiao": "Cuando", "pais": "Angola", "lat": -14.6500, "lng": 17.9000, "concentracao": 22, "populacao": 280000, "indicadores": {"empregabilidade": 10, "formacao": 8, "saude_mental": 8, "mentorias": 5, "iniciativas_sociais": 8, "cobertura_rede": 15}},
        {"regiao": "Moxico Leste", "pais": "Angola", "lat": -12.5000, "lng": 21.5000, "concentracao": 18, "populacao": 220000, "indicadores": {"empregabilidade": 8, "formacao": 6, "saude_mental": 6, "mentorias": 4, "iniciativas_sociais": 6, "cobertura_rede": 12}},
        {"regiao": "São Paulo", "pais": "Brasil", "lat": -23.5505, "lng": -46.6333, "concentracao": 95, "populacao": 12396372, "indicadores": {"empregabilidade": 65, "formacao": 70, "saude_mental": 50, "mentorias": 55, "iniciativas_sociais": 60, "cobertura_rede": 92}},
        {"regiao": "Rio de Janeiro", "pais": "Brasil", "lat": -22.9068, "lng": -43.1729, "concentracao": 90, "populacao": 6775561, "indicadores": {"empregabilidade": 58, "formacao": 62, "saude_mental": 45, "mentorias": 48, "iniciativas_sociais": 55, "cobertura_rede": 88}},
        {"regiao": "Salvador", "pais": "Brasil", "lat": -12.9714, "lng": -38.5014, "concentracao": 75, "populacao": 2900319, "indicadores": {"empregabilidade": 42, "formacao": 45, "saude_mental": 35, "mentorias": 30, "iniciativas_sociais": 40, "cobertura_rede": 70}},
        {"regiao": "Fortaleza", "pais": "Brasil", "lat": -3.7172, "lng": -38.5433, "concentracao": 72, "populacao": 2703391, "indicadores": {"empregabilidade": 38, "formacao": 40, "saude_mental": 32, "mentorias": 28, "iniciativas_sociais": 35, "cobertura_rede": 65}},
        {"regiao": "Manaus", "pais": "Brasil", "lat": -3.1190, "lng": -60.0217, "concentracao": 65, "populacao": 2219580, "indicadores": {"empregabilidade": 35, "formacao": 30, "saude_mental": 28, "mentorias": 22, "iniciativas_sociais": 30, "cobertura_rede": 55}},
        {"regiao": "Recife", "pais": "Brasil", "lat": -8.0476, "lng": -34.8770, "concentracao": 70, "populacao": 1653461, "indicadores": {"empregabilidade": 40, "formacao": 42, "saude_mental": 33, "mentorias": 29, "iniciativas_sociais": 38, "cobertura_rede": 68}},
        {"regiao": "Belém", "pais": "Brasil", "lat": -1.4558, "lng": -48.5044, "concentracao": 68, "populacao": 1499641, "indicadores": {"empregabilidade": 36, "formacao": 32, "saude_mental": 28, "mentorias": 24, "iniciativas_sociais": 32, "cobertura_rede": 60}},
        {"regiao": "Bogotá", "pais": "Colômbia", "lat": 4.7110, "lng": -74.0721, "concentracao": 88, "populacao": 7743955, "indicadores": {"empregabilidade": 55, "formacao": 58, "saude_mental": 42, "mentorias": 45, "iniciativas_sociais": 50, "cobertura_rede": 80}},
        {"regiao": "Lima", "pais": "Peru", "lat": -12.0464, "lng": -77.0428, "concentracao": 85, "populacao": 9674755, "indicadores": {"empregabilidade": 50, "formacao": 52, "saude_mental": 38, "mentorias": 40, "iniciativas_sociais": 45, "cobertura_rede": 75}},
        {"regiao": "Buenos Aires", "pais": "Argentina", "lat": -34.6037, "lng": -58.3816, "concentracao": 90, "populacao": 3075646, "indicadores": {"empregabilidade": 60, "formacao": 65, "saude_mental": 48, "mentorias": 50, "iniciativas_sociais": 55, "cobertura_rede": 85}},
        {"regiao": "Santiago", "pais": "Chile", "lat": -33.4489, "lng": -70.6693, "concentracao": 87, "populacao": 5614000, "indicadores": {"empregabilidade": 62, "formacao": 66, "saude_mental": 50, "mentorias": 52, "iniciativas_sociais": 58, "cobertura_rede": 88}},
        {"regiao": "Cidade do México", "pais": "México", "lat": 19.4326, "lng": -99.1332, "concentracao": 95, "populacao": 9209944, "indicadores": {"empregabilidade": 55, "formacao": 60, "saude_mental": 44, "mentorias": 46, "iniciativas_sociais": 52, "cobertura_rede": 82}},
    ]

    regioes = []
    for r in regioes_raw:
        iot_data = calcular_iot(
            indicadores=r["indicadores"],
            concentracao=r["concentracao"],
            populacao=r.get("populacao", 0)
        )
        regioes.append({
            **r,
            "iot": iot_data["iot"],
            "iot_classificacao": iot_data["classificacao"],
            "iot_cor": iot_data["cor"],
            "iot_breakdown": iot_data["breakdown"],
            "ins": iot_data["ins"]
        })

    regioes.sort(key=lambda x: x["iot"], reverse=True)

    return {"regioes": regioes}