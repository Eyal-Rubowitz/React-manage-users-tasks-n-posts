import axios from 'axios';
import { observable } from 'mobx';

export class Task {
    constructor(obj: Task) {
        this.userId = obj.userId;
        this.id = obj.id;
        this.title = obj.title;
        this.completed = obj.completed;
    }
    userId: number;
    id: number;
    title: string;
    @observable completed: boolean
}

let _store: { tasks: Task[] } = { tasks: [] }
export const store = observable(_store);


export async function getTasks() {
    if (store.tasks.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        store.tasks = response.data;
    }
    return store.tasks;
}

export function getUserTasks(userId: number | null) {
    let userTasks = store.tasks.filter(t => t.userId === userId);
    return userTasks;
}

export async function taskDone(task: Task) {
    let taskCompleted = store.tasks.filter(t => t.id === task.id)[0];
    taskCompleted.completed = true;
    return taskCompleted;
}

export async function addTask(newTask: Partial<Task>) {
    let newTaskId = store.tasks[store.tasks.length - 1].id + 1;
    newTask.id = newTaskId;
    await store.tasks.push(newTask as Task);
}

// export function isUserFreeOfTasks() {
//     let res = store.tasks.filter(t => t.completed === false);
//     console.log(res);
//     return res;
// }

export default { getTasks, getUserTasks, taskDone, addTask }