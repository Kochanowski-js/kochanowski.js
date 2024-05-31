import { getPatternValues } from "../src/patterns";

describe('Looking for patterns', () => {
  test('Recognizing patterns', () => {
    expect(getPatternValues('Zdefiniuj zmienną o nazwie Hatsune Miku o wartości równej くれわ').name).toBe("create");
    expect(getPatternValues('Zdefiniuj zmienną o wartości równej くれわ o nazwie Hatsune Miku').name).toBe("create_alt");
    expect(getPatternValues('Zmiennej o nazwie Hatsune Miku przypisz wartość równą くれわ').name).toBe("assign");
    expect(getPatternValues('Zmiennej Hatsune Miku przypisz wartość くれわ').name).toBe("assign_short");
    expect(getPatternValues('Przypisz wartość くれわ zmiennej o nazwie Hatsune Miku').name).toBe("assign_alt");
    expect(getPatternValues('Przypisz wartość くれわ zmiennej Hatsune Miku').name).toBe("assign_short_alt");
    expect(getPatternValues('21 razy 5 plus 8').name).toBe("addition");
    expect(getPatternValues('21 plus 5 razy 8').name).toBe("addition");
  });

  test('Recognizing invalid patterns', () => {
    expect(getPatternValues('Nie wiem').name).toBe("not_found");
  });

  test('Evaluating variables', () => {
    expect(getPatternValues('Zdefiniuj zmienną o nazwie Hatsune Miku o wartości równej くれわ').values).toStrictEqual(['Hatsune Miku', 'くれわ']);
    expect(getPatternValues('21 plus 5 razy 8').values).toStrictEqual(['21', '5 razy 8']);
    expect(getPatternValues('21 razy 5 plus 8').values).toStrictEqual(['21 razy 5', '8']);
  })
});