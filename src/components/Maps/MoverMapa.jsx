import { useMap } from "react-leaflet";
import { useEffect } from "react";

function MoverMapa({ coordenadas }) {
  const map = useMap();

  useEffect(() => {
    if (coordenadas) {
      map.setView(coordenadas, 7);
    }
  }, [coordenadas]);

  
}
export default MoverMapa