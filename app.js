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
    {
        country: "India",
        capital: "Nueva Delhi",
        continent: "Asia"
    },
    {
        country: "Irán",
        capital: "Teherán",
        continent: "Asia"
    },
    {
        country: "Japón",
        capital: "Tokio",
        continent: "Asia"
    },
    {
        country: "Líbano",
        capital: "Beirut",
        continent: "Asia"
    },
    {
        country: "China",
        capital: "Pekín",
        continent: "Asia"
    },
    {
        country: "Nepal",
        capital: "Katmandu",
        continent: "Asia"
    },
    {
        country: "Qatar",
        capital: "Doha",
        continent: "Asia"
    },
    {
        country: "Corea del Sur",
        capital: "Seúl",
        continent: "Asia"
    },
    {
        country: "Tailandia",
        capital: "Bangkok",
        continent: "Asia"
    },
    {
        country: "Taiwán",
        capital: "Taipei",
        continent: "Asia"
    },
]

// Selectors
const title = document.querySelector(".quizzContainer__title");
const subtitle = document.querySelector(".quizzContainer__text");
const input = document.querySelector(".quizzContainer__input");
const btn = document.querySelector(".quizzContainer__btn");

// Variables
let currentQuestionNum = 1;
let randomCountryName;
let score = 0;
let numberOfQuestions = 5;

// Functions
function generateRandomCountryName(db) {
    return db[Math.floor(Math.random() * db.length)].country;
}

function startQuizz() {
        score = 0;
        currentQuestionNum = 1;
        randomCountryName = generateRandomCountryName(db);
        title.textContent = `Pregunta ${currentQuestionNum} de ${numberOfQuestions}`;
        subtitle.textContent = `¿Cuál es la capital de ${randomCountryName}?`
        input.style.opacity = 1;
        input.style.pointerEvents = "all";
        btn.innerText = "Siguiente";

        //Remove EventListener when finished
        btn.removeEventListener("click", startQuizz);
        // Add new Event Listener
        btn.addEventListener("click", nextQuestion)
}
function checkResponse(userResponse, db) {
    const response = userResponse.toLowerCase();
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
    if (currentQuestionNum < numberOfQuestions) {
        if (checkResponse(input.value, db)) {
            score += 1;
        }
        input.value = "";
        currentQuestionNum += 1;
        randomCountryName = generateRandomCountryName(db);
        title.textContent = `Pregunta ${currentQuestionNum} de ${numberOfQuestions}`;
        subtitle.textContent = `¿Cuál es la capital de ${randomCountryName}?`;
    } else {
        checkResponse(input.value, db) ? score += 1 : score;
        if (score < Math.floor(numberOfQuestions / 2)) {
            title.textContent = "Ohh! Seguro que la próxima vez tienes más suerte!"
        } else if (score === numberOfQuestions) {
            title.textContent = "¡Pleno! Has acertado todas"
        } else if (score >= Math.floor(numberOfQuestions/2)) {
            title.textContent = "¡No se te da nada mal!"
        }
        subtitle.textContent = `Tu puntuación es de ${score} sobre ${numberOfQuestions}`
        input.value = "";
        btn.innerText = "Repetir"

        btn.removeEventListener("click", nextQuestion)
        btn.addEventListener("click", startQuizz)
    }
}   

// Event Listeners
btn.addEventListener("click", startQuizz)