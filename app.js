// DOM Elements and Global Variables

let elQuestionScreen = document.getElementById("questionscreen");
let elWelcomeScreen = document.getElementById("welcomescreen");
let elGoodbyeScreen = document.getElementById("goodbyescreen");
let elUserResponseScreen = document.getElementById("user_responsescreen");
let elAlreadyAnsweredScreen = document.getElementById("alreadyansweredscreen");
let elWelcomeBtn = document.getElementById("welcome_btn");
let elBackToStartBtns = document.querySelectorAll(".backToStart_btn");
let elResponseBtn = document.getElementById("responses_btn");
let elVolverBtn = document.getElementById("volver_btn");
let elNumberOfQuestions = document.getElementById("numberOfQuestions");
let elUserNameView = document.getElementById("userNameView");
let valUserName = "";

// Initiate Storage Arrays
if (localStorage.getItem("usuariosEncuesta") == null) {
  localStorage.setItem("usuariosEncuesta", JSON.stringify([]));
}
if (sessionStorage.getItem("usuariosEncuesta") == null) {
  sessionStorage.setItem("usuariosEncuesta", JSON.stringify([]));
}

function Question(title, answers) {
  this.title = title;
  this.answers = answers;
  this.getElement = function () {
    let questionNumber = document.createElement("h2");
    questionNumber.textContent = `Pregunta ${quiz.indexCurrentQuestion + 1}/${
      quiz.questions.length
    }`;
    let questionTitle = document.createElement("h3");
    questionTitle.textContent = this.title;
    let questionAnswers = document.createElement("ul");
    questionAnswers.classList.add("question__answer");

    this.answers.forEach((answer, index) => {
      let elAnswer = document.createElement("li");
      elAnswer.classList.add("answer");
      elAnswer.textContent = answer;
      elAnswer.id = index;
      elAnswer.addEventListener("click", this.enterAnswer);
      questionAnswers.append(elAnswer);
    });

    elQuestionScreen.append(questionNumber);
    elQuestionScreen.append(questionTitle);
    elQuestionScreen.append(questionAnswers);
  };
  this.enterAnswer = (event) => {
    let selectedAnswer = event.target.id;
    let usersArray = JSON.parse(localStorage.getItem("usuariosEncuesta"));
    usersArray[usersArray.length - 1].answers.push([
      quiz.indexCurrentQuestion,
      selectedAnswer,
    ]);
    localStorage.setItem("usuariosEncuesta", JSON.stringify(usersArray));

    elQuestionScreen.textContent = "";
    if (
      ((quiz.indexCurrentQuestion == 1 ||
        quiz.indexCurrentQuestion == 4 ||
        quiz.indexCurrentQuestion == 7 ||
        quiz.indexCurrentQuestion == 10) &&
        selectedAnswer == 1) ||
      quiz.indexCurrentQuestion == 2 ||
      quiz.indexCurrentQuestion == 5 ||
      quiz.indexCurrentQuestion == 8 ||
      quiz.indexCurrentQuestion == 11
    ) {
      quiz.indexCurrentQuestion += 2;
    } else {
      quiz.indexCurrentQuestion++;
    }

    console.log(quiz.indexCurrentQuestion);
    quiz.showCurrentQuestion();
  };
}

function Quiz() {
  this.questions = [];
  this.indexCurrentQuestion = 0;
  this.addQuestions = function (questions) {
    questions.forEach((question) => {
      this.questions.push(question);
    });
  };
  this.showCurrentQuestion = function () {
    if (this.indexCurrentQuestion < this.questions.length) {
      this.questions[this.indexCurrentQuestion].getElement();
    } else {
      elQuestionScreen.style.display = "none";
      elGoodbyeScreen.style.display = "block";
    }
  };
}

