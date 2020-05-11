import NativeGallery from '../src';

const target = document.querySelector('native-gallery');
const gallery = new NativeGallery(target);

/* controls */
document.getElementById('prev').addEventListener('click', () => {
  gallery.prev();
});
document.getElementById('next').addEventListener('click', () => {
  gallery.next();
});

/* update current */
document.getElementById('current').textContent = `${gallery.current} / ${gallery.count}`;
target.addEventListener('change', (event) => {
  document.getElementById('current').textContent = `${event.detail.current} / ${event.detail.count}`;
});