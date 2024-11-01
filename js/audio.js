const audio = document.getElementById('background-audio');
audio.loop = true;

const soundButton = document.getElementById('toggle-sound');

// Перевірка, чи знаходиться користувач на першому рівні
const isFirstLevel = window.location.href.includes('level1.html');

// Отримуємо стан звуку з localStorage (якщо це не перший рівень)
let isMuted = isFirstLevel ? true : localStorage.getItem('isMuted') === 'true';

// Функція для ввімкнення/вимкнення звуку
function toggleSound() {
    const icon = soundButton.querySelector('i');
    if (isMuted) {
        audio.play();
        icon.classList.replace('fa-volume-xmark', 'fa-volume-high');
    } else {
        audio.pause();
        icon.classList.replace('fa-volume-high', 'fa-volume-xmark');
    }
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted); // Зберігаємо новий стан у localStorage
}

// Встановлення обробника події на кнопку
soundButton.addEventListener('click', toggleSound);

// Встановлення початкового стану звуку та іконки при завантаженні сторінки
window.addEventListener('load', () => {
    const icon = soundButton.querySelector('i');
    if (isMuted) {
        audio.pause();
        icon.classList.remove('fa-volume-high');
        icon.classList.add('fa-volume-xmark');
    } else {
        audio.play();
        icon.classList.remove('fa-volume-xmark');
        icon.classList.add('fa-volume-high');
    }
});
