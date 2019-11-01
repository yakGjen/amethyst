export default class SliderHeader {
  constructor(frames, points) {
    this.frames = frames;
    this.points = points;
    this.timerId = null;
    this.frameIdx = null;
    this.pointIdx = null;
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

  init() {
    /*this.frameIdx = this.frames.findIndex((elem, idx, array) => {
      if (elem.classList.contains('frame_show')) return idx;
    });*/
    this.frames.forEach((item, idx) => {
      if (item.classList.contains('frame_show')) this.frameIdx = idx;
    });
    this.points.forEach((item, idx) => {
      if (item.classList.contains('frame-point_checked')) this.pointIdx = idx;
    });
  }
}