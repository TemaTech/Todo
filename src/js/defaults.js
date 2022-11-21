// This module is responsible for default projects.

import { storage } from "./storage";
import { format } from 'date-fns';
import { stringify } from "querystring";


const defaults = (() => {

    function addToInbox() {
        storage.inboxStorage.length = 0;
        for (let i in storage.getProjects()) {
            storage.inboxStorage.push(storage.getProjects()[i].tasks);
            storage.saveInbox();
        }
    }

    function addToToday() {
        storage.todayStorage.length = 0;
        storage.todayStorage.push(storage.getInbox()[0].filter(task => task.dueDate == format(new Date(), 'yyyy-M-d')));
        storage.saveToday();
    }

    function addToDone() {
        storage.doneStorage.length = 0;
        storage.doneStorage.push(storage.getInbox()[0].filter(task => task.isDone === true));
        storage.saveDone();
    }


    addToInbox();
    addToToday();
    addToDone();

})();


export { defaults };