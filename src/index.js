import './css/styles.css';

// Hide side menu
const hideSideMenu = (() => {
    const button = document.querySelector('.nav-right button');

    function hide() {
        
    }

    button.addEventListener('click', () => {
        hide();
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
        container.appendChild(popUp);
    }

    button.addEventListener('click', () => {
        addPopUp();
    });
})();