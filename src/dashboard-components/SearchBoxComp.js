import React, { Component } from 'react';
import userModel from '../DAL/userModel';

class SearchBoxComp extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: [] };
    }

    onHandleSearch = async (e) => {
        let searchText = e.target.value;
        let searchedList = userModel.searchUserMatchList(searchText);
        if (searchText === '') searchedList = await userModel.getUsers();
        await this.setState({ userList: searchedList });
        this.props.usersFound(this.state.userList);
    }

    onRefreshList = () => {
        userModel.refreshList().then(res =>
            this.setState({ userList: res })
        );
    }

    render() {
        return (
            <div>
                <div>
                    Search: <input type="text" onChange={this.onHandleSearch} />
                </div>
                <div id="refreshListBtn">
                    <input type="button"
                        value="Refresh User List"
                        onClick={this.onRefreshList} />
                </div>
            </div>
        );
    }
}

export default SearchBoxComp;