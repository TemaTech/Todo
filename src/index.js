import './css/styles.css';

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

        const body = document.createElement('div');
        body.classList = 'addProjectPopUp-body';
        const name = document.createElement('div');
        const nLabel = document.createElement('label');
        nLabel.textContent = 'Name';
        name.appendChild(nLabel);
        const nameInput = document.createElement('input');
        name.appendChild(nameInput);
        body.appendChild(name);
        const color = document.createElement('div');
        const cLabel = document.createElement('label');
        cLabel.textContent = 'Color';
        color.appendChild(cLabel);
        const colorSelect = document.createElement('select');
        const red = document.createElement('option');
        red.setAttribute('value', '#e74c3c');
        red.textContent = 'Red';
        colorSelect.appendChild(red);
        const gray = document.createElement('option');
        gray.setAttribute('value', '#393939');
        gray.textContent = 'Gray';
        colorSelect.appendChild(gray);
        const violet = document.createElement('option');
        violet.setAttribute('value', '#b700ff');
        violet.textContent = 'Violet';
        colorSelect.appendChild(violet);
        color.appendChild(colorSelect)
        body.appendChild(color);
        popUp.appendChild(body);

        const footer = document.createElement('div');
        footer.classList = 'addProjectPopUp-footer';
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cancel';
        closeButton.addEventListener('click', () => {
            container.innerHTML = '';
            container.classList.remove('pop-up-bg');
        });
        footer.appendChild(closeButton);
        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => {
            // Function for this button
            console.log('Added!');
            // Remove pop up
            container.innerHTML = '';
            container.classList.remove('pop-up-bg');
        });
        footer.appendChild(addButton);
        popUp.appendChild(footer);

        container.appendChild(popUp);
    }

    button.addEventListener('click', () => {
        addPopUp();
    });
})();

// Render user projects on the side menu
const renderProjects = (() => {
    const container = document.querySelector('.projects');

    function renderProject(name, color) {
        const project = document.createElement('div');
        project.classList = 'project';
        const colorDisplay = document.createElement('div');
        colorDisplay.classList = 'display-color';
        colorDisplay.style.background = color;
        project.appendChild(colorDisplay);
        const nameDisplay = document.createElement('p');
        nameDisplay.textContent = name;
        project.appendChild(nameDisplay);
        const span = document.createElement('span');
        span.textContent = '0';
        project.appendChild(span);
        const rmButton = document.createElement('button');
        const buttonImg = document.createElement('img');
        rmButton.appendChild(buttonImg);
        rmButton.addEventListener('click', () => {
            container.removeChild(project);
        })
        project.appendChild(rmButton);
        container.appendChild(project);
    };

    renderProject("Hello world", "#b700ff");
    renderProject("Chernysh", "#393939");
    renderProject("Artem", "#e74c3c");
})();

// Import date-fns
import { format } from 'date-fns';

// Render tasks
const renderTasks = (() => {
    const container = document.querySelector('.body-content');

    function renderTask(title, description, dueDate, priority) {
        const task = document.createElement('div');
        task.classList = 'task';

        const displayPriority = document.createElement('div');
        displayPriority.classList = 'display-priority';
        if (priority == 'important') {
            displayPriority.style.background = '#e74c3c';
        } else if (priority == 'mild') {
            displayPriority.style.background = '#3498db';
        } else if (priority == 'light') {
            displayPriority.style.background = '#2ecc71';
        } else {
            displayPriority.style.background = '#95a5a6';
        }
        task.appendChild(displayPriority);

        const doneButton = document.createElement('input');
        doneButton.setAttribute('type', 'checkbox');
        doneButton.style.height = '20px';
        doneButton.style.width = '20px';
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
        displayDueDateText.textContent = format(dueDate, 'MMM do, y');
        displayDueDate.appendChild(displayDueDateText);
        task.appendChild(displayDueDate);

        const removeButton = document.createElement('button');
        removeButton.classList = 'remove-task-button';
        const trashCan = document.createElement('img');
        removeButton.appendChild(trashCan);
        removeButton.addEventListener('click', () => {
            container.removeChild(task);
        })
        task.appendChild(removeButton);

        container.appendChild(task);
    }

    renderTask('Hello', 'Hello world, I am a task that has been created with JS. I will be used as a test exapmle.', new Date(), 'mild');
})();

const renderNewTaskInput = (() => {
    const button = document.querySelector('.body-control button');

    function render() {
        const content = document.querySelector('.body-control');

        const form = document.createElement('div');
        form.classList = 'new-task-input';
        const title = document.createElement('input');
        title.setAttribute('type', 'text');
        title.setAttribute('placeholder', 'Title: for example "Take a walk with my dog"');
        form.appendChild(title);
        const description = document.createElement('textarea');
        description.setAttribute('placeholder', 'Description: for example "Take my dog for a walk to Central Park. Then return home."');
        form.appendChild(description);
        const date = document.createElement('input');
        date.setAttribute('type', 'date');
        form.appendChild(date);
        const priority = document.createElement('select');
        const light = document.createElement('option');
        light.textContent = 'Light';
        light.setAttribute('value', 'light');
        priority.appendChild(light);
        const mild = document.createElement('option');
        mild.textContent = 'Mild';
        mild.setAttribute('value', 'mild');
        priority.appendChild(mild);
        const important = document.createElement('option');
        important.textContent = 'Important';
        important.setAttribute('value', 'important');
        priority.appendChild(important);
        form.appendChild(priority);
        const buttons = document.createElement('div');
        const cancel = document.createElement('button');
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => {
            content.removeChild(form);
        })
        buttons.appendChild(cancel);
        const add = document.createElement('button');
        add.textContent = 'Add';
        add.addEventListener('click', () => {
            console.log('Added!');
            content.removeChild(form);
        });
        buttons.appendChild(add);
        form.appendChild(buttons);
        content.appendChild(form);
    }

    button.addEventListener('click', () => {
        render();
    })
})();