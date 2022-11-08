Not a polish speaker? [Read the english version here.](README_EN.md)

<div align="center">
    
<img src="https://cdn.discordapp.com/attachments/739575474711166976/1005512112593961031/kochanowskiJSlogo512.png" width="200" />
    
<p>
<a href=""><img src="https://forthebadge.com/images/badges/gluten-free.svg" /></a>
<a href=""><img src="https://forthebadge.com/images/badges/powered-by-electricity.svg" /></a>
</p>
</div>

## Kochanowski Online

Spróbuj Kochanowskiego bez konfiguracji projektu! https://mmusielik.xyz/projects/kochanowski

## Instalacja

1. Stwórz nowy projekt przez `npm init`
2. Zainstaluj najlepszy package `kochanowski` przez `npm i -D kochanowski`
3. Stwórz plik `konfiguracja.zojs`.
    ```json
    {
        "folderWyjścia": "./out",
        "folderWejścia": "./src"
    }
    ```

4. Do `package.json` dodaj skrypt o treści `kochanowski`
5. Utwórz foldery które zadeklarowałeś w `konfiguracja.zojs`

## Jak używać

Kochanowski to jest przetłumaczony JavaScript z paroma zasadami:

1. Zdania rozpoczynamy wielką literą
2. Zdania kończymy kropką
3. Nazwy własne (zmienne) rozpoczynamy wielką literą
4. Pliki nazywamy **po polsku** np. `główny.pol`
5. Nie używamy an*ielskich operatorów jak `+`, `-`. Używamy za to `plus` `minus`

### Przykładowe polecenia

Kochanowski | JavaScript
-|-
Drukuj("Witaj świecie"). | console.log("Witaj świecie");
Jeżeli (X jest większe od Y) {}. | if (x > y) {}
Stałej PI przypisz wartość 3,14. | const PI = 3.14;
Zmiennej R przypisz wartość 5. | let R = 5;
Dla (Zmiennej I przypisz wartość 0. I jest mniejsze od 5. I zwiększ o 1) | for (let i = 0; i < 5; i++)
Dopóki (X jest mniejsze od 5) {} | while (X < 5) {}
X zwiększ o 1. | x += 1;

### Słownik

### Biblioteki

Kochanowski | JavaScript
--- | ---
`Załącz` | `import`
`Zwróć` | `return`
`z biblioteki` | `from`

### Stałe

Kochanowski | JavaScript
--- | ---
`Brak` | `null`
`Niezdefiniowane` | `undefined`
`Fałsz` | `false`
`Prawda` | `true`

### Funkcje i klasy

Kochanowski | JavaScript
--- | ---
`Funkcja` | `function`
`Wyczekuj` | `await`
`Klasa` | `class`
`Konstruktor` | `constructor`

### Jeśli i pętle

Kochanowski | JavaScript
--- | ---
`Jeżeli` | `if`
`Jeśli` | `if`
`W przeciwnym wypadku` | `else`
`Dla` | `for`
`Dopóki` | `while`
`Rób` | `do`
`Spróbuj` | `try`
`Łap` | `catch`
`Złam` | `break`
`Kontynuuj` | `continue`

### Nadawanie wartości   

Kochanowski | JavaScript
--- | ---
`Stałej` | `const`
`Stałych` | `const`
`Stałym` | `const`
`Stały` | `const`
`Stałe` | `const`
`Stała` | `const`
`Zmiennemu` | `let`
`Zmiennej` | `let`
`Zmienne` | `let`
`Zmiennym` | `let`
`Zmienny` | `let`
`Zmienna` | `let`
`której wartość jest równa` | `=`
`który wartość jest równa` | `=`
`któremu wartość jest równa` | `=`
`gdzie wartość jest równa` | `=`
`przypisz wartość` | `=`

### Porównywanie

Kochanowski | JavaScript
--- | ---
`nie jest równe` | `!=`
`nie jest równy` | `!=`
`nie jest równa` | `!=`
`jest równe` | `==`
`jest równa` | `==`
`jest równy` | `==`
`jest większe od` | `>`
`jest większa od` | `>`
`jest większy od` | `>`
`jest mniejsze od` | `<`
`jest mniejsza od` | `<`
`jest mniejszy od` | `<`
`jest mniejsza bądź równa` | `<=`
`jest mniejszy bądź równy` | `<=`
`jest mniejsze bądź równe` | `<=`
`jest większe bądź równe` | `>=`
`jest większy bądź równy` | `>=`
`jest większa bądź równa` | `>=`

### Operatory logiczne
`lub` | `||`
`albo` | `||`
`oraz` | `&&`

### Dodawanie

Kochanowski | JavaScript
--- | ---
`plus` | `+`
`dodać` | `+`
`dodane do` | `+`

### Odejmowanie

Kochanowski | JavaScript
--- | ---
`minus` | `-`
`odjąć` | `-`
`odjęte od` | `-`

### Mnożenie

Kochanowski | JavaScript
--- | ---
`razy` | `*`
`pomnożyć przez` | `*`
`pomnożone przez` | `*`
`pomnożona przez` | `*`

### Dzielenie

Kochanowski | JavaScript
--- | ---
`podzielić na` | `/`
`podzielone na` | `/`
`podzielona na` | `/`
`podzielony na` | `/`

### Potęgowanie

Kochanowski | JavaScript
--- | ---
`do potęgi` | `**`
`do kwadratu` | `**2`
`do sześcianu` | `**3`
`kwadrat` | `**2`
`sześcian` | `**3`
`pierwiastek` | `**0.5`

### π

Kochanowski | JavaScript
--- | ---
`ciasto` | `Math.PI`
`pi` | `Math.PI`
`𝝅` | `Math.PI`
`π` | `Math.PI`

### Losowanie

Kochanowski | JavaScript
--- | ---
`losowaLiczba` | `Math.random()`
`losowanie` | `Math.random()`

### Modulo

Kochanowski | JavaScript
--- | ---
`modulować na` | `%`
`modulowane na` | `%`
`modulowana na` | `%`
`modulowny na` | `%`
`zmodulować na` | `%`
`zmodulowane na` | `%`
`zmodulowana na` | `%`
`zmodulowny na` | `%`

### Inne z matmy

Kochanowski | JavaScript
--- | ---
`zwiększ o` | `+=`
`zmniejsz o` | `-=`
`pomnoż o` | `*=`
`podziel o` | `/=`
`moduluj o` | `%=`
`zmoduluj o` | `%=`

### Inne

Kochanowski | JavaScript
--- | ---
`z upchniętym` | `.`
`To` | `this`
`Drukuj` | `console.log`
`wewnątrz` | `in`
`;` | `,`
`,` | `.`