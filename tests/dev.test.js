import convertToJs from "../models/Parser.js";

const config = { bypassStyle: true };
const sanityConfig = { bypassErrors: true, bypassStyle: true, };

test('Does it even work', () => {
  
  expect(
    convertToJs('Drukuj("Witaj Świecie").', config)
  ).toBe('console.log("Witaj Świecie");');

  expect(
   convertToJs('Jeżeli (X jest większe od 5 ale Y jest mniejsze bądź równe 5)', config)
  ).toBe('if (x > 5 && y <= 5);');

});