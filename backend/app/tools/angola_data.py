PROVINCIAS_ANGOLA = [
    {"municipio": "Luanda", "provincia": "Luanda", "lat": -8.8368, "lng": 13.2343, "n_usuarios": 4500000, "cobertura_rede": 90, "congestionamento": 0.75, "geracao_rede": "4G/5G"},
    {"municipio": "Benguela", "provincia": "Benguela", "lat": -12.5763, "lng": 13.4055, "n_usuarios": 2100000, "cobertura_rede": 75, "congestionamento": 0.55, "geracao_rede": "4G"},
    {"municipio": "Huambo", "provincia": "Huambo", "lat": -12.7761, "lng": 15.7392, "n_usuarios": 1800000, "cobertura_rede": 55, "congestionamento": 0.45, "geracao_rede": "3G/4G"},
    {"municipio": "Huíla", "provincia": "Huíla", "lat": -14.9177, "lng": 13.4920, "n_usuarios": 1600000, "cobertura_rede": 50, "congestionamento": 0.40, "geracao_rede": "3G/4G"},
    {"municipio": "Bié", "provincia": "Bié", "lat": -12.3522, "lng": 17.0761, "n_usuarios": 1400000, "cobertura_rede": 35, "congestionamento": 0.30, "geracao_rede": "3G"},
    {"municipio": "Malanje", "provincia": "Malanje", "lat": -9.5400, "lng": 16.3410, "n_usuarios": 1000000, "cobertura_rede": 40, "congestionamento": 0.28, "geracao_rede": "3G"},
    {"municipio": "Uíge", "provincia": "Uíge", "lat": -7.6094, "lng": 15.0614, "n_usuarios": 900000, "cobertura_rede": 38, "congestionamento": 0.25, "geracao_rede": "3G"},
    {"municipio": "Cabinda", "provincia": "Cabinda", "lat": -5.5500, "lng": 12.2000, "n_usuarios": 800000, "cobertura_rede": 65, "congestionamento": 0.50, "geracao_rede": "4G"},
    {"municipio": "Zaire", "provincia": "Zaire", "lat": -6.1000, "lng": 12.8667, "n_usuarios": 600000, "cobertura_rede": 30, "congestionamento": 0.20, "geracao_rede": "3G"},
    {"municipio": "Cuanza Norte", "provincia": "Cuanza Norte", "lat": -9.2833, "lng": 14.6667, "n_usuarios": 700000, "cobertura_rede": 35, "congestionamento": 0.22, "geracao_rede": "3G"},
    {"municipio": "Cuanza Sul", "provincia": "Cuanza Sul", "lat": -10.7200, "lng": 14.4500, "n_usuarios": 950000, "cobertura_rede": 42, "congestionamento": 0.30, "geracao_rede": "3G/4G"},
    {"municipio": "Lunda Norte", "provincia": "Lunda Norte", "lat": -8.7000, "lng": 19.9167, "n_usuarios": 550000, "cobertura_rede": 28, "congestionamento": 0.18, "geracao_rede": "3G"},
    {"municipio": "Lunda Sul", "provincia": "Lunda Sul", "lat": -10.2833, "lng": 20.4167, "n_usuarios": 450000, "cobertura_rede": 25, "congestionamento": 0.15, "geracao_rede": "3G"},
    {"municipio": "Moxico", "provincia": "Moxico", "lat": -11.8500, "lng": 19.9167, "n_usuarios": 400000, "cobertura_rede": 20, "congestionamento": 0.12, "geracao_rede": "2G/3G"},
    {"municipio": "Cuando Cubango", "provincia": "Cuando Cubango", "lat": -14.7000, "lng": 19.2167, "n_usuarios": 350000, "cobertura_rede": 18, "congestionamento": 0.10, "geracao_rede": "2G/3G"},
    {"municipio": "Cunene", "provincia": "Cunene", "lat": -16.7333, "lng": 15.6167, "n_usuarios": 420000, "cobertura_rede": 22, "congestionamento": 0.14, "geracao_rede": "2G/3G"},
    {"municipio": "Namibe", "provincia": "Namibe", "lat": -15.1961, "lng": 12.1522, "n_usuarios": 380000, "cobertura_rede": 35, "congestionamento": 0.20, "geracao_rede": "3G"},
    {"municipio": "Bengo", "provincia": "Bengo", "lat": -9.1000, "lng": 13.7333, "n_usuarios": 650000, "cobertura_rede": 55, "congestionamento": 0.35, "geracao_rede": "3G/4G"},
    {"municipio": "Icolo e Bengo", "provincia": "Icolo e Bengo", "lat": -9.1667, "lng": 13.8333, "n_usuarios": 500000, "cobertura_rede": 50, "congestionamento": 0.30, "geracao_rede": "3G/4G"},
    {"municipio": "Cuando", "provincia": "Cuando", "lat": -14.6500, "lng": 17.9000, "n_usuarios": 280000, "cobertura_rede": 15, "congestionamento": 0.08, "geracao_rede": "2G"},
    {"municipio": "Moxico Leste", "provincia": "Moxico Leste", "lat": -12.5000, "lng": 21.5000, "n_usuarios": 220000, "cobertura_rede": 12, "congestionamento": 0.06, "geracao_rede": "2G"},
]

def obter_resumo_angola() -> dict:
    resumo = []
    for p in PROVINCIAS_ANGOLA:
        resumo.append(
            f"- {p['provincia']}: {p['n_usuarios']:,} habitantes, "
            f"cobertura de rede {p['cobertura_rede']}% ({p['geracao_rede']}), "
            f"congestionamento {p['congestionamento']}"
        )
    return {
        "provincias": PROVINCIAS_ANGOLA,
        "resumo_texto": "\n".join(resumo)
    }