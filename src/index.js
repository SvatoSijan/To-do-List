import tasklist from './task_list.js';
import projectList from './project_list.js';
import './style.css';
import './list_project.css';
import './list_task.css';
import './newTask.css';

document.addEventListener('DOMContentLoaded', function() {
    const newProject = document.getElementById('newProject');
    const newTask = document.getElementById('newTask');
    const todaysTask = document.getElementById('todaysTask');
    const thisWeeksTask = document.getElementById('thisWeeksTask');
    const allTask = document.getElementById('allTask');
    const projects = document.getElementById('projects');
    const display = document.getElementById('display');
    const main = document.getElementById('main');  // Assuming you have an element with id 'main'
    const newProjectSubmit = document.getElementById('newProjectForm');  // Correct the id if necessary

    const removeSelectedAll = function() {
        newProject.removeAttribute('class', 'selected');
        newTask.removeAttribute('class', 'selected');
        todaysTask.removeAttribute('class', 'selected');
        thisWeeksTask.removeAttribute('class', 'selected');
        allTask.removeAttribute('class', 'selected');
        projects.removeAttribute('class', 'selected');
    };

    newProject.addEventListener('click', function() {
        display.innerHTML = '';
        removeSelectedAll();
        newProject.setAttribute('class', 'selected');

        let newProjectForm = document.createElement('form');
        newProjectForm.id = 'newProjectForm';

        // Create input elements for project details
        let div = document.createElement('div');
        let label = document.createElement('label');
        label.setAttribute('for', 'newProjectName');
        label.textContent = "Project's Name -";
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'newProjectName');
        input.setAttribute('name', 'newProjectName');
        input.setAttribute('required', true);

        div.appendChild(label);
        div.appendChild(input);
        newProjectForm.appendChild(div);

        div = document.createElement('div');
        label = document.createElement('label');
        label.setAttribute('for', 'newProjectDescription');
        label.textContent = "Project Description -";
        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'newProjectDescription');
        input.setAttribute('name', 'newProjectDescription');

        div.appendChild(label);
        div.appendChild(input);
        newProjectForm.appendChild(div);

        div = document.createElement('div');
        label = document.createElement('label');
        label.setAttribute('for', 'newProjectDeadline');
        label.textContent = "Deadline -";
        input = document.createElement('input');
        input.setAttribute('type', 'date');
        input.setAttribute('id', 'newProjectDeadline');
        input.setAttribute('name', 'newProjectDeadline');

        div.appendChild(label);
        div.appendChild(input);
        newProjectForm.appendChild(div);

        div = document.createElement('div');
        input = document.createElement('input');
        input.setAttribute('type', 'submit');
        input.setAttribute('value', 'Submit');
        input.setAttribute('id', 'newProjectSubmit');

        div.appendChild(input);
        newProjectForm.appendChild(div);

        // Append the form to display
        display.appendChild(newProjectForm);

        // Add submit event listener
        newProjectForm.addEventListener('submit', function(event) {
            event.preventDefault();

            let projectName = document.getElementById('newProjectName').value;
            let projectDescription = document.getElementById('newProjectDescription').value;
            let projectDeadline = document.getElementById('newProjectDeadline').value;

            // Assuming projectList has a method to add projects
            projectList.addProject(projectName, projectDescription, projectDeadline);

            // Optionally reset form
            newProjectForm.reset();
        });
    });

    newTask.addEventListener('click', function() {
        display.innerHTML = '';
        removeSelectedAll();
        newTask.setAttribute('class', 'selected');
    
        let newTaskForm = document.createElement('form');
        newTaskForm.id = 'newTaskForm';
    
        let div = document.createElement('div');
        let label = document.createElement('label');
        label.setAttribute('for', 'newTaskName');
        label.textContent = "Task's Name -";
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'newTaskName');
        input.setAttribute('name', 'newTaskName');
        input.setAttribute('required', true);
    
        div.appendChild(label);
        div.appendChild(input);
        newTaskForm.appendChild(div);
    
        div = document.createElement('div');
        label = document.createElement('label');
        label.setAttribute('for', 'newTaskDeadline');
        label.textContent = "Deadline -";
        input = document.createElement('input');
        input.setAttribute('type', 'date');
        input.setAttribute('id', 'newTaskDeadline');
        input.setAttribute('name', 'newTaskDeadline');
    
        div.appendChild(label);
        div.appendChild(input);
        newTaskForm.appendChild(div);
    
        div = document.createElement('div');
        input = document.createElement('input');
        input.setAttribute('type', 'submit');
        input.setAttribute('value', 'Submit');
        input.setAttribute('id', 'newTaskSubmit');
    
        div.appendChild(input);
        newTaskForm.appendChild(div);
    
        // Append the form to display
        display.appendChild(newTaskForm);
    
        // Add submit event listener
        newTaskForm.addEventListener('submit', function(event) {
            event.preventDefault();
    
            let taskName = document.getElementById('newTaskName').value;
            let taskDeadline = document.getElementById('newTaskDeadline').value;
    
            // Assuming tasklist has a method to add tasks
            tasklist.addTask(taskName, taskDeadline);
    
            newTaskForm.reset();
        });
    });
    
    todaysTask.addEventListener('click', function() {
        display.innerHTML = '';
        removeSelectedAll();
        todaysTask.setAttribute('class', 'selected');
    
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
    
        let i = 1;
        let list = document.createElement('div');
        list.id = 'taskList';
    
        // Loop through tasklist.tasks to find tasks with today's deadline
        tasklist.tasks.forEach(function(task, index) {
            if (task.deadline === today) {
                let divList = document.createElement('div');
    
                let btn = document.createElement('button');
                btn.value = index;
                btn.textContent = 'Done✔';
                divList.appendChild(btn);
    
                let listName = document.createElement('div');
                listName.textContent = i + '. ' + task.task;
                divList.appendChild(listName);
    
                let listDeadline = document.createElement('div');
                listDeadline.textContent = (task.deadline === undefined) ? 'None' : task.deadline;
                divList.appendChild(listDeadline);
    
                list.appendChild(divList);
    
                btn.addEventListener('click', function() {
                    tasklist.tasks.splice(index, 1);
                    display.innerHTML = '';
                    todaysTask.click(); // Re-render the task list after deletion
                });
    
                i++;
            }
        });
    
        display.appendChild(list);
    });
    
    
    

    thisWeeksTask.addEventListener('click', function() {
        display.innerHTML = '';
        removeSelectedAll();
        thisWeeksTask.setAttribute('class', 'selected');
        let k = 1;
        
        let list = document.createElement('div');
        list.id = 'taskList';
    
        let currentDate = new Date();
    
        // Function to format the date as YYYY-MM-DD
        function formatDate(date) {
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    
        // Loop to get 7 formatted dates starting from today
        for (let i = 0; i < 7; i++) {
            let formattedDate = formatDate(currentDate);
    
            // Filter tasks that match the current formatted date
            let tasksForDate = tasklist.tasks.filter(function(task) {
                return task.deadline === formattedDate;
            });
    
            // Display tasks for the current date
            if (tasksForDate.length > 0) {
                tasksForDate.forEach(function(task, index) {
                    let divList = document.createElement('div');
    
                    let btn = document.createElement('button');
                    btn.value = index;
                    btn.textContent = 'Done✔';
                    divList.appendChild(btn);
    
                    let listName = document.createElement('div');
                    listName.textContent = `${k}. ${task.task}`;
                    divList.appendChild(listName);
                    k=k+1;
    
                    let listDeadline = document.createElement('div');
                    listDeadline.textContent = task.deadline ? task.deadline : 'None';
                    divList.appendChild(listDeadline);
    
                    list.appendChild(divList);
    
                    btn.addEventListener('click', function() {
                        tasklist.tasks.splice(index, 1);
                        display.innerHTML = '';
                        thisWeeksTask.click(); // Re-render the task list for this week after deletion
                    });
                });
            }
    
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        // Append the completed list of tasks to the display
        display.appendChild(list);
    });
    

    allTask.addEventListener('click', function() {
        display.innerHTML = '';
        removeSelectedAll();
        allTask.setAttribute('class', 'selected');
        
        let list = document.createElement('div');
        list.id = 'taskList';
    
        let i = 1;
        tasklist.tasks.forEach(function(task, index) {
            let divList = document.createElement('div');
    
            let btn = document.createElement('button');
            btn.value = index;
            btn.textContent = 'Done✔';
            divList.appendChild(btn);
    
            let listName = document.createElement('div');
            listName.textContent = `${i}. ${task.task}`;
            divList.appendChild(listName);
    
            let listDeadline = document.createElement('div');
            listDeadline.textContent = task.deadline ? task.deadline : 'None';
            divList.appendChild(listDeadline);
    
            list.appendChild(divList);
    
            btn.addEventListener('click', function() {
                tasklist.tasks.splice(index, 1);
                display.innerHTML = '';
                allTask.click(); // Re-render the task list after deletion
            });
    
            i++;
        });
    
        display.appendChild(list);
    });
    

    projects.addEventListener('click', function() {
        display.innerHTML = '';
        removeSelectedAll();
        projects.setAttribute('class', 'selected');
        
        let listProject = document.createElement('div');
        listProject.id = 'projectList';
        
        projectList.projects.forEach(function(project, index) {
            let divList = document.createElement('div');
            
            let btn = document.createElement('button');
            btn.value = index;
            btn.textContent = 'Done✔';
            divList.appendChild(btn);
        
            let listName = document.createElement('div');
            listName.textContent = `${index + 1}. ${project.project}`;
            divList.appendChild(listName);
            
            let listDeadline = document.createElement('div');
            listDeadline.textContent = project.deadline ? project.deadline : 'None';
            divList.appendChild(listDeadline);
        
            let listDes = document.createElement('div');
            listDes.textContent = project.description ? project.description : 'None';
            divList.appendChild(listDes);
        
            listProject.appendChild(divList);
            
            btn.addEventListener('click', function() {
                projectList.projects.splice(index, 1);
                display.innerHTML = '';
                projects.click(); // Re-render the project list after deletion
            });
        });
    
        display.appendChild(listProject);
    });

    

});
