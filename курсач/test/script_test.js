let questions = [];
let currentQuestion = 0;
let score = 0;

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        questions = await response.json();
        showQuestion();
    } catch (error) {
        console.error("Ошибка загрузки вопросов:", error);
        document.getElementById("quiz-container").innerHTML = "<p>Не удалось загрузить вопросы.</p>";
    }
}

function showQuestion() {
    document.getElementById("question").textContent = questions[currentQuestion].question;
    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("submit-btn").disabled = false;
}

function checkAnswer() {
    const answerInput = document.getElementById("answer");
    const submitBtn = document.getElementById("submit-btn");

    let userAnswer = parseInt(answerInput.value);
    let correctAnswer = questions[currentQuestion].answer;

    submitBtn.disabled = true;

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").textContent = "Правильно!";
    } else {
        document.getElementById("feedback").textContent = `Ошибка. Правильный ответ: ${correctAnswer}`;
    }

    document.getElementById("score").textContent = `Ваш счет: ${score}`;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        setTimeout(showQuestion, 1000);
    } else {
        setTimeout(() => {
            document.getElementById("quiz-container").innerHTML = `<h2>Вы набрали ${score} из ${questions.length}</h2>`;
        }, 1000);
    }
}

// Загружаем вопросы при старте
loadQuestions();