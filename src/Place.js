import photo from "./photo/night.jpeg";
import { MdDirections } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { useEffect,useState } from "react";
import axios from "axios";
import MapCont from "./Map";

function Place({ places, setPlace,data }) {
  const [showMap,setShowMap]=useState(false);
  const [coordinate,setCoordinate]=useState([]);
  useEffect(() => {
    const fetchLocationData = async (postCode) => {
      try {
        const res = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${postCode}&apiKey=f6b2bef310f84e788bddc2775c667065`);
        return res.data.features[0]?.properties || null;
      } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
      }
    };

    const updatePlacesWithLocation = async () => {
      const updatedPlaces = await Promise.all(
        places.map(async (place) => {
          const location = await fetchLocationData(place.postCode);
          const distance= calculateDistance(parseFloat(data.lat), parseFloat(data.lon), parseFloat(location.lat), parseFloat(location.lon));
          return { ...place, location, distance:distance.toFixed(2) };
        })
      );
      setPlace(updatedPlaces);
    };

    updatePlacesWithLocation();
  }, []);
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Radius of Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };
  console.log(places);
  return (
    <div className="flex flex-col justify-center px-20 py-6 mt-5">
      
        {showMap ? <MapCont position={coordinate} setShowMap={setShowMap} /> :
          <>
          {places.map((place, ind) => {
            return (
              <div className="mt-8 p-4 flex-col w-full items-center lg:items-start lg:w-1/4 bg-gray-600">
                <img src={photo} alt="pic" className="h-60" />
                <h2 className="text-white mt-2 font-thn text-2xl ">{place.name}</h2>
                <p className="mt-2 font-thin">{place?.location?.county} , <span className="font-normal">{place?.location?.state}</span></p>
                <div className="flex justify-start mt-2 gap-4">
                  <div className="text-center">
                    <button className="p-2 bg-red-600 rounded-full" onClick={()=>{
                      setShowMap(true)
                      setCoordinate([place.location.lat, place.location.lon])
                    }}>
                      <MdDirections size={25} />
                    </button>
                    <p className="text-sm mt-1 text-gray-200">Direction</p>
                  </div>
                  <div className="">
                    <button className="p-2 bg-blue-700 rounded-full">
                      <MdRateReview size={25} />
                    </button>
                    <p className="text-sm mt-1 text-gray-200">Review</p>
                  </div>
                  <div className="mt-2 font-bold">
                     {place?.distance}Km
                   </div>
                </div>
              </div>
            );
          })}
            </>
        }
    </div>
  );
}

export default Place;
