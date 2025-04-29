document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("favorite-products");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function renderFavorites() {
      container.innerHTML = '';

      if (favorites.length === 0) {
        container.innerHTML = `<div class="empty-msg">Bạn chưa yêu thích sản phẩm nào!</div>`;
        return;
      }

      favorites.forEach(p => {
        container.innerHTML += `
          <div class="product">
            <span class="heart-icon" data-id="${p.id}">♥</span>
            <a href="${p.link}">
              <img src="${p.img}" alt="${p.title}">
            </a>
            <div class="product-title"><a href="${p.link}">${p.title}</a></div>
            <div class="product-price">${p.price}</div>
          </div>`;
      });

      // Xử lý hủy yêu thích
      document.querySelectorAll(".heart-icon").forEach(icon => {
        icon.addEventListener("click", (e) => {
          const id = parseInt(e.target.getAttribute("data-id"));
          favorites = favorites.filter(p => p.id !== id);
          localStorage.setItem("favorites", JSON.stringify(favorites));
          //localStorage.removeItem('favorites');
          renderFavorites(); // cập nhật lại
        });
      });
    }

    renderFavorites();
  });