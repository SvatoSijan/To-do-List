let projectList = {
    projects: [],
    addProject: function(project,description, deadline) {
        this.projects.push({ 'project': project,'description': description, 'deadline': deadline });
    },
    removeProject: function(project) {
        let indexToRemove = this.projects.findIndex(item => item.project === project);

        if (indexToRemove !== -1) {
            this.projects.splice(indexToRemove, 1);
        }
    }
};

projectList.addProject('Complete project', '2024-06-30');
projectList.addProject('Submit report', '2024-07-05');

export default projectList;