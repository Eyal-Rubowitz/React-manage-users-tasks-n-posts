import React, { Component } from 'react';
import userModel from '../../DAL/userModel';

class SearchBoxComp extends Component {
    constructor(props) {
        super(props);
        this.state = {userList: []};
    }

    async componentDidMount(){
        await userModel.getUsers(u => this.setState({userList: u}));
    }

    onHandleSearch = async (e) => {
        let searchText = e.target.value;
        let searchedList = userModel.searchUserMatchList(searchText);
        if (searchText.length === 0) searchedList = await userModel.getUsers();
        await this.setState({ userList: searchedList });
        this.props.usersFound(this.state.userList);
    }

    render() {
        return (
            <div id="searchTextBox">
                Search: <input type="text" onChange={this.onHandleSearch} />
            </div>
        );
    }
}

export default SearchBoxComp;