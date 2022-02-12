/**
 * author: Flavio Prumucena
 * Contains all TODO list operations
 */

import { util } from './utilities.js';
import { ls } from './ls.js';

window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const divTasks = document.querySelector("#tasks");
	const btn_all = document.querySelector("#btn_all");
	const btn_active = document.querySelector("#btn_active");
	const btn_completed = document.querySelector("#btn_completed");
	btn_all.classList.add('active');

	//Pull all tasks
	displayAllTasksFromStorage(divTasks);


	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const task = input.value;
		const contentObj = ls.addIntoStorage(task, false);
		createSingleTask(contentObj, divTasks);
		input.value = '';
	});

	btn_all.addEventListener('click', (e) => {
		btn_active.classList.remove('active');
		btn_completed.classList.remove('active');
		btn_all.classList.add('active');
		displayAllTasksFromStorage(divTasks);

	});
	btn_active.addEventListener('click', (e) => {
		btn_all.classList.remove('active');
		btn_completed.classList.remove('active');
		btn_active.classList.add('active');
		//only not completed taks (active tasks)
		displayTasksByStatus(divTasks, false); 

	});
	btn_completed.addEventListener('click', (e) => {
		btn_all.classList.remove('active');
		btn_active.classList.remove('active');
		btn_completed.classList.add('active');
		// only completed tasks
		displayTasksByStatus(divTasks, true);
	});

});

/**
 * Display tasks according status
 * It will work for active or completed task status
 * @param {*} divTasks 
 * @param {*} status 
 */

function displayTasksByStatus(divTasks, status) {
	util.removeAllChildNodes(divTasks);
	let storedTasks = ls.loadStorageContent();
	storedTasks.forEach(element => {
		let content = JSON.parse(element);
		if (content.completed == status) {
			let taskDiv = createHtmlElementTask(content);
			let contentDiv = createHtmlElementContent();
			let checkbox = createHtmlElementCheckBox(contentDiv, content);

			taskDiv.appendChild(checkbox);
			taskDiv.appendChild(contentDiv);
			let contentInput = createHtmlElementContentInput(content);
			contentDiv.appendChild(contentInput);
			let buttonsDiv = createHtmlElmentButtons(contentInput, taskDiv, divTasks);
			// add input with task value into content div
			taskDiv.appendChild(buttonsDiv);
			divTasks.appendChild(taskDiv);
		}
	});
	updateTaskCounter();
}

/**
 * Creates a single tasks inserted through the form 
 * @param {*} contentObj 
 * @param {*} divTasks 
 */
function createSingleTask(contentObj, divTasks) {
	console.log('Creating single task: ' + contentObj.content);
	let taskDiv = createHtmlElementTask(contentObj);
	let contentDiv = createHtmlElementContent();
	let checkbox = createHtmlElementCheckBox(contentDiv, contentObj);
	taskDiv.appendChild(checkbox);
	taskDiv.appendChild(contentDiv);
	let contentInput = createHtmlElementContentInput(contentObj);
	contentDiv.appendChild(contentInput);
	let buttonsDiv = createHtmlElmentButtons(contentInput, taskDiv, divTasks);
	// add input with task value into content div
	taskDiv.appendChild(buttonsDiv);
	divTasks.appendChild(taskDiv);
	updateTaskCounter();
}


/**
 * It will display all tasks from the local storage
 * @param {*} divTasks 
 */
function displayAllTasksFromStorage(divTasks) {
	//First remove everything from task list on the screen
	util.removeAllChildNodes(divTasks);
	//the rebuild all tasks back the screen
	let storedTasks = ls.loadStorageContent();
	console.log('local storage tasks size: ' + storedTasks.length);
	// let divTasks = document.querySelector("#tasks");

	storedTasks.forEach(element => {
		let content = JSON.parse(element);
		let taskDiv = createHtmlElementTask(content);
		let contentDiv = createHtmlElementContent();
		let checkbox = createHtmlElementCheckBox(contentDiv, content);

		taskDiv.appendChild(checkbox);
		taskDiv.appendChild(contentDiv);
		let contentInput = createHtmlElementContentInput(content);
		contentDiv.appendChild(contentInput);
		let buttonsDiv = createHtmlElmentButtons(contentInput, taskDiv, divTasks, checkbox);
		// add input with task value into content div
		taskDiv.appendChild(buttonsDiv);
		divTasks.appendChild(taskDiv);
	});
	updateTaskCounter();
}

/**
 * Creates a task div
 * @param {*} jsonContent 
 * @returns 
 */
function createHtmlElementTask(jsonContent) {
	const divTask = document.createElement('div');
	divTask.id = jsonContent.id;
	divTask.classList.add('task');
	return divTask;
}

/**
 * Creates the check box with it's content
 * @param {*} contentDiv 
 * @param {*} content 
 * @returns 
 */
function createHtmlElementCheckBox(contentDiv, content) {
	const task_input_check_el = document.createElement('input');
	task_input_check_el.classList.add('cbox');
	task_input_check_el.type = 'checkbox';
	task_input_check_el.value = 'checkbox';
	task_input_check_el.checked = content.completed;
	if (content.completed) {
		contentDiv.classList.add('strike');
	}

	task_input_check_el.addEventListener('change', (e) => {
		let checked = task_input_check_el.checked
		if (checked) {
			contentDiv.classList.add('strike');
		} else {
			contentDiv.classList.remove('strike')
		}
		//update value in Storage
		ls.updateItem(content.id, content.content, checked);
		updateTaskCounter();

	});
	return task_input_check_el;
}

/**
 * Create the content input for the checkbox
 * @param {*} jsonContent 
 * @returns 
 */
function createHtmlElementContentInput(jsonContent) {
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

/**
 * It will create the content element
 * @returns 
 */
function createHtmlElementContent() {
	// create div for content
	const task_content_el = document.createElement('div');
	task_content_el.classList.add('content');
	return task_content_el;
}

/**
 * It will create the buttons used in the page
 * @param {*} task_input_el 
 * @param {*} divTask 
 * @param {*} divTasks 
 * @returns 
 */
function createHtmlElmentButtons(task_input_el, divTask, divTasks, checkbox) {
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
			ls.updateItem(divTask.id, task_input_el.value, checkbox.checked);
		}
	});
	task_delete_el.addEventListener('click', (e) => {
		ls.removeFromStorage(divTask.id);
		divTasks.removeChild(divTask);
		updateTaskCounter();
	});

	return task_actions_el;
}

/**
 * Queries the storage to get the number of tasks and filters the tasks that are not finished
 * After loading task number update the html element in the page 
 */
function updateTaskCounter() {
	let counter = 0;
	let allTasks = ls.loadStorageContent();
	allTasks.forEach(element => {
		let content = JSON.parse(element);
		if (!content.completed) {
			counter++;
		}
	});

	//Update html element
	const task_counter_el = document.querySelector("#task_counter");
	if (counter > 1) {
		task_counter_el.innerHTML = counter + ' TASKS LEFT';
	} else {
		task_counter_el.innerHTML = counter + ' TASK LEFT';
	}

}