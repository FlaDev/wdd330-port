/**
 * Storage Class
 * Storage Operations
 * author: Flavio 
 * 
 */
class Storage {
  constructor() {
    this.storage = window.localStorage;
  }

  /**
   * Load all stored items
   * @returns Stored objects
   */
  loadStorageContent() {
    let contentObjs = [];
    let keys = Object.keys(this.storage);
    keys.sort();
    keys.forEach((key) => {
        let obj = this.storage.getItem(key);
      if (JSON.parse(obj).appTag) {
        contentObjs.push(obj);
      }
    });
    
    return contentObjs;
  }

  /**
   * Add items to local storage
   */
  addIntoStorage(city, stateCode) {
    let appID = new Date().getTime();
    let searchObj = {
      appTag: "WeatherNOW",
      city: city,
      stateCode: stateCode,
      searchTime: appID,
    };
    // console.log('Adding item to storage --> ' + contentObj.id);
    this.removeDuplicate(searchObj);
    this.storage.setItem(appID, JSON.stringify(searchObj));
  }

  /**
   * 
   * @param {*} newObj 
   */
  removeDuplicate(newObj){
    let content = this.loadStorageContent();
    let removed = false;
    content.forEach(element => {
        let jsonContent = JSON.parse(element);
        if (jsonContent.city === newObj.city){
            this.removeFromStorage(jsonContent.searchTime);
            removed = true;
        }
    });

    if (!removed && content.length == 4){
        this.removeFromStorage(JSON.parse(content[0]).searchTime);
    }

  }

  /**
   * Update items in the storage
   * @param {*} contentID
   * @param {*} content
   * @param {*} completed
   */
  updateItem(contentID, content, completed) {
    let contentObj = {
      id: contentID,
      content: content,
      completed: completed,
    };
    this.storage.removeItem(contentID);
    this.storage.setItem(contentID, JSON.stringify(contentObj));
    // console.log("Item [" + contentID + "] " + "Updated");
  }

  /**
   * Deletes items from storage
   * @param {*} id
   */
  removeFromStorage(id) {
    this.storage.removeItem(id);
    console.log("Removed object id: " + id);
  }
}

export const localStorage = new Storage();
