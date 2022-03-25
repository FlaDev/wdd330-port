/**
 * @author Flavio
 * 3/22/2022
 */
class Geolocation {
  constructor() {
    this.geoAPI_KEY = "204500bdbb378d56f3430c9a8ef028ac";
  }
  /**
   *
   * @param {*} lat
   * @param {*} long
   * @returns
   */
  async searchCity(lat, long) {
    let results = null;
    await fetch(
      "http://api.positionstack.com/v1/reverse?access_key=" +
        GEOLOCATION_KEY +
        "&query=" +
        lat +
        "," +
        long +
        "&limit=1" +
        "&output=json"
    )
      .then((response) => response.json())
      .then((result) => {
        const city = result.data[0].locality;
        document.querySelector(".city").innerText = city;
        results = result.data[0];
      });
    return results;
  }

  /**
   *
   * @param {*} city
   * @returns
   */
  async findCityLocation(city) {
    let results = {
      latitude: "",
      longitude: "",
      locality: "",
      region_code: "",
    };
    let cityError = "Unable to find the city you're looking for. Try again!";
    await fetch(
      "http://api.positionstack.com/v1/forward?access_key=" +
        GEOLOCATION_KEY +
        "&query=" +
        city
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.data.length == 0) {
          document.querySelector(".city").innerText = cityError;
          return;
        }
        const city = result.data[0].locality;
        if (city === null) {
          document.querySelector(".city").innerText = cityError;
        }
        if (city) {
          document.querySelector(".city").innerText = city;
          results = result.data[0];
        }
      });

    return results;
  }
}

export const geoApi = new Geolocation();
