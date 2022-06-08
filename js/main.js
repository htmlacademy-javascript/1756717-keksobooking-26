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

const getRandomAvatarAddress = (min, max) => {
  const avatarAddressIndex = getRandomNumber(min, max);
  return (avatarAddressIndex >= 1 && avatarAddressIndex <= 9) ? `0${avatarAddressIndex}` : avatarAddressIndex;
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const getArrayLength = (elements) => getRandomNumber(1, elements.length);

const createAd = () => {
  return {
    author: {
      avatar: `img/avatars/user${getRandomAvatarAddress(1, 10)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(0, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 100),
      guests: getRandomNumber(1, 3),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: FEATURES.slice(1, getArrayLength(FEATURES)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: PHOTOS.slice(1, getArrayLength(PHOTOS)),
    },
    location: {
      lat: getCoordinates(35.65000, 35.70000, 5),
      lng: getCoordinates(139.70000, 139.80000, 5),
    },
  };
};

console.log(createAd());
