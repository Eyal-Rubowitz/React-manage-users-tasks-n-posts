import React, { Component } from 'react';
import TaskListComp from '../tasks-components/TaskListComp';
import PostTemplateComp from '../posts-components/PostTemplateComp';
import UserNewTaskFormComp from './UserNewTaskFormComp';
import './users-style/UserTasksPostsCss.scss';
class UserTasksPostsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userTasks: [],
            userPosts: [],
            idToggleTasksPosts: undefined,
            toggleTaskForm: undefined,
            nextNewTaskId: undefined,
            togglePostForm: undefined
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.tasksUpdate !== nextProps.tasksUpdate){
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
        }
        if(this.state.userTasks !== nextState.userTasks) {
            console.log(nextState.userTasks);
            this.setState({userTasks: nextState.userTasks});
        }
        return true;
    }

    onTaskDone = (task) => {
        // when new task added, this method beeing called
        // but it gets an undefind argument.

        // if(task === undefined) return;
        console.log("onTaskDone: ", task);
        this.props.onTaskDone(task);
    }

    onAddTask = () => {
        let tgl = true;
        this.setState({toggleTaskForm: tgl});
    }

    onUpdateTaskList = async (newTaskList) => {
        console.log('onUpdateTaskList!!!');
        let ntl = newTaskList;
        console.log('newTaskList: ', newTaskList);
        await this.setState({userTasks: ntl});
        this.props.getUpdatedTask(newTaskList[newTaskList.length - 1])
    }

    render() {
        let posts = this.state.userPosts.map(p => {
            return (<PostTemplateComp key={p.id}
                postData={p} />)
        })
        if (posts.length === 0) posts = undefined;

        console.log('render userTasks: ',this.state.userTasks);

        let isToggle = this.state.idToggleTasksPosts;
        let brdr = isToggle ? 'addBorder' : undefined;
        let visableStyle = isToggle ? 'block' : 'none';
        let taskTgl = this.state.toggleTaskForm;
        return (
            <div className={brdr} style={{ display: visableStyle }}>
                <input type="button" className="adding" value="Add Task" onClick={this.onAddTask} />
                {taskTgl ? <UserNewTaskFormComp 
                                userId={this.state.idToggleTasksPosts}
                                getNewTaskList={this.onTaskDone} /> : null}
                <div id="tasksDiv">
                    {<TaskListComp
                        idToggleTasksPosts={this.state.idToggleTasksPosts}
                        onTaskDone={this.onTaskDone} />}
                </div>
                <input type="button" value="Add Post" />
                <div id='postDiv'>
                    {posts}
                </div>
            </div>
        );
    }
}

export default UserTasksPostsComp;