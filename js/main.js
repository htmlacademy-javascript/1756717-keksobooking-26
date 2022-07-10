import { makeFormInactive } from './form.js';
import { createMap, createMainPinMarker, createMapMarkers } from './map.js';
import { similarAds } from './data.js';

makeFormInactive();

const map = createMap();

createMainPinMarker(map);

createMapMarkers(similarAds, map);
