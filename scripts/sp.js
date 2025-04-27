// Toggle mở/đóng dropdown đúng cách
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('.dropbtn');
    const content = dropdown.querySelector('.dropdown-content');

    // Mở dropdown khi bấm vào button
    button.addEventListener('click', function (e) {
      e.stopPropagation(); // Ngăn không lan ra window
      // Đóng các dropdown khác
      document.querySelectorAll('.dropdown').forEach(dd => {
        if (dd !== dropdown) dd.classList.remove('active');
      });
      dropdown.classList.toggle('active');
    });

    // Ngăn không đóng dropdown khi bấm vào bên trong content (checkbox, label...)
    if (content) {
      content.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }
});

  // Đóng dropdown khi click ra ngoài
window.addEventListener('click', function () {
    document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('active'));
  });

  // Chỉ chọn 1 checkbox trong "Khoảng giá"
  /*const priceCheckboxes = document.querySelectorAll('#priceDropdown input[type="checkbox"]');
  priceCheckboxes.forEach(cb => {
    cb.addEventListener('change', function () {
      if (this.checked) {
        priceCheckboxes.forEach(other => {
          if (other !== this) other.checked = false;
        });
      }
    });
});*/