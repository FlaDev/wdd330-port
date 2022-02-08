// var taskObject = {}

const storage = window.localStorage;
 
export function loadContent(){
    let contentObjs = [];
    let keys = Object.keys(storage);
    keys.forEach(key => {
        contentObjs.push(storage.getItem(key));
    });
    return contentObjs;
}

export function addIntoStorage(task, isCompleted){
    let contentID = new Date().getTime();
    let contentObj  = {
        id: contentID,
        content: task,
        completed: isCompleted
    };
    storage.setItem(contentID, JSON.stringify(contentObj));
    // console.log(contentObj);
    return contentID;
}

export function updateItem(contentID, content){
    let contentObj  = {
        id: contentID,
        content: content,
        completed: false
    };
    storage.removeItem(contentID);
    storage.setItem( contentID, JSON.stringify(contentObj));
    // console.log("Item [" + contentID + "] " + "Updated");
}


export function removeFromStorage(id){
    storage.removeItem(id);
    console.log("Removed object id: " + id);
    
}