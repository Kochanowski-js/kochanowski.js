export default {
    "def": [ "stwórz", "zdefiniuj" ],
    "var": [ "zmienną", "osobe", "bohatera", "bohaterkę" ],
    "varname": ["o nazwie", "o imieniu", "zwaną", "zwanego"],
    "varvalue": ["który jest", "która jest", "o wartości", "z wartością"],
    "add": ["dodać"],
    "sub": ["minus", "odjąć"],
    "mul": ["razy", "pomnożone przez", "pomnożona przez"],
    "div": ["podzielić na", "dzielone przez", "dzielona przez"],
    "2137": [ "papajowa liczba", "papajową liczbę", "liczby papieżowej" ]
}

function replaceWords(text, dictionary) {

    for (const key in dictionary) {
        const regex = new RegExp(dictionary[key].join("|"), "g");
        text = text.replace(regex, key);
      }
    return text;

}

export { replaceWords }