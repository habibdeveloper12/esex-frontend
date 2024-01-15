import React, { useRef, useEffect } from "react";
import ReactGoogleAutocomplete, {
  usePlacesWidget,
} from "react-google-autocomplete";

const Reacthook = () => {
  const inputRef = useRef(null);
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: "AIzaSyASiqsBfc8eoOG5Hkpqty8PglRxxbiRYNU",
    onPlaceSelected: (place) => {
      console.log(place);
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current = ref;
    }
  }, [ref]);

  return (
    <>
      <input
        ref={(node) => {
          // Attach the ref provided by the usePlacesWidget hook
          inputRef.current = node;
          ref.current = node;
        }}
        style={{ width: "90%" }}
        placeholder="Start typing an address..."
      />
      {/* Autocomplete suggestions dropdown */}
      <div ref={inputRef} style={{ position: "absolute", zIndex: 100 }} />
    </>
  );
};

export default Reacthook;
