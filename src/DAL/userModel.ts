import axios from 'axios';
import { observable, toJS } from 'mobx';

class Company {
    name: string = '';
    catchPhrase: string = '';
    bs: string = '';
}

export class Address {
    street: string = '';
    suite: string = '';
    city: string = '';
    zipcode: string = '';
    geo: any
}

export class User {
    constructor(obj: User) {
        this.id = obj.id;
        this.name = obj.name;
        this.username = obj.username;
        this.email = obj.email;
        this.address = toJS(obj.address);
    }
    id: number;
    @observable name: string;
    @observable username: string;
    @observable email: string;
    address: Address = new Address();
    phone: string = '';
    website: string = '';
    company: Company = new Company();
}

let _store: { users: User[] } = { users: [] };
export const store = observable(_store);

export async function getUsers() {
    if (store.users.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/users');
        store.users = response.data;
    }
}

export function deleteUser(id: number) {
    store.users = store.users.filter(u => u.id !== id);
}

export function updateUser(newUserData: User) {
    let newUser = new User(newUserData);
    store.users = store.users.map(u => (u.id === newUserData.id) ? newUser : u);
}

export async function addUser(newUser: Partial<User>) {
    newUser.id = store.users[store.users.length - 1].id + 1
    await store.users.push(newUser as User);
}

export function searchUserMatchList(searchText: string) {
    if (searchText === '') return store.users;
    let searchList = store.users.filter(u =>
        u.name.toLowerCase().includes(searchText)
        || u.email.toLowerCase().includes(searchText)
    );
    return searchList;
}

// export default {
//     getUsers,
//     deleteUser,
//     updateUser,
//     addUser,
//     searchUserMatchList,
//     store, 
//     User
// }