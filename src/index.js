import './css/styles.css';
import { format } from 'date-fns';
import { storage } from './js/storage';
import { tasks } from './js/tasks';
import { projects } from './js/projects';
import { defaults } from './js/defaults';


// Hide side menu
const hideShowSideMenu = (() => {
    const button = document.querySelector('.nav-right button');
    const sideMenu = document.querySelector('.sidemenu');
    const body = document.querySelector('.body');

    function toggle() {
        if (sideMenu.className === 'sidemenu sidemenu-show') {
            body.style.gridColumn = '2'
            sideMenu.style.animationName = 'sidemenuShow';
        } else {
            body.style.gridColumn = 'span 2';
        }
        sideMenu.classList.toggle('sidemenu-show');
    }

    button.addEventListener('click', () => {
        toggle();
    })
})();


// Render "add project" pop up
const renderAddProject = (() => {
    const button = document.querySelector('.add-project button');

    function addPopUp() {
        const container = document.querySelector('.pop-ups');
        container.innerHTML = '';
        container.classList.add('pop-up-bg');
        const popUp = document.createElement('div');
        popUp.classList = 'add-project-popUp';

        const header = document.createElement('div');
        header.classList = 'addProjectPopUp-header';
        const headerText = document.createElement('h2');
        headerText.textContent = 'Add a new project';
        header.appendChild(headerText);
        popUp.appendChild(header);

        const form = document.createElement('form');
        const name = document.createElement('input');
        name.setAttribute('required', 'true');
        name.setAttribute('placeholder', 'Project name...');
        form.appendChild(name);
        const selectColor = document.createElement('select');
        const red = document.createElement('option');
        red.textContent = 'Red';
        red.setAttribute('value', '#e74c3c');
        selectColor.appendChild(red);
        const violet = document.createElement('option');
        violet.textContent = 'Violet';
        violet.setAttribute('value', '#b700ff');
        selectColor.appendChild(violet);
        const green = document.createElement('option');
        green.textContent = 'Green';
        green.setAttribute('value', '#00ff00');
        selectColor.appendChild(green);
        const blue = document.createElement('option');
        blue.textContent = 'Blue';
        blue.setAttribute('value', '#0066ff');
        selectColor.appendChild(blue);
        const yellow = document.createElement('option');
        yellow.textContent = 'Yellow';
        yellow.setAttribute('value', '#ffff00');
        selectColor.appendChild(yellow);
        form.appendChild(selectColor);
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            location.reload();
        })
        form.appendChild(cancelButton);
        const addButton = document.createElement('button');
        addButton.textContent = '+ Add';
        addButton.setAttribute('type', 'button');
        addButton.addEventListener('click', () => {
            if (name.value != '') {
                projects.createNewProject(name.value, selectColor.value)
                location.reload();
            }
        })
        form.appendChild(addButton)
        popUp.appendChild(form);

        container.appendChild(popUp);
    }

    button.addEventListener('click', () => {
        addPopUp();
    });
})();

// Render user projects on the side menu
export const renderProjects = (() => {
    const container = document.querySelector('.projects');

    function renderProject(name, color, id, numOfTasks) {
        const project = document.createElement('div');
        project.setAttribute('id', id);
        project.classList = 'project';
        const colorDisplay = document.createElement('div');
        colorDisplay.classList = 'display-color';
        colorDisplay.style.background = color;
        project.appendChild(colorDisplay);
        const nameDisplay = document.createElement('p');
        nameDisplay.textContent = name;
        project.appendChild(nameDisplay);
        const span = document.createElement('span');
        span.textContent = numOfTasks;
        project.appendChild(span);
        const rmButton = document.createElement('button');
        const buttonImg = document.createElement('img');
        rmButton.appendChild(buttonImg);
        rmButton.addEventListener('click', () => {
            projects.removeProject(id);
        })
        project.appendChild(rmButton);
        container.appendChild(project);
    };

    for(let i in storage.getProjects()) {
        renderProject(storage.getProjects()[i].title, storage.getProjects()[i].color, i, storage.getProjects()[i].tasks.length);
    }

    return { renderProject };
})();