let question1 = new Question(
  "Cuán satisfech@ está con nuestra atención al cliente?",
  ["Muy satisfech@", "medianamente satisfech@", "nada satisfech@"]
);
let question2 = new Question(
  "Usted accedió a nuestra web desde un computador o desde un celular?",
  ["Desde un computador", "Desde un celular"]
);
let question3 = new Question(
  "Su computador muestra nuestro sitio web de una manera accesible y agradable?",
  ["Sí", "No"]
);
let question4 = new Question(
  "Su celular muestra nuestro sitio web de una manera accesible y agradable?",
  ["Sí", "No"]
);
let question5 = new Question("Usted es hombre o mujer?", ["Hombre", "Mujer"]);
let question6 = new Question(
  "El sitio web se mostró en color azul para usted?",
  ["Sí", "No"]
);
let question7 = new Question(
  "El sitio web se mostró en color rosado para usted?",
  ["Sí", "No"]
);
let question8 = new Question("Le gusta la música country o rock?", [
  "Country",
  "Rock",
]);
let question9 = new Question("El sitio reprodujo música country para usted?", [
  "Sí",
  "No",
]);
let question10 = new Question("El sitio reprodujo música rock para usted?", [
  "Sí",
  "No",
]);
let question11 = new Question("Usted tiene cuenta de correo Gmail o Yahoo?", [
  "Gmail",
  "Yahoo",
]);
let question12 = new Question(
  "Nuestro sitio web le conectó con su cuenta Gmail?",
  ["Sí", "No"]
);
let question13 = new Question(
  "Nuestro sitio web le conectó con su cuenta Yahoo?",
  ["Sí", "No"]
);
let question14 = new Question(
  "Nuestro personal estuvo presente cuando usted necesitó ayuda?",
  ["Sí", "No", "No necesité ayuda"]
);
let question15 = new Question(
  "Prefiere acceder a nuestra tienda personalmente o de manera online?",
  ["En persona", "Online"]
);
let question16 = new Question("Cuán satisfech@ está con nuestra página web?", [
  "Muy satisfech@",
  "medianamente satisfech@",
  "nada satisfech@",
]);

let question17 = new Question(
  "Usted logró realizar la transacción que deseaba desde nuestra página web?",
  ["Sí", "No"]
);

let question18 = new Question(
  "Cuánto tiempo tiene usted siendo nuestr@ cliente?",
  ["Soy cliente nuev@", "Meses", "Años"]
);

let question19 = new Question("Cuántas cuentas tiene usted con nosotros?", [
  "Una",
  "Dos",
  "Más de dos",
]);

let question20 = new Question("Le pareció demasiado larga esta encuesta?", [
  "Sí",
  "No",
]);

let quiz = new Quiz();
quiz.addQuestions([
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9,
  question10,
  question11,
  question12,
  question13,
  question14,
  question15,
  question16,
  question17,
  question18,
  question19,
  question20,
]);

elNumberOfQuestions.textContent = quiz.questions.length;

// Check if user left an ongoing poll
function checkIfOngoingPoll() {
  let usersArray = JSON.parse(localStorage.getItem("usuariosEncuesta"));
  if (
    usersArray.length >= 1 &&
    usersArray[usersArray.length - 1].answers.length >= 1 &&
    usersArray[usersArray.length - 1].answers.length < 16
  ) {
    elWelcomeScreen.style.display = "none";
    elQuestionScreen.style.display = "block";
    elUserNameView.style.display = "block";

    answerArrayEl1 = parseInt(
      usersArray[usersArray.length - 1].answers[
        usersArray[usersArray.length - 1].answers.length - 1
      ][0]
    );
    answerArrayEl2 = parseInt(
      usersArray[usersArray.length - 1].answers[
        usersArray[usersArray.length - 1].answers.length - 1
      ][1]
    );
    let currentPollQuestion = answerArrayEl1;
    let selectedAnswer = answerArrayEl2;

    if (
      ((currentPollQuestion == 1 ||
        currentPollQuestion == 4 ||
        currentPollQuestion == 7 ||
        currentPollQuestion == 10) &&
        selectedAnswer == 1) ||
      currentPollQuestion == 2 ||
      currentPollQuestion == 5 ||
      currentPollQuestion == 8 ||
      currentPollQuestion == 11
    ) {
      quiz.indexCurrentQuestion = parseInt(answerArrayEl1 + 2);
    } else {
      quiz.indexCurrentQuestion = parseInt(answerArrayEl1 + 1);
    }
    valUserName = usersArray[usersArray.length - 1].username;
    elUserNameView.innerHTML =
      "<span><strong>Usuario:</strong> " + valUserName + "</span>";
    quiz.showCurrentQuestion();
  }
}

