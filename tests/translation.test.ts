import { getPatternValues } from "../src/patterns";
import { translate } from "../src/translate";

function KPLtoJS(input: string) {
  return translate(getPatternValues(input));
}

describe('Translating expressions', () => {

  test('Creating a variable with name and value', () => {
    expect(KPLtoJS('Zdefiniuj zmienną x o wartości równej 10')).toBe("var x = 10;");
    expect(KPLtoJS('Stwórz zmienną y z wartością równą 15')).toBe("var y = 15;");
    expect(KPLtoJS('Utwórz zmienną z o wartości 20')).toBe("var z = 20;");
  });

  test('Assigning a value to a variable', () => {
    expect(KPLtoJS('Przypisz 20 do y')).toBe("y = 20;");
    expect(KPLtoJS('Popraw 30 zmienną x')).toBe("x = 30;");
    expect(KPLtoJS('Zmiennej y przypisz 25')).toBe("y = 25;");
  });

  test('Printing a value', () => {
    expect(KPLtoJS('Wydrukuj x')).toBe("console.log(x);");
    expect(KPLtoJS('Napisz y')).toBe("console.log(y);");
    expect(KPLtoJS('Drukuj z')).toBe("console.log(z);");
  });

  test('Looping with iterator', () => {
    expect(KPLtoJS('Powtórz z iteratorem i przez 5 powtórzeń następujące polecenia')).toBe("for (let i = 0; i < 5; i++) {");
    expect(KPLtoJS('A niechaj się toczy z iteratorem j przez 10 razy')).toBe("for (let j = 0; j < 10; j++) {");
    expect(KPLtoJS('Zapętl z iteratorem k przez 3 powtórzenia następujące polecenia')).toBe("for (let k = 0; k < 3; k++) {");
  });

  test('Commenting', () => {
    expect(KPLtoJS('Komentarz twórcy To jest mój komentarz')).toBe("// \"To jest mój komentarz\"");
    expect(KPLtoJS('Komentarz twórcy To jest kolejny komentarz')).toBe("// \"To jest kolejny komentarz\"");
    expect(KPLtoJS('Komentarz twórcy Komentarz dla funkcji')).toBe("// \"Komentarz dla funkcji\"");
  });

  test('Using multiplication', () => {
    expect(KPLtoJS('Zmienna x razy zmienna y')).toBe("( x * y )");
    expect(KPLtoJS('Zmienną a pomnóż przez zmienną b')).toBe("( a * b )");
    expect(KPLtoJS('Wartość c razy wartość d')).toBe("( c * d )");
  });

});
