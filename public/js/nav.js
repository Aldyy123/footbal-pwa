import { getFootball, apiUrl } from "./database/api.js";
import getFavorites from "./components/favorite.js";

document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems, { edge: "right" });
  loadNav();

  function loadNav() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav , .sidenav").forEach(function (elm) {
          elm.innerHTML = xhr.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", (event) => {
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhr.open("GET", "nav.html", true);
    xhr.send();
  }

  // Loaded Page
  let page = window.location.hash.substr(1);
  if (page === "") page = "beranda";
  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const content = document.querySelector("#body-content");

        if (page == "beranda") {
          getFootball();
        } else if (page == "favorite") {
          getFavorites();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
