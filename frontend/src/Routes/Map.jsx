import { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';

const App = () => {
  const mapElement = useRef();
  const [map, setMap] = useState({}); 
  const mapInitialized = useRef(false); 
  const [from,setFrom]=useState("");
  const [longitude,setLongitude]=useState(-73.971321);
  const [latitude,setLatitude]=useState(40.776676);

  useEffect(() => {
    if (!mapInitialized.current) {
      
      const mapInstance = tt.map({
        key: import.meta.env.VITE_API_KEY,
        container: mapElement.current,
        center:[longitude,latitude],
        zoom:11,
        stylesVisibility:{
            trafficIncidents:true,
            trafficFlow:true
        }
      });
      setMap(mapInstance);

      
      mapInitialized.current = true;
    }
  }, [longitude,latitude]);

  
  
  

  return (
    <div className="App">
      <div ref={mapElement} className="h-screen w-screen relative">
      <div className="absolute rounded-md bg-white top-7 left-7 z-50 h-40 w-1/4"> {/*To be changed later*/}
          <input type="text" id="location" className='location w-full h-10' onChange={(e) => setFrom(e.target.value)} placeholder='From'>
            
          </input>
          

          <input type="text" id="loc" className='location w-full h-10' placeholder='Where to?'></input>
        </div>
      </div>
    </div>
  );
};

export default App;
