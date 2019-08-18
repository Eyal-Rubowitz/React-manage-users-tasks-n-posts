import React, { Component } from 'react';
import SearchBoxComp from '../dashboard-components/SearchBoxComp';
import UserTemplateComp from './UserTemplateComp';
import UserTasksPostsComp from './UserTasksPostsComp';
import userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';
import postModel from '../DAL/postModel';
import './UserListCss.css';

class UserListComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            idToggleTasksPosts: undefined,
            userTasks: [],
            userPosts: [],
            version: {}
        };
    }

    componentDidMount() {
        this.onUpdateList();
    }

    onUpdateList = () => {
        userModel.getUsers().then(res =>
            this.setState({ userList: res })
        );
    }

    getSearchedUsers = async (usersFound) => {
        let users = await usersFound;
        this.setState({ userList: users });
    }

    toggleTaskPostLists = async (id) => {
        (this.state.idToggleTasksPosts === id) ?
            await this.setState({ idToggleTasksPosts: undefined })
            : await this.setState({ idToggleTasksPosts: id });

        (this.state.idToggleTasksPosts === undefined) ?
            this.setState({ userTasks: [] })
            : await taskModel.getUserTasks(id).then(t => this.setState({ userTasks: t }));

        (this.state.idToggleTasksPosts === undefined) ? this.setState({ userPosts: [] })
            : await postModel.getUserTasks(id).then(p => this.setState({ userPosts: p }));
    }

    onTaskDone = (task) => {
        let version = this.state.version;
        version[task.userId] = (version[task.userId] || 0) + 1
        this.setState(version);
    }

    render() {
        let users = this.state.userList.map(u => {
            return (<UserTemplateComp key={u.id}
                userData={u}
                updateList={this.onUpdateList}
                onShowTaskPostLists={this.toggleTaskPostLists}
                version={this.state.version[u.id] || 0} />)
        })
        
        let tasks = this.state.userTasks;
        let posts = this.state.userPosts;

        return (
            <div id="mainPage">
                <div id='mainUserList'>
                    <div id="searchTextBox">
                        {<SearchBoxComp usersFound={this.getSearchedUsers} />}
                    </div>
                    <div>
                        {users}
                    </div>
                </div>
                &nbsp;
                    {<UserTasksPostsComp 
                        tasksUpdate={tasks}
                        postsUpdate={posts}
                        idToggleTasksPosts={this.state.idToggleTasksPosts}
                        onTaskDone={this.onTaskDone} />}
            </div>
        );
    }
}

export default UserListComp;