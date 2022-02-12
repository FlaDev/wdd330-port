
import { util } from './utilities.js';
import { ls } from './ls.js';
/**
 * 2/10/22
 * Working: local storage save, update and delete 
 * Working: task save, update, delete
 * Working: loop through data loaded from storage 
 * Working: building task list from storage in html
 * Working: show data as HTML document 
 * 
 * TODO: sort the board with ALL, Active and Completed.
 * FIXED: ISSUE strike stoped working. Fix: add the class in the javascript code.
 * TODO: implement counter of the tasks
 * 
 */

window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const divTasks = document.querySelector("#tasks");
	const btn_all = document.querySelector("#btn_all");
	
	displayAllTasksFromStorage(divTasks);
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const task = input.value;
		const contentObj = ls.addIntoStorage(task, false);
		createSingleTask(contentObj);
	});

});


function createSingleTask(contentObj) {
	console.log('Creating single task: ' + contentObj.content);
	let tasksDiv = document.querySelector("#tasks");

	let taskDiv = createHtmlElementTask(contentObj);
	let contentDiv = createHtmlElementContent();
	let checkbox = createHtmlElementCheckBox(contentDiv, contentObj);
	taskDiv.appendChild(checkbox);
	taskDiv.appendChild(contentDiv);
	let contentInput = createHtmlElementContentInput(contentObj);
	contentDiv.appendChild(contentInput);
	let buttonsDiv = createHtmlElmentButtons(contentInput, taskDiv, tasksDiv);
	// add input with task value into content div
	taskDiv.appendChild(buttonsDiv);
	tasksDiv.appendChild(taskDiv);

}

function displayAllTasksFromStorage(divTasks) {
	util.removeAllChildNodes(divTasks);
	//Load tasks to the screen
	// ls.loadAllTasksFromStorageToPage();
	let storedTasks = ls.loadStorageContent();
	console.log('local storage tasks size: ' + storedTasks.length);
	let tasksDiv = document.querySelector("#tasks");

	storedTasks.forEach(element => {
		let content = JSON.parse(element);
		let taskDiv = createHtmlElementTask(content);
		let contentDiv = createHtmlElementContent();
		let checkbox = createHtmlElementCheckBox(contentDiv, content);

		taskDiv.appendChild(checkbox);
		taskDiv.appendChild(contentDiv);
		let contentInput = createHtmlElementContentInput(content);
		contentDiv.appendChild(contentInput);
		let buttonsDiv = createHtmlElmentButtons(contentInput, taskDiv, tasksDiv);
		// add input with task value into content div
		taskDiv.appendChild(buttonsDiv);
		tasksDiv.appendChild(taskDiv);
	});

}

function createHtmlElementTask(jsonContent) {
	const divTask = document.createElement('div');
	divTask.id = jsonContent.id;
	divTask.classList.add('task');
	return divTask;
}

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

	});
	return task_input_check_el;
}

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

function createHtmlElementContent() {
	// create div for content
	const task_content_el = document.createElement('div');
	task_content_el.classList.add('content');
	return task_content_el;
}

function createHtmlElmentButtons(task_input_el, divTask, divTasks) {
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
			ls.updateItem(divTask.id, task_input_el.value);
		}
	});
	task_delete_el.addEventListener('click', (e) => {
		ls.removeFromStorage(divTask.id);
		divTasks.removeChild(divTask);
	});

	return task_actions_el;
}