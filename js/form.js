import { clearMap } from './map.js';
import { isEscapeKey } from './util.js';
import { sendData } from './load.js';

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
const resetButtonElement = formElement.querySelector('.ad-form__reset');

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
  sliderElement.noUiSlider.set(priceFieldElement.min);
});
priceFieldElement.addEventListener('change', validatePriceField);
timeInFieldElement.addEventListener('change', validateTimeIn);
timeOutFieldElement.addEventListener('change', validateTimeOut);

const clearForm = () => {
  formElement.reset();
  clearMap();
};

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearForm();
});


const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(document.body.lastChild);
  }
};

const onMessageClickToClose = (evt) => {
  if (!(evt.target.style.display === 'none')) {
    evt.preventDefault();
    closeMessage(document.body.lastChild);
  }
};

const onErrorButtonClick = (evt) => {
  evt.preventDefault();
  closeMessage(document.body.lastChild);
};

function closeMessage (message) {
  message.remove();
  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageClickToClose);
}

const successSubmitMessageTemplate = document.querySelector('#success').content.querySelector('.success');

const showSuccessSubmitMessage = () => {
  const successSubmitMessage = successSubmitMessageTemplate.cloneNode(true);
  successSubmitMessage.classList.add('success');
  document.body.append(successSubmitMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClickToClose);
};

const errorSubmitMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const showErrorSubmitMessage = () => {
  const errorSubmitMessage = errorSubmitMessageTemplate.cloneNode(true);
  errorSubmitMessage.classList.add('error');
  document.body.append(errorSubmitMessage);
  const errorButtonElement = document.querySelector('.error__button');
  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClickToClose);
  errorButtonElement.addEventListener('click', onErrorButtonClick);
};

const submitButtonElement = document.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const setFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showSuccessSubmitMessage();
        },
        () => {
          showErrorSubmitMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

sliderElement.noUiSlider.on('update', () => {
  priceFieldElement.value = sliderElement.noUiSlider.get();
  validatePriceField();
});

export { makeFormInactive, makeFormActive, setFormSubmit, clearForm, showErrorSubmitMessage, showSuccessSubmitMessage };
