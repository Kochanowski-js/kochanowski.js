import { getRawInstruction } from "../src/instruction";

describe('Looking for patterns', () => {
  test('Recognizing patterns', () => {
    expect(getRawInstruction('Zdefiniuj zmienną o nazwie Hatsune Miku o wartości równej くれわ').name).toBe("create");
    expect(getRawInstruction('Zdefiniuj zmienną o wartości równej くれわ o nazwie Hatsune Miku').name).toBe("create_reverse");
    expect(getRawInstruction('Zmiennej o nazwie Hatsune Miku przypisz wartość równą くれわ').name).toBe("assign");
    expect(getRawInstruction('Zmiennej Hatsune Miku przypisz wartość くれわ').name).toBe("assign_short");
    expect(getRawInstruction('Przypisz wartość くれわ zmiennej o nazwie Hatsune Miku').name).toBe("assign_reverse");
    expect(getRawInstruction('Przypisz wartość くれわ zmiennej Hatsune Miku').name).toBe("assign_reverse_no_name");
  });

  test('Recognizing invalid patterns', () => {
    expect(getRawInstruction('Nie wiem').name).toBe("not_found");
  });

  test('Evaluating variables', () => {
    expect(getRawInstruction('Zdefiniuj zmienną o nazwie Hatsune Miku o wartości równej くれわ').values).toStrictEqual(['Hatsune Miku', 'くれわ']);
  })
});