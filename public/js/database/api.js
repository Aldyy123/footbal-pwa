import {getTeam} from '../components/template.js'

const base_url = "https://api.football-data.org/";

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function apiUrl(url) {
  return fetch(base_url + url, {
    headers: {
      "X-Auth-Token": "299226d7e35f48a28cb64039bafaf4b4",
    },
  });
}


function getFootball() {
  if ("caches" in window) {
    caches
      .match(base_url + "v2/competitions/2021/standings")
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            data.standings.forEach((teams) => {
              getTeam(teams)
            });
          });
        }
      });
  }

  apiUrl("v2/competitions/2021/standings")
    .then(status)
    .then(json)
    .then((data) => {
      data.standings.forEach((teams) => {
        getTeam(teams)
      });
    })
    .catch(error);
}

export {getFootball, apiUrl, status, json, base_url}