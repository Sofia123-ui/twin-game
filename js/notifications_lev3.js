const backgroundAudio = document.getElementById('background-audio');
const winAudio = document.getElementById('win-audio');

// Показ модального вікна перемоги
function showWinModal() {
    const winModal = document.querySelector('.modal-win');
    winModal.style.display = 'flex';

    // Зупинка фонової музики
    backgroundAudio.pause();

    winAudio.currentTime = 0;
    winAudio.play();
    setTimeout(() => {
        winAudio.pause();
        winAudio.currentTime = 0;
    }, 16000);

    const backToMainButton = winModal.querySelector('.back-to-main');
    backToMainButton.addEventListener('click', showWarningModal);

    const nextLevelButton = winModal.querySelector('.next-level');
    nextLevelButton.addEventListener('click', () => {
        window.location.href = 'level1.html';
    });
}

// Показ попереджувального модального вікна
function showWarningModal() {
    const warningModal = document.querySelector('.modal-warning');
    warningModal.style.display = 'flex';

    const cancelWarningButton = warningModal.querySelector('.cancel-warning');
    cancelWarningButton.addEventListener('click', () => {
        warningModal.style.display = 'none';
    });

    const confirmWarningButton = warningModal.querySelector('.confirm-warning');
    confirmWarningButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Показ модального вікна закінчення часу
function showTimeOutModal() {
    const timeoutModal = document.querySelector('.modal-timeout');
    const timeoutAudio = document.getElementById('time-out-audio');

    // Відображаємо модальне вікно
    timeoutModal.style.display = 'flex';

    // Відтворюємо звук вичерпання часу
    timeoutAudio.currentTime = 0; // Почати з початку звуку
    timeoutAudio.play();

    // Кнопка для повтору гри
    const retryButton = timeoutModal.querySelector('.retry-game');
    retryButton.addEventListener('click', () => {
        timeoutModal.style.display = 'none';
        timeoutAudio.pause(); // Зупиняємо звук
        timeoutAudio.currentTime = 0; // Повертаємо на початок
        resetGame(); // Скидання гри
    });

    // Кнопка для повернення на головну сторінку
    const backToMainButton = timeoutModal.querySelector('.back-to-main-timeout');
    backToMainButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Закінчення гри (оновлене)
function endGame(hasWon) {
    lockBoard = true;
    clearInterval(gameTimer); // Зупиняємо таймер, якщо гра закінчилася
    if (hasWon) {
        showWinModal(); // Показуємо модальне вікно при перемозі
    } else {
        showTimeOutModal(); // Показуємо модальне вікно, якщо час закінчився
    }
}
