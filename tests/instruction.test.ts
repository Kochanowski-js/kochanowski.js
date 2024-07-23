import { getRawInstrction } from "../src/instruction";

describe('Looking for patterns', () => {
  test('Recognizing patterns', () => {
    expect(getRawInstrction('Zdefiniuj zmienną o nazwie Hatsune Miku o wartości równej くれわ').name).toBe("create");
    expect(getRawInstrction('Zdefiniuj zmienną o wartości równej くれわ o nazwie Hatsune Miku').name).toBe("create_alt");
    expect(getRawInstrction('Zmiennej o nazwie Hatsune Miku przypisz wartość równą くれわ').name).toBe("assign");
    expect(getRawInstrction('Zmiennej Hatsune Miku przypisz wartość くれわ').name).toBe("assign_short");
    expect(getRawInstrction('Przypisz wartość くれわ zmiennej o nazwie Hatsune Miku').name).toBe("assign_alt");
    expect(getRawInstrction('Przypisz wartość くれわ zmiennej Hatsune Miku').name).toBe("assign_short_alt");
  });

  test('Recognizing invalid patterns', () => {
    expect(getRawInstrction('Nie wiem').name).toBe("not_found");
  });

  test('Evaluating variables', () => {
    expect(getRawInstrction('Zdefiniuj zmienną o nazwie Hatsune Miku o wartości równej くれわ').values).toStrictEqual(['Hatsune Miku', 'くれわ']);
  })
});