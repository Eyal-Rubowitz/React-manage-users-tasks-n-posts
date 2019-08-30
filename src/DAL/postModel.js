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
    let userPosts = posts.filter(p => p.userId === userId);
    return userPosts;
}

let addPost = async (newPost) => {
    let newPostkId = (posts.length) + 1;
    newPost.id = newPostkId;
    await posts.push(newPost);
}

export default {getPosts, getUserPosts, addPost}