document.addEventListener("DOMContentLoaded", function () {
  let selectedColor = "Vàng";
  let selectedSize = "7";

  window.adjustQty = function (change) {
    const qtyInput = document.getElementById("quantity");
    let value = parseInt(qtyInput.value) || 1;
    value += change;
    qtyInput.value = value < 1 ? 1 : value; // Nếu nhỏ hơn 1 thì giữ là 1, không cho giảm xuống 0 hoặc âm
  };

  window.selectSize = function (button) {
    document.querySelectorAll(".sizes button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedSize = button.textContent;
  };

  window.selectColor = function (button) {
    document.querySelectorAll(".colors button").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedColor = button.textContent;
  };

  window.addToCart = function () {
    const finalProduct = {
      ...window.product, // lấy từ HTML
      size: selectedSize,
      color: selectedColor,
      quantity: parseInt(document.getElementById("quantity").value) || 1,
      date: new Date().toLocaleDateString("vi-VN")
    };

    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(finalProduct);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

    // Xem thêm / thu gọn mô tả
    window.toggleMoreInfo = function () {
      const info = document.getElementById("moreInfo");
      const btn = document.getElementById("toggleButton");
      if (info.style.display === "none" || info.style.display === "") {
        info.style.display = "block";
        btn.innerText = "Thu Gọn";
      } else {
        info.style.display = "none";
        btn.innerText = "Xem Thêm";
      }
    };
  
    // Thay đổi ảnh chính
    window.changeMainImage = function (src) {
      document.querySelector(".main-img").src = src;
    };
  });
  