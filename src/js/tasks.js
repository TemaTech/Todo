// This module is responsible for creating new tasks and adding them to the storage.
import { storage } from "./storage";


const tasks = (() => {

    function taskFactory(title, description, dueDate, priority) {
        let isDone = false;
        return { title, description, dueDate, priority, isDone };
    }

    function createNewTask(title, description, dueDate, priority, location) {
        const newTask = taskFactory(title, description, dueDate, priority);
        storage.projectsStorage[location].tasks.push(newTask);
        storage.saveProjects();
    }

    function removeTask(location, id) {
        storage.projectsStorage[location].tasks.splice(storage.projectsStorage[location].tasks.indexOf(storage.projectsStorage[location].tasks[id]), 1);
        storage.saveProjects();
    }

    return { createNewTask, removeTask };

})();


export { tasks };