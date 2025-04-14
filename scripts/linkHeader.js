fetch("../views/templates/header.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("header").innerHTML = data;
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../css/templates/header.css";
        document.head.appendChild(link);
    })
    .catch((error) => console.error("Lỗi load header:", error));
