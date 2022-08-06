import convertToJs from "../lib/convertToJs"

test('Convert basic programs', () => {

  const hello = 'Drukuj("Witaj świecie").';
  const multiline = 'Drukuj("Witaj świecie").\nDrukuj("Witaj świecie 2").';

  expect(convertToJs(hello)).toBe('console.log("Witaj świecie");');
  expect(convertToJs(multiline)).toBe('console.log("Witaj świecie");console.log("Witaj świecie 2");');
  
})

test('Detect errors', () => {

  function testError(src: string) { convertToJs(src) };
  const smallCase = 'drukuj("Witaj świecie").';

  expect(() => {
    testError(smallCase)
  }).toThrow(SyntaxError)

})

test('Weird Syntax', () => {

  const altHello = '   Drukuj   ("Witaj świecie")  .  ';
  const dotsInString = 'Drukuj("Witaj.. .. .świecie.").'
  const keywordsInString = 'Drukuj("Witaj Drukuj świecie.").'

  expect(convertToJs(altHello)).toBe('   console.log   ("Witaj świecie")  ;')
  expect(convertToJs(dotsInString)).toBe('console.log("Witaj.. .. .świecie.");')
  expect(convertToJs(keywordsInString)).toBe('console.log("Witaj Drukuj świecie.");')

})