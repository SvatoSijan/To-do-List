let tasklist = {
    tasks: [],
    addTask: function(task, deadline) {
        this.tasks.push({ 'task': task, 'deadline': deadline });
    },
    removeTask: function(task) {
        let indexToRemove = this.tasks.findIndex(item => item.task === task);

        if (indexToRemove !== -1) {
            this.tasks.splice(indexToRemove, 1);
        }
    }
};
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd;

tasklist.addTask('T1', '2024-06-30');
tasklist.addTask('Submit report', '');
tasklist.addTask('sign report', '2024-06-20');
tasklist.addTask('call mom', '1662-06-20');
tasklist.addTask('Date night', '1385-06-20');



export default tasklist;