import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import { GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MoverMapa from './MoverMapa.jsx' 

function Mapa ({feature, coordenadas, nome}) {

    function estilo({feature}){
        if (feature.properties.NAME_1 === "Luanda"){
            return{
                fillColor: "red",
                color: "black",
                weight: 2
            }
        }

        return{
            fillColor: "yellow",
            color: "black",
            weight: 1
        }
    }

    return (
        <MapContainer
            center={[-11.2027, 17.8739]}
            zoom={12}
            style={{height: "400px", width: "100%"}}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MoverMapa
                coordenadas={[-11.2027, 17.8739]}
            />

            <Marker position={[-11.2027, 17.8739]}>
                <Popup>
                    {nome}
                </Popup>
            </Marker>

            <GeoJSON 
                data={feature}
                style={
                    estilo(feature)
                }
            />
            
        </MapContainer>
    )
} 

export default Mapa;