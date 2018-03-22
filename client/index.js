const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

/*
 * App State
 */
//save the object grab from API
const state = {
  attractions: {},
  selectedAttractions: []
};

mapboxgl.accessToken = "pk.eyJ1IjoicGhpbGlwODAzIiwiYSI6ImNqZXp0OTZteDBmeWMycW9ham10bWFwZGgifQ.eAz3_XBnKQLumSLnPNApoQ";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map", //html id
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

//create new option, add to select tag
const makeOption = (attractions , selector) => {  //selector is select tag
  const option = new Option(attractions.name, attractions.id); //name(display), value(for db use)
  const select = document.getElementById(selector); //selector tag
  select.add(option); //just "add"
};

// what to do when the `+` button next to a `select` is clicked
["hotels", "restaurants" , "activities"].forEach(attractionType => {
  document.getElementById(`${attractionType}-add`).addEventListener("click", () => handleAddAttraction(attractionType));
})

// Create attraction assets (itinerary item, delete button & marker)
const handleAddAttraction = attractionType => {
  const select = document.getElementById(`${attractionType}-choices`);  //select tag
  const selectedId = select.value;  //value = id at this point, grab id from selected
  const selectedAttraction = state.attractions[attractionType][selectedId]; //grab data from state

    // If this attraction is already on state, return
  if (state.selectedAttractions.find(attraction => attraction.id === +selectedId && attraction.category === attractionType)) return;  //if already selected, return immediately
  //Build and add attraction
  buildAttractionAssets(attractionType, selectedAttraction)
}

const buildAttractionAssets = (category, attraction) => {
  // Create the Elements that will be inserted in the dom
  const removeButton = document.createElement("button");
  removeButton.className = "remove-btn";
  removeButton.append("x");

  const itineraryItem = document.createElement("li");
  itineraryItem.className = "itinerary-item";
  itineraryItem.append(attraction.name, removeButton);

  // Create the marker
  const marker = buildMarker(category, attraction.place.location);

  // Adds the attraction to the application state
  state.selectedAttractions.push({ id: attraction.id, category });

  //ADD TO DOM
  document.getElementById(`${category}-list`).append(itineraryItem);
  marker.addTo(map);

  // Animate the map
  map.flyTo({ center: attraction.place.location, zoom: 15 });

  removeButton.addEventListener("click", function remove() {
    // Stop listening for the event
    removeButton.removeEventListener("click", remove);  //remove refer to func name

    // Remove the current attrction from the application state
    state.selectedAttractions = state.selectedAttractions.filter(
      selected => selected.id !== attraction.id || selected.category !== category
    );

    // Remove attraction's elements from the dom & Map
    itineraryItem.remove();
    marker.remove();

    console.log(state);

    // Animate map to default position & zoom.
    map.flyTo({ center: fullstackCoords, zoom: 12.3 });
  });
};

function fetchAttraction (){
  //ajax fetch express get method data
  fetch("/api/attractions")
    .then(result => result.json())
    .then(data => {
      state.attractions = {hotels: {}, restaurants: {}, activities: {}};  //pre set state first
      const { hotels, restaurant , activity } = data; //destrut from object

      hotels.forEach((hotel) => {
        state.attractions.hotels[hotel.id] = hotel; //set id for each id of object
        makeOption(hotel, "hotels-choices");
      })

      restaurant.forEach(restaurant => {
        state.attractions.restaurants[restaurant.id] = restaurant;
        makeOption(restaurant, "restaurants-choices");
      })

      activity.forEach(activity => {
        state.attractions.activities[activity.id] = activity;
        makeOption(activity, "activities-choices");
      })

    })
    .catch(console.error);
}

// const fetchAttraction = async() => {
//   try {
//     const res = await fetch("/api/attractions");
//     const parsedContent = await res.json();
//   } catch (err) {
//     console.error(error);
//   }
// }

fetchAttraction();
