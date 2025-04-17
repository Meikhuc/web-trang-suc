fetch("../views/templates/footer.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("footer").innerHTML = data;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../css/templates/footer.css";
        document.head.appendChild(link);
    })
    .catch((error) => console.error("Lỗi load footer:", error));