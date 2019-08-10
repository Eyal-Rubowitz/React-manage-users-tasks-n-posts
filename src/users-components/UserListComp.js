import React, { Component } from 'react';
import UserTemplateComp from './UserTemplateComp';
import userModel from '../DAL/userModel';
import './UserListCss.css';

class UserListComp extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: [] };
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

    render() {
        let users = this.state.userList.map(u => {
            return (<UserTemplateComp key={u.id} userData={u} updateList={this.onUpdateList} />)
        })
        return (
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
        );
    }
}

export default UserListComp;