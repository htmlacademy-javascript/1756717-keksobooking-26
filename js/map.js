import { makeFormActive } from './form.js';
import { renderSimilarCard } from './card.js';

const STATIC_MAIN_LAT = 35.6895;
const STATIC_MAIN_LNG = 139.692;

const addressElement = document.querySelector('#address');

const addressValueOnDefault = {
  lat: STATIC_MAIN_LAT,
  lng: STATIC_MAIN_LNG,
};

const mapCanvas = L.map('map-canvas');

const activateMap = () => {
  mapCanvas.whenReady(makeFormActive);
};

const mapMain = mapCanvas
  .setView({
    lat: STATIC_MAIN_LAT,
    lng: STATIC_MAIN_LNG,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapMain);

const createMainPinMarker = (map) => {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: STATIC_MAIN_LAT,
      lng: STATIC_MAIN_LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  addressElement.value = `${addressValueOnDefault.lat}, ${addressValueOnDefault.lng}`;
  mainPinMarker.on('move', (evt) => {
    const { lat, lng } = evt.target.getLatLng();
    const addressValue = {
      lat: lat.toFixed(5),
      lng: lng.toFixed(5),
    };
    addressElement.value = `${addressValue.lat}, ${addressValue.lng}`;
  });
  return mainPinMarker;
};

const mainMarker = createMainPinMarker(mapMain);

const similarIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(mapMain);

const createMapMarker = (similarAd) => {
  const similarAdLat = similarAd.location.lat;
  const similarAdLng = similarAd.location.lng;
  const similarAdPopup = renderSimilarCard(similarAd);
  const marker = L.marker(
    {
      lat: similarAdLat,
      lng: similarAdLng,
    },
    {
      draggable: true,
      icon: similarIcon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(similarAdPopup);
};

const clearMap = () => {
  mainMarker.setLatLng({
    lat: STATIC_MAIN_LAT,
    lng: STATIC_MAIN_LNG,
  });
  addressElement.value = `${addressValueOnDefault.lat}, ${addressValueOnDefault.lng}`;
  markerGroup.clearLayers();
};

export { activateMap, createMapMarker, clearMap };
