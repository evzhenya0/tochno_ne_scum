// Массив вопросов будет загружаться из файла
let questions = [];

// Переменная для текущего вопроса
let currentQuestion = 0;

// Переменная для подсчета правильных ответов
let score = 0;

// Функция для отображения вопроса
function showQuestion() {
    // Если массив вопросов пуст, выводим сообщение
    if (!questions.length) {
        document.getElementById("question").textContent = "Вопросы еще не загружены.";
        return;
    }

    document.getElementById("question").textContent = questions[currentQuestion].question;
    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
}

// Функция проверки ответа
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer").value);
    const correctAnswer = questions[currentQuestion].answer;

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").textContent = "Правильно!";
    } else {
        document.getElementById("feedback").textContent = `Ошибка. Правильный ответ: ${correctAnswer}`;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        setTimeout(showQuestion, 1000); // Показ следующего вопроса через секунду
    } else {
        document.getElementById("quiz-container").innerHTML = `<h2>Вы набрали ${score} из ${questions.length}</h2>`;
    }

    document.getElementById("score").textContent = `Ваш счет: ${score}`;
}

// Загрузка вопросов из JSON-файла
async function loadQuestions(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Не удалось получить данные: ${response.status}`);

        questions = await response.json();
        console.log('Вопросы успешно загружены:', questions);
        showQuestion(); // Отображаем первый вопрос после успешной загрузки
    } catch (error) {
        console.error('Ошибка при загрузке вопросов:', error.message);
        alert('Произошла ошибка при загрузке вопросов.');
    }
}

// Вызываем функцию загрузки вопросов сразу после загрузки страницы
loadQuestions('questions.json');