import { createAd } from './data.js';
import { getCard } from './card.js';
import { makeFormInactive, makeFormActive, onFormClick } from './form.js';

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(getCard(createAd()));

makeFormInactive();
makeFormActive();
onFormClick();


