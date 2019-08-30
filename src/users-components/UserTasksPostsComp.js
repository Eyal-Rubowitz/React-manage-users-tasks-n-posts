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

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.tasksUpdate !== nextProps.tasksUpdate) {
            let newTasks = nextProps.tasksUpdate;
            if (newTasks === undefined) newTasks = [];
            let newTpggleTP = nextProps.idToggleTasksPosts
            this.setState({ userTasks: newTasks });
            this.setState({ idToggleTasksPosts: newTpggleTP });
        }
        if (this.props.postsUpdate !== nextProps.postsUpdate) {
            let newPosts = nextProps.postsUpdate;
            if (newPosts === undefined) newPosts = [];
            let newTpggleTP = nextProps.idToggleTasksPosts
            this.setState({ userPosts: newPosts });
            this.setState({ idToggleTasksPosts: newTpggleTP });
        }
        if (this.props.idToggleTasksPosts !== nextProps.idToggleTasksPosts) {
            if (this.state.idToggleTasksPosts !== undefined) {
                this.setState({
                    idToggleTasksPosts: nextProps.idToggleTasksPosts,
                    userTasks: [],
                    userPosts: []
                });
            }
            if (this.state.idToggleTasksPosts === undefined 
                || this.state.idToggleTasksPosts !== nextProps.idToggleTasksPosts) {
                this.setState({ toggleTaskForm: false });
                this.setState({ togglePostForm: false });
            }
        }
        if (this.state.userTasks !== nextState.userTasks) {
            this.setState({ userTasks: nextState.userTasks });
        }
        if (this.state.userPosts !== nextState.userPosts) {
            this.setState({ userPosts: nextState.userPosts });
        }
        return true;
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
        if (task.completed === false) this.set0State({ toggleTaskForm: false });
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