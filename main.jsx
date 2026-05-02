
// Dynamically load Google Maps so Vite can substitute the API key
(function loadMaps() {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!key) return; // skip if no key (app uses fallback data)
  const s = document.createElement('script');
  s.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&loading=async`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
})();

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
