import SliderHeader from './slider-header';
import SliderProducts from './slider-products';

const sliderHeader = new SliderHeader(
  document.querySelectorAll('.frame'),
  document.querySelectorAll('.frame-point')
);

sliderHeader.init();
sliderHeader.start();

const sliderProducts = new SliderProducts();

sliderProducts.init();

const menuItems = {
  about: document.querySelector('#nav-about'),
  works: document.querySelector('#nav-works'),
  team: document.querySelector('#nav-team'),
  prices: document.querySelector('#nav-prices'),
  blog: document.querySelector('#nav-blog'),
  contact: document.querySelector('#nav-contact')
};

const sectionItems = {
  about: document.querySelector('.about'),
  works: document.querySelector('.works'),
  team: document.querySelector('.team'),
  prices: document.querySelector('.pricing'),
  blog: document.querySelector('.blog'),
  contact: document.querySelector('.subscribe')
};

document.addEventListener('click', (event) => {
  if (event.target === menuItems.about) scrollToElem(sectionItems.about);
  if (event.target === menuItems.works) scrollToElem(sectionItems.works);
  if (event.target === menuItems.team) scrollToElem(sectionItems.team);
  if (event.target === menuItems.prices) scrollToElem(sectionItems.prices);
  if (event.target === menuItems.blog) scrollToElem(sectionItems.blog);
  if (event.target === menuItems.contact) scrollToElem(sectionItems.contact);
});

const scrollToElem = (elem) => {
  window.scrollTo({
    top: elem.getBoundingClientRect().top + pageYOffset,
    behavior: "smooth",
  });
};