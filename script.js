

let palabras = [
  "Agua",
  "Casa",
  "Silla",
  "Perro",
  "Gato",
  "Ratón",
  "Pared",
  "Reloj",
  "Calle",
  "Aire",
  "Mesa",
  "Techo",
  "Luz",
  "Fuego",
  "Puerta",
  "Cielo",
  "Tierra",
  "Flor",
  "Luna",
  "Sol",
  "Cara",
  "Ojo",
  "Nariz",
  "Boca",
  "Mano",
  "Pie",
  "Brazo",
  "Pierna",
  "Oreja",
  "Dedo",
  "Llave",
  "Papel",
  "Libro",
  "Plato",
  "Taza",
  "Vaso",
  "Cuchara",
  "Tenedor",
  "Cuchillo",
  "Pelota",
  "Globo",
  "Soltero",
];

let container = document.querySelector(".container");
let winScreen = document.querySelector(".win-screen");
let submitButton = document.querySelector(".submit");
let inputCount, tryCount, inputRow;
let backSpaceCount = 0;
let randomWord, finalWord;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};


const startGame = async () => {
  winScreen.classList.add("hide");
  container.innerHTML = "";
  inputCount = 0;
  successCount = 0;
  tryCount = 0;
  finalWord = "";


  for (let i = 0; i < 6; i++) {
    let inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    for (let j = 0; j < 5; j++) {

      inputGroup.innerHTML += `<input type="text" class="input-box" onkeyup="checker(event)" maxlength="1" disabled>`;
    }
    container.appendChild(inputGroup);
  }
  inputRow = document.querySelectorAll(".input-group");
  inputBox = document.querySelectorAll(".input-box");
  updateDivConfig(inputRow[tryCount].firstChild, false);
  randomWord = getRandomWord();
  console.log(randomWord);
};


const getRandomWord = () =>
  palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();


const updateDivConfig = (element, disabledStatus) => {
  element.disabled = disabledStatus;
  if (!disabledStatus) {
    element.focus();
  }
};


const checker = async (e) => {
  let value = e.target.value.toUpperCase();
  //Deshabilitar la entrada actual
  updateDivConfig(e.target, true);
  if (value.length == 1) {
    if (inputCount <= 4 && e.key != "Backspace") {
      finalWord += value;
      if (inputCount < 4) {
        updateDivConfig(e.target.nextSibling, false);
      }
    }
    inputCount += 1;
  } else if (value.length == 0 && e.key == "Backspace") {
    finalWord = finalWord.substring(0, finalWord.length - 1);
    if (inputCount == 0) {
      updateDivConfig(e.target, false);
      return false;
    }
    updateDivConfig(e.target, true);
    e.target.previousSibling.value = "";
    updateDivConfig(e.target.previousSibling, false);
    inputCount = -1;
  }
};


window.addEventListener("keyup", (e) => {
  if (inputCount > 4) {
    if (isTouchDevice()) {
      submitButton.classList.remove("hide");
    }
    if (e.key == "Enter") {
      validateWord();
    } else if (e.key == "Backspace") {
      inputRow[tryCount].lastChild.value = "";
      finalWord = finalWord.substring(0, finalWord.length - 1);
      updateDivConfig(inputRow[tryCount].lastChild, false);
      inputCount -= 1;
    }
  }
});


const validateWord = async () => {
  if (isTouchDevice()) {
    submitButton.classList.add("hide");
  }

  let successCount = 0;

  for (let i in randomWord) {
    if (finalWord[i] == randomWord[i]) {
      inputRow[tryCount].children[i].classList.add("correct");
      successCount += 1;
    } else {
      inputRow[tryCount].children[i].classList.add("incorrect");
    }
  }

  tryCount += 1;
  if (successCount == 5) {
    setTimeout(() => {
      winScreen.classList.remove("hide");
      winScreen.innerHTML = `
        <span>Total intentos: ${tryCount}</span>
        <button onclick="startGame()">Nuevo Juego</button>
        `;
    }, 1000);
  } else {
    inputCount = 0;
    finalWord = "";
    if (tryCount == 6) {
      tryCount = 0;
      winScreen.classList.remove("hide");
      winScreen.innerHTML = `
        <span>Perdiste</span>
        <button onclick="startGame()">Nuevo Juego</button>
        `;
      return false;
    }
    updateDivConfig(inputRow[tryCount].firstChild, false);
  }
  inputCount = 0;
};

window.onload = startGame;