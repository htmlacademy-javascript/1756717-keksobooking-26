const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getType = (type) => {
  switch (type) {
    case ('palace'):
      return 'Дворец';
    case ('flat'):
      return 'Квартира';
    case ('house'):
      return 'Дом';
    case ('bungalow'):
      return 'Бунгало';
    case ('hotel'):
      return 'Отель';
  }
};

const renderSimilarCard = (ad) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.classList.add('popup');
  if (!cardElement.children) {
    cardElement.children.classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.js-price').textContent = ad.offer.price;
  cardElement.querySelector('.popup__type').textContent = getType(ad.offer.type);
  if (!ad.offer.rooms || !ad.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  if (!ad.offer.checkin || !ad.offer.checkout) {
    cardElement.querySelector('.popup__text--time').classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  const offerFeatures = ad.offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  if (ad.offer.features) {
    featuresList.forEach((featuresListItem) => {
      const isNecessary = offerFeatures.some(
        (offerFeature) => featuresListItem.classList.contains(`popup__feature--${offerFeature}`),
      );
      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  } else {
    cardElement.querySelector('.popup__features').classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  const offerPhotos = ad.offer.photos;
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photosItem = photosContainer.querySelector('.popup__photo');
  if (ad.offer.photos) {
    photosItem.src = offerPhotos[0];
    for (let i = 1; i < offerPhotos.length; i++) {
      const newPhoto = photosItem.cloneNode(true);
      newPhoto.src = offerPhotos[i];
      photosContainer.append(newPhoto);
    }
  } else {
    cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
  }
  if (!ad.author.avatar) {
    cardElement.querySelector('.popup__avatar').classList.add('visually-hidden');
  }
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  return cardElement;
};

export { renderSimilarCard };


