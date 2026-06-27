from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from app.routes import dados, mapa

load_dotenv()

app = FastAPI(
    title="Orivis AI",
    description="Orivis AI — Painel de Dados Públicos - App BiT (B2G). Plataforma inteligente de apoio à decisão para gestores públicos.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Regista as rotas
app.include_router(dados.router)
app.include_router(mapa.router)

@app.get("/")
def root():
    return {"message": "Orivis AI API está online"}