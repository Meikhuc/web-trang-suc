document.addEventListener("DOMContentLoaded", function () {
    let selectedColor = "Vàng";
  
    // Tăng/giảm số lượng
    window.adjustQty = function (change) {
      const qtyInput = document.getElementById("quantity");
      let value = parseInt(qtyInput.value) || 1;
      value += change;
      qtyInput.value = value < 1 ? 1 : value;
    };
  
    // Chọn màu
    window.selectColor = function (button) {
      document.querySelectorAll(".colors button").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedColor = button.textContent;
    };
  
    // Thêm vào giỏ hàng
    window.addToCart = function () {
      const product = {
        name: "Nhẫn cưới Vàng 14K đá CZ",
        img: document.querySelector(".main-img").src,
        price: 4679000,
        quantity: parseInt(document.getElementById("quantity").value) || 1,
        color: selectedColor,
        date: new Date().toLocaleDateString("vi-VN")
      };
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      cart.push(product);
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
  