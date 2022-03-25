/**
 * @author Flavio
 * 3/22/2022
 * Created to store utilies functions
 */
class Utilities {
  /**
   * remove all child nodes from the Main div which holds all tasks
   * @param {*} parent
   * @returns
   */
  removeAllChildNodes(parent) {
    if (parent == null) {
      return;
    }
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  

  changeVisibility() {
    const forecastCards = document.getElementById("weatherCards");
    const cityText = document.getElementById("city").innerHTML;
    if (cityText === "") {
      forecastCards.style.visibility = "hidden";
    } else {
      forecastCards.style.visibility = "visible";
    }
  }

  getWeekDay(epoch) {
    const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekDay = new Date(epoch * 1000).getDay();
    return DAYS_OF_WEEK[weekDay];
  }
}

export const util = new Utilities();
