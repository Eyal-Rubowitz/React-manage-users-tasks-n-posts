import axios from 'axios';
import { observable } from 'mobx';

export class Post {
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

let _store: { posts: Post[] } = { posts: [] };
export const store = observable(_store);

export async function getPosts() {
    if (store.posts.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        store.posts = response.data;
    }
    return store.posts;
}

export function getUserPosts(userId: number | null) {
    let userPosts = store.posts.filter(p => p.userId === userId);
    return userPosts;
}

export async function addPost(newPost:Partial<Post>) {
    let newPostkId = (store.posts.length) + 1;
    newPost.id = newPostkId;
    await store.posts.push(newPost as Post);
}

export default { getPosts, getUserPosts, addPost, store, Post }