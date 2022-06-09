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
  max: 100,
};

const GUESTS = {
  min: 1,
  max: 3,
};

const ADS_AMOUNT = 10;

const checkNumberOnNegative = (number) =>  number < 0;

const checkRange = (min, max) => min >= max;

const isDecInt = (dec) => Number.isInteger(dec);

const getRandomNumber = (min, max) => {
  if (checkNumberOnNegative(min) || checkNumberOnNegative(max)) {
    throw 'Неверный диапазон: \nЧисла диапазона не могут быть отрицательными.';
  }
  if (checkRange(min, max)) {
    throw 'Неверный диапазон: \nКонечное число диапазона не может быть меньше или равно начальному значению диапазона';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getCoordinates = (min, max, dec) => {
  if (checkNumberOnNegative(min) || checkNumberOnNegative(max)) {
    throw 'Неверный диапазон: \nЧисла диапазона не могут быть отрицательными.';
  }
  if (checkRange(min, max)) {
    throw 'Неверный диапазон: \nКонечное число диапазона не может быть меньше или равно начальному значению диапазона';
  }
  if (!isDecInt(dec) || checkNumberOnNegative(dec)) {
    throw 'Число знаков после запятой должно быть целым неотрицательным числом';
  }
  const randomNumber = Math.random() * (max - min) + min;
  return parseFloat(randomNumber.toFixed(dec));
};

const getRandomAvatarAddress = (i) => (i < 10) ? `img/avatars/user0${i}.png` : `img/avatars/user${i}.png`;

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const shuffle = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getArrayRandomLength = (arr) => shuffle(arr).slice(getRandomNumber(0, arr.length - 1));

const createAd = (i) => {
  const ad = {
    author: {
      avatar: getRandomAvatarAddress(i+1),
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

const allAds = [];
for (let i = 0; i < ADS_AMOUNT; i++) {
  allAds[i] = createAd(i);
}

