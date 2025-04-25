document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, title: 'Nhãn Cầu Hôn 14K', price: '8.129.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/rs600/shares/01upload/1731752863/ndino330ldia-vt-1_1732009337.png.webp', href:'/bo san pham/san_pham_1.html'},
    { id: 2, title: 'Nhãn Cầu Hôn 14K', price: '8.806.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/rs600/shares/01upload/1731752857/ndino327movt1_1731916680.png.webp', href:'/bo san pham/san_pham_1.html' },
    { id: 3, title: 'Nhãn Cầu Hôn 14K', price: '8.806.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/rs600/shares/01upload/1722651504/ncz074ldiavh1_1725507719.png.webp', href:'/bo san pham/san_pham_1.html'},
    { id: 4, title: 'Nhãn Cưới 14K Evermore', price: '14.463.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/rs600/shares/01upload/1722651432/ncz037ldia7_1723016646.png.webp', href:'/bo san pham/san_pham_1.html' },
    { id: 5, title: 'Nhãn Cưới 14K Evermore', price: '12.564.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/rs600/shares/01upload/1722651522/ncz080ldiavh1_1725509772.png.webp', href:'/bo san pham/san_pham_1.html'},
    { id: 6, title: 'Nhãn Kim Cương', price: '9.999.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/rs600/shares/01upload/1731752863/ndino330ldia-vt-1_1732009337.png.webp', href:'/bo san pham/san_pham_1.html'},
    { id: 7, title: 'Nhãn Vàng Trắng', price: '7.888.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/rs600/shares/01upload/1731752863/ndino330ldia-vt-1_1732009337.png.webp', href:'/bo san pham/san_pham_1.html'},
    { id: 8, title: 'Nhãn Vàng 14K', price: '8.129.000₫', img: 'https://cdn.huythanhjewelry.vn/storage/photos/shares/01upload/1716344629/nc841w6_1716515893.png', href:'/bo san pham/san_pham_1.html'},
    { id: 9, title: 'Nhãn Vàng 14K', price: '5.190.000₫', img: 'https://lili.vn/wp-content/uploads/2022/07/Nhan-doi-bac-dinh-da-CZ-All-Of-Love-LILI_614281_2.jpg', href:'/bo san pham/san_pham_2.html'},
    { id: 10, title: 'Nhãn Vàng Trắng', price: '3.539.000₫', img: 'https://tnj.vn/15494-large_default/day-chuyen-bac-nu-mat-trai-tim-chu-love-dinh-da-dep-dcn0421.jpg', href:'/bo san pham/san_pham_3.html' }
  ];

  let currentPage = 0;
  const itemsPerPage = 5;

  // Load favorite từ localStorage
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function isFavorite(id) {
    return favorites.some(item => item.id === id);
  }

  function toggleFavorite(product) {
    const exists = favorites.some(p => p.id === product.id);
    if (exists) {
      favorites = favorites.filter(p => p.id !== product.id);
    } else {
      favorites.push(product);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderProducts(); // cập nhật lại giao diện
  }

  function renderProducts() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const list = document.getElementById('product-list');
    if (!list) return;
    list.innerHTML = '';
  
    products.slice(start, end).forEach(p => {
      const heartClass = isFavorite(p.id) ? 'active-heart' : '';
      list.innerHTML += `
        <div class="product" style="position:relative;">
          <span class="heart-icon ${heartClass}" data-id="${p.id}" style="position:absolute;top:5px;right:10px;cursor:pointer;font-size:20px;">♥</span>
          <a href="${p.href || '#'}">
            <img src="${p.img}" alt="${p.title}">
            <div class="product-title">${p.title}</div>
            <div class="product-price">${p.price}</div>
          </a>
        </div>`;
    });

    // Gắn sự kiện click cho tim
    document.querySelectorAll('.heart-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === id);
        toggleFavorite(product);
      });
    });
  }

  document.getElementById('nextPage')?.addEventListener('click', () => {
    if ((currentPage + 1) * itemsPerPage < products.length) {
      currentPage++;
      renderProducts();
    }
  });

  document.getElementById('prevPage')?.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      renderProducts();
    }
  });

  renderProducts();
});
