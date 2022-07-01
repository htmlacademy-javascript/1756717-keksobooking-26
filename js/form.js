const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = mapFiltersForm.querySelectorAll('.map__filter');

const makeFormInactive = () => {
  form.classList.add('ad-form--disabled');
  form.querySelector('.ad-form-header').setAttribute('disabled', '');
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', '');
  });
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFilters.forEach((mapFilter) => {
    mapFilter.setAttribute('disabled', '');
  });
  mapFiltersForm.querySelector('.map__features').setAttribute('disabled', '');
};

const makeFormActive = () => {
  form.classList.remove('ad-form--disabled');
  form.querySelector('.ad-form-header').removeAttribute('disabled');
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFilters.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled');
  });
  mapFiltersForm.querySelector('.map__features').removeAttribute('disabled');
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element'
});

const capacityField = form.querySelector('#capacity');
const roomField = form.querySelector('#room_number');
const capacityOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validateCapacity = () => capacityOptions[roomField.value].includes(capacityField.value);

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

const getCapacityErrorMessage = () => `${roomField.value}${createRoomCapacityMessage(roomField.value)}`;

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

const validateCapacityField = () => pristine.validate(capacityField);

capacityField.addEventListener('change', validateCapacityField);
roomField.addEventListener('change', validateCapacityField);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export { makeFormInactive, makeFormActive };
