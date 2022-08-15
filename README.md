<div align="center">
    
<img src="https://cdn.discordapp.com/attachments/739575474711166976/1005512112593961031/kochanowskiJSlogo512.png" width="200" />
    
<p>
<a href=""><img src="https://forthebadge.com/images/badges/gluten-free.svg" /></a>
<a href=""><img src="https://forthebadge.com/images/badges/powered-by-electricity.svg" /></a>
</p>
</div>

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

Kochanowski.js to jest przetłumaczony JavaScript z paroma zasadami:

1. Zdania rozpoczynamy wielką literą
2. Zdania kończymy kropką
3. Nazwy własne (zmienne) rozpoczynamy wielką literą
4. Pliki nazywamy **po polsku** np. `główny.pol`
5. Nie używamy an*ielskich operatorów jak `+`, `-`. Używamy za to `plus` `minus`

### Przykładowe polecenia

Kochanowski.js | JavaScript
-|-
Drukuj("Witaj świecie"). | console.log("Witaj świecie");
Jeżeli (X jest większe od Y) {}. | if (x > y) {}
Stałej PI przypisz wartość 3,14. | const PI = 3.14;
Zmiennej R przypisz wartość 5. | let R = 5;
Dla (Zmiennej I przypisz wartość 0. I jest mniejsze od 5. I zwiększ o 1) | for (let i = 0; i < 5; i++)
Dopóki (X jest mniejsze od 5) {} | while (X < 5) {}
X zwiększ o 1. | x += 1;
