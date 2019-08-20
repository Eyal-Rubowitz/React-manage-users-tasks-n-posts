import React, { Component } from 'react';
import SearchBoxComp from './dashboard-child-comps/SearchBoxComp';
import RefreshUserListComp from './dashboard-child-comps/RefreshUserListComp';
import '../dashboard-components/dashboard-style/DashboardCss.scss';

class DashboardComp extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: [] };
    }

    onGetUserList = async (users) => {
        let newUsers = users;
        await this.setState({userList: newUsers});
        this.props.usersFound(this.state.userList);
    }

    onAddUser = () => {
        this.props.onAddUser();
    }

    render() {
        return (
            <div id="dashboard">
                    <SearchBoxComp usersFound={this.onGetUserList} />
                    <RefreshUserListComp usersFound={this.onGetUserList} />
                    <input type="button" value="Add User" onClick={this.onAddUser} />
            </div>
        );
    }
}

export default DashboardComp;