const makeFormInactive = () => {
  const form = document.querySelector('.ad-form');
  form.classList.add('ad-form--disabled');
  form.querySelector('.ad-form-header').setAttribute('disabled', '');
  const formElements = form.querySelectorAll('.ad-form__element');
  formElements.forEach((formElement) => {
    formElement.setAttribute('disabled', '');
  });
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.add('map__filters--disabled');
  const mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
  mapFilters.forEach((mapFilter) => {
    mapFilter.setAttribute('disabled', '');
  });
  mapFiltersForm.querySelector('.map__features').setAttribute('disabled', '');
};

const makeFormActive = () => {
  const form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
  form.querySelector('.ad-form-header').removeAttribute('disabled');
  const formElements = form.querySelectorAll('.ad-form__element');
  formElements.forEach((formElement) => {
    formElement.removeAttribute('disabled');
  });
  const mapFiltersForm = document.querySelector('.map__filters');
  mapFiltersForm.classList.remove('map__filters--disabled');
  const mapFilters = mapFiltersForm.querySelectorAll('.map__filter');
  mapFilters.forEach((mapFilter) => {
    mapFilter.removeAttribute('disabled');
  });
  mapFiltersForm.querySelector('.map__features').removeAttribute('disabled');
};

export { makeFormInactive, makeFormActive };


