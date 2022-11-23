// This module is responsible for storing data and saving it to the local storage.

const storage = (() => {
  // Check if the storage is empty
  function areProjectsEmpty() {
    if (getProjects() === null) {
      return [];
    }
    return getProjects();
  }

  // Projects
  const projectsStorage = areProjectsEmpty();

  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projectsStorage));
  }

  function getProjects() {
    const array = (JSON.parse(localStorage.getItem("projects")));
    return array;
  }

  return {
    projectsStorage,
    saveProjects,
    getProjects,
  };
})();

export default { storage };
