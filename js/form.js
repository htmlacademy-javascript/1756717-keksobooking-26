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

export { makeFormInactive, makeFormActive };


