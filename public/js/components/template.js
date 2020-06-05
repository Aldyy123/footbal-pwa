function getTeam(data) {
  let teamHTML = "";
  data.table.forEach((teams) => {
    const photo = teams.team.crestUrl;
    const id = teams.team.id;
    const name = teams.team.name;

    teamHTML += `
        <div class="card hoverable">
          <div class="card-image">
            <img src="${photo}">
          </div>
          <div class="card-content">
            <span class="card-title center-align black-text">${name}</span>
            <p class="description-profile">
              <span>Permainan : ${teams.playedGames}</span>
              <span>Menang: ${teams.won}</span>
              <span>Kalah: ${teams.lost}</span>
            </p>
          </div>
          <div class="card-action">
            <a href="./details.html?id=${id}" class="black-text">Cek Profile</a>
          </div>
        </div>
        `;
  });

  document.querySelector(".team").innerHTML = teamHTML;
}

function templates(data) {
  let template = "";

  template += `
  <div class="card">
  <img
    src="${data.crestUrl}"
  />
  <div class="team-name">
    <h4>${data.name}</h4>
  </div>
</div>

<div class="contact">
  <div class="list-player">
    <h4 class="center-align">List Pemain</h4>
    <table>
      <tr class="cyan">
        <th class="center-align">Nama</th>
        <th class="center-align">Posisi</th>
        <th class="center-align">Kebangsaan</th>
        <th class="center-align">Nomer</th>
      </tr>
      <tbody class="pemain">
        
      </tbody>
    </table>
  </div>
  <div class="card">
    <div class="title-contact">
      <h4>Info contact</h4>
    </div>
    <p>
      <span><i class="material-icons small">streetview</i> ${data.address}</span>
      <span><i class="material-icons small">phone</i> ${data.phone}</span>
      <span><i class="material-icons small">web</i> <a href="${data.website}">${data.website}</a></span>
      <span><i class="material-icons small">email</i> <a href="${data.email}">${data.email}</a></span>
    </p>
  </div>
</div>
  `;
  document.querySelector(".details").innerHTML = template;
}

function players(data) {
  let add = "";
  data.squad.forEach((player) => {
    add += `
    <tr>
      <td class="center-align">${player.name}</td>
      <td class="center-align">${player.position}</td>
      <td class="center-align">${player.nationality}</td>
      <td class="center-align">${player.shirtNumber}</td>
    </tr>
`;
  });
  document.querySelector(".pemain").innerHTML = add;
}

export {getTeam, templates, players}
