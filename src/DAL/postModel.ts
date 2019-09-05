import axios from 'axios';

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

let posts: Post[] = [];

let getPosts = async () => {
    if (posts.length === 0) {
        let response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        posts = response.data;
    }
    return posts;
}

let getUserPosts = async (userId: number) => {
    let userPosts = posts.filter(p => p.userId === userId);
    return userPosts;
}

let addPost = async (newPost:Post) => {
    let newPostkId = (posts.length) + 1;
    newPost.id = newPostkId;
    await posts.push(newPost);
}

export default { getPosts, getUserPosts, addPost }