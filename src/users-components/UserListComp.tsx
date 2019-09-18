import React, { Component } from 'react';
import * as userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';
import DashboardComp from '../dashboard-components/DashboardComp';
import UserTemplateComp from './UserTemplateComp';
import UserTasksPostsComp from './UserTasksPostsComp';
import NewUserFormComp from './NewUserFormComp';
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { AppState, FormsEnum } from '../stores/AppStore';
import './users-style/UserList.scss';

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

    render() {
        let userList = this.filteredUserList;
        let users = userList.map((u: any) => {
            return (<UserTemplateComp
                key={u.id}
                user={u} />)
        })
        // left-column scss.. merge with mainUserList + there is no right-column
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