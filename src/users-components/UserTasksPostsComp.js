import React, { Component } from 'react';
import TaskListComp from '../tasks-components/TaskListComp';
import PostTemplateComp from '../posts-components/PostTemplateComp';

class UserTasksPostsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userTasks: [],
            userPosts: [],
            idToggleTasksPosts: undefined
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.postsUpdate !== nextProps.postsUpdate) {
            let newTasks = nextProps.tasksUpdate;
            let newPosts = nextProps.postsUpdate;
            if (newTasks === undefined) newTasks = [];
            if (newPosts === undefined) newPosts = [];
            let newTpggleTP = nextProps.idToggleTasksPosts
            this.setState({ userTasks: newTasks });
            this.setState({ userPosts: newPosts });
            this.setState({ idToggleTasksPosts: newTpggleTP });
        }
        return true;
    }

    onTaskDone = (task) => {
        this.props.onTaskDone(task);
    }

    render() {
        let tasks = this.state.userTasks;
        let posts = this.state.userPosts.map(p => {
            return (<PostTemplateComp key={p.id}
                postData={p} />)
        })
        if (posts.length === 0) posts = undefined;

        let brdr = (posts !== undefined && tasks !== undefined) ? 'addBorder' : undefined;
        
        return (
            <div>
                <div id='tasksAndPostsDiv' className={brdr}>
                    <div id="tasksDiv">
                        {<TaskListComp
                            idToggleTasksPosts={this.state.idToggleTasksPosts}
                            onTaskDone={this.onTaskDone} />}
                    </div>
                    <div id='postDiv'>
                        {posts}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserTasksPostsComp;