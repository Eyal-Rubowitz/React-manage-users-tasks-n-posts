import axios from 'axios';
let tasks = [];

let getTasks = async () => {
    if (tasks.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        tasks = response.data;
    }
    return tasks;
}

let getUserTasks = async (userId) => {
    let userTasks = tasks.filter(t => t.userId === userId);
    return userTasks;
}

let taskDone = async (task) => {
    let taskCompleted = tasks.filter(t => t.id === task.id)[0];
    taskCompleted.completed = true;
    return taskCompleted;
}

let addTask = async (newTask) => {
    let newTaskId = tasks[tasks.length - 1].id + 1;
    newTask.id = newTaskId;
    await tasks.push(newTask);
}

export default {getTasks, getUserTasks, taskDone, addTask}