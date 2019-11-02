export default class SliderHeader {
  constructor(frames, points) {
    this.frames = Array.from(frames);
    this.points = Array.from(points);
    this.timerId = null;
    this.frameIdx = 0;
    this.pointIdx = 0;
  }

  init() {
    this.frameIdx = this.frames.findIndex((elem) => {
      if (elem.classList.contains('frame_show')) return true;
    });
    this.pointIdx = this.points.findIndex((elem, idx) => {
      if (elem.classList.contains('frame-point_checked')) return true;
    });

    document.querySelector('.frame-points').addEventListener('mouseover', () => {
      clearInterval(this.timerId);
    });

    document.querySelector('.frame-points').addEventListener('mouseout', () => {
      this.start();
    });

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('frame-point_checked')) return;
      if (event.target.classList.contains('frame-point')) {
        clearInterval(this.timerId);

        this.frames.forEach((item) => {
          item.classList.remove('frame_show');
          item.classList.add('frame_hide');
        });

        this.points.forEach((item) => {
          item.classList.remove('frame-point_checked');
        });

        event.target.classList.add('frame-point_checked');

        this.points.forEach((item, idx) => {
          if (item.classList.contains('frame-point_checked')) {
            this.frames[idx].classList.remove('frame_hide');
            this.frames[idx].classList.add('frame_show');

            this.pointIdx = idx;
            this.frameIdx = idx;
          }
        });
      }
    });
  }

  start() {
    this.timerId = setInterval(() => {

      this.frames[this.frameIdx].classList.remove('frame_show');
      this.frames[this.frameIdx].classList.add('frame_hide');

      this.points[this.pointIdx].classList.remove('frame-point_checked');

      if (this.frames.length - 1 === this.frameIdx) {

        this.frameIdx = 0;
        this.pointIdx = 0;

        this.frames[this.frameIdx].classList.remove('frame_hide');
        this.frames[this.frameIdx].classList.add('frame_show');

        this.points[this.pointIdx].classList.add('frame-point_checked');

      } else {

        this.frames[this.frameIdx + 1].classList.remove('frame_hide');
        this.frames[this.frameIdx + 1].classList.add('frame_show');

        this.points[this.pointIdx + 1].classList.add('frame-point_checked');

        this.frameIdx++;
        this.pointIdx++;

      }

    }, 2000);
  }
}