import React, { Component } from 'react';
import SearchBoxComp from './dashboard-child-comps/SearchBoxComp';
import RefreshUserListComp from './dashboard-child-comps/RefreshUserListComp';
import '../dashboard-components/dashboard-style/DashboardCss.scss';

class DashboardComp extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: [], isBtnClickable: true };
    }

    componentDidUpdate(pervProps){
        if(this.props.isUserAddable === pervProps.isUserAddable) return false;
        let isClickable = this.props.isUserAddable ? true : false;
        this.setState({isBtnClickable: isClickable});
    }

    onGetUserList = async (users) => {
        console.log('users: ', users);
        let newUsers = users;
        await this.setState({userList: newUsers});
        this.props.usersFound(this.state.userList);
    }

    onAddUser = () => {
        this.props.onAddUser();
    }

    render() {
        let btnStyle = this.state.isBtnClickable === true ? "adding" : "btnUnClick";
        return (
            <div id="dashboard">
                    <SearchBoxComp usersFound={this.onGetUserList} />
                    <RefreshUserListComp usersFound={this.onGetUserList} />
                    <input type="button" id="addUserBtn" className={btnStyle} value="Add User" onClick={this.onAddUser} />
            </div>
        );
    }
}

export default DashboardComp;