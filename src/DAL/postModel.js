import axios from 'axios';
let posts = [];

let getPosts = async () => {
    if (posts.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        posts = response.data;
    }
    return posts;
}

let getUserPosts = async (userId) => {
    let response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    posts = response.data;
    return posts;
}

export default {getPosts, getUserTasks: getUserPosts}