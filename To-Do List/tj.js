// Function to add task
function addTask() {
    const taskInput = document.getElementById('task-input').value;
    const dueDateInput = document.getElementById('due-date').value;
    const priorityInput = document.getElementById('priority-select').value;
    const priorityText = document.getElementById('priority-select').options[document.getElementById('priority-select').selectedIndex].text;

    if (taskInput === '' || dueDateInput === '') {
        alert("Please enter all fields: task, due date.");
        return;
    }

    const taskList = document.getElementById('task-list');
    
    // Create new row for the task
    const row = document.createElement('tr');
    row.classList.add('task-row'); // Ensure this class is applied for default styling

    // Apply class to row based on priority
    if (priorityInput === 'green') {
        row.classList.add('low');
    } else if (priorityInput === 'yellow') {
        row.classList.add('medium');
    } else if (priorityInput === 'red') {
        row.classList.add('high');
    }

    // Task cell
    const taskCell = document.createElement('td');
    taskCell.innerText = taskInput;
    row.appendChild(taskCell);

    // Due Date cell
    const dateCell = document.createElement('td');
    dateCell.innerText = dueDateInput;
    row.appendChild(dateCell);

    // Priority cell
    const priorityCell = document.createElement('td');
    priorityCell.innerText = priorityText; // Display priority text
    row.appendChild(priorityCell);

    // Complete checkbox cell
    const completeCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    completeCell.appendChild(checkbox);
    row.appendChild(completeCell);

    // Delete button cell
    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function () {
        taskList.removeChild(row);
    };
    deleteCell.appendChild(deleteBtn);
    row.appendChild(deleteCell);

    // Add the row to the list
    taskList.appendChild(row);

    // Clear input fields after adding
    document.getElementById('task-input').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('priority-select').value = 'green';
}
