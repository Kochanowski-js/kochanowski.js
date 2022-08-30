import convertToJs from "../convertToJs"

test('Detect small case', () => {

    function testError(content: string) { convertToJs(content) };
  
    expect(() => { testError('drukuj(2+2).') }).toThrow(SyntaxError)
    expect(() => { testError('zmiennej X przypisz wartość 5.') }).toThrow(SyntaxError)
    expect(() => { testError('Zmiennej y przypisz wartość 5. y zwiększ o 1. Drukuj(y).')}).toThrow(SyntaxError)

})
  
test('Detect En*lish symbols', () => {
  
    function testError(content: string) { convertToJs(content) };
  
    expect(() => { testError('Drukuj(2+2).') }).toThrow(SyntaxError)
    expect(() => { testError('Drukuj(2-2).') }).toThrow(SyntaxError)
    expect(() => { testError('Drukuj(2*2).') }).toThrow(SyntaxError)
    expect(() => { testError('Drukuj(2/2).') }).toThrow(SyntaxError)
  
})

test('Unmatching brackets', () => {
  
    function testError(content: string) { convertToJs(content) };
  
    expect(() => { testError('Drukuj("Cześć".') }).toThrow(SyntaxError)
    expect(() => { testError('Drukuj("Cześć).') }).toThrow(SyntaxError)
    expect(() => { testError('Zmiennej X przypisz wartość [0.1.2.3.4.') }).toThrow(SyntaxError)
    expect(() => { testError('Zmiennej Y przypisz wartość {0.1.2.3.4.') }).toThrow(SyntaxError)
  
})