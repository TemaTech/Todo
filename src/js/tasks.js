// This module is responsible for creating new tasks and adding them to the storage.
import { storage } from "./storage";


const tasks = (() => {

    function taskFactory(title, description, dueDate, priority) {
        isDone = false;
        return { title, description, dueDate, priority, isDone };
    }

    function createNewTask(title, description, dueDate, priority, location) {
        const project = storage.getProjects()[location].tasks;
        const newTask = taskFactory(title, description, dueDate, priority);
        project.push(newTask);
        console.log(project);
    }

    return { createNewTask };
})();


export { tasks };