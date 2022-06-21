import { createAd } from './data.js';
import { getSimilarCards } from './card.js';

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(getSimilarCards(createAd()));
