import { useState } from 'react'
import { GeoJSON } from 'react-leaflet'
import './App.css'
import Mapa from './components/Maps/Map.jsx' 
import Chat from './components/Chat/Chat.jsx'
import Logo from "./assets/icons_projeto_B2G/icon_orivis.png"
import geoJsonAngoloaMunicipios from "./assets/geo/Dados Visent de Angola/Provícias de Angola/Municípios/gadm41_AGO_2_formatado.json"

function App() {
  const [pagina, setPagina] = useState("wellcome");

  const regioes = {
  AEROPORTO_HLZ: {
    coordenadas: [-27.6700, -48.5470]
  },

  BIGUACU_BR101_NORTE: {
    coordenadas: [-27.4950, -48.6550]
  },

  CAMPECHE: {
    coordenadas: [-27.6800, -48.4800]
  },
  
  CANASVIEIRAS: {
    coordenadas: [-27.4250, -48.4700]
  },

  CBD_BEIRAMAR: {
    coordenadas: [-27.5954, -48.5480]
  },
  
  CENTRO_HISTORICO: {
    coordenadas: [-27.5970, -48.5482]
  },

  COQUEIROS: {
    coordenadas: [-27.5820, -48.5700]
  },

  ESTREITO_CAPOEIRAS: {
    coordenadas: [-27.5880, -48.5850]
  },

  INGLESES: {
    coordenadas: [-27.4350, -48.3950]
  },

  JURERE: {
    coordenadas: [-27.4400, -48.5000]
  },

  LAGOA_CONCEICAO: {
    coordenadas: [-27.6050, -48.4600]
  },

  NORTE_ILHA: {
    coordenadas: [-27.4800, -48.4500]
  },

  PALHOCA_CENTRO: {
    coordenadas: [-27.6450, -48.6700]
  },
  PALHOCA_PEDRA_BRANCA: {
    coordenadas: [-27.6250, -48.6900]
  },

  RESIDENCIAL_NORTE: {
    coordenadas: [-27.5420, -48.5000]
  },

  SAO_JOSE_BARREIROS: {
    coordenadas: [-27.6450, -48.6500]
  },

  SAO_JOSE_CENTRO: {
    coordenadas: [-27.6100, -48.6180]
  },

  SAO_JOSE_KOBRASOL: {
    coordenadas: [-27.5950, -48.6300]
  },

  SAO_JOSE_ROCADO: {
    coordenadas: [0.0000, 0.0000]
  },

  SC401_CORREDOR: {
    coordenadas: [-27.5600, -48.5180]
  },

  TRINDADE: {
    coordenadas: [-27.6011, -48.5320]
  },
  
  UFSC: {
    coordenadas: [-27.5969, -48.5500]
  },

  VIA_EXPRESSA_CORREDOR: {
    coordenadas: [-27.6200, -48.5800]}
};

  const [regiao, setRegiao] = useState(regioes["AEROPORTO_HLZ"]);


  const coordenadas = regioes[regiao] || [-27.6700, -48.5470];

  const indicadores = {
    empregabilidade: {
      AEROPORTO_HLZ: 82,
      BIGUACU_BR101_NORTE: 74,
      CAMPECHE: 59,
      CANASVIEIRAS:10,
      CBD_BEIRAMAR: 55,
      CENTRO_HISTORICO: 78,
      COQUEIROS: 67,
      ESTREITO_CAPOEIRAS: 42,
      INGLESES: 88,
      JURERE: 33,
      LAGOA_CONCEICAO: 76,
      NORTE_ILHA: 65,
      PALHOCA_CENTRO: 56,
      PALHOCA_PEDRA_BRANCA: 58,
      RESIDENCIAL_NORTE: 43,
      SAO_JOSE_BARREIROS: 51,
      SAO_JOSE_CENTRO: 30,
      SAO_JOSE_KOBRASOL: 22,
      SAO_JOSE_ROCADO: 43,
      SC401_CORREDOR: 10,
      TRINDADE: 32,
      UFSC: 21,
      VIA_EXPRESSA_CORREDOR: 22
      
    },

    formacao: {
      AEROPORTO_HLZ: 32,
      BIGUACU_BR101_NORTE: 54,
      CAMPECHE: 29,
      CANASVIEIRAS:40,
      CBD_BEIRAMAR: 35,
      CENTRO_HISTORICO: 58,
      COQUEIROS: 27,
      ESTREITO_CAPOEIRAS: 52,
      INGLESES: 88,
      JURERE: 53,
      LAGOA_CONCEICAO: 46,
      NORTE_ILHA: 45,
      PALHOCA_CENTRO: 66,
      PALHOCA_PEDRA_BRANCA: 58,
      RESIDENCIAL_NORTE: 23,
      SAO_JOSE_BARREIROS: 51,
      SAO_JOSE_CENTRO: 30,
      SAO_JOSE_KOBRASOL: 22,
      SAO_JOSE_ROCADO: 53,
      SC401_CORREDOR: 30,
      TRINDADE: 52,
      UFSC: 21,
      VIA_EXPRESSA_CORREDOR: 52
      
    },

    mentoria: {
      AEROPORTO_HLZ: 52,
      BIGUACU_BR101_NORTE: 64,
      CAMPECHE: 39,
      CANASVIEIRAS:50,
      CBD_BEIRAMAR: 45,
      CENTRO_HISTORICO: 58,
      COQUEIROS: 27,
      ESTREITO_CAPOEIRAS: 52,
      INGLESES: 58,
      JURERE: 63,
      LAGOA_CONCEICAO: 36,
      NORTE_ILHA: 55,
      PALHOCA_CENTRO: 66,
      PALHOCA_PEDRA_BRANCA: 38,
      RESIDENCIAL_NORTE: 53,
      SAO_JOSE_BARREIROS: 61,
      SAO_JOSE_CENTRO: 70,
      SAO_JOSE_KOBRASOL: 22,
      SAO_JOSE_ROCADO: 23,
      SC401_CORREDOR: 50,
      TRINDADE: 62,
      UFSC: 31,
      VIA_EXPRESSA_CORREDOR: 52
      
    },

    saude_mental: {
      AEROPORTO_HLZ: 54,
      BIGUACU_BR101_NORTE: 34,
      CAMPECHE: 49,
      CANASVIEIRAS: 40,
      CBD_BEIRAMAR: 55,
      CENTRO_HISTORICO: 68,
      COQUEIROS: 77,
      ESTREITO_CAPOEIRAS: 32,
      INGLESES: 78,
      JURERE: 53,
      LAGOA_CONCEICAO: 66,
      NORTE_ILHA: 75,
      PALHOCA_CENTRO: 86,
      PALHOCA_PEDRA_BRANCA: 38,
      RESIDENCIAL_NORTE: 53,
      SAO_JOSE_BARREIROS: 41,
      SAO_JOSE_CENTRO: 60,
      SAO_JOSE_KOBRASOL: 32,
      SAO_JOSE_ROCADO: 53,
      SC401_CORREDOR: 60,
      TRINDADE: 72,
      UFSC: 21,
      VIA_EXPRESSA_CORREDOR: 42
      
    },

    iniciativas_sociais: {
      AEROPORTO_HLZ: 32,
      BIGUACU_BR101_NORTE: 74,
      CAMPECHE: 49,
      CANASVIEIRAS:50,
      CBD_BEIRAMAR: 55,
      CENTRO_HISTORICO: 58,
      COQUEIROS: 57,
      ESTREITO_CAPOEIRAS: 52,
      INGLESES: 68,
      JURERE: 73,
      LAGOA_CONCEICAO: 36,
      NORTE_ILHA: 55,
      PALHOCA_CENTRO: 66,
      PALHOCA_PEDRA_BRANCA: 68,
      RESIDENCIAL_NORTE: 43,
      SAO_JOSE_BARREIROS: 61,
      SAO_JOSE_CENTRO: 60,
      SAO_JOSE_KOBRASOL: 32,
      SAO_JOSE_ROCADO: 63,
      SC401_CORREDOR: 30,
      TRINDADE: 52,
      UFSC: 61,
      VIA_EXPRESSA_CORREDOR: 62
      
    },

    cobertura_rede: {
      AEROPORTO_HLZ: 52,
      BIGUACU_BR101_NORTE: 64,
      CAMPECHE: 79,
      CANASVIEIRAS:60,
      CBD_BEIRAMAR: 75,
      CENTRO_HISTORICO: 68,
      COQUEIROS: 67,
      ESTREITO_CAPOEIRAS: 62,
      INGLESES: 88,
      JURERE: 33,
      LAGOA_CONCEICAO: 66,
      NORTE_ILHA: 65,
      PALHOCA_CENTRO: 36,
      PALHOCA_PEDRA_BRANCA: 68,
      RESIDENCIAL_NORTE: 53,
      SAO_JOSE_BARREIROS: 71,
      SAO_JOSE_CENTRO: 40,
      SAO_JOSE_KOBRASOL: 62,
      SAO_JOSE_ROCADO: 73,
      SC401_CORREDOR: 50,
      TRINDADE: 72,
      UFSC: 41,
      VIA_EXPRESSA_CORREDOR: 62
      
    },
  };

  const [indicador, setIndicador] = useState("empregabilidade");
  const valor = indicadores[indicador][regiao];

  function getColor(valor){
    if (valor >= 80)
      return "rgb(28, 156, 54)";

    if (valor >= 60)
      return "rgb(52, 240, 90)";

    if (valor >= 40)
      return "rgb(236, 236, 6)";

    if (valor >= 20)
      return "rgb(248, 139, 50)";

    else
      return "rgb(253, 0, 0)";
  };

  const feature = geoJsonAngoloaMunicipios.features;  

  return (
    <>
      <div className="center">

        <main className="main-content">

              {pagina === "wellcome" && (
                <div>

                  <header className='header'>
                    <section className='name-mark'>
                      <img src={Logo} alt="" />
                      <h2 className='name-mark-color'>Orivis IA</h2>
                      <p className="from">App BiT B2G</p>
                    </section>  
                      <section className='section-button-header'>

                      <button className="menu-item" onClick={() => setPagina("wellcome")}>
                          Dashboard
                      </button>

                      <button className="menu-item" onClick={() => setPagina("geo")}>
                          Map
                      </button>

                      <button className="menu-item" onClick={() => setPagina("assistente")}>
                          Consult Agent AI
                      </button>
                    </section>

                  </header>

                  <section className='content'>
                    <h2>Seja muito bem vindo!</h2>
                  </section>

                </div>
              )}

              {pagina === "geo" && (
                <div>

                   <header className='header'>
                    <section className='name-mark'>
                      <img src={Logo} alt="" />
                      <h2 className='name-mark-color'>Orivis IA</h2>
                      <p className="from">App BiT B2G</p>
                    </section>  
                      <section className='section-button-header'>

                      <button className="menu-item" onClick={() => setPagina("wellcome")}>
                          Dashboard
                      </button>

                      <button className="menu-item" onClick={() => setPagina("geo")}>
                          Map
                      </button>

                      <button className="menu-item" onClick={() => setPagina("assistente")}>
                          Consult Agent AI
                      </button>
                    </section>

                  </header>

                  <section className='content'>
                    <section className='section-regiao'>
                      <p className='info'>Region:</p>
                      <select name="regioes" className='seletor-regiao'
                        value={regiao}
                        onChange={(e) => setRegiao(e.target.value)}
                      >
                        
                        <option value={" AEROPORTO_HLZ"}>AEROPORTO_HLZ</option>
                        <option value={"BIGUACU_BR101_NORTE"}>BIGUACU_BR101_NORTE</option>
                        <option value="CAMPECHE">CAMPECHE</option>
                        <option value="CANASVIEIRAS">CANASVIEIRAS</option>
                        <option value="CBD_BEIRAMAR">CBD_BEIRAMAR</option>
                        <option value="CENTRO_HISTORICO">CENTRO_HISTORICO</option>
                        <option value="COQUEIROS">COQUEIROS</option>
                        <option value="ESTREITO_CAPOEIRAS">ESTREITO_CAPOEIRAS</option>
                        <option value="INGLESES">INGLESES</option>
                        <option value="JURERE">JURERE</option>
                        <option value="LAGOA_CONCEICAO">LAGOA_CONCEICAO</option>
                        <option value="NORTE_ILHA">NORTE_ILHA</option>
                        <option value="PALHOCA_CENTRO">PALHOCA_CENTRO</option>
                        <option value="PALHOCA_PEDRA_BRANCA">PALHOCA_PEDRA_BRANCA</option>
                        <option value="RESIDENCIAL_NORTE">RESIDENCIAL_NORTE</option>
                        <option value="SAO_JOSE_BARREIROS">SAO_JOSE_BARREIROS</option>
                        <option value="SAO_JOSE_CENTRO">SAO_JOSE_CENTRO</option>
                        <option value="SAO_JOSE_KOBRASOL">SAO_JOSE_KOBRASOL</option>
                        <option value="SAO_JOSE_ROCADO">SAO_JOSE_ROCADO</option>
                        <option value="SC401_CORREDOR">SC401_CORREDOR</option>
                        <option value="TRINDADE">TRINDADE</option>
                        <option value="UFSC">UFSC</option>
                        <option value="VIA_EXPRESSA_CORREDOR">VIA_EXPRESSA_CORREDOR</option>

                      
                      </select>
                    </section>

                    <section className='section-indicador'>
                      <p className='info'>Indicator:</p>
                      <select name="indicador" id="seletor-de-indicador"
                        value={indicador}
                        onChange={(e) => setIndicador(e.target.value)}
                      >
                        <option value="empregabilidade">Empregabilidade</option>
                        <option value="formacao">Formação</option>
                        <option value="mentoria">Mentoria</option>
                        <option value="saude-mental">Saúde Mental</option>
                        <option value="iniciativa-social">Iniciativas Sociais</option>
                        <option value="cobertura-de-rede">Cobertura de Rede</option>
                      </select>
                    </section>

                    <Mapa 
                    feature={feature}
                    coordenadas={coordenadas}
                    nome={regiao}
                    />

                  </section>


                </div>
              )}

              {pagina === "assistente" && (
                <div>

                  <Chat
                    pagina={pagina}
                    setPagina={setPagina}
                  />

                </div>

              )}
              

              

        </main>
      </div>
    </>
  )
}

export default App
