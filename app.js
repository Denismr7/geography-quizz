// DATABASE
const db = [
    {
        country: "España",
        capital: "Madrid",
        continent: "Europa"
    },
    {
        country: "Francia",
        capital: "París",
        continent: "Europa"
    },
    {
        country: "Albania",
        capital: "Tirana",
        continent: "Europa"
    },
    {
        country: "Alemania",
        capital: "Berlin",
        continent: "Europa"
    },
    {
        country: "Austria",
        capital: "Viena",
        continent: "Europa"
    },
    {
        country: "Azerbaiyán",
        capital: "Baku",
        continent: "Europa / Asia"
    },
    {
        country: "Bélgica",
        capital: "Bruselas",
        continent: "Europa"
    },
    {
        country: "Bulgaria",
        capital: "Sofía",
        continent: "Europa"
    },
    {
        country: "Finlandia",
        capital: "Helsinki",
        continent: "Europa"
    },
    {
        country: "Islandia",
        capital: "Reikiavik",
        continent: "Europa"
    },
]

// Selectors
const title = document.querySelector(".quizzContainer__title");
const subtitle = document.querySelector(".quizzContainer__text");
const input = document.querySelector(".quizzContainer__input");
const btn = document.querySelector(".quizzContainer__btn");
let currentQuestionNum = 1;

// Functions
function startQuizz() {
    if (currentQuestionNum < db.length) {
        title.textContent = `Pregunta ${currentQuestionNum} de ${db.length}`;
        subtitle.textContent = `¿Cuál es la capital de ${db[Math.floor(Math.random() * db.length)].country}?`
        input.style.opacity = 1;
        input.style.pointerEvents = "all";
    }
}

// Event Listeners
btn.addEventListener("click", startQuizz)