import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DashboardComp from '../dashboard-components/DashboardComp';
import UserTemplateComp from './UserTemplateComp';
import PostListComp from '../posts-components/PostListComp';
import UserTasksPostsComp from './UserTasksPostsComp';
import NewUserFormComp from './NewUserFormComp';
import * as userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';
import postModel from '../DAL/postModel';
import { AppState, FormsEnum } from '../stores/AppStore';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './users-style/UserListCss.scss';
import { computed } from 'mobx';

@observer
class UserListComp extends Component {

    componentDidMount() {
        userModel.getUsers();
        taskModel.getTasks();
    }

    @computed
    get filteredUserList() {
        return userModel.searchUserMatchList(AppState.searchText);
    }

    onAddUser = async () => {
        let colseTasksPosts = undefined;
        await this.setState({ idToggleTasksPosts: colseTasksPosts });
        this.setState({ toggleUserForm: true });
        this.GetNewId();
    }

    GetNewId = () => {
        // if (this.state.userList.length === 0) return;
        // let lastUserIndex = this.state.userList.length - 1;
        // let lastUserId = this.state.userList[lastUserIndex].id;
        // return lastUserId + 1;
    }

    onCloseUserForm = () => {
        this.setState({ toggleUserForm: false });
    }

    render() {
        let userList = this.filteredUserList;
        let users = userList.map((u: any) => {
            return (<UserTemplateComp
                key={u.id}
                user={u} />)
        })

        return (
            <div id="mainPage">
                <div id='left-column'>
                    <div id='mainUserList'>
                        <DashboardComp />
                        {users}
                    </div>
                </div>
                <div id="tasksAndPostsDiv">
                    {AppState.activeForm === FormsEnum.NewUser ?
                        <NewUserFormComp />
                        : undefined }
                    {AppState.currentUserId && <UserTasksPostsComp />}
                </div>
            </div>

        );



    }
}

export default UserListComp;