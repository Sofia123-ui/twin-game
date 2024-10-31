// Показ модального вікна перемоги
function showWinModal() {
    const winModal = document.querySelector('.modal-win');
    winModal.style.display = 'flex';

    const backToMainButton = winModal.querySelector('.back-to-main');
    backToMainButton.addEventListener('click', showWarningModal);

    const nextLevelButton = winModal.querySelector('.next-level');
    nextLevelButton.addEventListener('click', () => {
        window.location.href = 'level2.html';
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

// Закінчення гри (оновлене)
function endGame(hasWon) {
    lockBoard = true;
    clearInterval(gameTimer); // Зупиняємо таймер, якщо гра закінчилася
    if (hasWon) {
        showWinModal();
    } else {
        alert('Час вичерпано! Спробуйте ще раз.'); // При бажанні також можна зробити кастомним
        resetGame();
    }
}