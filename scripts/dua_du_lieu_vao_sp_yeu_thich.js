let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function isFavorite(id) {
  return favorites.some(p => p.id === id);
}

function toggleFavorite(product) {
  const exists = isFavorite(product.id);
  if (exists) {
    favorites = favorites.filter(p => p.id !== product.id);
  } else {
    favorites.push(product);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateHeartIcons();
}

function updateHeartIcons() {
  document.querySelectorAll('.heart-icon').forEach(icon => {
    const id = parseInt(icon.dataset.id);
    if (isFavorite(id)) {
      icon.classList.add('active-heart');
    } else {
      icon.classList.remove('active-heart');
    }
  });
}

// Gắn sự kiện cho tất cả sản phẩm
document.querySelectorAll('.heart-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const product = {
      id: parseInt(icon.dataset.id),
      title: icon.dataset.title,
      price: icon.dataset.price,
      img: icon.dataset.img,
      link: icon.dataset.link
    };
    toggleFavorite(product);
  });
});

updateHeartIcons(); // cập nhật biểu tượng trái tim khi trang load


// Ham chuyen anh
function changeMainImage(src) {
    document.querySelector('.main-img').src = src;
}