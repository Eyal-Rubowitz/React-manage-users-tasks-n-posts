import React, { Component } from 'react';
import * as userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';
import DashboardComp from '../dashboard-components/DashboardComp';
import UserTemplateComp from './UserTemplateComp';
import UserTasksPostsComp from './UserTasksPostsComp';
import NewUserFormComp from './NewUserFormComp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { computed, action } from 'mobx';
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
                <Router >
                    <div className='main-column mainUserList'>
                        <DashboardComp />
                        {users}
                    </div>
                    <div className="main-column tasksAndPostsDiv">
                        {AppState.activeForm === FormsEnum.NewUser ?
                            <NewUserFormComp />
                            : undefined}
                        <Switch>
                            <Route path="/:id" component={UserTasksPostsComp}  />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default UserListComp;