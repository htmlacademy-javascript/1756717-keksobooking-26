import { makeFormInactive } from './form.js';
import { createMap, createMainPinMarker, createMapMarkers } from './map.js';
import { getData } from './load.js';
import { showErrorLoadMessage } from './util.js';

const MAX_SIMILAR_ADS_AMOUNT = 10;

makeFormInactive();

const map = createMap();

createMainPinMarker(map);

getData(
  (data) => {
    const maxData = data.slice(0, MAX_SIMILAR_ADS_AMOUNT);
    createMapMarkers(maxData, map);
  },
  () => showErrorLoadMessage('Не удалось получить данные объявлений')
);
