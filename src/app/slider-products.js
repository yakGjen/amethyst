export default class SliderProducts {
  constructor() {
    this.container = document.querySelector('.testimonials-prod-slider__container');
    this.imgNodes = this.container.children;
    this.collectImgs = Array.from(this.imgNodes);

    this.img = {
      widthImg: this.container.offsetWidth / this.imgNodes.length,
      currentLeft: 0
    };
    this.margins = [];
  }

  init() {
    // const margins = [];
    for (let i = 0; i < this.imgNodes.length; i++) {
      this.margins.push(this.collectImgs[i].offsetLeft);
    }
    for (let i = 0; i < this.imgNodes.length; i++) {
      this.collectImgs[i].style.left = this.margins[i] + 'px';
      this.collectImgs[i].style.margin = 0;
      this.collectImgs[i].style.position = 'absolute';
    }

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

  moveLeft() {
    const newImg = this.collectImgs[0].cloneNode();

    newImg.style.left = `${this.margins[this.margins.length - 1] + this.img.widthImg}px`;
    //newImg.style.left = parseFloat(this.collectImgs[this.collectImgs.length - 1].style.left) + this.img.widthImg + 'px';

    this.collectImgs.push(newImg);
    this.container.append(newImg);

    this.collectImgs.forEach(img => {
      img.style.left = `${parseFloat(img.style.left) - this.img.widthImg}px`;
      if (parseFloat(img.style.left) < 0 || img.offsetLeft - this.img.widthImg > this.container.offsetWidth) {
        img.style.opacity = 0;
        return;
      }
      img.style.opacity = 1;
    });

    this.collectImgs.splice(0, 1);
    this.imgNodes[0].remove();
  }

  moveRight() {
    const newImg = this.collectImgs[this.collectImgs.length - 1].cloneNode();

    newImg.style.left = `-${this.img.widthImg - this.margins[0]}px`;
    // newImg.style.left = `-${this.img.widthImg - this.collectImgs[0].offsetLeft}px`;
    newImg.style.opacity = 0;

    this.collectImgs.unshift(newImg);
    this.container.prepend(newImg);

    setTimeout(() => {
      this.collectImgs.forEach(img => {
        img.style.left = `${parseFloat(img.style.left) + this.img.widthImg}px`;
        if (img.offsetLeft + img.offsetWidth > this.container.offsetWidth || parseFloat(img.style.left) < 0) {
          img.style.opacity = 0;
          return;
        }
        img.style.opacity = 1;
      });

      setTimeout(() => {
        this.collectImgs.pop();
        this.imgNodes[this.imgNodes.length - 1].remove();
      }, 0);
    }, 0);
  }
}