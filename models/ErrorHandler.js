import { choose } from "../utils/Math.js";

// KDE Plasma Terror (Kochanowski Error)
class KError {
  /**
   * Custom Error Handler for Kochanowski Programming Language.
   *
   * Error code guide:
   * - 0 - Danger
   * - 1 - Warning
   * - 2 - Success (dont exit)
   *
   * @param {string} message Detailed description of the error
   * @param {number} code Code number
   */
  constructor(message, code) {
    this.message = message;
    this.code = code;

    const colors = ["\x1b[31m", "\x1b[33m", "\x1b[32m"];
    const titles = ["NIEZALICZONE", "DOPUSZCZAJĄCE", "ZALICZONE"];

    console.log(`\nWynik Pracy:${colors[code]} ${titles[code]} \x1b[0m`);
    console.log(`\x1b[30m ${message} \x1b[0m`);

    if (code != 2) process.exit(1);
  }
}

function splash(score) {
  const splashes = [
    [
      "...",
      "Jeszcze by tu nasr- na środku!",
      " ",
      "brak komentarza",
      "tragedia",
      " - ",
      " ... ... ",
      " .. .. ",
    ],
    [
      "Nawet nie chcę tego sprawdzać",
      "Za mało mi płacą za to",
      "Nie wierzę, że ktoś może być tak głupi!",
    ],
    [
      "L + bozo + ratio + no bitches",
      "Ty pisać nie umiesz czy tylko udajesz",
      "Nie oddałeś mi wypracowania, oddał#ś mi katastrofę",
    ],
    [
      "Prześlizgn#ł#ś się, ale mam cię na oku",
      "Zdałeś... ale i tak bym cię oblał gdybym tylko mógł",
      "Idź lepiej kopać rowy",
      "Dwója!",
    ],
    [
      "To jest najgorsza rzecz jaką widziałem w życiu",
      "Przestań, to ci nie wychodzi",
      "Nie rób tak więcej",
      "Miałeś chyba jakiś zły dzień",
    ],
    [
      "Dobrze, ale czemu tak krótko?",
      "Mogło być lepiej",
      "Nie nadajesz się na olimpijczyka",
      "Nie jest źle, ale Kochanowski do czegoś zobowiązuje",
      "Nawet Mickiewicz by to lepiej napisał",
    ],
    [
      "Chwała Arstotrzce!",
      "Askamitnie",
      "Wypompował#ś całą dostępną imaginację!",
      "Oby tak dalej!",
      "Splen robił! (Splendid)",
      "Jakim cudem uzyskał#ś taki wynik?!",
    ],
  ];

  const minScores = [-Infinity, -40, 0, 40, 100, 300, 500];

  let splashText;
  for (let i in minScores) {
    if (score >= minScores[i]) splashText = choose(splashes[i]);
  }

  return splashText;
}

class ScoreError extends KError {
  /**
   * Throw an error when not enough points.
   * @param {number[]} points Array of points per each cathegory
   */
  constructor(points) {
    const sum = points.reduce((a, b) => a + b, 0);
    const passed = sum >= 40;

    // TODO: If you have a better way of creating this string, feel free to change it.
    const message = `${!passed ? "Nieodpowiednia" : "Odpowiednia"} ilość punktow:` +
                    `\n\n 1. Styl:` +
                    `\n * Ilość sylab w linijce: ${points[0]}pkt` +
                    `\n * Długość tekstu: ${points[1]}pkt` +
                    `\n * Antyczność słownictwa:` +
                    `\n * Partiotyczność:` +
                    `\n\n 2. Poprawność merytoryczna:` +
                    `\n * co?` +
                    `\n\n Łącznie: ${sum}pkt/40pkt (Minimum)`+
                    `\n Komentarz: ${splash(sum)}`;

    super(message, passed ? 2 : 0);
  }
}

export { ScoreError, KError };
