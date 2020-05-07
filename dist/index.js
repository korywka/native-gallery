(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
typeof define === 'function' && define.amd ? define(factory) :
(global = global || self, global.NativeGallery = factory());
}(this, (function () { 'use strict';

function throttle(func, timeFrame) {
  var lastTime = 0;
  return function () {
    var now = new Date();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}

var NativeGallery = function NativeGallery(root) {
  this.root = root;
  this.images = Array.from(this.root.querySelectorAll('img'));
  this.currentIndex = 0;
  this.count = this.images.length;
  this.initialize();
};

var prototypeAccessors = { current: { configurable: true } };

NativeGallery.prototype.initialize = function initialize () {
    var this$1 = this;

  this.root.classList.add('-loaded');
  var scrollListener = throttle(function () {
    this$1.currentIndex = Math.round(this$1.root.scrollLeft / this$1.root.offsetWidth);
    this$1.fireChange();
  }, 100);
  this.root.addEventListener('scroll', scrollListener);
};

NativeGallery.prototype.prev = function prev () {
  if (this.currentIndex === 0) { return; }
  var prevImage = this.images[this.currentIndex - 1];
  this.preloadImage(prevImage)
    .then(function () {
      prevImage.scrollIntoView();
    })
    .catch(function (error) { return console.error(error); });
};

NativeGallery.prototype.next = function next () {
  if (this.currentIndex === this.count - 1) { return; }
  var nextImage = this.images[this.currentIndex + 1];
  this.preloadImage(nextImage)
    .then(function () {
      nextImage.scrollIntoView();
    })
    .catch(function (error) { return console.error(error); });
};

NativeGallery.prototype.fireChange = function fireChange () {
  var event = new CustomEvent('change', {
    detail: {
      current: this.current,
      count: this.count,
    },
  });
  this.root.dispatchEvent(event);
};

NativeGallery.prototype.preloadImage = function preloadImage (image) {
  if (image.complete) {
    return Promise.resolve();
  }
  return new Promise(function (resolve, reject) {
    image.setAttribute('loading', 'eager');
    image.addEventListener('load', function () { return resolve(); });
    image.addEventListener('error', function () { return reject(("can't load image: " + (image.src))); });
  });
};

prototypeAccessors.current.get = function () {
  return this.currentIndex + 1;
};

Object.defineProperties( NativeGallery.prototype, prototypeAccessors );

return NativeGallery;

})));
