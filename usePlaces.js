import { useState, useEffect } from "react";
import { STATIC_ACTIVITIES } from "./constants";

const CATEGORY_QUERIES = {
  outdoor: "outdoor activities parks nature Sunnyvale CA",
  food: "restaurants cafes brunch Sunnyvale CA",
  arts: "museums art galleries San Jose CA",
  wellness: "yoga spa wellness fitness Sunnyvale CA",
  shopping: "shopping malls boutiques Sunnyvale CA",
  events: "events entertainment venues San Jose CA",
};

export function usePlaces(category) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    setError(null);

    const query = CATEGORY_QUERIES[category] || `${category} Sunnyvale CA`;

    fetch(`/api/places?query=${encodeURIComponent(query)}&category=${category}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const apiPlaces = data.places || [];
        if (apiPlaces.length > 0) {
          setPlaces(apiPlaces);
        } else {
          setPlaces(STATIC_ACTIVITIES[category] || []);
        }
      })
      .catch((err) => {
        console.error("Places fetch error:", err);
        setError(err.message);
        setPlaces(STATIC_ACTIVITIES[category] || []);
      })
      .finally(() => setLoading(false));
  }, [category]);

  return { places, loading, error };
}
