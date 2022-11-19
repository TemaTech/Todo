// This module is responsible for storing data and saving it to the local storage.

const storage = (() => {
    function isEmpty() {
        if (getProjects() == null || getProjects() == '') {
            return [];
        } else {
            return getProjects();
        } 
    }

    let projectsStorage = isEmpty();

    function saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projectsStorage));
    }

    function getProjects() {
        const array = (JSON.parse(localStorage.getItem('projects')));
        return array;
    }


    return { projectsStorage, saveProjects, getProjects };
})();


export { storage };