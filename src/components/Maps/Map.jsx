import { useState } from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import { GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MoverMapa from './MoverMapa.jsx' 

function Mapa ({indicador, feature, coordenadas, nome}) {
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

  const valorEstatisticoIndocador = indicadores[indicador][nome];

    function estilo(feature){
        if (feature.properties.NAME_1 === nome){
            if (valorEstatisticoIndocador >= 80)
                return {
                    fillColor: "rgb(28, 156, 54)",
                    color: "black",
                    weight: 5,
                    fillOpacity: 0.8

                };

            if (valorEstatisticoIndocador >= 60)
                return {
                    fillColor:"rgb(137, 240, 52)",
                    color: "black",
                    weight: 5,
                    fillOpacity: 0.8

                };

            if (valorEstatisticoIndocador >= 40)
                return {
                    fillColor:"rgb(236, 236, 6)",
                    color: "black",
                    weight: 5,
                    fillOpacity: 0.8

                };

            if (valorEstatisticoIndocador >= 20)
                return {
                    fillColor:"rgb(218, 111, 23)",
                    color: "black",
                    weight: 5,
                    fillOpacity: 0.8

                };

            else
                return {
                    fillColor:"rgb(253, 0, 0)",
                    color: "black",
                    weight: 5,
                    fillOpacity: 0.8
 
                };
        }

        else{
            return {
                fillColor: "black",
                color: "gray",
                weight: 1,
                fillOpacity: 0.2
            };
        };
    }

    return (
        <MapContainer
            center={coordenadas}
            zoom={15}
            style={{height: "400px", width: "100%"}}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MoverMapa
                coordenadas={coordenadas}
            />

            <Marker position={coordenadas}>
                zoom={15}
                <Popup>
                    {nome}
                </Popup>
            </Marker>

            <GeoJSON 
                data={feature}
                style={estilo}
                zoom={15}
                
            />
            
        </MapContainer>
    )
} 

export default Mapa;