import React, { Component } from 'react';
import SearchBoxComp from './dashboard-child-comps/SearchBoxComp';
import RefreshUserListComp from './dashboard-child-comps/RefreshUserListComp';
import '../dashboard-components/dashboard-style/DashboardCss.scss';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { AppState, FormsEnum } from '../stores/AppStore';

@observer
class DashboardComp extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { userList: [], isBtnClickable: true };
    // }

    // componentDidUpdate(pervProps){
    //     if(this.props.isUserAddable === pervProps.isUserAddable) return false;
    //     let isClickable = this.props.isUserAddable ? true : false;
    //     this.setState({isBtnClickable: isClickable});
    // }

    // onGetUserList = async (users) => {
    //     console.log('users: ', users);
    //     let newUsers = users;
    //     await this.setState({userList: newUsers});
    //     this.props.usersFound(this.state.userList);
    // }


    render() {
        // let btnStyle = this.state.isBtnClickable === true ? "adding" : "btnUnClick";
        let btnStyle = true ? "adding" : "btnUnClick";
        return (
            <div id="dashboard">
                    <SearchBoxComp />
                    {/* <RefreshUserListComp usersFound={this.onGetUserList} /> */}
                    <input type="button" id="addUserBtn" className={btnStyle} value="Add User" onClick={action(() => AppState.activeForm = FormsEnum.NewUser)} />
            </div>
        );
    }
}

export default DashboardComp;