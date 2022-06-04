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

getRandomNumber(2, 10);
getCoordinates(1.5, 15.7, 2);

