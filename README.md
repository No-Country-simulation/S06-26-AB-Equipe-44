<p align="center">
  <img src="frontend/src/assets/logo.png" width="160" alt="Orivis AI Logo"/>
</p>

<h1 align="center">Orivis AI</h1>

<p align="center">
  Artificial Intelligence for Smarter Public Decisions
</p>

<p align="center">
  Hackathon App BiT (B2G) &nbsp;|&nbsp; Equipe 44
</p>

---

## Índice

- [Resumo Executivo](#resumo-executivo)
- [Demonstração](#demonstração)
- [O Problema](#o-problema)
- [Objectivos](#objectivos)
- [A Solução](#a-solução)
- [Arquitectura da Solução](#arquitectura-da-solução)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológico](#stack-tecnológico)
- [Dataset Vísent CDRView](#dataset-vísent-cdrview)
- [Índice de Oportunidade Territorial (IOT)](#índice-de-oportunidade-territorial-iot)
- [Metodologia GMAAE](#metodologia-gmaae)
- [Fluxo do Sistema](#fluxo-do-sistema)
- [Resiliência e Conectividade](#resiliência-e-conectividade)
- [Endpoints da API](#endpoints-da-api)
- [Estrutura do Projecto](#estrutura-do-projecto)
- [Como Executar](#como-executar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Deploy](#deploy)
- [Fontes de Dados](#fontes-de-dados)
- [Equipa](#equipa)
- [Trabalhos Futuros](#trabalhos-futuros)
- [Licença](#licença)

---

## Resumo Executivo

O Orivis AI é uma plataforma inteligente desenvolvida no âmbito do Hackathon App BiT (Business to Government) com o objectivo de apoiar gestores públicos na análise territorial e na formulação de políticas públicas baseadas em dados.

A solução integra Inteligência Artificial, indicadores públicos e análise geográfica para transformar dados dispersos em recomendações claras, transparentes e fundamentadas.

O sistema utiliza como principal fonte de informação o dataset Vísent CDRView, complementado por bases públicas nacionais e internacionais, numa arquitectura preparada para crescimento e integração futura de novos conjuntos de dados.

---

## Demonstração

| Serviço | Link |
|---------|------|
| Frontend | https://s06-26-ab-equipe-44.vercel.app |
| Backend API | https://orivis-ai-backend.onrender.com |'
---

## O Problema

Gestores públicos enfrentam dificuldades para cruzar informações provenientes de diferentes fontes de dados, tornando complexa a identificação de regiões prioritárias para investimento público.

Entre os principais desafios encontram-se:

- Dados públicos dispersos por múltiplas plataformas e formatos incompatíveis
- Dificuldade em cruzar indicadores sociais de forma integrada
- Ausência de visualização territorial que evidencie desigualdades geográficas
- Necessidade de conhecimento técnico para consultar bases de dados complexas
- Decisões frequentemente baseadas em intuição por falta de evidências acessíveis
- Desconhecimento de onde falta infraestrutura antes de chegarem os programas sociais

---

## Objectivos

### Objectivo Geral

Desenvolver uma plataforma inteligente capaz de apoiar gestores públicos na tomada de decisões através da integração de dados públicos e Inteligência Artificial.

### Objectivos Específicos

- Centralizar dados provenientes de diferentes fontes públicas numa plataforma unificada
- Facilitar consultas em linguagem natural, eliminando a necessidade de conhecimentos técnicos
- Identificar regiões prioritárias para intervenção através do Índice de Oportunidade Territorial (IOT)
- Disponibilizar mapas interactivos com visualização geográfica de indicadores territoriais
- Gerar recomendações estratégicas fundamentadas, transparentes e auditáveis
- Construir uma arquitectura escalável preparada para integrar novas fontes de dados

---

## A Solução

O Orivis AI permite que qualquer gestor público consulte simplesmente:

> "Quais as províncias com maior necessidade de investimento em formação tecnológica?"

> "Onde existe elevada concentração populacional mas baixa cobertura de rede?"

Em poucos segundos, a plataforma interpreta a pergunta, consulta os dados, calcula o IOT, aplica a metodologia GMAAE, apresenta mapas interactivos e gera recomendações fundamentadas — sem necessidade de conhecimentos técnicos em análise de dados.

---

## Arquitectura da Solução

```
Frontend (React + Vite)
        |
        v
FastAPI Backend (Python)
        |
        v
Agente LangChain + LLaMA 3 (Groq)
        |
        +-- Dataset Vísent CDRView (concentração populacional e cobertura de rede)
        +-- INE Angola (indicadores socioeconómicos das 21 províncias)
        +-- IBGE / DATASUS (indicadores demográficos e de saúde — Brasil)
        +-- OMS (indicadores de saúde mental)
        +-- GADM (limites administrativos / GeoJSON municípios Angola)
        |
        v
Motor GMAAE
        |
        v
Cálculo do IOT
        |
        v
Dashboard + Mapa Interactivo + Recomendações
```

A arquitectura foi desenhada para ser modular, desacoplada, escalável e agnóstica ao modelo de IA — hoje utiliza LLaMA 3 via Groq, amanhã pode utilizar Gemini, GPT-4 ou um modelo local sem alterações na lógica principal.

---

## Funcionalidades

### MVP Implementado

| Funcionalidade | Descrição |
|----------------|-----------|
| Assistente IA | Consultas em linguagem natural com respostas estruturadas |
| Mapa Interactivo | Visualização geográfica com GeoJSON real dos municípios de Angola e marcadores para Brasil/LATAM |
| Dashboard Analítico | Indicadores por região com IOT, breakdown e classificação |
| Índice IOT | Cálculo automático da prioridade de intervenção territorial |
| Metodologia GMAAE | Análise estruturada em 5 dimensões integrada no agente de IA |
| Cache Inteligente | Respostas frequentes guardadas por 24h para maior velocidade |
| Suporte Multilíngue | Português, Inglês e Espanhol |
| Exportação PDF | Relatório completo com IOT, indicadores e recomendações |
| Respostas Pré-processadas | Perguntas comuns respondidas sem chamada ao LLM |

### Evoluções Previstas

| Funcionalidade | Descrição |
|----------------|-----------|
| Autenticação | Gestão de utilizadores com perfis e permissões |
| Histórico | Registo de todas as consultas realizadas |
| Favoritos | Guardar regiões e consultas frequentes |
| Comparação | Comparar múltiplas regiões ou países |
| Alertas | Notificações quando indicadores caem abaixo de limiares |
| Modelo Local | Suporte a TinyLlama ou Phi para ambientes sem conectividade |
| API Pública | Endpoints abertos para integração com sistemas governamentais |

---

## Stack Tecnológico

| Camada | Tecnologia | Descrição |
|--------|-----------|-----------|
| Frontend | React + Vite | Interface responsiva e PWA |
| Mapas | Leaflet.js + React-Leaflet + GeoJSON | Visualização geográfica interactiva |
| Backend | FastAPI (Python) | API REST de alto desempenho |
| Agente IA | LangChain | Orquestração do agente de IA |
| Modelo LLM | LLaMA 3 | Modelo de linguagem principal |
| Inferência | Groq | Inferência de alta velocidade |
| Base de Dados | PostgreSQL (Neon) | Armazenamento escalável na cloud |
| Cache | Upstash QStash | Manutenção do servidor e cache |
| Deploy Backend | Render | Hospedagem do backend |
| Deploy Frontend | Vercel | Hospedagem do frontend |
| Monitorização | UptimeRobot | Disponibilidade do backend |
| Controlo de Versão | Git + GitHub | Gestão do código fonte |

---

## Dataset Vísent CDRView

Dataset principal do desafio, fornecido pela Vísent. Contém dados de concentração de pessoas por zona e cobertura de rede móvel (3G/4G/5G) com coordenadas reais de antenas Anatel.

Disponível em: [github.com/wongola-bit/appbit](https://github.com/wongola-bit/appbit)

| Ficheiro | Descrição |
|----------|-----------|
| tensor_concentracao.csv | Concentração de utilizadores por zona e período |
| tensor_fluxo_vias.csv | Fluxo de pessoas nas vias principais |
| tensor_od.csv | Matriz origem-destino dos deslocamentos |
| antenas_flp.csv | Coordenadas reais das antenas Anatel |

O dataset é consumido directamente do GitHub em tempo real — sem necessidade de download ou armazenamento local.

### Fontes Complementares

| Fonte | Dados |
|-------|-------|
| INE Angola | Indicadores socioeconómicos das 21 províncias |
| IBGE / DATASUS | Dados demográficos e de saúde do Brasil |
| OMS | Indicadores de saúde mental regionais |
| GADM | GeoJSON dos municípios de Angola |

---

## Índice de Oportunidade Territorial (IOT)

### Por que existe

Os indicadores tradicionais medem desenvolvimento. O IOT mede **prioridade de intervenção**. Duas regiões com o mesmo nível de necessidade podem ter impactos muito diferentes dependendo da sua população. O IOT incorpora este factor para identificar onde uma intervenção pública beneficia mais pessoas.

### Como funciona

```
Passo 1 — Converter indicadores em necessidades
N = 100 - Indicador

Passo 2 — Calcular o Índice de Necessidade Social (INS)
INS = 0.25 x N_Empregabilidade
    + 0.20 x N_Formação
    + 0.20 x N_Saúde_Mental
    + 0.15 x N_Mentorias
    + 0.10 x N_Iniciativas_Estruturantes
    + 0.10 x N_Cobertura_de_Rede

Passo 3 — Incorporar o factor populacional
IOT = 0.80 x INS + 0.20 x Concentração_Populacional
```

### Como interpretar

| IOT | Classificação | Acção Recomendada |
|-----|--------------|-------------------|
| 0 – 20 | Baixa prioridade | Monitorização periódica |
| 21 – 40 | Prioridade moderada | Planeamento de intervenção |
| 41 – 60 | Prioridade elevada | Intervenção programada |
| 61 – 80 | Alta prioridade | Intervenção urgente |
| 81 – 100 | Prioridade crítica | Intervenção imediata |

O IOT é sempre apresentado com o breakdown dos factores que contribuíram para o resultado, garantindo total transparência e auditabilidade da análise.

---

## Metodologia GMAAE

O Orivis AI implementa a metodologia GMAAE — uma abordagem própria que estrutura a análise territorial em cinco dimensões integradas, tornando as recomendações transparentes, justificadas e auditáveis.

| Dimensão | Descrição |
|----------|-----------|
| G — Geometria | Onde estão as pessoas? Qual é a distribuição espacial da população? |
| M — Matemática | Quais são os números reais? Concentração, cobertura, indicadores sociais. |
| A — Agrimensura | Qual é a extensão territorial e densidade populacional da região? |
| A — Arquitectura | Como está estruturada a infraestrutura digital e social da região? |
| E — Estratégia | Onde investir primeiro? Qual é a prioridade de intervenção? |

O sistema não apresenta apenas um número — explica por que motivo determinada região recebeu determinada classificação.

---

## Fluxo do Sistema

```
Gestor Público
      |
      | Formula uma pergunta em linguagem natural
      v
Interface Web (React)
      |
      | HTTP POST /dados
      v
FastAPI Backend
      |
      +-- Verifica cache (24h)
      +-- Verifica respostas pré-processadas
      |
      v
Agente LangChain
      |
      +-- Consulta Dataset Vísent CDRView
      +-- Consulta Dados Angola (INE)
      +-- Consulta Fontes Públicas (IBGE, OMS)
      |
      v
Aplica Metodologia GMAAE
      |
      v
Calcula IOT
      |
      v
LLaMA 3 (Groq)
      |
      v
Resposta Estruturada
      |
      +-- Texto em linguagem natural
      +-- Indicadores relevantes
      +-- Fontes utilizadas
      |
      v
Frontend apresenta
      |
      +-- Resposta da IA
      +-- Mapa interactivo
      +-- Dashboard de indicadores
      +-- IOT com breakdown
```

---

## Resiliência e Conectividade

A arquitectura prevê três níveis de resiliência para ambientes com conectividade limitada:

**Cache Inteligente**
Consultas frequentes ficam armazenadas durante 24 horas, eliminando chamadas repetidas ao modelo de IA.

**Respostas Pré-processadas**
Perguntas comuns são respondidas imediatamente, sem necessidade de inferência.

**Arquitectura Agnóstica**
O sistema foi concebido para permitir a substituição do modelo de IA sem alterações na lógica principal — hoje LLaMA 3 via Groq, amanhã TinyLlama ou Phi localmente.

---

## Endpoints da API

> **Base URL (dev):** `http://127.0.0.1:8000`
> **Base URL (prod):** `https://orivis-ai-backend.onrender.com`

---

### `POST /dados`
Consulta em linguagem natural ao agente de IA, com resposta estruturada e fontes utilizadas.

**Request Body:**
```json
{
  "consulta": "Onde investir primeiro em Angola?",
  "filtros": {},
  "idioma": "PT"
}
```

**Response `200 OK`:**
```json
{
  "resposta_ia": "Com base no IOT calculado, as províncias com maior prioridade de intervenção em Angola são Huambo e Benguela, ambas com défice acentuado em Formação e Cobertura Digital.",
  "fontes": [
    "Vísent CDRView v1.0",
    "INE Angola",
    "OMS"
  ]
}
```

---

### `GET /mapa`
Retorna os dados geoespaciais e indicadores de todas as regiões (Angola, Brasil e LATAM), já com o IOT calculado, usados pelo Dashboard e pelo Mapa interactivo.

**Response `200 OK`:**
```json
{
  "regioes": [
    {
      "regiao": "Huambo",
      "pais": "Angola",
      "lat": -12.776,
      "lng": 15.739,
      "concentracao": 68,
      "indicadores": {
        "empregabilidade": 38,
        "formacao": 22,
        "saude_mental": 41,
        "mentorias": 19,
        "iniciativas_sociais": 27,
        "cobertura_rede": 54
      },
      "iot": 71,
      "iot_cor": "#F97316",
      "iot_classificacao": "Alta prioridade",
      "iot_breakdown": [
        { "indicador": "Formação", "valor_real": 22, "critico": true, "seta": "▲" },
        { "indicador": "Mentorias", "valor_real": 19, "critico": true, "seta": "▲" }
      ]
    }
  ]
}
```

---

### `GET /health`
Health check da API, usado pela monitorização (UptimeRobot).

**Response `200 OK`:**
```json
{ "status": "ok", "versao": "1.0.0" }
```

---

## Estrutura do Projecto

```
S06-26-AB-Equipe-44/
|
+-- backend/
|   +-- app/
|   |   +-- main.py                       Servidor FastAPI
|   |   +-- agent.py                      Agente LangChain + GMAAE
|   |   +-- routes/
|   |   |   +-- dados.py                  POST /dados
|   |   |   +-- mapa.py                   GET /mapa + cálculo IOT
|   |   +-- tools/
|   |       +-- visent.py                 Pipeline Vísent CDRView
|   |       +-- iot.py                    Fórmula IOT
|   |       +-- angola_data.py            21 Províncias de Angola
|   |       +-- fontes_publicas.py        INE, IBGE, OMS
|   |       +-- cache.py                  Cache 24h
|   |       +-- respostas_pre_processadas.py
|   +-- .env.example
|   +-- requirements.txt
|   +-- render.yaml
|
+-- frontend/
|   +-- src/
|   |   +-- pages/
|   |   |   +-- Home.jsx                  Página inicial + splash screen
|   |   |   +-- Analise.jsx               Página de análise com tabs (Chat / Mapa / Indicadores)
|   |   |   +-- Dashboard.jsx             Indicadores e IOT por região
|   |   |   +-- Mapa.jsx                  Mapa com GeoJSON
|   |   +-- components/
|   |   |   +-- SplashScreen.jsx          Ecrã de abertura com logo e explicação da IA
|   |   |   +-- ExportarPDF.jsx           Exportação de relatório
|   |   +-- services/
|   |       +-- api.js                    Chamadas ao backend
|   +-- .env.example
|   +-- package.json
|   +-- vercel.json                       Rewrites para React Router
|
+-- data/
|   +-- angola.geojson                    GeoJSON das províncias de Angola
|
+-- README.md
```

---

## Como Executar

### Requisitos

- Python 3.13 ou superior
- Node.js 18 ou superior
- Git

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

Criar o ficheiro `.env` na pasta `backend`:

```
GROQ_API_KEY=tua_chave_groq
GOOGLE_API_KEY=tua_chave_gemini
DATABASE_URL=postgresql://user:password@host/appbit
```

Iniciar o servidor:

```bash
uvicorn app.main:app --reload
```

API disponível em: `http://localhost:8000`
Documentação interactiva: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
```

Criar o ficheiro `.env` na pasta `frontend`:

```
VITE_API_URL=http://127.0.0.1:8000
```

Iniciar o servidor:

```bash
npm run dev
```

Frontend disponível em: `http://localhost:5173`

---

## Deploy

| Serviço | Plataforma | URL |
|---------|-----------|-----|
| Frontend | Vercel | https://s06-26-ab-equipe-44.vercel.app |
| Backend | Render | https://orivis-ai-backend.onrender.com |
| Documentação API | Render | https://orivis-ai-backend.onrender.com/docs |

> **Nota:** o `frontend/vercel.json` deve conter um rewrite para `/index.html`, garantindo que rotas como `/analise` funcionam correctamente em produção com o React Router.

---

## Fontes de Dados

| Fonte | Indicador | Tipo |
|-------|-----------|------|
| [Vísent CDRView](https://github.com/wongola-bit/appbit) | Concentração de pessoas + cobertura de rede | Dataset principal |
| INE Angola | Indicadores socioeconómicos das 21 províncias | Público |
| IBGE / DATASUS | Dados demográficos e de saúde do Brasil | Público |
| OMS | Indicadores de saúde mental regionais | Público |
| GADM | GeoJSON dos municípios de Angola | Público |

---

## Equipa

Hackathon App BiT (B2G) — 2026
Equipe 44

Projecto desenvolvido durante a Work Simulation da No Country.
Repositório: S06-26-AB-Equipe-44

---

## Trabalhos Futuros

A arquitectura do Orivis AI foi desenhada desde o início para suportar evolução contínua:

- Autenticação de utilizadores com perfis de gestor, analista e administrador
- Histórico completo de consultas com filtros por data, região e tema
- Exportação de relatórios em PDF, Word e Excel
- Actualização automática dos indicadores a partir de APIs públicas
- Dashboards personalizados por região e por perfil de utilizador
- Comparação entre regiões, províncias e países
- Suporte offline através de modelos de IA locais (TinyLlama, Phi, Gemma)
- Integração com sistemas governamentais existentes via API pública
- Cobertura de novos países e regiões sem alterações na arquitectura principal

---

## Licença

Projecto desenvolvido exclusivamente para fins educativos e de demonstração durante o Hackathon App BiT (B2G).
