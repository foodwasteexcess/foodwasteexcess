mapboxgl.accessToken ="pk.eyJ1Ijoic29waGlhZnJlZGVyaWtlIiwiYSI6ImNrZjNycHZ4ZjA0NWUyenM5eGV2cjNucTQifQ.ymS-cOe15o4AeRuok1nJnQ";

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });

//const map = new mapboxgl.Map({
//   container: "map",
//   style: "mapbox://styles/timbotimber/ck6gkirhv0tc41imrp5a44z9d",
//   center: [13.405, 52.52],
//   zoom: 4.5,
//   options: {
//     anchor: "top-right"
//   }
// });