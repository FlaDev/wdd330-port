import * as storage from './ls.js';

/**
 * 2/2/22
 * Working: local storage save, update and delete 
 * Working: task save, update, delete
 * 
 * TODO: loop through data loaded from storage
 * TODO: show data as HTML document 
 * TODO: sort the board with ALL, Active and Completed.
 * 
 */

window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");

	const storageContent = storage.loadContent();
	console.log(storageContent.length);

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
		const contentID = storage.addIntoStorage(task, false);

		const task_el = document.createElement('div');
		
		//adds the taskID to the div
		task_el.id = contentID;
		task_el.classList.add('task');

		// create check box
		const task_input_check_el = document.createElement('input');
		task_input_check_el.classList.add('cbox');
		task_input_check_el.type = 'checkbox';
		task_input_check_el.value = 'checkbox';
		task_el.appendChild(task_input_check_el);

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.name = 'todoItem';
		task_input_el.id = 'todoItem';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');
		
		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);
		list_el.appendChild(task_el);
		input.value = '';

		

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
				storage.updateItem(task_el.id, task_input_el.value);
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			storage.removeFromStorage(task_el.id);
			list_el.removeChild(task_el);
		});

		task_input_check_el.addEventListener('change', (e) => {
			if (task_input_check_el.checked){
				task_input_el.classList.add('strike');
			} else {
				task_input_el.removeAttribute('class');
				task_input_el.classList.add('text');
			}

		});
	});
});

