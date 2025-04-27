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
  
    window.addToCart = function (selectedId) {
      const quantity = 1;
  
      const selectedProduct = window.product.find(p => p.id === selectedId);
  
      if (!selectedProduct) {
          alert("Không tìm thấy sản phẩm!");
          return;
      }
  
      const finalProduct = {
          id: selectedProduct.id,
          name: selectedProduct.name,
          img: selectedProduct.img,
          price: selectedProduct.price,
          size: selectedSize,
          color: selectedColor,
          quantity: quantity,
          date: new Date().toLocaleDateString("vi-VN")
      };
  
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  
      const existingProduct = cart.find(item => 
          item.id === selectedProduct.id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );
  
      if (existingProduct) {
          existingProduct.quantity += quantity;
      } else {
          cart.push(finalProduct);
      }
  
      localStorage.setItem("cartItems", JSON.stringify(cart));
      alert("Đã thêm sản phẩm vào giỏ hàng!");
  };  
    });
    