import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import MoverMapa from './MoverMapa.jsx' 

function Mapa ({coordenadas, nome}) {
    return (
        <MapContainer
            center={coordenadas}
            zoom={12}
            style={{height: "400px", width: "100%"}}
        >
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MoverMapa
                coordenadas={coordenadas}
            />

            <Marker position={coordenadas}>
                <Popup>
                    {nome}
                </Popup>
            </Marker>

        </MapContainer>
    )
}

export default Mapa;