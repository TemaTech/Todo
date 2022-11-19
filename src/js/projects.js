// This module is responsible for creating new projects and adding them to a storage.
import { storage } from "./storage";


const projects = (() => {

    function projectFactory(title, color) {
        let tasks = [];
        return { title, color, tasks };
    }
    
    function createNewProject(title, color) {
        const newProject = projectFactory(title, color);
        storage.projectsStorage.push(newProject);
        storage.saveProjects();
    }

    function removeProject(id) {
        const array = storage.getProjects();
        array.splice(array.indexOf(array[id]), 1);
        localStorage.setItem('projects', JSON.stringify(array));
        location.reload();
    }

    return { createNewProject, removeProject };
})();


export { projects };