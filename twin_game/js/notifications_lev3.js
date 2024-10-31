// Показ модального вікна перемоги
function showWinModal() {
    const winModal = document.querySelector('.modal-win');
    winModal.style.display = 'flex';

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
    timeoutModal.style.display = 'flex';

    const retryButton = timeoutModal.querySelector('.retry-game');
    retryButton.addEventListener('click', () => {
        timeoutModal.style.display = 'none';
        resetGame();
    });

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
