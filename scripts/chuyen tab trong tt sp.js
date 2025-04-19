function switchTab(event, tabId) {
  // Ẩn tất cả các tab nội dung
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Bỏ class 'active' khỏi tất cả các tab
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Hiện nội dung tab được chọn
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

// Gán sự kiện click cho từng tab
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function (event) {
    const tabId = tab.getAttribute('data-tab');
    switchTab(event, tabId);
  });
});

