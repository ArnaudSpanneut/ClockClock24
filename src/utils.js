export function startimeout(timeout, cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (cb) {
        cb();
      }
      resolve();
    }, timeout);
  });
}
export function runSequences(arr) {
  return arr
    .reduce((promise, func) =>
      promise
        .then(() => func())
      , Promise.resolve());
}
export function getArrTime() {
  const time = new Date(Date.now());
  const timeToString = time.toTimeString()
    .slice(0, 5)
    .replace(':', '');

  return timeToString.split('');
}