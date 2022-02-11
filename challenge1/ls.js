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
        return contentID;
    }

    updateItem(contentID, content) {
        let contentObj = {
            id: contentID,
            content: content,
            completed: false
        };
        this.storage.removeItem(contentID);
        this.storage.setItem(contentID, JSON.stringify(contentObj));
        // console.log("Item [" + contentID + "] " + "Updated");
    }


    removeFromStorage(id) {
        this.storage.removeItem(id);
        console.log("Removed object id: " + id);

    }



    // #################
    /**
        * Receives all tasks that are in the local storage and load them to the screen
        * @param {*} storedTasks 
        */
    loadAllTasksFromStorageToPage() {
        let storedTasks = this.loadStorageContent();
        console.log('local storage tasks size: ' + storedTasks.length);
        let tasksDiv = document.querySelector("#tasks");

        storedTasks.forEach(element => {
            let content = JSON.parse(element);
            let taskDiv = this.#createHtmlElementTask(content);
            let checkbox = this.#createHtmlElementCheckBox();
            taskDiv.appendChild(checkbox);
            let contentDiv = this.#createHtmlElementContent();
            taskDiv.appendChild(contentDiv);
            let contentInput = this.#createHtmlElementContentInput(content);
            contentDiv.appendChild(contentInput);
            let buttonsDiv = this.#createHtmlElmentButtons(contentInput, taskDiv, tasksDiv);
            // add input with task value into content div
            taskDiv.appendChild(buttonsDiv);
            tasksDiv.appendChild(taskDiv);
        });
    }

    #createHtmlElementTask(jsonContent) {

        const divTask = document.createElement('div');
        divTask.id = jsonContent.id;
        divTask.classList.add('task');
        return divTask;
    }

    #createHtmlElementCheckBox() {
        const task_input_check_el = document.createElement('input');
        task_input_check_el.classList.add('cbox');
        task_input_check_el.type = 'checkbox';
        task_input_check_el.value = 'checkbox';
        return task_input_check_el;
    }

    #createHtmlElementContentInput(jsonContent) {
        // create input element with task
        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.name = 'todoItem';
        task_input_el.id = 'todoItem';
        task_input_el.value = jsonContent.content;
        task_input_el.setAttribute('readonly', 'readonly');
        return task_input_el;
    }

    #createHtmlElementContent() {
        // create div for content
        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');
        return task_content_el;
    }

    #createHtmlElmentButtons(task_input_el, divTask, divTasks) {
        // create actions (buttons div)
        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');
        // edit button
        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';
        // Delete button
        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';
        // add to div with buttons
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        divTask.appendChild(task_actions_el);
		divTasks.appendChild(divTask);

        // Create event listener
        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                this.updateItem(divTask.id, task_input_el.value);
            }
        });
        task_delete_el.addEventListener('click', (e) => {
            this.removeFromStorage(divTask.id);
            divTasks.removeChild(divTask);
        });

        return task_actions_el;
    }

    // #################





}

export const ls = new Storage();