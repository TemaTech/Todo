// This module is responsible for creating new tasks and adding them to the storage.
import { storage } from "./storage";


const tasks = (() => {

    function taskFactory(title, description, dueDate, priority, projectLocation) {
        let isDone = false;
        return { title, description, dueDate, priority, isDone, projectLocation };
    }

    function createNewTask(title, description, dueDate, priority, location) {
        const newTask = taskFactory(title, description, dueDate, priority, location);
        storage.projectsStorage[location].tasks.push(newTask);
        storage.saveProjects();
    }

    function removeTask(location, index) {
        storage.projectsStorage[location].tasks.splice(storage.projectsStorage[location].tasks[index], 1);
        storage.saveProjects();
    }

    return { createNewTask, removeTask };

})();


export { tasks };