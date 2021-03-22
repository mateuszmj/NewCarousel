"use strict"

import MobileMenuToggle from './mobileMenuToggle.js';
import Carousel from './carousel.js';

new MobileMenuToggle();
new Carousel(document.querySelector('[data-carousel="0"]'));
new Carousel(document.querySelector('[data-carousel="1"]'));