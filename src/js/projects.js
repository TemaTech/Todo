// This module is responsible for creating new projects and adding them to a storage.
import { storage } from "./storage";


const projects = (() => {

    function projectFactory(title, color) {
        let tasks = [];
        return { title, color, tasks };
    }
    
    function createNewProject(title, color) {
        const newProject = projectFactory(title, color);
        storage.tempProjectsStorage.push(newProject);
        storage.saveProjects();
    }

    function removeProject(id) {
        console.table();
    }

    return { createNewProject, removeProject };
})();


export { projects };