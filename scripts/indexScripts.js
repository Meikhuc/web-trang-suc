
function setupSlider(id) {
    const slider = document.getElementById(id);
    const slides = slider.children;
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 1000);
}

setupSlider('slider');
setupSlider('slider2');

const products = [
      { title: 'Nhãn Cầu Hôn 14K', price: '8.129.000₫', img: 'https://via.placeholder.com/200x200?text=SP+1' },
      { title: 'Nhãn Cầu Hôn 14K', price: '8.806.000₫', img: 'https://via.placeholder.com/200x200?text=SP+2' },
      { title: 'Nhãn Cầu Hôn 14K', price: '8.806.000₫', img: 'https://via.placeholder.com/200x200?text=SP+3' },
      { title: 'Nhãn Cưới 14K Evermore', price: '14.463.000₫', img: 'https://via.placeholder.com/200x200?text=SP+4' },
      { title: 'Nhãn Cưới 14K Evermore', price: '12.564.000₫', img: 'https://via.placeholder.com/200x200?text=SP+5' },
      { title: 'Nhãn Kim Cương', price: '9.999.000₫', img: 'https://via.placeholder.com/200x200?text=SP+6' },
      { title: 'Nhãn Vàng Trắng', price: '7.888.000₫', img: 'https://via.placeholder.com/200x200?text=SP+7' }
    ];

let currentPage = 0;
const itemsPerPage = 5;

function renderProducts() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    products.slice(start, end).forEach(p => {
        list.innerHTML += `
          <div class="product">
            <a href="#">
              <img src="${p.img}" alt="${p.title}">
              <div class="product-title">${p.title}</div>
              <div class="product-price">${p.price}</div>
            </a>
          </div>`;
      });
}

function nextPage() {
    if ((currentPage + 1) * itemsPerPage < products.length) {
        currentPage++;
    renderProducts();
    }
}

function prevPage() {
    if(currentPage > 0) {
        currentPage--;
    renderProducts();
    }
}

renderProducts();
