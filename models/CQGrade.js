import { getAverage, getStandardDeviation } from "../utils/Math.js";
import { KError, ScoreError } from "./ErrorHandler.js";

/**
 * Calculates the number of syllables in given string.
 * @param {string} src Source string
 * @returns Syllable amount
 */
function countSyllables(word) {
  
  const vowels = /[aeiouyóąę]/gi;
  const specialCases = /ai|au/gi;

  const found = word
    .replaceAll(specialCases, "µµ")
    .replaceAll(vowels, "Ω")
    .replaceAll("ΩΩ", "Ω")
    .match(/[Ωµ]/g)

  return (found || []).length;
    
}

/**
 * Calculates points for style. 
 * @param {string} text Source of the text
 * @returns Points
 */
function syllabelPoints(text) {
  const sigma = getStandardDeviation(text
    .split("\n")
    .map(countSyllables)
  );

  const average = getAverage(text.split("\n").map(countSyllables));
  const multiplier = -0.05*(average - 13)**2 + 3
  const score = multiplier * 1/(sigma+0.1) * 20

  // Making mistakes acceptable?
  return (score >= 0) ? score : score/5
}

function getPoints(text) {
  text = text.replace(/(^[ \t]*\n)/gm, "");

  // Points for syllabels
  const syl = Math.floor(syllabelPoints(text));

  // Word amount
  const len = text.split(/[ -]/).length;
  const lenVal = 2*Math.floor((5*len)**0.5-44.721);

  // Summary
  const score = [syl, lenVal];
  const total = score.reduce((a, b) => a + b, 0)
  
  if (total >= 40) {
    new ScoreError(score);
  } else {
    throw new ScoreError(score);
  }

  return total;
}

export default getPoints;
export { countSyllables };
