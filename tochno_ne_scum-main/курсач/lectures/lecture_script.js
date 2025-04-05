const lectureFiles = ["lecture1.md", "lecture2.md", "lecture3.md", "lecture4.md"];
let currentLecture = 0;

async function loadLecture(index) {
    if (index < 0 || index >= lectureFiles.length) return;

    try {
        const response = await fetch(lectureFiles[index]);
        let text = await response.text();

        // Конвертируем Markdown в HTML
        document.getElementById("lecture-content").innerHTML = marked.parse(text);
        document.getElementById("lecture-title").textContent = `Лекция ${index + 1}`;
    } catch (error) {
        console.error("Ошибка загрузки лекции:", error);
        document.getElementById("lecture-content").innerHTML = "<p>Не удалось загрузить лекцию.</p>";
    }
}

function nextLecture() {
    if (currentLecture < lectureFiles.length - 1) {
        currentLecture++;
        loadLecture(currentLecture);
    }
}

function prevLecture() {
    if (currentLecture > 0) {
        currentLecture--;
        loadLecture(currentLecture);
    }
}

// Загружаем первую лекцию при старте
loadLecture(currentLecture);
