let tasks = [];


function addTask() {
  // Captura el input y le quita los espacios
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();
    displayTasks();
    taskInput.value = '';
  }
}


function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      toggleTaskCompleted(task.id);
    });

    const taskText = document.createElement('span');
    taskText.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btnDelete');
    deleteButton.addEventListener('click', () => {
      deleteTask(task.id);
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btnEdit');
    editButton.addEventListener('click', () => {
      editTask(task.id);
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskItem.appendChild(editButton);

    taskList.appendChild(taskItem);
  });
}


function toggleTaskCompleted(id) {
  tasks = tasks.map((task) => { // Itera sobre todas las tareas en el arreglo 'tasks'
    if (task.id === id) { // Verifica si la tarea actual tiene el mismo ID que se pasó como argumento a la función
      return {
        ...task, // Se utiliza el operador spread para copiar todos los atributos de la tarea
        completed: !task.completed // Cambia el estado 'completed' de la tarea al contrario de su estado actual
      };
    }
    return task; // Devuelve la tarea sin modificar si no coincide con el ID proporcionado
  });
  saveTasks(); // Guarda las tareas actualizadas (por ejemplo, en el almacenamiento local)
  displayTasks(); // Muestra las tareas actualizadas en la interfaz de usuario
}


function deleteTask(id) {
  const confirmation = confirm('Are you sure you want to delete this task?'); // Muestra un mensaje de confirmación al usuario
  if (confirmation) { // Verifica si el usuario confirmó la eliminación
    tasks = tasks.filter((task) => task.id !== id); // Utiliza el método 'filter()' para crear un nuevo array de tareas excluyendo la tarea con el ID proporcionado
    saveTasks(); // Guarda las tareas actualizadas (por ejemplo, en el almacenamiento local)
    displayTasks(); // Muestra las tareas actualizadas en la interfaz de usuario
  }
}


function editTask(id) {
  const newTaskText = prompt('Edit the task:'); // Muestra un cuadro de diálogo para que el usuario ingrese el nuevo texto de la tarea
  if (newTaskText !== null) { // Verifica si el usuario ingresó un nuevo texto o canceló la edición
    tasks = tasks.map((task) => { // Utiliza el método 'map()' para iterar sobre todas las tareas en el arreglo 'tasks'
      if (task.id === id) { // Comprueba si la tarea actual tiene el mismo ID que se pasó como argumento a la función
        return {
          ...task, // Se utiliza el operador spread para copiar todas las propiedades de la tarea
          text: newTaskText // Actualiza el texto de la tarea con el nuevo texto ingresado por el usuario
        };
      }
      return task; // Devuelve la tarea sin modificar si no coincide con el ID proporcionado
    });
    saveTasks(); // Guarda las tareas actualizadas (por ejemplo, en el almacenamiento local)
    displayTasks(); // Muestra las tareas actualizadas en la interfaz de usuario
  }
}


function saveTasks() { // Se encarga de guardar las tareas en el almacenamiento local del navegador.
  // Guarda las tareas en el almacenamiento local bajo la clave('tasks').
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // JSON.stringify() convierte el array de tareas(tasks) 
  // a una cadena de texto JSON para que pueda ser almacenado en el almacenamiento local.
}


function loadTasks() { //se utiliza para cargar las tareas desde el almacenamiento local y mostrarlas.
  const storedTasks = localStorage.getItem('tasks');
  //: Utiliza localStorage.getItem() para obtener las tareas almacenadas bajo la clave 'tasks' del almacenamiento local y las guarda en la variable storedTasks
  if (storedTasks) { // Verifica si hay tareas almacenadas. Si existen tareas almacenadas
    tasks = JSON.parse(storedTasks);
    displayTasks();
  }
}


// Load tasks from localStorage on page load
loadTasks();