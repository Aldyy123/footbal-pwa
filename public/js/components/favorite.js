import {getAll} from '../database/db.js'

function getFavorites() {
  getAll().then((teams) => {
    let teamHTML = "";
    teams.forEach((team) => {
      const photo = team.crestUrl;
      const id = team.id;
      const nama = team.name;

      teamHTML += `
          <div class="card hoverable">
            <div class="card-image">
              <img src="${photo}">
            </div>
            <div class="card-content">
              <span class="card-title center-align black-text">${nama}</span>
            </div>
            <div class="card-action">
              <a href="./details.html?id=${id}&favorite=true" class="black-text">Cek Profile</a>
            </div>
          </div>
          `;
    });
    document.querySelector(".team").innerHTML = teamHTML;
  });
}

export default getFavorites