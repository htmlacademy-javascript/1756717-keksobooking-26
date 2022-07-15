import { makeFormInactive, setFormSubmit, clearForm } from './form.js';
import { activateMap, clearMap, createMapMarker } from './map.js';
import { getData } from './load.js';
import { showErrorLoadMessage, debounce } from './util.js';
import { makeFilterActive, onFilterChange, showFilteredAds } from './filter.js';

const MAX_SIMILAR_ADS_AMOUNT = 10;
const RERENDER_DELAY = 200;

makeFormInactive();

activateMap();

getData(
  (data) => {
    const ads = data;
    makeFilterActive();
    showFilteredAds(ads, MAX_SIMILAR_ADS_AMOUNT, createMapMarker);
    onFilterChange(debounce(() => {
      clearMap();
      showFilteredAds(ads, MAX_SIMILAR_ADS_AMOUNT, createMapMarker);
    }, RERENDER_DELAY));
  },
  () => showErrorLoadMessage('Не удалось получить данные объявлений')
);

setFormSubmit(clearForm);
