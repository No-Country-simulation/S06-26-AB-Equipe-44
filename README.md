# Painel BiT — App B2G

> **Ferramenta de decisão para gestores públicos** que consolida dados de mobilidade, emprego e saúde mental por região, cruzados com o dataset Vísent CDRView, respondendo consultas em linguagem natural para orientar políticas de inclusão digital e equidade social.

---

## Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Endpoints da API](#endpoints-da-api)
- [Dataset Vísent CDRView](#dataset-vísent-cdrview)
- [Instalação e Execução](#instalação-e-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Divisão de Responsabilidades da Equipe](#divisão-de-responsabilidades-da-equipe)
- [Deploy](#deploy)
- [Fontes de Dados](#fontes-de-dados)

---

## Visão Geral

O **Painel BiT** é uma web app responsiva (PWA) com agente de IA integrado que consolida dados públicos enriquecidos com o dataset **Vísent CDRView** — dados de concentração de pessoas e cobertura de rede por região — e responde consultas em linguagem natural para orientar políticas de inclusão digital e equidade social.

### Os 5 Serviços — MVP

| # | Serviço | Descrição |
|---|---------|-----------|
| 1 | **Formações** | Mapa de programas públicos de formação tech por região cruzado com dados de conectividade |
| 2 | **Empregabilidade** | Taxa de emprego por região/setor/demográfico, cruzado com concentração de pessoas sem emprego formal |
| 3 | **Experiências Estruturantes** | Mapa de iniciativas sociais e culturais bem-sucedidas por região |
| 4 | **Mentorias** | Mapa de programas de mentoria pública e conexão com sociedade civil |
| 5 | **Saúde Mental** | Indicadores de saúde mental por região cruzados com cobertura de rede |

---

## Stack Tecnológico

### Backend
| Tecnologia | Uso |
|-----------|-----|
| **Python 3.11+** | Linguagem principal |
| **FastAPI** | Framework web / API REST |
| **Uvicorn** | Servidor ASGI |
| **Pandas** | Ingestão e processamento do dataset CDRView |
| **OpenAI / Gemini API** | Agente de linguagem natural |
| **LangChain** | Orquestração do agente de IA |
| **SQLite / PostgreSQL** | Persistência dos dados processados |
| **SQLAlchemy** | ORM |
| **Alembic** | Migrations de banco |
| **Pydantic v2** | Validação de schemas |
| **python-dotenv** | Gestão de variáveis de ambiente |
| **ReportLab / WeasyPrint** | Geração de relatórios PDF |

### Frontend
| Tecnologia | Uso |
|-----------|-----|
| **React 18 + Vite** | Framework UI |
| **React Router v6** | Navegação |
| **Leaflet / React-Leaflet** | Mapa interativo |
| **Recharts** | Gráficos e visualizações |
| **Axios** | Cliente HTTP |
| **Zustand** | Gerenciamento de estado global |
| **React Query (TanStack)** | Cache e sincronização de dados |
| **Tailwind CSS** | Estilização |

---

## Arquitetura do Projeto

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                     │
│  Dashboard → Mapa Interativo → AI Query Bar → Export PDF    │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP / REST
┌───────────────────────▼─────────────────────────────────────┐
│                    BACKEND (FastAPI)                         │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  /dados      │  │  /mapa       │  │  /relatorio      │  │
│  │  AI Query    │  │  GeoJSON     │  │  Export PDF      │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────────────┘  │
│         │                 │                                  │
│  ┌──────▼─────────────────▼──────────────────────────────┐  │
│  │              Data Pipeline Service                    │  │
│  │  CDRView CSV → Pandas → Normalização → DB             │  │
│  └──────────────────────────┬─────────────────────────── ┘  │
│                             │                                │
│  ┌──────────────────────────▼─────────────────────────────┐  │
│  │                  AI Agent Service                      │  │
│  │  LangChain + OpenAI/Gemini → resposta em PT-BR        │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                        │
┌───────────────────────▼──────────────────────────────────────┐
│               DATABASE (SQLite dev / PostgreSQL prod)        │
│   tabela: regioes | concentracoes | indicadores | alertas    │
└──────────────────────────────────────────────────────────────┘
```

---

## Estrutura de Pastas

```
appbit/
├── README.md
├── .gitignore
├── .env.example
│
├── Back/                          # Backend — FastAPI
│   ├── .env                       # ⚠️ NUNCA subir para o repositório
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── alembic/
│   │   ├── env.py
│   │   └── versions/
│   │
│   ├── app/
│   │   ├── main.py                # Entry point FastAPI — registra routers e CORS
│   │   │
│   │   ├── core/
│   │   │   ├── config.py          # Configurações via pydantic-settings
│   │   │   ├── database.py        # Engine SQLAlchemy + SessionLocal
│   │   │   └── dependencies.py    # Dependências injetáveis (get_db, etc.)
│   │   │
│   │   ├── routers/
│   │   │   ├── dados.py           # POST /dados — consulta IA + retorno estruturado
│   │   │   ├── mapa.py            # GET /mapa — dados geoespaciais
│   │   │   ├── regioes.py         # GET /regioes — listagem e filtros
│   │   │   ├── alertas.py         # GET/POST /alertas — limiares configuráveis
│   │   │   └── relatorio.py       # GET /relatorio — exportação PDF
│   │   │
│   │   ├── models/
│   │   │   ├── regiao.py          # SQLAlchemy ORM: Regiao
│   │   │   ├── concentracao.py    # SQLAlchemy ORM: Concentracao (CDRView)
│   │   │   ├── indicador.py       # SQLAlchemy ORM: Indicador
│   │   │   └── alerta.py          # SQLAlchemy ORM: Alerta
│   │   │
│   │   ├── schemas/
│   │   │   ├── dados.py           # Pydantic: ConsultaRequest / ConsultaResponse
│   │   │   ├── mapa.py            # Pydantic: MapaResponse / RegiaoGeo
│   │   │   ├── indicador.py       # Pydantic: IndicadorSchema
│   │   │   └── alerta.py          # Pydantic: AlertaSchema
│   │   │
│   │   ├── services/
│   │   │   ├── pipeline.py        # Ingestão CSV CDRView → banco de dados
│   │   │   ├── ai_agent.py        # LangChain agent — resposta em linguagem natural
│   │   │   ├── data_service.py    # Queries ao banco para os routers
│   │   │   └── pdf_service.py     # Geração de relatório PDF
│   │   │
│   │   └── data/
│   │       └── cdrview/
│   │           └── visent_cdrview.csv   # Dataset bruto (não subir versões grandes)
│   │
│   └── tests/
│       ├── test_dados.py
│       ├── test_mapa.py
│       └── test_pipeline.py
│
└── Front/                         # Frontend — React + Vite
    ├── .env                       # ⚠️ NUNCA subir para o repositório
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── index.html
    │
    └── src/
        ├── main.jsx               # Entry point React
        ├── App.jsx                # Rotas principais
        ├── index.css              # Estilos globais / tokens
        │
        ├── pages/
        │   ├── Dashboard.jsx      # Página inicial — visão geral dos indicadores
        │   ├── Mapa.jsx           # Mapa interativo com Leaflet
        │   ├── Consulta.jsx       # AI Query Bar + resposta estruturada
        │   ├── Servicos.jsx       # Grid dos 5 serviços (Formações, Emprego…)
        │   └── Relatorio.jsx      # Preview e exportação de relatório PDF
        │
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.jsx
        │   │   ├── Sidebar.jsx
        │   │   └── Footer.jsx
        │   │
        │   ├── map/
        │   │   ├── MapaInterativo.jsx      # React-Leaflet + marcadores de antenas
        │   │   ├── MapaLegenda.jsx
        │   │   └── MapaFiltros.jsx
        │   │
        │   ├── charts/
        │   │   ├── GraficoBarras.jsx       # Recharts
        │   │   ├── GraficoLinha.jsx
        │   │   └── GraficoRadar.jsx
        │   │
        │   ├── ai/
        │   │   ├── AIQueryBar.jsx          # Input linguagem natural
        │   │   ├── AIResposta.jsx          # Resposta formatada com fontes
        │   │   └── AIHistorico.jsx         # Histórico de consultas
        │   │
        │   ├── cards/
        │   │   ├── CardIndicador.jsx
        │   │   ├── CardRegiao.jsx
        │   │   └── CardAlerta.jsx
        │   │
        │   └── ui/
        │       ├── Button.jsx
        │       ├── Select.jsx
        │       ├── Badge.jsx
        │       └── Loader.jsx
        │
        ├── hooks/
        │   ├── useDados.js         # React Query: POST /dados
        │   ├── useMapa.js          # React Query: GET /mapa
        │   ├── useAlertas.js       # React Query: GET /alertas
        │   └── useRegioes.js       # React Query: GET /regioes
        │
        ├── services/
        │   └── api.js              # Axios instance + todas as chamadas à API
        │
        └── store/
            └── useAppStore.js      # Zustand: regiao selecionada, filtros, etc.
```

---

## Endpoints da API

> **Base URL (dev):** `http://localhost:8000/api/v1`
> **Base URL (prod):** `https://appbit.onrender.com/api/v1`

---

### `POST /dados`
Consulta em linguagem natural ao agente de IA com retorno estruturado.

**Request Body:**
```json
{
  "consulta": "Onde faltam programas de formação para jovens de baixa renda?",
  "filtros": {
    "regiao": "Nordeste",
    "indicador": "formacoes",
    "periodo": "2024"
  },
  "idioma": "pt-BR"
}
```

**Response `200 OK`:**
```json
{
  "resposta_ia": "Com base nos dados Vísent CDRView, as regiões com maior concentração de pessoas e menor cobertura de programas de formação são: Feira de Santana (BA), Campina Grande (PB) e Mossoró (RN). Todas apresentam cobertura de rede 4G acima de 60%, mas menos de 2 programas de formação registrados por 100 mil habitantes.",
  "dados": [
    {
      "regiao": "Feira de Santana",
      "estado": "BA",
      "lat": -12.2663,
      "lng": -38.9663,
      "valor": 1.8,
      "unidade": "programas/100k hab",
      "cobertura_rede": 68.4,
      "concentracao_pessoas": 612000,
      "fonte": "Vísent CDRView + MEC"
    }
  ],
  "fontes": [
    "Vísent CDRView v1.0",
    "MEC — Programas de Formação Técnica 2024",
    "IBGE — Estimativas Populacionais 2023"
  ],
  "visualizacao": "mapa_calor"
}
```

---

### `GET /mapa`
Retorna dados geoespaciais para renderizar o mapa interativo.

**Query Params:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|------------|-----------|
| `indicador` | string | Não | `formacoes` \| `empregabilidade` \| `saude_mental` \| `mentorias` \| `experiencias` |
| `regiao` | string | Não | UF ou nome da região (ex: `"BA"`, `"Nordeste"`) |
| `periodo` | string | Não | Ano (ex: `"2024"`) |

**Response `200 OK`:**
```json
{
  "regioes": [
    {
      "id": "feira-de-santana-ba",
      "regiao": "Feira de Santana",
      "estado": "BA",
      "lat": -12.2663,
      "lng": -38.9663,
      "concentracao_pessoas": 612000,
      "cobertura_rede": {
        "5g": 12.3,
        "4g": 68.4,
        "3g": 95.1
      },
      "antenas_erb": [
        { "lat": -12.271, "lng": -38.961, "tipo": "4G" }
      ],
      "indicadores": {
        "formacoes": 1.8,
        "empregabilidade": 42.3,
        "saude_mental": 3.1,
        "mentorias": 0.9,
        "experiencias": 5
      }
    }
  ],
  "total_regioes": 1,
  "periodo": "2024"
}
```

---

### `GET /regioes`
Lista todas as regiões disponíveis no banco com dados básicos.

**Response `200 OK`:**
```json
{
  "regioes": [
    { "id": "feira-de-santana-ba", "nome": "Feira de Santana", "estado": "BA", "regiao_geo": "Nordeste" }
  ]
}
```

---

### `GET /alertas`
Lista alertas ativos (indicadores abaixo do limiar configurado).

**Response `200 OK`:**
```json
{
  "alertas": [
    {
      "id": 1,
      "regiao": "Feira de Santana",
      "indicador": "saude_mental",
      "valor_atual": 1.2,
      "limiar": 3.0,
      "criticidade": "alta",
      "criado_em": "2024-06-01T10:00:00Z"
    }
  ]
}
```

### `POST /alertas`
Cria ou atualiza um limiar de alerta.

**Request Body:**
```json
{
  "indicador": "saude_mental",
  "regiao": "Nordeste",
  "limiar": 3.0
}
```

---

### `GET /relatorio`
Gera e retorna um relatório PDF com os dados da sessão atual.

**Query Params:**
| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|------------|-----------|
| `regiao` | string | Sim | Região do relatório |
| `indicadores` | string | Não | Separados por vírgula: `formacoes,empregabilidade` |
| `periodo` | string | Não | Ano |

**Response `200 OK`:**
- `Content-Type: application/pdf`
- Arquivo PDF binário para download

---

### `GET /health`
Health check da API.

**Response `200 OK`:**
```json
{ "status": "ok", "versao": "1.0.0" }
```

---

## Dataset Vísent CDRView

**Fonte:** [github.com/wongola-bit/appbit](https://github.com/wongola-bit/appbit)

### Dicionário de Colunas (CDRView)

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `regiao_id` | string | Identificador único da região |
| `municipio` | string | Nome do município |
| `estado` | string | UF |
| `lat` | float | Latitude da região |
| `lng` | float | Longitude da região |
| `concentracao_pessoas` | int | Número de pessoas detectadas na zona |
| `horario` | datetime | Timestamp da medição |
| `cobertura_5g` | float | % de cobertura 5G |
| `cobertura_4g` | float | % de cobertura 4G |
| `cobertura_3g` | float | % de cobertura 3G |
| `erb_lat` | float | Latitude da antena ERB (Anatel) |
| `erb_lng` | float | Longitude da antena ERB (Anatel) |
| `erb_tipo` | string | Tipo da antena (5G/4G/3G) |

### Perguntas que o dataset responde

- Onde há concentração de pessoas mas cobertura de rede precária?
- Quais regiões têm mais pessoas em horário de trabalho mas menos emprego formal?
- Onde falta infraestrutura antes de chegarem os programas sociais?

---

## Instalação e Execução

### Pré-requisitos
- Python 3.11+
- Node.js 18+
- Git

---

### Backend

```bash
# 1. Entrar na pasta
cd Back/

# 2. Criar e ativar ambiente virtual
python -m venv .venv
source .venv/bin/activate       # Linux/Mac
# .venv\Scripts\activate        # Windows

# 3. Instalar dependências
pip install -r requirements.txt

# 4. Configurar variáveis de ambiente
cp ../.env.example .env
# Edite o .env com suas chaves

# 5. Rodar migrations do banco
alembic upgrade head

# 6. Ingestão do dataset CDRView
python -m app.services.pipeline

# 7. Iniciar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> **Documentação interativa:** http://localhost:8000/docs (Swagger)

---

### Frontend

```bash
# 1. Entrar na pasta
cd Front/

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp ../.env.example .env
# Edite VITE_API_URL=http://localhost:8000/api/v1

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

> App disponível em: http://localhost:5173

---

## Variáveis de Ambiente

### Backend — `Back/.env`

```env
# Aplicação
APP_ENV=development
APP_PORT=8000
SECRET_KEY=troque-por-uma-chave-segura

# Banco de dados
DATABASE_URL=sqlite:///./appbit.db
# Produção: postgresql://user:password@host:5432/appbit

# IA — escolha apenas um
OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=AIza...

# Modelo
AI_MODEL=gpt-4o-mini
AI_TEMPERATURE=0.2

# Dataset
CDRVIEW_PATH=app/data/cdrview/visent_cdrview.csv

# CORS
ALLOWED_ORIGINS=http://localhost:5173,https://seu-dominio.vercel.app
```

### Frontend — `Front/.env`

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_NAME=Painel BiT
VITE_MAPBOX_TOKEN=       # opcional, se usar Mapbox ao invés de Leaflet OSM
```

---

## Divisão de Responsabilidades da Equipe

| Membro | Papel | Tarefas Principais |
|--------|-------|-------------------|
| **Backend Dev 1** | API + Pipeline | Configurar FastAPI, routers `/dados` e `/mapa`, ingestão do CDRView com Pandas, banco de dados + migrations |
| **Backend Dev 2** | IA + PDF | Implementar o AI Agent (LangChain), serviço de resposta em linguagem natural, geração de relatório PDF, endpoint `/relatorio` e `/alertas` |
| **Frontend Dev 1** | Mapa + Dashboard | Configurar Vite/React, mapa interativo com Leaflet, página Dashboard com cards de indicadores, integração com `/mapa` |
| **Frontend Dev 2** | AI Query + UX | AI Query Bar, componente de resposta da IA, gráficos (Recharts), página Consulta, responsividade geral e export |

### Fluxo Git sugerido

```
main
├── dev
│   ├── feat/backend-pipeline      # Back Dev 1
│   ├── feat/backend-ai-agent      # Back Dev 2
│   ├── feat/frontend-mapa         # Front Dev 1
│   └── feat/frontend-ai-query     # Front Dev 2
```

> **Regra:** Nunca fazer merge direto na `main`. Todo PR passa pela `dev` primeiro.

---

## Deploy

### Backend — Render

1. Criar novo **Web Service** no [render.com](https://render.com)
2. Conectar repositório → selecionar pasta `Back/`
3. **Build Command:** `pip install -r requirements.txt && alembic upgrade head`
4. **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Adicionar variáveis de ambiente no painel do Render
6. **Health Check Path:** `/health`

### Frontend — Vercel

```bash
# Na pasta Front/
npx vercel --prod
```
> Configurar `VITE_API_URL` nas environment variables do Vercel.

---

## Fontes de Dados

| Fonte | Indicador | Tipo |
|-------|-----------|------|
| [Vísent CDRView](https://github.com/wongola-bit/appbit) | Concentração de pessoas + cobertura de rede | Dataset principal |
| [IBGE](https://www.ibge.gov.br/) | População, emprego, renda | Público |
| [DATASUS](https://datasus.saude.gov.br/) | Saúde mental, serviços de saúde | Público |
| [MEC](https://www.gov.br/mec/) | Programas de formação | Público |
| [Anatel](https://www.anatel.gov.br/) | Coordenadas de antenas ERB | Público |

---

## Licença

Este projeto foi desenvolvido para o **Hackathon No Country — Edição 2026**.
Uso educacional e de demonstração.

---

*Construído com ❤️ pela equipe BiT durante o hackathon No Country S06-26-AB-Equipe-44*
