import axios from 'axios';
let users = [];

let getUsers = async () => {
    if (users.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/users');
        users = response.data;
    }
    return users;
}

let deleteUser = (id) => {
    users = users.filter(u => u.id !== id);
}


export default { getUsers, deleteUser}
