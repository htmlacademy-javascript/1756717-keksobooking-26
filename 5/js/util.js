const checkNumberOnNegative = (number) => number < 0;

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

export { getRandomAvatarAddress, getRandomArrayElement, getRandomNumber, getArrayRandomLength, getCoordinates };

