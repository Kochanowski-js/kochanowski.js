/*
TO DO:
- Make this in JavaScript, it now generates problems instead of solving them
*/

// https://stackoverflow.com/questions/7343890/standard-deviation-javascript
function getStandardDeviation(array: number[]) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
}

function countSyllables(word: string) {
  
  const vowels = /[aeiouyóąę]/gi;
  const specialCases = /ai|au/gi;

  const found = word
    .replaceAll(specialCases, "µµ")
    .replaceAll(vowels, "Ω")
    .replaceAll("ΩΩ", "Ω")
    .match(/[Ωµ]/g)

  return (found || []).length;
    
}

function syllabelPoints(text: string) {
  const sigma = getStandardDeviation(text
    .split("\n")
    .map(countSyllables)
  );

  // Here do some cool crazy math stuff to make it optimal

  return sigma;
}

function getPoints(text: string) {
  let points = 0;
  text = text.replace(/(^[ \t]*\n)/gm, "");

  points += syllabelPoints(text);
  
  return points;
}

export default getPoints;
export { countSyllables };