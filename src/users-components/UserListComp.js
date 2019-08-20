import React, { Component } from 'react';
import DashboardComp from '../dashboard-components/DashboardComp';
import UserTemplateComp from './UserTemplateComp';
import UserTasksPostsComp from './UserTasksPostsComp';
import NewUserFormComp from './NewUserFormComp';
import userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';
import postModel from '../DAL/postModel';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './users-style/UserListCss.scss';

class UserListComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            idToggleTasksPosts: undefined,
            toggleUserForm: false,
            userTasks: [],
            userPosts: [],
            version: {}
        };
    }

    componentDidMount() {
        this.onUpdateList();
    }

    onUpdateList = async () => {
        await userModel.getUsers().then(res =>
            this.setState({ userList: res })
        );
    }

    getSearchedUsers = async (usersFound) => {
        let users = await usersFound;
        console.log('searched users: ', users);
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

    onAddUser = async () => {
        this.setState({ idToggleTasksPosts: undefined });
        this.setState({toggleUserForm: true});
        this.GetNewId();
    }

    GetNewId = () => {
        if (this.state.userList.length === 0) return;
        let lastUserIndex = this.state.userList.length - 1;
        console.log('lastUserIndex:', lastUserIndex);
        let lastUserId = this.state.userList[lastUserIndex].id;
        console.log("lastUserId: ", lastUserId);
        return lastUserId + 1;
    }

    onCloseUserForm = () => {
        this.setState({ toggleUserForm: false });
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

        let newUserForm = this.state.toggleUserForm ?
            <NewUserFormComp
                newUserId={this.GetNewId()}
                onCloseForm={this.onCloseUserForm}
                updateUserList={this.onUpdateList} />
            : undefined;

        return (
            <div id="mainPage">

                <DashboardComp
                    usersFound={this.getSearchedUsers}
                    onAddUser={this.onAddUser} />

                <div id='mainUserList'>
                    {users}
                </div>

                &nbsp;

                <UserTasksPostsComp
                    tasksUpdate={tasks}
                    postsUpdate={posts}
                    idToggleTasksPosts={this.state.idToggleTasksPosts}
                    onTaskDone={this.onTaskDone} />
                    
                {newUserForm}
            </div>
        );
    }
}

export default UserListComp;