let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function isFavorite(id) {
  return favorites.includes(id);
}

function toggleFavorite(id) {
  if (isFavorite(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateHeartIcons();
}

function updateHeartIcons() {
  document.querySelectorAll('.heart-icon').forEach(icon => {
    const id = parseInt(icon.getAttribute('data-id'));
    if (isFavorite(id)) {
      icon.classList.add('active-heart');
    } else {
      icon.classList.remove('active-heart');
    }
  });
}

// Gắn sự kiện sau khi DOM đã load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.heart-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const id = parseInt(icon.dataset.id);
      toggleFavorite(id);
    });
  });

  updateHeartIcons(); // cập nhật trạng thái trái tim khi load
});


// Ham chuyen anh
function changeMainImage(src) {
    document.querySelector('.main-img').src = src;
}