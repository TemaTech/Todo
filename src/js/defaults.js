// This module is responsible for default projects.

import { storage } from "./storage";


const defaults = (() => {
    // Plan
    // --------------------
    // Inbox is going to be made by: looping through all projects and adding tasks to inbox.
    // Today will be made by: looping through inbox and adding tasks that have today's date to today array.
    // Done will be made by: looping through inbox and adding tasks that have truthy value
    // and adding them to the done array.
})();


export { defaults };