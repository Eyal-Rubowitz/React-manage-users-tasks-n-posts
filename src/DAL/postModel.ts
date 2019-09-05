import axios from 'axios';
import { observable } from 'mobx';

class Post {
    constructor(obj: Post) {
        this.userId = obj.userId;
        this.id = obj.id;
        this.title = obj.title;
        this.body = obj.body;
    }
    userId:number;
    id:number;
    title:string;
    body:string;
}

let _store: { posts: Post[] } = { posts: [] }
const store = observable(_store); 


let getPosts = async () => {
    if (store.posts.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        store.posts = response.data;
    }
    return store.posts;
}

let getUserPosts = (userId: number | null) => {
    let userPosts = store.posts.filter(p => p.userId === userId);
    return userPosts;
}

let addPost = async (newPost:Post) => {
    let newPostkId = (store.posts.length) + 1;
    newPost.id = newPostkId;
    await store.posts.push(newPost);
}

export default { getPosts, getUserPosts, addPost, store }