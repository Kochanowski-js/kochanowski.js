// Math function dump, destined to be a mess.

// https://stackoverflow.com/questions/7343890/standard-deviation-javascript
export function getStandardDeviation(array) {
    const n = array.length;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(
      array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
    );
}

export const getAverage = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

export function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}