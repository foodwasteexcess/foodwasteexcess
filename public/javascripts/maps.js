mapboxgl.accessToken ="pk.eyJ1Ijoic29waGlhZnJlZGVyaWtlIiwiYSI6ImNrZjNycHZ4ZjA0NWUyenM5eGV2cjNucTQifQ.ymS-cOe15o4AeRuok1nJnQ";

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [13.404954,52.520008], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });

  const popup = new mapboxgl.Popup();

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
     
    marker.on("dragend", (data) => {
      console.log("hello? Is it data?", Object.values(data.target.getLngLat()));
      popup.addTo(map);
      popup.setLngLat(Object.values(data.target.getLngLat()));
      popup.setMaxWidth("400px");
      popup.setHTML(


        `<form action="/add-products" method="POST" id="form" enctype="multipart/form-data">

        <label for="title">Title of your product</label>
        <input name="title" type="text" id="title">
      
       <label for="brand">Brand:</label>
        <input name="brand" type="text" id="brand">
      
        <label for="start">When does your product expire?</label>
        <input type="date" id="expiryDate" name="expiryDate" value="2020-09-01">
        
      
        <label for="description">Describe your product</label>
        <input name="description" type="text" id="description">
      
        <label for="image">add an image of your product </label>
        <input type="file" name="image" id="image">
      
       <label>Select a category</label>
                   <select name="category" id = "myList">
                     <option value = "fruitsandvegetables">fruitsandvegetables</option>
                     <option value = "alreadycooked">alreadycooked</option>
                     <option value = "condiments">condiments</option>
                     <option value = "dairy">dairy</option>
                     <option value = "meatandfish">meatandfish</option>
                     <option value = "veggieproducts">veggieproducts</option>
                     <option value = "drygoods">drygoods</option>
                     <option value = "backeryproducts">backeryproducts</option>
                     <option value = "drinks">drinks</option>
                   </select>

        <input style="display: none" type="text" name="coordinates" value=${Object.values(data.target.getLngLat())}>

      
        <button type="submit">Add your product</button>
      </form>`
      );
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