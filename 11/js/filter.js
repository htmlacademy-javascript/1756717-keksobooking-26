import { mapFiltersFormElement, mapFilterElements } from './form.js';

const defaultValue = 'any';

const housingTypeElement = mapFiltersFormElement.querySelector('#housing-type');
const housingPriceElement = mapFiltersFormElement.querySelector('#housing-price');
const housingRoomsElement = mapFiltersFormElement.querySelector('#housing-rooms');
const housingGuestsElement = mapFiltersFormElement.querySelector('#housing-guests');
const housingFeaturesElement = mapFiltersFormElement.querySelector('#housing-features');


const makeFilterActive = () => {
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled');
  });
  mapFiltersFormElement.querySelector('.map__features').removeAttribute('disabled');
};

const filterHousingType = (ad) => {
  if (housingTypeElement.value === defaultValue) {
    return true;
  }
  return ad.offer.type === housingTypeElement.value;
};

const filterHousingPrice = (ad) => {
  const priceFilterOptions = {
    'any': ad.offer.price,
    'middle': ad.offer.price > 10000 && ad.offer.price < 50000,
    'low': ad.offer.price < 10000,
    'high': ad.offer.price > 50000,
  };
  return priceFilterOptions[housingPriceElement.value];
};

const filterHousingRooms = (ad) => {
  if (housingRoomsElement.value === defaultValue) {
    return true;
  }
  return String(ad.offer.rooms) === housingRoomsElement.value;
};

const filterHousingGuests = (ad) => {
  if (housingGuestsElement.value === defaultValue) {
    return true;
  }
  return String(ad.offer.guests) === housingGuestsElement.value;
};

const filterHousingFeatures = (ad) => {
  const checkedFeatures = housingFeaturesElement.querySelectorAll('input:checked');
  const checkedList = [];
  checkedFeatures.forEach((input) => checkedList.push(input.value));
  if (checkedList.length === 0) {
    return true;
  }
  const filterFeatures = ad.offer.features.filter((feature) => checkedList.includes(feature));
  return filterFeatures.length >= checkedList.length;
};

const showFilteredAds = (ads, amount, render) => {
  ads
    .slice()
    .filter(filterHousingType)
    .filter(filterHousingPrice)
    .filter(filterHousingRooms)
    .filter(filterHousingGuests)
    .filter(filterHousingFeatures)
    .slice(0, amount)
    .forEach((ad) => {
      render(ad);
    });
};

const onFilterChange = (cb) => {
  mapFiltersFormElement.addEventListener('change', () => {
    cb();
  });
};

export { makeFilterActive, filterHousingType, onFilterChange, showFilteredAds };
