import { mapFiltersFormElement, mapFilterElements } from './form.js';

const MAX_SIMILAR_ADS_AMOUNT = 10;

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
  const offer = ad.offer;
  if (Object.keys(offer).includes('features')) {
    const offerFeatures = offer.features;
    const filterFeatures = [];
    const isFeature = checkedList.every((feature) => offerFeatures.includes(feature));
    if (isFeature) {
      offerFeatures.forEach((feature) => filterFeatures.push(feature));
    }
    return filterFeatures.length >= checkedList.length;
  } else {
    return false;
  }
};

const filterAds = (ads) => {
  const filteredAds = [];
  ads.some((ad) => {
    if (
      filterHousingType(ad)
      && filterHousingPrice(ad)
      && filterHousingRooms(ad)
      && filterHousingGuests(ad)
      && filterHousingFeatures(ad)
    ) {
      filteredAds.push(ad);
    }
    return filteredAds.length === MAX_SIMILAR_ADS_AMOUNT;
  });
  return filteredAds;
};

const showFilteredAds = (ads, render) => {
  const adsToShow = ads.slice();
  filterAds(adsToShow)
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
