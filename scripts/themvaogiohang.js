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
        quantity: 1,
        date: new Date().toLocaleDateString("vi-VN")
      };
  
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      cart.push(finalProduct);
      localStorage.setItem("cartItems", JSON.stringify(cart));
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    };
    });
    