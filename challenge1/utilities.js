
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

    /**
     * Receives all tasks that are in the local storage and load them to the screen
     * @param {*} storedTasks 
     */
    loadAllTasksFromStorageToPage(storedTasks) {
        
        let tasksDiv = document.querySelector("#tasks");
        storedTasks.forEach(element => {
            let content = JSON.parse(element);
            let taskDiv = this.#createHtmlElementTask(content);
            let checkbox = this.#createHtmlElementCheckBox();
            let contentInput = this.#createHtmlElementContentInput(content);
            let contentDiv = this.#createHtmlElementContent();
            let buttonsDiv = this.#createHtmlElmentButtons(contentInput);
            taskDiv.appendChild(checkbox);
             // add input with task value into content div
            contentDiv.appendChild(contentInput);
            taskDiv.appendChild(contentDiv);
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

    #createHtmlElmentButtons(task_input_el) {
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

        // Create event listener
        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
                storage.updateItem(divTask.id, task_input_el.value);
            }
        });
        task_delete_el.addEventListener('click', (e) => {
            storage.removeFromStorage(divTask.id);
            divTasks.removeChild(divTask);
        });

        return task_actions_el;
    }



}

export const util = new Utilities();

