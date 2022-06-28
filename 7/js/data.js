import { getAvatarAddress, getRandomArrayElement, getRandomNumber, getArrayRandomLength, getCoordinates, createRandomIdFromRangeGenerator } from './util.js';

const TITLES = [
  'Великолепный вид на город',
  'Комфорт прежде всего',
  'Цена заставит вас приятно удивиться',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Современный ремонт и новая техника сделают пребывание здесь максимально комфортным',
  'Что может быть прекраснее, чем насладиться утренней чашечкой кофе у открытого окна',
  'Удобная парковка, лифт, сама квартира позволит с комфортом разместиться как минимум 3 постояльцам',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const PRICE = {
  min: 0,
  max: 100000,
};

const ROOMS = {
  min: 1,
  max: 3,
};

const GUESTS = {
  min: 1,
  max: 3,
};

const IDS = {
  min: 1,
  max: 10,
};

const ADS_AMOUNT = 10;

const createAd = () => {
  const ad = {
    author: {
      avatar: getAvatarAddress(createRandomIdFromRangeGenerator(IDS.min, IDS.max)()),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      price: getRandomNumber(PRICE.min, PRICE.max),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(ROOMS.min, ROOMS.max),
      guests: getRandomNumber(GUESTS.min, GUESTS.max),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getArrayRandomLength(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getArrayRandomLength(PHOTOS),
    },
    location: {
      lat: getCoordinates(35.65000, 35.70000, 5),
      lng: getCoordinates(139.70000, 139.80000, 5),
    },
  };
  ad.offer.address = `${ad.location.lat}, ${ad.location.lng}`;
  return ad;
};

const similarAds = Array.from({ length: ADS_AMOUNT }, createAd);

export { createAd, similarAds };

