import { makeFormInactive, setFormSubmit, clearForm } from './form.js';
import { activateMap, clearMap, createMapMarker } from './map.js';
import { getData } from './load.js';
import { showErrorLoadMessage, debounce } from './util.js';
import { makeFilterActive, onFilterChange, showFilteredAds} from './filter.js';
import './file.js';

const RERENDER_DELAY = 200;

makeFormInactive();

activateMap();

getData(
  (data) => {
    const ads = data;
    makeFilterActive();
    showFilteredAds(ads, createMapMarker);
    onFilterChange(debounce(() => {
      clearMap();
      showFilteredAds(ads, createMapMarker);
    }, RERENDER_DELAY));
  },
  () => showErrorLoadMessage('Не удалось получить данные объявлений')
);

setFormSubmit(clearForm);
