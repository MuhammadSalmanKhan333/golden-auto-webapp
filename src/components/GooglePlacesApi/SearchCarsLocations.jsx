import { useState } from "react";
// import { REACT_APP_GOOGLE_MAPS_KEY } from "../../constants/constants";
import { useRef } from "react";
import { useEffect } from "react";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

// eslint-disable-next-line react/prop-types
const SearchCarsLocations = ({ setSelectedLocation, placeholder }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    if (window.google && window.google.maps) {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        {
          //   types: ["(cities)"],
          // componentRestrictions: { country: "Pk" },
        }
      );

      autoComplete.addListener("place_changed", () => {
        handlePlaceSelect(updateQuery);
      });
    } else {
      console.error("Google Maps API not loaded.");
    }
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log({ query });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log({ latLng });
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );    
  });

  return (
    <>
      <input
        ref={autoCompleteRef}
        className="w-full pl-10 bg-white border border-gray-300 py-4 px-2 rounded-md"
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        value={query}
      />
    </>
  );
};

export default SearchCarsLocations;
