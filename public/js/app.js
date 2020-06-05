import getTeamById from './components/details.js'
import {addFavorite, Delete} from './database/db.js'



document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("favorite");
  const btnFav = document.getElementById("favorite");
  const btnDel = document.getElementById("delete");
  let item = "";

  if (isFromSaved) {
    btnFav.style.display = "none";
    item = getTeamById();
    btnDel.onclick = () => {
      item.then(team => {
        Delete(team)
      })
    }
  } else {
    btnDel.style.display = "none";
    item = getTeamById();
    btnFav.onclick = () => {
      item.then((team) => {
        const apa = addFavorite(team);
      });
    };
  }
});