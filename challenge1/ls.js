/**
 * Storage Class
 * Storage Operations
 * author: Flavio Prumucena
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
        keys.forEach(key => {
            contentObjs.push(this.storage.getItem(key));
        });
        return contentObjs;
    }

    /**
     * Add items to local storage
     * @param {string} task 
     * @param {boolean} isCompleted 
     * @returns object
     */
    addIntoStorage(task, isCompleted) {
        let contentID = new Date().getTime();
        let contentObj = {
            id: contentID,
            content: task,
            completed: isCompleted
        };
        // console.log('Adding item to storage --> ' + contentObj.id);
        this.storage.setItem(contentID, JSON.stringify(contentObj));
        return contentObj;
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
            completed: completed
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

export const ls = new Storage();