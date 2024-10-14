const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
renderTaskList();
document.querySelector('.js-add-button').addEventListener('click', () => {
  addTask();
}); 

function renderTaskList() {
  let taskListHTML = '';

  taskList.forEach((taskObject, i) => {
    const { task, date } = taskObject;
    taskListHTML += `
    <div class="task-text">
      ${task}
    </div>
    <div>
      ${date}
    </div>
    <button class="js-delete-button delete-button">
      Delete
    </button>`;
  });

  document.querySelector('.js-task-list').innerHTML = taskListHTML;
  localStorage.setItem('taskList', JSON.stringify(taskList));
  document.querySelectorAll('.js-delete-button').forEach((buttonElement, i) => {
    buttonElement.addEventListener('click', () => {
      taskList.splice(i, 1);
      renderTaskList();
    });
  });
  
}

function addTask() {
  const textInputElement = document.querySelector('.js-task-input');
  const dateInputElement = document.querySelector('.js-date-input');

  taskList.push({task: textInputElement.value, date: dateInputElement.value});
  renderTaskList();
  textInputElement.value = '';
  dateInputElement.value = '';
}
