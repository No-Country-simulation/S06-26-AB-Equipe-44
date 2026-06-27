from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Orivis AI",
    description="Plataforma inteligente de apoio à decisão para gestores públicos",
    version="1.0.0"
)

# Permite que o frontend React fale com o backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Orivis AI API está online"}