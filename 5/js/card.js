import { createAds } from './data.js';

const mapCanvas = document.querySelector('#map-canvas');

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

const similarCards = createAds();
const similarCardFragment = document.createDocumentFragment();
similarCards.forEach((ad) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${ad.offer.price} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = getType(ad.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  const offerFeatures = ad.offer.features;
  const featuresContainer = cardElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary = offerFeatures.some(
      (offerFeature) => featuresListItem.classList.contains(`popup__feature--${offerFeature}`),
    );
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  const offerPhotos = ad.offer.photos;
  const photosContainer = cardElement.querySelector('.popup__photos');
  const photosItem = photosContainer.querySelector('.popup__photo');
  photosItem.src = offerPhotos[0];
  for (let i = 1; i < offerPhotos.length; i++) {
    const newPhoto = photosItem.cloneNode(true);
    newPhoto.src = offerPhotos[i];
    photosContainer.append(newPhoto);
  }
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  similarCardFragment.appendChild(cardElement);
  if (!cardElement.children) {
    cardElement.children.classList.add('visually-hidden');
  }
});

mapCanvas.append(similarCardFragment);

