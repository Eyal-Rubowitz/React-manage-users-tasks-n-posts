import React, { Component } from 'react';
import UserTemplateComp from './UserTemplateComp';
import TaskListComp from '../tasks-components/TaskListComp';
import PostTemplateComp from '../posts-components/PostTemplateComp';
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

    onRefreshList = () => {
        userModel.refreshList().then(res =>
            this.setState({ userList: res })
        );
    }

    onHandleSearch = (e) => {
        let searchText = e.target.value;
        let searchedList = userModel.searchUserMatchList(searchText);
        this.setState({ userList: searchedList });
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

        // let visabilityStyle = (this.state.idToggleTasksPosts === undefined) ? 'hide' : 'show';

        // let tasks = this.state.userTasks.map(t => {
        //     return (<TaskListComp key={t.id}
        //         taskData={t} />)
        // })

        // if (tasks.length === 0) tasks = undefined;

        let posts = this.state.userPosts.map(p => {
            return (<PostTemplateComp key={p.id}
                postData={p} />)
        })

        if (posts.length === 0) posts = undefined;
        let tasks = this.state.userTasks;
        // let tlc = <TaskListComp tasksData={tasks} />;
        // console.log('tlc: ',tlc);
        let brdr = (posts !== undefined && tasks.ref !== null) ? 'addBorder' : undefined;

        return (
            <div id="mainPage">
                <div id='mainUserList'>
                    <div id="searchTextBox">
                        Search: <input type="text" onChange={this.onHandleSearch} />
                    </div>
                    <div id="refreshListBtn">
                        <input type="button"
                            value="Refresh User List"
                            onClick={this.onRefreshList} />
                    </div>
                    <div>
                        {users}
                    </div>
                </div>
                &nbsp;
                <div id='tasksAndPostsDiv' className={brdr}>
                    <div id="tasksDiv">
                        {/* toggleList={this.state.idToggleTasksPosts} */}
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

export default UserListComp;