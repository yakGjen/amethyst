export default class SliderServices {
  constructor() {
    this.sliderWindow = document.querySelector('.services-content__window');
    this.frames = Array.from(document.querySelectorAll('.services-content__frame'));
    this.points = Array.from(document.querySelectorAll('.services-content__point'));
    this.servicesContainer = document.querySelector('.services-content__services');
    this.services = Array.from(document.querySelectorAll('.services-content__service'));
  }

  init() {
    this.servicesContainer.addEventListener('click', (event) => {
      let elem = event.target;
      if (elem.classList.contains('services-content__service')) {
        this.changeService(elem);
      } else {
        this.changeService(elem.parentNode);
      }
    });
  }

  changeService(elem) {
    this.services.forEach((item) => {
      item.classList.remove('services-content__service_checked');
    });
    elem.classList.add('services-content__service_checked');

    this.changeSlide(elem.id);
  }

  changeSlide(id) {
    const searchigId = 'services-' + id;
    const frameIdx = this.frames.findIndex((item) => {
      if (item.id === searchigId) return true;
    });

    const shift = this.frames[frameIdx].offsetLeft;

    this.frames.forEach((item) => {
      item.classList.remove('services-content__frame_show');
      item.style.transform = `translate(-${shift}px)`;
    });

    this.frames[frameIdx].classList.add('services-content__frame_show');

    this.points.forEach((item) => item.classList.remove('services-content__point_checked'));
    this.points[frameIdx].classList.add('services-content__point_checked');
  }
}