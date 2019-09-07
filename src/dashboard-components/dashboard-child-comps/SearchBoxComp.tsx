import React, { Component } from 'react';
import * as userModel from '../../DAL/userModel';
import { AppState } from '../../stores/AppStore';
import { action } from 'mobx';

class SearchBoxComp extends Component {
    // constructor(props: any) {
    //     super(props);
    //     this.state = {userList: []};
    // }

    // async componentDidMount(){
    //     await userModel.getUsers(u => this.setState({userList: u}));
    // }

    // onHandleSearch = async (e) => {
    //     let searchText = e.target.value;
    //     let searchedList = userModel.searchUserMatchList(searchText);
    //     if (searchText.length === 0) searchedList = await userModel.getUsers();
    //     await this.setState({ userList: searchedList });
    //     this.props.usersFound(this.state.userList);
    // }

    render() {
        return (
            <div id="searchTextBox">
                Search: <input type="text" onChange={action((e: React.ChangeEvent<HTMLInputElement>) => {AppState.searchText = e.target.value})} />
            </div>
        );
    }
}

export default SearchBoxComp;