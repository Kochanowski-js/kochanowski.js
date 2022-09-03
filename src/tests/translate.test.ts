import convertToJs from "../convertToJs"
import fs from 'fs'

function getJsFromFile(filename: string): string {
  let content = fs.readFileSync('src/tests/'+filename, 'utf8');
  return convertToJs(content);
}

test('Convert basic programs', () => {

  expect(getJsFromFile('helloWorld.pol')).toBe(`#include <iostream>
#define Std std
using namespace std;int main() {    Std :: cout << "Witaj świecie";    return 0;};`);
  
  expect(getJsFromFile('input.pol')).toBe(`#include <iostream>
#define Std std
using namespace std;int main() {        int n;    Std :: cin >> n;    Std :: cout << n;    return 0;};`);
  
  expect(getJsFromFile('fullName.pol')).toBe(`#include <iostream>
#define Std std
using namespace std;int main() {        string Imie;    Std :: cin >> Imie;    Std :: cout << "Witaj " + Imie;    return 0;};`);
  
  expect(getJsFromFile('age.pol')).toBe(`#include <iostream>
#define Std std
using namespace std;int main() {        int Wiek = 15;    if (Wiek > 18) {        Std :: cout << "Osoba jest pełnoletnia";    } else {        Std :: cout << "Osoba jest pełnoletnia";    }    return 0;};`);

  expect(getJsFromFile('loops.pol')).toBe(`#include <iostream>
#define Std std
using namespace std;int main() {        for (int I = 0; I < 100; I += 1) Std :: cout << I;    for (int I = 0; I < 100; I += 1) {        if (I % 2 == 0) {            Std :: cout << I << "\\n";        }    }    return 0;};`);  

expect(getJsFromFile('bypass.pol')).toBe(`#include <iostream>
#define Std std
using namespace std;int main() {        cout << "Witaj świecie";     cout << "Witaj świecie";        return 0;};`);  


})
