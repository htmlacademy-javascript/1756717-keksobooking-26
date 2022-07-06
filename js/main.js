import { makeFormInactive } from './form.js';
import { createMap, createMainPinMarker, createSimilarPopups } from './map.js';
import { similarAds } from './data.js';

makeFormInactive();

const map = createMap();

createMainPinMarker(map);

createSimilarPopups(similarAds, map);
