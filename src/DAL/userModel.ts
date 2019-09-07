import axios from 'axios';
import { observable } from 'mobx';
import { number } from 'prop-types';

class Company {
    name: string = '';
    catchPhrase: string = '';
    bs: string = '';
}
class Address {
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

let tempStore: { users: User[] } = { users: [] }
export const store = observable(tempStore);

export async function getUsers() {
    if (store.users.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/users');
        store.users = response.data;
    }
}

 let refreshList = async () => {
    store.users = [];
    getUsers();
}

 export function deleteUser(id: number) {
    store.users = store.users.filter(u => u.id !== id);
}

export function updateUser(newUserData: User) {
    let newUser = new User(newUserData);
    store.users = store.users.map(u => (u.id === newUserData.id) ? newUser : u);
}

 let addUser = async (newUser: User) => {
    await store.users.push(newUser);
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
//     refreshList,
//     deleteUser,
//     updateUser,
//     addUser,
//     searchUserMatchList,
//     store, 
//     User
// }

