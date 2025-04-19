document.addEventListener("DOMContentLoaded", () => {
    const icon = document.getElementById("favorite-icon");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function isFavorite(id) {
        return favorites.some(p => p.id === id);
    }

    function updateHeartIcon() {
        if (isFavorite(product.id)) {
            icon.classList.add("active-heart");
        } else {
            icon.classList.remove("active-heart");
        }
    }

    window.toggleFavorite = () => {
        const exists = isFavorite(product.id);
        if (exists) {
            favorites = favorites.filter(p => p.id !== product.id);
        } else {
            favorites.push(product);
        }
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateHeartIcon();
    };

    updateHeartIcon();
});

// Ham chuyen anh
function changeMainImage(src) {
    document.querySelector('.main-img').src = src;
}