// Render tasks
const renderTasks = (() => {
    const container = document.querySelector('.body-content');
    let tasksLocation;

    function renderTask(title, description, dueDate, priority, id) {
        const task = document.createElement('div');
        task.setAttribute('id', id);
        task.classList = 'task';

        const displayPriority = document.createElement('div');
        displayPriority.classList = 'display-priority';
        if (priority == 'high') {
            displayPriority.style.background = '#e74c3c';
        } else if (priority == 'mild') {
            displayPriority.style.background = '#3498db';
        } else if (priority == 'low') {
            displayPriority.style.background = '#2ecc71';
        } else {
            displayPriority.style.background = '#95a5a6';
        }
        task.appendChild(displayPriority);

        const doneButton = document.createElement('input');
        doneButton.setAttribute('type', 'checkbox');
        doneButton.style.height = '20px';
        doneButton.style.width = '20px';
        doneButton.addEventListener('change', () => {
            storage.projectsStorage[tasksLocation].tasks[id].isDone = doneButton.checked;
            storage.saveProjects();
        })
        task.appendChild(doneButton);

        const displayTitle = document.createElement('h1');
        displayTitle.textContent = title;
        displayTitle.addEventListener('click', () => {
            displayTitle.classList.toggle('title-lineThrough');
            if (displayTitle.className == 'title-lineThrough') {
                doneButton.checked = true;
            } else {
                doneButton.checked = false;
            }
            storage.projectsStorage[tasksLocation].tasks[id].isDone = doneButton.checked;
            storage.saveProjects();
        })
        displayTitle.addEventListener('mouseover', () => {
            displayTitle.style.cursor = 'pointer';
        })
        task.appendChild(displayTitle);

        doneButton.addEventListener('change', () => {
            displayTitle.classList.toggle('title-lineThrough');
        })

        const displayDescription = document.createElement('p');
        displayDescription.addEventListener('mouseover', () => {
            displayDescription.style.cursor = 'pointer';
        })
        if(description.length < 20) {
            displayDescription.textContent = description;
        } else {
            displayDescription.textContent = description.substring(0, 20) + '...';
            displayDescription.classList = 'shorten-desc';
        };
        displayDescription.addEventListener('click', () => {
            if (displayDescription.className == 'shorten-desc') {
                displayDescription.textContent = description;
                displayDescription.classList = 'full-desc';
            } else if (displayDescription.className == 'full-desc') {
                displayDescription.textContent = description.substring(0, 20) + '...';
                displayDescription.classList = 'shorten-desc';
            }
        });

        task.appendChild(displayDescription);

        const displayDueDate = document.createElement('div');
        displayDueDate.classList = 'displayDueDate';
        const displayDueDateText = document.createElement('p');
        displayDueDateText.textContent = dueDate;
        displayDueDate.appendChild(displayDueDateText);
        task.appendChild(displayDueDate);

        const removeButton = document.createElement('button');
        removeButton.classList = 'remove-task-button';
        const trashCan = document.createElement('img');
        removeButton.appendChild(trashCan);
        removeButton.addEventListener('click', () => {
            tasks.removeTask(tasksLocation, id);
        })
        task.appendChild(removeButton);

        container.appendChild(task);
    }

    const projectButton = document.querySelectorAll('.side-projects .project');
    projectButton.forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelector('.body-control h1').textContent = storage.getProjects()[button.id].title;
            container.innerHTML = '';
            const loc = storage.getProjects()[button.id].tasks;
            for(let i in loc) {
                renderTask(loc[i].title, loc[i].description, loc[i].dueDate, loc[i].priority, i);
            }
            return tasksLocation = button.id;
        })
    })

    return { renderTask };
})();

const renderNewTaskInput = (() => {
    const button = document.querySelector('.body-control button');

    function render() {
        button.disabled = true;
        const content = document.querySelector('.body-control');

        const form = document.createElement('form');


        const field1 = document.createElement('fieldset');
        field1.classList = 'first-field';

        const title = document.createElement('input');
        title.setAttribute("required", "true");
        title.setAttribute("placeholder", "Title of this task");
        field1.appendChild(title);

        const description = document.createElement('textarea');
        description.setAttribute("placeholder", "Description of this task");
        field1.appendChild(description);

        form.appendChild(field1);


        const field2 = document.createElement('fieldset');
        field2.classList = 'second-field';

        const dueDate = document.createElement('input');
        dueDate.setAttribute("type", "date");
        dueDate.setAttribute("required", "true");
        field2.appendChild(dueDate);

        const priority = document.createElement('select');
        const high = document.createElement('option');
        high.setAttribute("value", "high");
        high.textContent = "High";
        priority.appendChild(high);
        const mild = document.createElement('option');
        mild.textContent = 'Mild';
        mild.setAttribute('value', 'mild');
        priority.appendChild(mild);
        const low = document.createElement('option');
        low.setAttribute('value', 'low');
        low.textContent = 'Low';
        priority.appendChild(low);
        field2.appendChild(priority);

        const location = document.createElement('select');
        for(let i = 0; i < storage.getProjects().length; i++) {
            const option = document.createElement('option');
            option.textContent = i + 1 + '. ' + storage.getProjects()[i].title;
            option.setAttribute('value', i);
            location.appendChild(option);
        }
        field2.appendChild(location);

        form.appendChild(field2);

        const buttons = document.createElement('div');
        const cancel = document.createElement('button');
        cancel.setAttribute('id', 'form-cancel');
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => {
            content.removeChild(form);
            button.disabled = false;
        })
        buttons.appendChild(cancel);

        const add = document.createElement('button');
        add.setAttribute('type', 'button');
        add.setAttribute('id', 'form-submit');
        add.textContent = '+ Add';
        add.addEventListener('click', () => {
            tasks.createNewTask(title.value, description.value, dueDate.value, priority.value, location.value);
            window.location.reload();
        })
        buttons.appendChild(add);
        form.appendChild(buttons);

        content.appendChild(form);
    }

    button.addEventListener('click', () => {
        render();
    })
})();

const renderDefaults = (() => {
    const inboxProject = document.querySelector('#inbox');
    const todayProject = document.querySelector('#today');
    const doneProject = document.querySelector('#done');
    const inboxProjectCounter = document.querySelector('#inbox span')
    const todayProjectCounter = document.querySelector('#today span');
    const doneProjectCounter = document.querySelector('#done span');
    const content = document.querySelector('.body-content');

    
})();