checkIfOngoingPoll();

// Buttons and their functions

const seeFirstQuestion = () => {
  valUserName = document.getElementById("enter_username").value;
  if (!valUserName.length) valUserName = "Anónimo";

  let usersSessionArray = JSON.parse(
    sessionStorage.getItem("usuariosEncuesta")
  );
  if (usersSessionArray.length >= 1) {
    usersSessionArray.forEach((user) => {
      if (valUserName == user.username) {
        elWelcomeScreen.style.display = "none";
        elAlreadyAnsweredScreen.style.display = "block";
      }
    });
    return;
  }

  elWelcomeScreen.style.display = "none";
  elQuestionScreen.style.display = "block";
  elUserNameView.style.display = "block";

  let usersArray = JSON.parse(localStorage.getItem("usuariosEncuesta"));
  usersArray.push({ username: valUserName, answers: [] });

  localStorage.setItem("usuariosEncuesta", JSON.stringify(usersArray));

  elUserNameView.innerHTML =
    "<span><strong>Usuario:</strong> " + valUserName + "</span>";
  quiz.showCurrentQuestion();
};

elWelcomeBtn.addEventListener("click", seeFirstQuestion);

const returnToStart = () => {
  elWelcomeScreen.style.display = "block";
  elQuestionScreen.style.display = "none";
  elGoodbyeScreen.style.display = "none";
  elUserNameView.style.display = "none";
  elAlreadyAnsweredScreen.style.display = "none";
  quiz.indexCurrentQuestion = 0;

  if (sessionStorage.getItem("usuariosEncuesta") === null) {
    sessionStorage.setItem("usuariosEncuesta", JSON.stringify([]));
  }

  let usersSessionArray = JSON.parse(
    sessionStorage.getItem("usuariosEncuesta")
  );
  usersSessionArray.push({ username: valUserName });
  sessionStorage.setItem("usuariosEncuesta", JSON.stringify(usersSessionArray));
};

elBackToStartBtns.forEach((btn) => {
  btn.addEventListener("click", returnToStart);
});

const volverAlInicio = () => {
  elUserResponseScreen.style.display = "none";
  elWelcomeScreen.style.display = "block";
};

const showResponses = () => {
  elUserResponseScreen.style.display = "block";
  elWelcomeScreen.style.display = "none";
  elUserResponseScreen.textContent = "";

  let responseTitle = document.createElement("h1");
  responseTitle.textContent = "Respuestas de otros usuarios";
  elUserResponseScreen.append(responseTitle);

  let volverBtn = document.createElement("button");
  volverBtn.id = "volver_btn";
  volverBtn.textContent = "Volver";

  if (localStorage.getItem("usuariosEncuesta") === null) {
    let p = document.createElement("p");
    p.textContent = "No hay respuestas de otros usuarios";
    elUserResponseScreen.append(p);

    elUserResponseScreen.append(volverBtn);
    volverBtn.addEventListener("click", volverAlInicio);
    return;
  }

  let usersArray = JSON.parse(localStorage.getItem("usuariosEncuesta"));
  usersArray.forEach((user) => {
    let table = document.createElement("table");
    let tableHeader = document.createElement("th");
    tableHeader.colSpan = 2;
    tableHeader.textContent = `Usuario: ${user.username}`;

    let tableBody = document.createElement("tbody");
    user.answers.forEach((answer) => {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");

      td1.textContent = quiz.questions[answer[0]].title;
      td2.textContent = quiz.questions[answer[0]].answers[answer[1]];

      tr.append(td1);
      tr.append(td2);
      tableBody.append(tr);
      elUserResponseScreen.append(table);
      table.append(tableHeader);
      table.append(tableBody);
    });
  });

  elUserResponseScreen.append(volverBtn);
  volverBtn.addEventListener("click", volverAlInicio);
};

elResponseBtn.addEventListener("click", showResponses);
