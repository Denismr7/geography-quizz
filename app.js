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
const optionsDiv = document.querySelector(".options");

// Variables
let currentQuestionNum = 1;
let randomCountryName;
let score = 0;
let numberOfQuestions = 5;
let tempDatabase;

// Functions
function generateRandomCountryName(db) {
    return db[Math.floor(Math.random() * db.length)].country;
}

function startQuizz() {
        // Filter the db attending the user's choice
        let selectedContinent = document.querySelector('input[name="continents"]:checked').value;
        if (selectedContinent === "Europa") {
            tempDatabase = db.filter(element => element.continent.includes(selectedContinent));
        } else if (selectedContinent === "Asia") {
            tempDatabase = db.filter(element => element.continent.includes(selectedContinent));
        }
        else {
            tempDatabase = db;
        }

        console.log(selectedContinent);
        console.log(tempDatabase);
        score = 0;
        currentQuestionNum = 1;
        numberOfQuestions = document.querySelector('input[name="questions"]:checked').value;
        randomCountryName = generateRandomCountryName(tempDatabase);

        //Styling
        optionsDiv.style.display = "none";
        title.textContent = `Pregunta ${currentQuestionNum} de ${numberOfQuestions}`;
        subtitle.textContent = `¿Cuál es la capital de ${randomCountryName}?`
        input.style.opacity = 1;
        input.style.pointerEvents = "all";
        btn.style.top = "4rem";
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
        randomCountryName = generateRandomCountryName(tempDatabase);
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