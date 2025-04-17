
document.addEventListener('DOMContentLoaded', function () {
	let taskList = document.getElementById('taskList');
	let input = document.querySelector('.input');
	let button = document.getElementById('button');

	let tasks = [];

	function loadTasks() {
		const saved = localStorage.getItem('tasks');
		if (saved) {
			tasks = JSON.parse(saved);

			tasks.forEach(task => {
				const li = document.createElement('li');
				li.textContent = task.text;

				if (task.completed) {
					li.classList.add('completed');
				}
				const deleteBtn = document.createElement('button');
				deleteBtn.textContent = '❌';
				deleteBtn.classList.add('delete-btn');

				li.appendChild(deleteBtn);
				taskList.appendChild(li);
			});
		}
	}
	loadTasks();


	function addTodo(e) {
		e.preventDefault();
		const taskText = input.value.trim();
		if (taskText === '') return;

		const li = document.createElement('li');
		li.textContent = taskText;

		const deleteBtn = document.createElement('button');
		deleteBtn.textContent = '❌';
		deleteBtn.classList.add('delete-btn');

		li.appendChild(deleteBtn);
		taskList.appendChild(li);

		const taskObj = {
			text: taskText,
			completed: false
		};
		tasks.push(taskObj);

		localStorage.setItem('tasks', JSON.stringify(tasks));

		input.value = ''; // очищаем input
	}
	button.addEventListener('click', addTodo);

	taskList.addEventListener('click', function (event) {

		const li = event.target.closest('li'); // ищем li, на который кликнули
		if (!li) return;

		const text = li.firstChild.textContent;

		if (event.target.classList.contains('delete-btn')) {

			li.remove();

			tasks = tasks.filter(task => task.text !== text);
			localStorage.setItem('tasks', JSON.stringify(tasks));// удаляем родительский элемент (задачу)
		}
		else if (event.target.tagName === 'LI') {

			li.classList.toggle('completed');

			tasks = tasks.map(task => {
				if (task.text === text) {
					return { ...task, completed: !task.completed };
				}
				return task;
			});
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	})

	const filterButtons = document.querySelectorAll('.filter-button');

	filterButtons.forEach(button => {
		button.addEventListener('click', () => {

			filterButtons.forEach(btn => btn.classList.remove('active'));

			button.classList.add('active');

			const filter = button.getAttribute('data-filter');
			filterTasks(filter);
		});
	});

	function filterTasks(filter) {
		const ListItem = taskList.querySelectorAll('li');
		ListItem.forEach(item => {
			const isCompleted = item.classList.contains('completed');

			if (filter === 'all') {
				item.style.display = '';
			} else if (filter === 'active') {
				item.style.display = isCompleted ? 'none' : '';
			} else if (filter === 'completed') {
				item.style.display = isCompleted ? '' : 'none';
			}
		});
	}
});


