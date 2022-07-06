const MIN_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const CAPACITY_OPTIONS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const formElement = document.querySelector('.ad-form');
const formElements = formElement.querySelectorAll('.ad-form__element');
const mapFiltersFormElement = document.querySelector('.map__filters');
const mapFilterElements = mapFiltersFormElement.querySelectorAll('.map__filter');

const makeFormInactive = () => {
  formElement.classList.add('ad-form--disabled');
  formElement.querySelector('.ad-form-header').setAttribute('disabled', '');
  formElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
  mapFiltersFormElement.classList.add('map__filters--disabled');
  mapFilterElements.forEach((mapFilter) => {
    mapFilter.setAttribute('disabled', '');
  });
  mapFiltersFormElement.querySelector('.map__features').setAttribute('disabled', '');
};

const makeFormActive = () => {
  formElement.classList.remove('ad-form--disabled');
  formElement.querySelector('.ad-form-header').removeAttribute('disabled');
  formElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFiltersFormElement.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled');
  });
  mapFiltersFormElement.querySelector('.map__features').removeAttribute('disabled');
};

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

const capacityFieldElement = formElement.querySelector('#capacity');
const roomFieldElement = formElement.querySelector('#room_number');
const typeFieldElement = formElement.querySelector('#type');
const priceFieldElement = formElement.querySelector('#price');
const timeInFieldElement = formElement.querySelector('#timein');
const timeOutFieldElement = formElement.querySelector('#timeout');

const makeTypeMinPrice = () => {
  priceFieldElement.placeholder = MIN_PRICE[typeFieldElement.value];
  priceFieldElement.min = MIN_PRICE[typeFieldElement.value];
};

makeTypeMinPrice();

const validateCapacity = () => CAPACITY_OPTIONS[roomFieldElement.value].includes(capacityFieldElement.value);

const validatePrice = () => +priceFieldElement.min <= +priceFieldElement.value;

const validateTimeOut = () => {
  if (!(timeInFieldElement.value === timeOutFieldElement.value)) {
    timeInFieldElement.value = timeOutFieldElement.value;
  }
};

const validateTimeIn = () => {
  if (!(timeInFieldElement.value === timeOutFieldElement.value)) {
    timeOutFieldElement.value = timeInFieldElement.value;
  }
};

const createRoomCapacityMessage = (roomAmount) => {
  switch (roomAmount) {
    case '1':
      return ' комната подходит для 1 гостя';
    case '2':
      return ' комнаты подходят для 1-2 гостей';
    case '3':
      return ' комнаты подходят для 1-3 гостей';
    case '100':
      return ' комнат предназначены не для гостей';
  }
};

const getCapacityErrorMessage = () => `${roomFieldElement.value}${createRoomCapacityMessage(roomFieldElement.value)}`;
const getPriceErrorMessage = () => `Минимальная цена ${MIN_PRICE[typeFieldElement.value]}`;

pristine.addValidator(capacityFieldElement, validateCapacity, getCapacityErrorMessage);
pristine.addValidator(priceFieldElement, validatePrice, getPriceErrorMessage);

const validateCapacityField = () => pristine.validate(capacityFieldElement);
const validateRoomField = () => pristine.validate(capacityFieldElement);
const validatePriceField = () => pristine.validate(priceFieldElement);

capacityFieldElement.addEventListener('change', validateCapacityField);
roomFieldElement.addEventListener('change', validateRoomField);
typeFieldElement.addEventListener('change', () => {
  makeTypeMinPrice();
  validatePriceField();
});
priceFieldElement.addEventListener('change', validatePriceField);
timeInFieldElement.addEventListener('change', validateTimeIn);
timeOutFieldElement.addEventListener('change', validateTimeOut);

formElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceFieldElement.value = sliderElement.noUiSlider.get();
  validatePriceField();
});

export { makeFormInactive, makeFormActive };
