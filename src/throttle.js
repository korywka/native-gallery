export default function throttle(func, timeFrame) {
  let lastTime = 0;
  return function () {
    let now = new Date();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}