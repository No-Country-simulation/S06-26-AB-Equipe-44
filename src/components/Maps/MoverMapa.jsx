import { useMap } from "react-leaflet";
import { useEffect } from "react";

function MoverMapa({ coordenadas }) {
  const map = useMap();

  useEffect(() => {
    if (coordenadas) {
      map.setView(coordenadas, 12);
    }
  }, [coordenadas]);

  
}
export default MoverMapa