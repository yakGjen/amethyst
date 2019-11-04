export default class SliderProducts {
  constructor() {
    this.container = document.querySelector('.testimonials-prod-slider__container');
    this.collectImgs = Array.from(this.container.children);

    this.anim = getComputedStyle(this.collectImgs[0]).transition;

    window.addEventListener('resize', this.update.bind(this));

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('slider-left')) this.moveLeft();
      if (event.target.classList.contains('slider-right')) this.moveRight();
    });

    let start = null;
    this.container.addEventListener('touchstart', (event) => {
      start = event.touches[0].clientX;
    });
    this.container.addEventListener('touchend', (event) => {
      const end = event.changedTouches[0].clientX;
      if (start > end) this.moveLeft();
      if (start < end) this.moveRight();
      start = null;
    });
  }

  init() {
    const margins = [];

    this.collectImgs.forEach((item) => {
      margins.push(item.offsetLeft);
    });

    this.collectImgs.forEach((item, idx) => {
      item.style.position = 'absolute';
      item.style.left = margins[idx] + 'px';
    });
  }

  moveLeft() {
    const margins = [];
    const img = this.collectImgs[0].cloneNode();

    this.collectImgs.forEach((item) => {
      margins.push(item.offsetLeft);
    });

    const left = margins[1];

    img.style.left = margins[margins.length - 1] + left + 'px';
    this.collectImgs.push(img);
    this.container.append(img);

    setTimeout(() => {
      this.collectImgs.forEach((item, idx) => {
        const currLeft = parseFloat(item.style.left);
        item.style.left = `${currLeft - left}px`;
      });

      this.collectImgs[0].remove();
      this.collectImgs.splice(0, 1);
    }, 0);
  }

  moveRight () {
    const margins = [];
    const img = this.collectImgs[this.collectImgs.length - 1].cloneNode();

    this.collectImgs.forEach((item) => {
      margins.push(item.offsetLeft);
    });

    const left = margins[1];

    img.style.left = `-${left}px`;
    this.collectImgs.unshift(img);
    this.container.prepend(img);

    setTimeout(() => {
      this.collectImgs.forEach((item, idx) => {
        const currLeft = parseFloat(item.style.left);
        item.style.left = `${currLeft + left}px`;
      });

      this.collectImgs[this.collectImgs.length - 1].remove();
      this.collectImgs.splice(this.collectImgs.length - 1, 1);
    }, 0);
  }

  update() {
    this.collectImgs.forEach((item) => {
      item.style.transition = 'none';
      setTimeout(() => {
        item.style.position = 'relative';
        item.style.left = 0;
      }, 0);
    });

    setTimeout(() => {
      this.init();

      this.collectImgs.forEach((item) => {
        item.style.transition = this.anim;
      });
    }, 0);
  }
}