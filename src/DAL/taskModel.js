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

// let addTask = async (newTask) => {
//     console.log(tasks.length);
//     let userTasks = tasks.filter( t => t.userId === newTask.userId);
//     console.log('newTask: ', newTask);
//     await userTasks.push(newTask);
//     // console.log('tasks[userTasks]: ',tasks[userTasks]);
//     console.log('tasks.length: ', tasks.length);
//     console.log('tasks[newTask.userId].userId: ', tasks[newTask.userId].userId);
//     console.log('tasks[newTask.userId]: ', tasks[newTask.userId]);
//     console.log('userTasks.length: ', userTasks.length);
//     console.log("userTasks[20]: ",userTasks[20]); 
//     return await getTasks();
// }

let addTask = async (newTask) => {
    let newTaskId = tasks[tasks.length - 1].id + 1;
    newTask.id = newTaskId;
    console.log('newTask: ', newTask);
    console.log('newTask.userId: ', newTask.userId);
    await tasks.push(newTask);
    console.log("tasks: ", tasks);
    // return await getTasks();
}

export default {getTasks, getUserTasks, taskDone, addTask}