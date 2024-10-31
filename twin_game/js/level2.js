const cardsArray = [
    { img: 'img/fish.png', id: 1 }, { img: 'img/fish.png', id: 2 },
    { img: 'img/castle_circle.png', id: 3 }, { img: 'img/castle_circle.png', id: 4 },
    { img: 'img/crown.png', id: 5 }, { img: 'img/crown.png', id: 6 },
    { img: 'img/diamond.png', id: 7 }, { img: 'img/diamond.png', id: 8 },
    { img: 'img/dove.png', id: 9 }, { img: 'img/dove.png', id: 10 },
    { img: 'img/fire.png', id: 11 }, { img: 'img/fire.png', id: 12 },
    { img: 'img/green_leaf.png', id: 13 }, { img: 'img/green_leaf.png', id: 14 },
    { img: 'img/star_solid.png', id: 15 }, { img: 'img/star_solid.png', id: 16 },
    { img: 'img/star_border.png', id: 17 }, { img: 'img/star_border.png', id: 18 },
    { img: 'img/paw.png', id: 19 }, { img: 'img/paw.png', id: 20 },
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let gameTimer;
let timeLeft = 90;
let isPaused = false;

const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');

// Функція для створення і відображення карток
function createBoard() {
    shuffleArray(cardsArray);
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.img = card.img;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = card.img;
        cardElement.appendChild(frontFace);

        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        backFace.innerHTML = `<svg width="50" height="50" viewBox="0 0 102 93" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M76.958 0.4375C79.7373 0.4375 82.3327 1.82654 83.8744 4.13903L100.923 29.7123C101.967 31.2779 102.092 33.2828 101.25 34.9657C91.9208 53.6247 78.9554 70.2302 63.1162 83.8066L54.8004 90.935C52.6135 92.8093 49.3868 92.8093 47.1999 90.935L38.8841 83.8066C23.0448 70.2302 10.0796 53.6247 0.750168 34.9657C-0.0915298 33.2828 0.0333939 31.2779 1.07697 29.7123L18.1257 4.13903C19.6675 1.82654 22.2629 0.4375 25.0421 0.4375H76.958ZM77.946 8.09127C77.7258 7.76095 77.355 7.5625 76.958 7.5625H65.8439L74.9407 29.3949C75.1502 29.8978 75.3084 30.4164 75.415 30.9431C78.7582 30.6943 82.0985 30.3943 85.4349 30.0431L92.112 29.3403L77.946 8.09127ZM92.4265 36.4715C83.9078 52.099 72.6591 66.0891 59.2022 77.7732L74.0483 38.1843C78.0969 37.906 82.1417 37.554 86.1807 37.1289L92.4265 36.4715ZM66.2722 38.6284L50.9999 79.354L35.7277 38.6284C45.9041 39.0911 56.0962 39.0911 66.2722 38.6284ZM27.952 38.1843L42.7976 77.7732C29.3409 66.0891 18.0924 52.099 9.57376 36.4715L15.8195 37.1289C19.8585 37.554 23.9031 37.906 27.952 38.1843ZM9.88821 29.3403L16.5653 30.0431C19.9017 30.3943 23.2419 30.6943 26.5854 30.9431C26.6918 30.4164 26.85 29.8978 27.0595 29.3949L36.1562 7.5625H25.0421C24.645 7.5625 24.2745 7.76095 24.0541 8.09132L9.88821 29.3403ZM33.9394 31.4077C45.3056 31.998 56.6947 31.998 68.0607 31.4077L58.1249 7.5625H43.8749L33.9394 31.4077Z" fill="#966CCB"/>
        </svg>`;
        
        cardElement.appendChild(backFace);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    startTimer();
}

// Перемішування карт
function shuffleArray(array) {
    array.sort(() => 0.5 - Math.random());
}

// Перевертання картки
function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

// Перевірка на збіг
function checkForMatch() {
    if (firstCard.dataset.img === secondCard.dataset.img) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => endGame(true), 500);
        }
    } else {
        unflipCards();
    }
}

// Деактивація карт, якщо вони збіглися
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    setTimeout(() => {
        firstCard.style.visibility = 'hidden';
        secondCard.style.visibility = 'hidden';
        resetBoard();
    }, 500);
}

// Закриття карт, якщо вони не збіглися
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Запуск таймера
function startTimer() {
    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            endGame(false); // Гра закінчилася через закінчення часу
        }
    }, 1000);
}

// Оновлення відображення таймера
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = `Час: ${formattedMinutes}:${formattedSeconds}`;
}

// Скидання гри
function resetGame() {
    clearInterval(gameTimer); // Зупиняємо попередній таймер
    timeLeft = 90; // Встановлюємо значення таймера на 1.5 хвилини для другого рівня
    updateTimerDisplay();
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    createBoard(); // Перезапуск гри
}

// Скидання змінних
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Початок гри
createBoard();
