/**
 * @author Flavio
 * 3/22/2022
 */
class Weather {
  constructor() {
  }

  /**
   *
   * @param {*} latitude
   * @param {*} longitude
   */

  async fetchWeatherByPosition(latitude, longitude, util) {
    await fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&exclude=hourly&units=imperial&appid=" +
        WEATHER_KEY

    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data, util));
  }

  /**
   *
   * @param {*} data
   * @param {*} util
   */
  displayWeather(data, util) {
    // console.log(data);
    const { icon, description, main } = data.current.weather[0];
    const { temp, humidity } = data.current;
    let currentTemp = Math.round(temp);
    const { wind_speed } = data.current;

    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = currentTemp + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + wind_speed + " mph";

    this.updateForecast(data.daily, currentTemp, icon, main, util);
    util.changeVisibility();
  }

  /**
   *
   * @param {*} dailyData
   * @param {*} currentTemp
   * @param {*} currentIcon
   * @param {*} description
   * @param {*} util
   */
  updateForecast(dailyData, currentTemp, currentIcon, description, util) {
    const cardsSection = document.getElementById("weatherCards");
    util.removeAllChildNodes(cardsSection);
    for (let index = 0; index < 7; index++) {
      const element = dailyData[index];
      // Forecast Div
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("col");
      cardDiv.classList.add("card-forecast");
      cardDiv.id = "day-" + index;

      // H4
      let cardH4 = document.createElement("h4");
      cardH4.id = "h4-" + index;
      // H1
      let cardH1 = document.createElement("h1");
      cardH1.id = "h1-" + index;

      // Img
      let img = document.createElement("img");

      let weatherDescription = element.weather[0].main;

      if (index == 0) {
        cardH4.innerHTML = "Today";
        cardH1.innerHTML = currentTemp + "°F";
        img.src = "https://openweathermap.org/img/wn/" + currentIcon + ".png";
        weatherDescription = description;
      } else {
        cardH4.innerHTML = util.getWeekDay(element.dt);
        cardH1.innerHTML = Math.round(element.temp.day) + "°F";
        img.src =
          "https://openweathermap.org/img/wn/" +
          element.weather[0].icon +
          ".png";
      }

      //condition
      let conditionDiv = document.createElement("div");
      conditionDiv.innerHTML = weatherDescription;

      // Icon
      let imgDiv = document.createElement("div");
      imgDiv.classList.add("flex");
      // Img
      img.classList.add("icon");
      img.id = "icon" + index;
      imgDiv.appendChild(img);
      imgDiv.appendChild(conditionDiv);

      //min
      let minDiv = document.createElement("div");
      minDiv.innerHTML = "Min: " + Math.round(element.temp.min) + "°F";
      // max
      let maxDiv = document.createElement("div");
      maxDiv.innerHTML = "Max: " + Math.round(element.temp.max) + "°F";

      cardDiv.appendChild(cardH4);
      cardDiv.appendChild(cardH1);
      cardDiv.appendChild(imgDiv);
      cardDiv.appendChild(minDiv);
      cardDiv.appendChild(maxDiv);
      cardsSection.appendChild(cardDiv);
    }
  }
}

export const weather = new Weather();
