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
        capital: "Berlín",
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

// Variables
let currentQuestionNum = 1;
let randomCountryName = db[Math.floor(Math.random() * db.length)].country;
let score = 0;

// Functions
function generateRandomCountryName() {
    return db[Math.floor(Math.random() * db.length)].country;
}

function startQuizz() {
        score = 0;
        currentQuestionNum = 1;
        randomCountryName = generateRandomCountryName();
        title.textContent = `Pregunta ${currentQuestionNum} de ${db.length}`;
        subtitle.textContent = `¿Cuál es la capital de ${randomCountryName}?`
        input.style.opacity = 1;
        input.style.pointerEvents = "all";
        btn.innerText = "Siguiente";

        //Remove EventListener when finished
        btn.removeEventListener("click", startQuizz);
        // Add new Event Listener
        btn.addEventListener("click", nextQuestion)
}
function checkResponse() {
    const response = input.value.toLowerCase();
    let result = false;
    db.forEach(element => {
       if (element.capital.toLowerCase() === response) {
           db.forEach(j => {
               if (j.country === randomCountryName) {
                   db.indexOf(element) === db.indexOf(j) ? result = true : result = false;
               }
           })
       }
    })
    return result;
}
function nextQuestion() {
    if (currentQuestionNum < db.length) {
        if (checkResponse()) {
            score += 1;
        }
        input.value = "";
        currentQuestionNum += 1;
        randomCountryName = generateRandomCountryName();
        title.textContent = `Pregunta ${currentQuestionNum} de ${db.length}`;
        subtitle.textContent = `¿Cuál es la capital de ${randomCountryName}?`;
    } else {
        checkResponse() ? score += 1 : score;
        title.textContent = "Test finalizado"
        subtitle.textContent = `Tu puntuación es de ${score} sobre 10`
        input.value = "";
        btn.innerText = "Jugar de nuevo"

        btn.removeEventListener("click", nextQuestion)
        btn.addEventListener("click", startQuizz)
    }
}   

// Event Listeners
btn.addEventListener("click", startQuizz)