import hashlib
import json
import os
from datetime import datetime, timedelta

CACHE = {}
CACHE_TTL_HORAS = 24

def gerar_chave(pergunta: str) -> str:
    return hashlib.md5(pergunta.lower().strip().encode()).hexdigest()

def obter_cache(pergunta: str):
    chave = gerar_chave(pergunta)
    if chave in CACHE:
        entrada = CACHE[chave]
        if datetime.now() - entrada["timestamp"] < timedelta(hours=CACHE_TTL_HORAS):
            print(f"[CACHE HIT] {pergunta[:50]}...")
            return entrada["resposta"]
    return None

def guardar_cache(pergunta: str, resposta: str):
    chave = gerar_chave(pergunta)
    CACHE[chave] = {
        "resposta": resposta,
        "timestamp": datetime.now(),
        "pergunta": pergunta
    }
    print(f"[CACHE SAVED] {pergunta[:50]}...")

def estatisticas_cache() -> dict:
    return {
        "total_entradas": len(CACHE),
        "perguntas": [v["pergunta"] for v in CACHE.values()]
    }