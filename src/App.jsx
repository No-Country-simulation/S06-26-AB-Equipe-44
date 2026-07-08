import { useState } from 'react'
import { GeoJSON } from 'react-leaflet'
import './App.css'
import Mapa from './components/Maps/Map.jsx' 
import Chat from './components/Chat/Chat.jsx'
import Logo from "./assets/icons_projeto_B2G/icon_orivis.png"
import geoJsonAngoloaMunicipios from "./assets/geo/Dados Visent de Angola/Provícias de Angola/Municípios/gadm41_AGO_2_formatado.json"

function App() {

  function trocarTema(){
    document.body.classList.toggle("dark");
  }
  
  
  const regioes = {

    Bengo: [-8.5785, 13.6643],

    Benguela: [-12.5767, 13.4027],

    Bié: [-12.3833, 16.9333],

    Cabinda: [-5.5620, 12.1948],

    CuandoCubango: [-14.6585, 17.6910],

    CuanzaNorte: [-9.2978, 14.9116],

    CuanzaSul: [-11.2061, 13.8437],

    Cunene: [-17.0667, 15.7333],

    Huambo: [-12.7761, 15.7392],

    Huíla: [-14.9172, 13.4925],

    Luanda: [-8.8368, 13.2343],

    LundaNorte: [-7.3929, 20.8286],

    LundaSul: [-9.6608, 20.3916],

    Malanje: [-9.5402, 16.3410],

    Moxico: [-11.7833, 19.9167],

    Namibe: [-15.1961, 12.1522],

    Uíge: [-7.6087, 15.0613],

    Zaire: [-6.2670, 14.2400],

    AEROPORTO_HLZ: [-27.6700, -48.5470],

    BIGUACU_BR101_NORTE: [-27.4950, -48.6550],

    CAMPECHE: [-27.6800, -48.4800],
    
    CANASVIEIRAS: [-27.4250, -48.4700],

    CBD_BEIRAMAR: [-27.5954, -48.5480],
    
    CENTRO_HISTORICO: [-27.5970, -48.5482],

    COQUEIROS: [-27.5820, -48.5700],

    ESTREITO_CAPOEIRAS: [-27.5880, -48.5850],

    INGLESES: [-27.4350, -48.3950],

    JURERE: [-27.4400, -48.5000],

    LAGOA_CONCEICAO: [-27.6050, -48.4600],

    NORTE_ILHA: [-27.4800, -48.4500],

    PALHOCA_CENTRO: [-27.6450, -48.6700],
    
    PALHOCA_PEDRA_BRANCA: [-27.6250, -48.6900],

    RESIDENCIAL_NORTE: [-27.5420, -48.5000],

    SAO_JOSE_BARREIROS: [-27.6450, -48.6500],

    SAO_JOSE_CENTRO: [-27.6100, -48.6180],

    SAO_JOSE_KOBRASOL: [-27.5950, -48.6300],

    SAO_JOSE_ROCADO: [0.0000, 0.0000],

    SC401_CORREDOR: [-27.5600, -48.5180],

    TRINDADE: [-27.6011, -48.5320],
    
    UFSC: [-27.5969, -48.5500],

    VIA_EXPRESSA_CORREDOR: [-27.6200, -48.5800]
  };
  const indicadores = {
  empregabilidade: {
    Bengo: 62,
    Benguela: 81,
    Bié: 47,
    Cabinda: 75,
    CuandoCubango: 34,
    CuanzaNorte: 58,
    CuanzaSul: 69,
    Cunene: 29,
    Huambo: 88,
    Huíla: 77,
    Luanda: 95,
    LundaNorte: 54,
    LundaSul: 49,
    Malanje: 71,
    Moxico: 42,
    Namibe: 67,
    Uíge: 56,
    Zaire: 38,

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
      Bengo: 53,
      Benguela: 84,
      Bié: 59,
      Cabinda: 68,
      CuandoCubango: 36,
      CuanzaNorte: 63,
      CuanzaSul: 74,
      Cunene: 28,
      Huambo: 91,
      Huíla: 79,
      Luanda: 97,
      LundaNorte: 45,
      LundaSul: 52,
      Malanje: 65,
      Moxico: 40,
      Namibe: 61,
      Uíge: 57,
      Zaire: 33,

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
      Bengo: 41,
      Benguela: 76,
      Bié: 55,
      Cabinda: 63,
      CuandoCubango: 30,
      CuanzaNorte: 49,
      CuanzaSul: 70,
      Cunene: 24,
      Huambo: 85,
      Huíla: 73,
      Luanda: 93,
      LundaNorte: 51,
      LundaSul: 46,
      Malanje: 68,
      Moxico: 38,
      Namibe: 64,
      Uíge: 54,
      Zaire: 36,

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
      Bengo: 58,
      Benguela: 72,
      Bié: 61,
      Cabinda: 66,
      CuandoCubango: 39,
      CuanzaNorte: 57,
      CuanzaSul: 75,
      Cunene: 31,
      Huambo: 83,
      Huíla: 78,
      Luanda: 89,
      LundaNorte: 47,
      LundaSul: 44,
      Malanje: 69,
      Moxico: 41,
      Namibe: 62,
      Uíge: 59,
      Zaire: 35,

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
      Bengo: 46,
      Benguela: 79,
      Bié: 52,
      Cabinda: 71,
      CuandoCubango: 37,
      CuanzaNorte: 55,
      CuanzaSul: 67,
      Cunene: 27,
      Huambo: 87,
      Huíla: 74,
      Luanda: 92,
      LundaNorte: 50,
      LundaSul: 43,
      Malanje: 66,
      Moxico: 45,
      Namibe: 60,
      Uíge: 56,
      Zaire: 40,

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
      Bengo: 64,
      Benguela: 86,
      Bié: 58,
      Cabinda: 82,
      CuandoCubango: 25,
      CuanzaNorte: 60,
      CuanzaSul: 72,
      Cunene: 33,
      Huambo: 84,
      Huíla: 80,
      Luanda: 99,
      LundaNorte: 48,
      LundaSul: 45,
      Malanje: 70,
      Moxico: 29,
      Namibe: 68,
      Uíge: 55,
      Zaire: 42,

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

  const [regiao, setRegiao] = useState("Luanda");
  const [pagina, setPagina] = useState("assistente");
  const [indicador, setIndicador] = useState("empregabilidade");
  
  
  const valor = indicadores[indicador][regiao];

  const feature = geoJsonAngoloaMunicipios;  

  return (
    <>
      <div className="center">

        <main className="main-content">

          {pagina === "configurações" && (
                <div>

                  <header className='header'>
                    <section className='name-mark'>
                      <img src={Logo} alt="" />
                      <h2 className='name-mark-color'>Orivis IA</h2>
                      <p className="from">App BiT B2G</p>
                    </section>  
                      <section className='section-button-header'>

                      <button className="menu-item" onClick={() => setPagina("geo")}>
                          Map
                      </button>

                      <button className="menu-item" onClick={() => setPagina("assistente")}>
                          Consult Agent AI
                      </button>
                    </section>

                  </header>

                  <section className='content-configuracoes'>
                    <h2>Configurações</h2>
                    <h3>Temas</h3>
                    <button 
                      onClick={trocarTema()}
                      className='botao-trocar-tema'
                    >Trocar tema</button>
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

                      <button className="menu-item" onClick={() => setPagina("configurações")}>
                          Configurações
                      </button>

                      <button className="menu-item" onClick={() => setPagina("assistente")}>
                          Consult Agent AI
                      </button>
                    </section>

                  </header>

                  <section className='content'>

                    <section className='content-geo'>

                      <section className='section-input-geo'>

                        <p className='info'>Region:</p>
                        <select name="regioes" className='seletor-regiao'
                          value={regiao}
                          onChange={(e) => setRegiao(e.target.value)}
                        >
                          <option value="Bengo">Bengo</option>
                          <option value="Benguela">Benguela</option>
                          <option value="Bié">Bié</option>
                          <option value="Cabinda">Cabinda</option>
                          <option value="CuandoCubango">Cuando-Cubango</option>
                          <option value="CuanzaNorte">Cuanza-Norte</option>
                          <option value="CuanzaSul">Cuanza-Sul</option>
                          <option value="Cunene">Cunene</option>
                          <option value="Huambo">Huambo</option>
                          <option value="Huíla">Huíla</option>
                          <option value="Luanda">Luanda</option>
                          <option value="LundaNorte">Lunda Norte</option>
                          <option value="LundaSul">Lunda Sul</option>
                          <option value="Malanje">Malanje</option>
                          <option value="Moxico">Moxico</option>
                          <option value="Namibe">Namibe</option>
                          <option value="Uíge">Uíge</option>
                          <option value="Zaire">Zaire</option>

                          <option value=" AEROPORTO_HLZ">AEROPORTO HLZ</option>
                          <option value="BIGUACU_BR101_NORTE">BIGUACU NORTE</option>
                          <option value="CAMPECHE">CAMPECHE</option>
                          <option value="CANASVIEIRAS">CANASVIEIRAS</option>
                          <option value="CBD_BEIRAMAR">CBD BEIRAMAR</option>
                          <option value="CENTRO_HISTORICO">CENTRO HISTORICO</option>
                          <option value="COQUEIROS">COQUEIROS</option>
                          <option value="ESTREITO_CAPOEIRAS">ESTREITO CAPOEIRAS</option>
                          <option value="INGLESES">INGLESES</option>
                          <option value="JURERE">JURERE</option>
                          <option value="LAGOA_CONCEICAO">LAGOA CONCEICAO</option>
                          <option value="NORTE_ILHA">NORTE ILHA</option>
                          <option value="PALHOCA_CENTRO">PALHOCA CENTRO</option>
                          <option value="PALHOCA_PEDRA_BRANCA">PALHOCA PEDRA BRANCA</option>
                          <option value="RESIDENCIAL_NORTE">RESIDENCIAL NORTE</option>
                          <option value="SAO_JOSE_BARREIROS">SAO JOSE BARREIROS</option>
                          <option value="SAO_JOSE_CENTRO">SAO JOSE CENTRO</option>
                          <option value="SAO_JOSE_KOBRASOL">SAO JOSE KOBRASOL</option>
                          <option value="SAO_JOSE_ROCADO">SAO JOSE ROCADO</option>
                          <option value="SC401_CORREDOR">SC401 CORREDOR</option>
                          <option value="TRINDADE">TRINDADE</option>
                          <option value="UFSC">UFSC</option>
                          <option value="VIA_EXPRESSA_CORREDOR">VIA_EXPRESSA_CORREDOR</option>

                        
                        </select>
                        <p className='info'>Indicator:</p>
                        <select name="indicador" id="seletor-de-indicador"
                          value={indicador}
                          onChange={(e) => setIndicador(e.target.value)}
                        >
                          <option value="empregabilidade">Empregabilidade</option>
                          <option value="formacao">Formação</option>
                          <option value="mentoria">Mentoria</option>
                          <option value="saude_mental">Saúde Mental</option>
                          <option value="iniciativas_sociais">Iniciativas Sociais</option>
                          <option value="cobertura_rede">Cobertura de Rede</option>
                        </select>
                      
                      </section>

                      <section className='info-color-geo'>
                        
                        <ul>
                          
                          <li>80% – 100% 🟩 Verde       | Excelente | A região apresenta um excelente desempenho no indicador, com pouca ou nenhuma necessidade de intervenção.</li>
                          <hr />
                          <li>60% – 79% 🟢 Verde claro |    Bom    | A região apresenta um bom desempenho, mas ainda há espaço para melhorias.</li>
                          <hr />
                          <li>40% – 59% 🟨 Amarelo | Moderado | A região apresenta desempenho mediano e merece atenção para evitar piora.</li>
                          <hr />
                          <li>20% – 39% 🟧 Laranja | Baixo | A região apresenta baixa produtividade ou alta debilidade no indicador. Recomenda-se intervenção.</li>
                          <hr />
                          <li>0% – 19% 🟥 Vermelho | Crítico | A região encontra-se em situação crítica e deve ser tratada como prioridade.</li>
                        </ul>
                        
                      </section>

                    </section>
                    

                    <Mapa
                    indicador={indicador}
                    valorEstatisticoIndocador={valor}
                    feature={feature}
                    coordenadas={regioes[regiao]}
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
