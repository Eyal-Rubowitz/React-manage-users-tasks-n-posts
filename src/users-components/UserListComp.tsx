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
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './users-style/UserListCss.scss';

@observer
class UserListComp extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            userList: [],
            idToggleTasksPosts: undefined,
            toggleUserForm: false,
            userTasks: [],
            userPosts: []
        };
    }

    componentDidMount() {
        this.onUpdateList();
    }

    onUpdateList = async () => {
        userModel.getUsers();
    }

    getSearchedUsers = async (usersFound: {}) => {
        let users = await usersFound;
        this.setState({ userList: users });
    }

    // toggleTaskPostLists = async (id: number) => {
    //     (this.state.idToggleTasksPosts === id) ?
    //         await this.setState({ idToggleTasksPosts: undefined })
    //         : await this.setState({ idToggleTasksPosts: id });

    //     if (this.state.idToggleTasksPosts) this.onCloseUserForm();

    //     (this.state.idToggleTasksPosts === undefined) ?
    //         this.setState({ userTasks: [] })
    //         : await taskModel.getUserTasks(id).then(t => this.setState({ userTasks: t }));

    //     (this.state.idToggleTasksPosts === undefined) ? this.setState({ userPosts: [] })
    //         : await postModel.getUserPosts(id).then(p => this.setState({ userPosts: p }));
    // }

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

    // onUpdateTasks = () => {
    //     let tasks = taskModel.getUserTasks(this.state.idToggleTasksPosts);
    //     this.setState({ userTasks: tasks });
    // }

    render() {
        let userList = userModel.store.users;
        let users = userList.map((u:any) => {
            return (<UserTemplateComp
                key={u.id}
                user={u} />)
        })

        return (
            <div id="mainPage">
            <div id='left-column'>
                {/* <div>
                    Names: {userList.map((u:any) => {
                        return(<span>{u.name}, </span>)
                    })}
                </div> */}
                <div id='mainUserList'>
                {users}
                </div>
                </div>
                <div id="tasksAndPostsDiv">
                    <PostListComp />
                </div>
            </div>
            
        );
        // let users = this.state.userList.map(u => {
        //     return (<UserTemplateComp
        //         key={u.id}
        //         userData={u}
        //         updateList={this.onUpdateList}
        //         onShowTaskPostLists={this.toggleTaskPostLists} />)
        // })

        // let isUserFormOpen = this.state.toggleUserForm;

        // let newUserForm = isUserFormOpen ?
        //     <NewUserFormComp
        //         newUserId={this.GetNewId()}
        //         onCloseForm={this.onCloseUserForm}
        //         updateUserList={this.onUpdateList} />
        //     : undefined;

        // return (
        //     <div id="mainPage">

        //         <div id='left-column'>
        //             <div id='mainUserList'>
        //                 <DashboardComp
        //                     usersFound={this.getSearchedUsers}
        //                     onAddUser={this.onAddUser}
        //                     isUserAddable={!isUserFormOpen} />
        //                 {users}
        //             </div>
        //         </div>

        //         <div id="tasksAndPostsDiv">
        //             <UserTasksPostsComp
        //                 tasksUpdate={this.state.userTasks}
        //                 postsUpdate={this.state.userPosts}
        //                 idToggleTasksPosts={this.state.idToggleTasksPosts}
        //                 onTaskDone={this.onUpdateList}
        //                 getUpdatedTask={this.onUpdateTasks} />

        //             {newUserForm}
        //         </div>
        //     </div>
        // );
    }
}

export default UserListComp;