import { makeFormInactive, setFormSubmit, clearForm } from './form.js';
import { mapMain, activateMap, createMainPinMarker, createMapMarker} from './map.js';
import { getData } from './load.js';
import { showErrorLoadMessage } from './util.js';

const MAX_SIMILAR_ADS_AMOUNT = 10;

makeFormInactive();

activateMap();

createMainPinMarker(mapMain);

getData(
  (data) => {
    const ads = data.slice(0, MAX_SIMILAR_ADS_AMOUNT);
    ads.forEach((ad) => {
      createMapMarker(ad);
    });
  },
  () => showErrorLoadMessage('Не удалось получить данные объявлений')
);

setFormSubmit(clearForm);
