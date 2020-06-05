import {apiUrl, status, json, base_url} from '../database/api.js'
import {templates, players} from './template.js'

function getTeamById() {
  return new Promise((resolve, reject) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "v2/teams/" + idParam).then((response) => {
        if (response) {
          response.json().then((data) => {
            templates(data)

            players(data);
            resolve(data);
          });
        }
      });
    }

    apiUrl("v2/teams/" + idParam)
      .then(status)
      .then(json)
      .then((data) => {
        templates(data)

        players(data);
        resolve(data);
      });
  });
}

export default getTeamById