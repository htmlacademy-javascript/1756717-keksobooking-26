import { makeFormActive } from './form.js';
import { getCard } from './card.js';

const addressElement = document.querySelector('#address');

const addressValueOnDefault = {
  lat: 35.6895,
  lng: 139.692,
};

const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      makeFormActive();
    })
    .setView({
      lat: 35.6895,
      lng: 139.692,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
};

const createMainPinMarker = (map) => {
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.6895,
      lng: 139.692,
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
};

const createSimilarPopups = (similarAds, map) => {

  const similarIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  similarAds.forEach((similarAd) => {
    const similarAdLat = similarAd.location.lat;
    const similarAdLng = similarAd.location.lng;
    const similarAdPopup = getCard(similarAd);
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
      .addTo(map)
      .bindPopup(similarAdPopup);
  });
};

export { createMap, createMainPinMarker, createSimilarPopups };
