const url = require('url');
const assert = require('assert');

const SECONDS_IN_MS = 1e+9;
const MS_IN_NANOSECONDS = 1e+6;

const neon = require('./neon');
const ffi = require('./ffi');
const urls = require('./urls');

function performTest (testFunction) {
  const tryCount = 10;
  const total = new Array(tryCount)
    .fill()
    .map(() => {
      const start = process.hrtime();
      urls.forEach((url) => testFunction(url));
      const duration = process.hrtime(start);
      return (duration[0] * SECONDS_IN_MS + duration[1]) / MS_IN_NANOSECONDS;
    })
    .reduce((sum, current) => {
      return sum + current
    });

  return total / tryCount;
}

const getQuery = (urlToParse) => {
  const { query } = url.parse(urlToParse);
  return query;
};

const nativeResult = urls.map((url) => getQuery(url));
const ffiResult = urls.map((url) => ffi.getQuery(url));
const neonResult = urls.map((url) => neon.getQuery(url));

// Make sure they parse the query the same way
assert.deepEqual(nativeResult, ffiResult);
assert.deepEqual(nativeResult, neonResult);

const nativeAvgDuration = performTest(getQuery);
const ffiAvgDuration = performTest(ffi.getQuery);
const neonAvgDuration = performTest(neon.getQuery);

console.log('Native url parse', Math.round(nativeAvgDuration * 100) / 100);
console.log('Rust FFI        ', Math.round(ffiAvgDuration * 100) / 100);
console.log('Rust Neon       ', Math.round(neonAvgDuration * 100) / 100);
