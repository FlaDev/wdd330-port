class Storage {

    constructor() {
        this.storage = window.localStorage;
    }

    loadStorageContent() {
        let contentObjs = [];
        let keys = Object.keys(this.storage);
        keys.forEach(key => {
            contentObjs.push(this.storage.getItem(key));
        });
        return contentObjs;
    }

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


    removeFromStorage(id) {
        this.storage.removeItem(id);
        console.log("Removed object id: " + id);

    }

}

export const ls = new Storage();