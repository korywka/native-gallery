import throttle from './throttle.js';

class NativeGallery {
  constructor(root) {
    this.root = root;
    this.images = Array.from(this.root.querySelectorAll('img'));
    this.currentIndex = 0;
    this.count = this.images.length;
    this.initialize();
  }

  initialize() {
    this.root.classList.add('-loaded');
    const scrollListener = throttle(() => {
      this.currentIndex = Math.round(this.root.scrollLeft / this.root.offsetWidth);
      this.fireChange();
    }, 100);
    this.root.addEventListener('scroll', scrollListener);
  }

  prev() {
    if (this.currentIndex === 0) return;
    const toIndex = this.currentIndex - 1;
    const prevImage = this.images[toIndex];
    this.preloadImage(prevImage)
      .then(() => {
        this.root.scrollTo(this.root.offsetWidth * toIndex, 0);
      })
      .catch((error) => console.error(error));
  }

  next() {
    if (this.currentIndex === this.count - 1) return;
    const toIndex = this.currentIndex + 1;
    const nextImage = this.images[toIndex];
    this.preloadImage(nextImage)
      .then(() => {
        this.root.scrollTo(this.root.offsetWidth * toIndex, 0);
      })
      .catch((error) => console.error(error));
  }

  fireChange() {
    const event = new CustomEvent('change', {
      detail: {
        current: this.current,
        count: this.count,
      },
    });
    this.root.dispatchEvent(event);
  }

  preloadImage(image) {
    if (image.complete) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      image.setAttribute('loading', 'eager');
      image.addEventListener('load', () => resolve());
      image.addEventListener('error', () => reject(`can't load image: ${image.src}`));
    });
  }

  get current() {
    return this.currentIndex + 1;
  }
}

export default NativeGallery;