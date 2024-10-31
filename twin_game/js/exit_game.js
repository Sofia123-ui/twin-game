const exitButton = document.querySelector('.exit-button');
const modal = document.querySelector('.modal');
const cancelButton = document.querySelector('.modal-cancel');
const confirmButton = document.querySelector('.modal-confirm');

// Оновлюємо функціонал для кнопки "Вийти"
exitButton.addEventListener('click', () => {
    pauseTimer(); // Призупиняємо таймер
    modal.style.display = 'flex'; // Показати модальне вікно
});

// Обробка кнопки "Скасувати"
cancelButton.addEventListener('click', () => {
    resumeTimer(); // Відновлюємо таймер
    modal.style.display = 'none'; // Закрити модальне вікно
});

// Обробка кнопки "Вийти"
confirmButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Перенаправлення на index.html
});

// Функція для призупинення таймера
function pauseTimer() {
    isPaused = true;
    clearInterval(gameTimer);
}

// Функція для відновлення таймера
function resumeTimer() {
    if (isPaused) {
        isPaused = false;
        startTimer(); // Запускає таймер знову
    }
}

// Оновлення функції запуску таймера, щоб перевірити паузу
function startTimer() {
    gameTimer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                endGame(false); // Гра закінчилася, користувач програв
            }
        }
    }, 1000);
}