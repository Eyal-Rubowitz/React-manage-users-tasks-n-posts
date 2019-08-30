import axios from 'axios';
let users = [];

let getUsers = async () => {
    if (users.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/users');
        users = response.data;
    }
    return users;
}

let refreshList = async () => {
    users = [];
    return await getUsers();
}

let deleteUser = (id) => {
    users = users.filter(u => u.id !== id);
}

let updateUser = (newUserData) => {
    users = users.map(u => (u.id === newUserData.id) ? u = newUserData : u);
}

let addUser = async (newUser) => {
    await users.push(newUser);
}

let searchUserMatchList = (searchText) => {
    if (searchText === '') return users;
    let searchList = users.filter(u => 
         u.name.toLowerCase().includes(searchText)
        || u.email.toLowerCase().includes(searchText)
    );
    return searchList;
}

export default { getUsers, 
                 refreshList, 
                 deleteUser, 
                 updateUser,
                 addUser,
                 searchUserMatchList }
