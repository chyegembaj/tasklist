const taskInput = document.querySelector("#task");
const form = document.querySelector("#task-form");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const tasklist = document.querySelector(".collection");


loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addTask);
  tasklist.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  //DOM Content load event
  document.addEventListener('DOMContentLoaded', getTasks);
}


function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    tasklist.appendChild(li);

  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }
  //create li element
  const li = document.createElement("li");

  //add class
  li.className = "collection-item";

  //create text node and append to li
  liTextNode = document.createTextNode(taskInput.value);
  li.appendChild(liTextNode);

  //create a new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";

  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);

  //append li to ul
  tasklist.appendChild(li);
  //console.log(li);
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = '';

  //console.log(taskInput.value);
  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



//remove task
function removeTask(e){
if(e.target.parentElement.classList.contains('delete-item')){
  if(confirm('Are You Sure')){
    //event delegation
    e.target.parentElement.parentElement.remove();
  }
}
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []; 
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
  while(tasklist.firstChild !== null){
    //tasklist.firstChild.remove();
    tasklist.removeChild(tasklist.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';

    }else{
      task.style.display = 'none';
    }

  });

}

