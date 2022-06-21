import { createAd } from './data.js';
import { getCard } from './card.js';

const mapCanvas = document.querySelector('#map-canvas');

mapCanvas.append(getCard(createAd()));
