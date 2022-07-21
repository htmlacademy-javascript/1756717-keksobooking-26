import { makeFormInactive, onFormSubmit, onFormReset } from './form.js';
import { activateMap, clearMapOnFilter } from './map.js';
import { getData } from './load.js';
import { showErrorLoadMessage, debounce } from './util.js';
import { makeFilterActive, onFilterChange, showFilteredAds} from './filter.js';
import './file.js';

const RERENDER_DELAY = 500;

makeFormInactive();

activateMap();

getData(
  (data) => {
    const ads = data;
    makeFilterActive();
    showFilteredAds(ads);
    onFilterChange(debounce(() => {
      clearMapOnFilter();
      showFilteredAds(ads);
    }, RERENDER_DELAY));
    onFormSubmit(ads);
    onFormReset(ads);
  },
  () => showErrorLoadMessage('Не удалось получить данные объявлений')
);
