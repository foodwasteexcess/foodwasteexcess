mapboxgl.accessToken ="pk.eyJ1Ijoic29waGlhZnJlZGVyaWtlIiwiYSI6ImNrZjNycHZ4ZjA0NWUyenM5eGV2cjNucTQifQ.ymS-cOe15o4AeRuok1nJnQ";

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [13.404954,52.520008], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });

  let marker = new mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([13.405, 52.52])
    .addTo(map);
     
    function onDragEnd() {
    let lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML =
    'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }
     
    marker.on('dragend', onDragEnd);

//const map = new mapboxgl.Map({
//   container: "map",
//   style: "mapbox://styles/timbotimber/ck6gkirhv0tc41imrp5a44z9d",
//   center: [13.405, 52.52],
//   zoom: 4.5,
//   options: {
//     anchor: "top-right"
//   }
// });