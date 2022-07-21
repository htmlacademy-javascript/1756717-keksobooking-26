import { mapFiltersFormElement, mapFilterElements } from './form.js';
import { createMapMarker } from './map.js';

const MAX_SIMILAR_ADS_AMOUNT = 10;

const defaultValue = 'any';

const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelector('#housing-features');


const makeFilterActive = () => {
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled');
  });
  mapFiltersFormElement.querySelector('.map__features').removeAttribute('disabled');
};

const checkHousingType = (ad) => {
  if (housingTypeElement.value === defaultValue) {
    return true;
  }
  return ad.offer.type === housingTypeElement.value;
};

const checkHousingPrice = (ad) => {
  const priceFilterOptions = {
    'any': ad.offer.price,
    'middle': ad.offer.price > 10000 && ad.offer.price < 50000,
    'low': ad.offer.price < 10000,
    'high': ad.offer.price > 50000,
  };
  return priceFilterOptions[housingPriceElement.value];
};

const checkHousingRooms = (ad) => {
  if (housingRoomsElement.value === defaultValue) {
    return true;
  }
  return String(ad.offer.rooms) === housingRoomsElement.value;
};

const checkHousingGuests = (ad) => {
  if (housingGuestsElement.value === defaultValue) {
    return true;
  }
  return String(ad.offer.guests) === housingGuestsElement.value;
};


const checkHousingFeatures = (ad) => {
  const checkedFeatures = housingFeaturesElement.querySelectorAll('input:checked');
  const checkedList = [];
  checkedFeatures.forEach((input) => checkedList.push(input.value));
  if (checkedList.length === 0) {
    return true;
  }
  const offer = ad.offer;
  if (Object.keys(offer).includes('features')) {
    const offerFeatures = offer.features;
    return checkedList.every((feature) => offerFeatures.includes(feature));
  }
};

const filterAds = (ads) => {
  const filteredAds = [];
  for (const ad of ads) {
    if (filteredAds.length >= MAX_SIMILAR_ADS_AMOUNT) {
      break;
    }
    if (
      checkHousingType(ad)
      && checkHousingPrice(ad)
      && checkHousingRooms(ad)
      && checkHousingGuests(ad)
      && checkHousingFeatures(ad)
    ) {
      filteredAds.push(ad);
    }
  }
  return filteredAds;
};

const showFilteredAds = (ads) => {
  filterAds(ads)
    .forEach((ad) => {
      createMapMarker(ad);
    });
};

const onFilterChange = (cb) => {
  mapFiltersFormElement.addEventListener('change', () => {
    cb();
  });
};

export { makeFilterActive, onFilterChange, showFilteredAds, MAX_SIMILAR_ADS_AMOUNT };
