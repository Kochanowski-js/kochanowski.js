import convertToJs from "../models/Parser.js";

const config = { bypassStyle: true };
const sanityConfig = { bypassErrors: true, bypassStyle: true, };

test('Does it even work', () => {
    let x = convertToJs('Drukuj("Witaj Świecie").', config);
    expect(x).toBe('console.log("Witaj Świecie");');
});