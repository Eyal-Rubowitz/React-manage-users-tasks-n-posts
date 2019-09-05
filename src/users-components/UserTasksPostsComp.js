import React, { Component } from 'react';
import TaskListComp from '../tasks-components/TaskListComp';
import PostTemplateComp from '../posts-components/PostTemplateComp';
import UserNewTaskFormComp from './UserNewTaskFormComp';
import UserNewPostFormComp from './UserNewPostFormComp';
import postModel from '../DAL/postModel';
import './users-style/UserTasksPostsCss.scss';
class UserTasksPostsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userTasks: [],
            userPosts: [],
            idToggleTasksPosts: undefined,
            toggleTaskForm: undefined,
            togglePostForm: undefined,
        };
    }

    componentDidMount() {
        postModel.getPosts().then(p => this.setState({ userPosts: p }))
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.idToggleTasksPosts !== nextProps.idToggleTasksPosts) {
            let newToggleTP = nextProps.idToggleTasksPosts
            let newTasks = nextProps.tasksUpdate;
            let newPosts = nextProps.postsUpdate;
            if (newTasks === undefined) newTasks = [];
            if (newPosts === undefined) newPosts = [];
            this.setState({ idToggleTasksPosts: newToggleTP });
            this.setState({ userTasks: newTasks });
            this.setState({ userPosts: newPosts });
        }
    }

    onAddTask = () => {
        this.setState({ toggleTaskForm: true });
    }

    onAddPost = () => {
        this.setState({ togglePostForm: true });
    }

    onCloseTaskForm = () => {
        this.setState({ toggleTaskForm: false });
    }

    onClosePostForm = () => {
        this.setState({ togglePostForm: false });
    }

    onUpdateTask = (task) => {
        this.props.onTaskDone(task);
        if (task.completed === false) this.setState({ toggleTaskForm: false });
    }

    onUpdatePost = () => {
        let userId = this.state.idToggleTasksPosts;
        postModel.getUserPosts(userId).then(p => this.setState({ userPosts: p }));
        this.setState({ togglePostForm: false });
    }

    render() {
        let posts = this.state.userPosts.map(p => {
            return (<PostTemplateComp key={p.id}
                postData={p} />)
        })
        if (posts.length === 0) posts = undefined;

        let isToggle = this.state.idToggleTasksPosts;
        let brdr = isToggle ? 'addBorder' : undefined;
        let visableStyle = isToggle ? 'block' : 'none';
        let taskTgl = this.state.toggleTaskForm;
        let postTlg = this.state.togglePostForm;
        return (
            <div className={brdr} style={{ display: visableStyle }}>
                {taskTgl ? <input type="button"
                    value="🡄 Back"
                    className="formBackBtn"
                    onClick={this.onCloseTaskForm} />
                    : <input type="button" className="adding" value="Add Task" onClick={this.onAddTask} />}

                {taskTgl ? <UserNewTaskFormComp
                    userId={this.state.idToggleTasksPosts}
                    getNewTaskList={this.onUpdateTask} /> : null}
                <div id="tasksDiv">
                    {<TaskListComp
                        idToggleTasksPosts={this.state.idToggleTasksPosts}
                        onTaskDone={this.onUpdateTask} />}
                </div>
                {postTlg ? <input type="button"
                    className="formBackBtn"
                    value="🡄 Back"
                    onClick={this.onClosePostForm} />
                    : <input type="button" className="adding" value="Add Post" onClick={this.onAddPost} />}
                {postTlg ? <UserNewPostFormComp
                    userId={this.state.idToggleTasksPosts}
                    onPostChanged={this.onUpdatePost} /> : null}
                <div id='postDiv'>
                    {posts}
                </div>
            </div>
        );
    }
}

export default UserTasksPostsComp;