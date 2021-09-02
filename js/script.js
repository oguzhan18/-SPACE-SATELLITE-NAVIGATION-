const mymap = L.map("mapId").setView([0, 0], 1);
var myIcon = L.icon({
  iconUrl:
    "https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: myIcon }).addTo(mymap);
const attribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

let setMap = true;

async function getData() {
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;
    marker.setLatLng([latitude, longitude]);
    if (setMap) {
      mymap.setView([latitude, longitude], 3);
      setMap = false;
    }
    document.getElementById("lat").textContent = latitude.toFixed(3);
    document.getElementById("lon").textContent = longitude.toFixed(3);
  } catch (err) {
    console.log(err);
  }
}

getData();
setInterval(getData, 1000);
