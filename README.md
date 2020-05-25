# native-gallery

[native image gallery](https://bravecow.github.io/native-gallery/example/) in ~ 100 lines of code.

## How it works

* use CSS property [scroll-snap-type](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type) for snapping
* use CSS property [scroll-behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) for smooth JS scrolling
* use `loading` attribute for [Native Lazy Loading](https://web.dev/native-lazy-loading/)
* works with [lazysizes.js](https://github.com/aFarkas/lazysizes)
* use [Custom Events](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)
* it was named as `native-gallery` to become [Custom Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) in the future

## Usage 

```javascript
import NativeGallery from 'native-gallery';

const target = document.querySelector('native-gallery');
const gallery = new NativeGallery(target);

// navigation:
gallery.prev();
gallery.next();

// events are fired on target DOM node:
target.addEventListener('change', (event) => {
  console.log(`${event.detail.current} / ${event.detail.count}`);
});
```

```html
<!-- include CSS file -->
<link href="styles.css" rel="stylesheet">

<!-- gallery markup -->
<native-gallery>
  <img src="1.jpg" width="1600" height="900" alt="">
  <img src="2.jpg" width="675" height="900" alt="" loading="lazy">
  <img src="3.jpg" width="1600" height="900" alt="" loading="lazy">
  <img src="4.jpg" width="1600" height="900" alt="" loading="lazy">
  <img src="5.jpg" width="1600" height="900" alt="" loading="lazy">
</native-gallery>
```
