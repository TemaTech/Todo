// This module is responsible for storing data and saving it to the local storage.

const storage = (() => {
    
    // Check if the storage is empty
    function areProjectsEmpty() {
        if (getProjects() === null) {
            return [];
        } else {
            return getProjects();
        }
    }

    function isInboxEmpty() {
        if (getInbox() === null) {
            return [];
        } else {
            return getInbox();
        }
    }

    function isTodayEmpty() {
        if (getToday() === null) {
            return [];
        } else {
            return getToday();
        }
    }

    function isDoneEmpty() {
        if (getDone() === null) {
            return [];
        } else {
            return getDone();
        }
    }


    // Projects
    let projectsStorage = areProjectsEmpty();

    function saveProjects() {
        localStorage.setItem('projects', JSON.stringify(projectsStorage));
    }

    function getProjects() {
        const array = (JSON.parse(localStorage.getItem('projects')));
        return array;
    }


    // Inbox
    let inboxStorage = isInboxEmpty();

    function saveInbox() {
        localStorage.setItem('inbox', JSON.stringify(inboxStorage));
    }

    function getInbox() {
        const array = (JSON.parse(localStorage.getItem('inbox')));
        return array;
    }


    // Today
    let todayStorage = isTodayEmpty();

    function saveToday() {
        localStorage.setItem('today', JSON.stringify(todayStorage));
    }

    function getToday() {
        const array = (JSON.parse(localStorage.getItem('today')));
        return array;
    }


    // Done
    let doneStorage = isDoneEmpty();

    function saveDone() {
        localStorage.setItem('done', JSON.stringify(doneStorage));
    }

    function getDone() {
        const array = (JSON.parse(localStorage.getItem('done')));
        return array;
    }


    return { 
        projectsStorage,
        inboxStorage,
        saveProjects,
        getProjects,
        saveInbox,
        getInbox,
        todayStorage,
        saveToday,
        getToday,
        doneStorage,
        saveDone,
        getDone
    };
})();


export { storage };