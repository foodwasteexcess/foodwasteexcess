

mapboxgl.accessToken ="pk.eyJ1Ijoic29waGlhZnJlZGVyaWtlIiwiYSI6ImNrZjNycHZ4ZjA0NWUyenM5eGV2cjNucTQifQ.ymS-cOe15o4AeRuok1nJnQ";

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [13.404954, 52.520008], // starting position [lng, lat]
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


    `<form class="form-container" id="map-add-product" action="/add-products" method="POST" id="form" enctype="multipart/form-data">

        <label class="label-add" for="title">Product name:</label>
        <input class="input" name="title" type="text" id="title">
      
       <label class="label-add" for="brand">Brand:</label>
        <input class="input" name="brand" type="text" id="brand">
      
        <label class="label-add" for="start">Expiry Date:</label>
        <input class="input" type="date" id="expiryDate" name="expiryDate" value="2020-09-01">
        
      
        <label class="label-add" for="description">Description:</label>
        <input class="input" name="description" type="text" id="description">
      
        <div class="input-container picture">
        <label class="label-add" for="image">Picture:</label>
        <input class="input" type="file" name="image" id="image">
        </div>
        <div class="input-container picture">
       <label class="label-add" >Category:</label>
                   <select name="category" id = "myList">

                     <option value = "fruitsandvegetables">Fruits & Veggies</option>
                     <option value = "alreadycooked">Already Cooked</option>
                     <option value = "condiments">Condiments</option>
                     <option value = "dairy">Dairy</option>
                     <option value = "meatandfish">Meat & fish</option>
                     <option value = "veggieproducts">Veggie Products</option>
                     <option value = "drygoods">Dry Goods</option>
                     <option value = "backeryproducts">Backery Products</option>
                     <option value = "drinks">Drinks</option>
                  </select>
                   </div>

        <input style="display: none" type="text" name="coordinates" value=${Object.values(data.target.getLngLat())}>

      
        <button class="btn btn-add-product " type="submit">Add your product!</button>
      </form>`
   
  );
});

