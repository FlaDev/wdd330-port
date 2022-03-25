/**
 * @author Flavio
 * WDD330
 */

import { localStorage } from "./ls.js";
import { weather } from "./weather.js";
import { geoApi } from "./geolocation.js";
import { util } from "./util.js";

window.addEventListener("load", () => {
  util.changeVisibility();
  loadSearchHist();
});




document.querySelector(".search button").addEventListener("click", function () {
  search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      search();
    }
  });

document.querySelector("#myLocation").addEventListener("click", function () {
  getWeatherByGeolocation();
});

/**
 * 
 */
function search() {
  getWeatherByCity(document.querySelector(".search-bar").value);
}

/**
 * 
 * @param {*} city 
 * @returns 
 */
async function getWeatherByCity(city) {
  const { latitude, longitude, locality, region_code } =
    await geoApi.findCityLocation(city);
  if (!latitude) return;
  await weather.fetchWeatherByPosition(latitude, longitude, util);
  add2History(locality, region_code);
}

/**
 * 
 * @param {*} locality 
 * @param {*} region_code 
 */
function add2History(locality, region_code) {
  localStorage.addIntoStorage(locality, region_code);
  loadSearchHist();
  // document.querySelector(".city").innerText = cityError;
  document.getElementById("searchBar").value = "";
}

/**
 * 
 */
async function getWeatherByGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (location) => {
        const { locality, region_code } = await geoApi.searchCity(
          location.coords.latitude,
          location.coords.longitude
        );
        await weather.fetchWeatherByPosition(
          location.coords.latitude,
          location.coords.longitude,
          util
        );
        add2History(locality, region_code);
      },
      (err) => {
        console.log(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else {
    window.alert("Unable to get Location!");
  }
}

/**
 * 
 */
function loadSearchHist() {
  const cardHistDiv = document.getElementById("search-history");
  util.removeAllChildNodes(cardHistDiv);
  let storage = localStorage.loadStorageContent().reverse();

  const hDiv = document.createElement("div");
  const h5 = document.createElement("h5");
  h5.innerHTML = "Recent Searches";

  hDiv.appendChild(h5);
  cardHistDiv.appendChild(hDiv);

  if (storage.length == 0) {
    const p = document.createElement("p");
    p.innerHTML = "No recent searches ...";
    p.classList.add("search-text");
    cardHistDiv.appendChild(p);
  }

  storage.forEach((element) => {
    let jsonContent = JSON.parse(element);

    const histDiv = document.createElement("div");
    const link = document.createElement("a");

    link.href = "#";
    let locality = jsonContent.city + ", " + jsonContent.stateCode;
    link.title = "Reload " + locality + " weather results";
    link.innerHTML = locality;

    link.addEventListener("click", (func) => {
      func.preventDefault();
      getWeatherByCity(locality);
    });
    histDiv.appendChild(link);
    cardHistDiv.appendChild(histDiv);
  });
}
