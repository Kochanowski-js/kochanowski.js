/*
TO DO:
- Make a better algorithm for syllabisation
- Just write better code, this is a mess
- Make this in JavaScript, it now generates problems instead of solving them
*/

//@ts-ignore

String.prototype.insert = function (index, string) {
    if (index > 0) return this.substring(0, index) + string + this.substr(index);
    return string + this;
};
  
// Making sure the user won't input these characters, so I used Bengali alphabet
const doubleChars: any = {
  cz: "৲", ch: "৳", dż: "৴", dź: "৵", sz: "ঞ",
  dzi: "ঝ", si: "৽", ci: "ৼ", rz: "৻", dz: "৺",
};

const hyphen = "৶";
const noSplitBefore = /[ćńrjঞdmś৳kp]/gi;
const vowels = /[aeiouyąęó]/gi;
const splitAfter = /[ৼ]/gi;

function parseString(input: any) {
  Object.keys(doubleChars).forEach((e) => {
    input = input.replaceAll(e, doubleChars[e]);
  });

  return input;
}

function unparseString(input: any) {
  Object.keys(doubleChars).forEach((e) => {
    input = input.replaceAll(doubleChars[e], e);
  });

  return input;
}

function syllabify(words: any) {
  let i = 0;

  words = parseString(words);

  for (i = 0; i < words.length; i++) {
    if (words[i].match(vowels)) {
      let k = words[i + 1] && words[i + 1].match(noSplitBefore) ? i + 2 : i + 1;

      if (words[i + 1] && words[i + 1].match(vowels)) {
        k += 1;
      }

      words = words.insert(k, hyphen);
      i += 1;
    }
  }

  return unparseString(words)
    .split("-")
    .filter((e: any) => e.match(/[A-z]/gi));
}

// https://stackoverflow.com/questions/7343890/standard-deviation-javascript
function getStandardDeviation(array: any) {
  const n = array.length;
  const mean = array.reduce((a: any, b: any) => a + b) / n;
  return Math.sqrt(
    array.map((x: any) => Math.pow(x - mean, 2)).reduce((a: any, b: any) => a + b) / n
  );
}

function syllabelPoints(lines: any) {
  let dev = getStandardDeviation(lines.map((e: any) => syllabify(e).length));
  return -(dev - 1) * 10;
}

function rhymePoints(lines: any) {
  let endings = lines
    .map((e: any) => syllabify(e).at(-1))
    .map((e: any) => e.replaceAll("ą", "o"));
  let points = 0;

  for (let i = 0; i < endings.length; i += 2) {
    if (endings[i] == endings[i + 1]) {
      points += 10;
    }
  }

  return points;
}

function miscPoints(text: any) {
  return (text.length - 600) * 0.1;
}

function getPoints(text: any) {
  let points = 0;
  text = text.replace(/(^[ \t]*\n)/gm, "");

  points += syllabelPoints(text.split("\n"));
  points += rhymePoints(text.split("\n"));
  points += miscPoints(text);
  points += Math.floor(Math.random() * 10) - 20;

  return Math.floor(points);
}

export default getPoints;
