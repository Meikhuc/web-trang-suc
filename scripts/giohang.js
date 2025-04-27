const cartItemsData = [];

const storedCart = JSON.parse(localStorage.getItem('cartItems'));
if (storedCart && storedCart.length > 0) {
    storedCart.forEach(itemData => {
        cartItemsData.push(itemData);
    });
    // localStorage.removeItem('cartItems'); // Xoá tạm bị tắt để giữ giỏ hàng khi load lại
}

// --- Sửa chỗ này ---
function formatVND(price) {
    if (typeof price === 'string') {
        price = parseInt(price.replace(/[^\d]/g, ''), 10);
    }
    if (!price) price = 0;
    return price.toLocaleString('vi-VN') + '₫';
}

function updateSummary() {
    let total = 0;

    const checkedItems = document.querySelectorAll('.cart-item input[type="checkbox"]:checked');
    checkedItems.forEach(item => {
        const qty = parseInt(item.closest('.cart-item').querySelector('.qty').value) || 0;
        const price = parseInt(item.closest('.cart-item').getAttribute('data-price'));
        total += qty * price;
    });

    document.getElementById('total-raw').textContent = formatVND(total);
    document.getElementById('subtotal').textContent = formatVND(total);
    document.getElementById('total').textContent = formatVND(total);

    const itemCount = checkedItems.length;
    document.getElementById('cart-title').textContent = `GIỎ HÀNG CỦA BẠN${itemCount > 0 ? ` (có ${itemCount} sản phẩm trong giỏ hàng)` : ''}`;

    const giftSection = document.querySelector('.gift-section');
    giftSection.style.display = itemCount > 0 ? 'block' : 'none';
}

function createCartItem(data) {
    const item = document.createElement('div');
    item.className = 'cart-item';

    // --- Sửa nhẹ chỗ này: nếu data.price là chuỗi thì cũng ép về số luôn ---
    let priceNumber = data.price;
    if (typeof priceNumber === 'string') {
        priceNumber = parseInt(priceNumber.replace(/[^\d]/g, ''), 10);
    }
    if (!priceNumber) priceNumber = 0;

    item.setAttribute('data-price', priceNumber);

    item.innerHTML = `
        <input type="checkbox" checked>
        <img src="${data.img}" alt="${data.name}">
        <div class="item-info">
            <strong>${data.name}</strong><br>
            Size: ${data.size}<br>
            Màu: ${data.color}<br>
            Ngày dự kiến nhận hàng: ${data.date}
        </div>
        <div class="quantity-control">
            <button class="minus">-</button>
            <input type="text" value="${data.quantity}" class="qty" style="width: 30px; text-align:center; border-radius: 0px;">
            <button class="plus">+</button>
        </div>
        <div class="price">
            ${formatVND(priceNumber)}
            <button class="remove-btn">×</button>
        </div>`;

    item.querySelector('.plus').addEventListener('click', () => {
        const input = item.querySelector('.qty');
        input.value = parseInt(input.value) + 1;
        updateSummary();
    });

    item.querySelector('.minus').addEventListener('click', () => {
        const input = item.querySelector('.qty');
        input.value = Math.max(1, parseInt(input.value) - 1);
        updateSummary();
    });

    item.querySelector('.qty').addEventListener('input', updateSummary);

    item.querySelector('input[type="checkbox"]').addEventListener('change', updateSummary);

    item.querySelector('.remove-btn').addEventListener('click', () => {
        item.remove();
    
        const name = data.name;
        const size = data.size;
        const color = data.color;
    
        const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCart = existingCart.filter(cartItem => {
            return !(cartItem.name === name && cartItem.size === size && cartItem.color === color);
        });
    
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
        updateSummary();
    });    

    return item;
}

window.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const giftSection = document.querySelector('.gift-section');

    cartItemsData.forEach(itemData => {
        const cartItem = createCartItem(itemData);
        cartContainer.insertBefore(cartItem, giftSection);
    });

    updateSummary();
});
