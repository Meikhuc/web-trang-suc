 //kich hoat icon trai tim
 function toggleFavorite() {
    const icon = document.getElementById('favorite-icon');
    icon.classList.toggle('active-heart');
}


window.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('favorite-icon');
    const isActive = localStorage.getItem('favorite') === 'true';
    if (isActive) {
        icon.classList.add('active-heart');
    }
});

function toggleFavorite() {
    const icon = document.getElementById('favorite-icon');
    icon.classList.toggle('active-heart');
    localStorage.setItem('favorite', icon.classList.contains('active-heart'));
}