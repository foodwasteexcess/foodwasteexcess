// draw the map for the overview

// generate the access token from map box.com
mapboxgl.accessToken = "pk.eyJ1Ijoic29waGlhZnJlZGVyaWtlIiwiYSI6ImNrZjNycHZ4ZjA0NWUyenM5eGV2cjNucTQifQ.ymS-cOe15o4AeRuok1nJnQ";
console.log("hqppeningqdkjqdkj")
console.log(mapboxgl)
const maptwo = new mapboxgl.Map({
  container: 'maptwo',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [13.404954, 52.520008], // starting position [lng, lat]
  zoom: 9 // starting zoom
});
console.log("hqppening")

axios.get('/rawdata')
  .then((response) => {
    console.log("Helloooooooooo youuuuuu", response.data)

    let locations = response.data
    console.log("Helloooooooooo youuuuuu", locations._id);
    // bad naming here: 
    //location passed in forEach is one set of data i get from response.data
    // the location is stored in an array called location
    // this is why it's location.location
    locations.forEach((location) => {
      let coordinates = location.location;
      console.log(coordinates);

      let marker = new mapboxgl.Marker({
        color: "#d53f50"
      });
      console.log(+coordinates[0], +coordinates[1]);
      marker.setLngLat([`${+coordinates[0]}`, `${+coordinates[1]}`]);
      marker.addTo(maptwo);


      marker.setPopup(new mapboxgl.Popup().setHTML(`<div> <h1>${location.title}</h1><a href="/product-details/${location._id}">Check out the product</a></div>`)) // add popup
      // const popup = new mapboxgl.Popup();
      // popup.setHTML(
      //   'Hello'
      // )
      // popup.setLngLat([`${+coordinates[0]}`, `${+coordinates[1]}`]);
      // popup.setMaxWidth('400px');
      // popup.addTo(maptwo);
    })
  }).catch(err => console.log(err))


//add the marker with the coordinates from the products from the database
//when you click on them you get redirected to the product-details-page

//nice to have: 
// have a pop-up with the title and category when you click on the marker
//get redirected to the product-details-page when you click on the popup or marker then
//maybe I just add a link to the pop-up-field, that leads to the product-details page