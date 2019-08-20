import React, { Component } from 'react';
import userModel from '../../DAL/userModel';

class RefreshUserListComp extends Component {
    constructor(props) {
        super(props);
        this.state = {userList: []};
    }

    onRefreshList = async () => {
        await userModel.refreshList().then(res =>
            this.setState({ userList: res })
        );
        this.props.usersFound(this.state.userList);
    }

    render() {
        return (
            <div id="refreshListBtn">
                <input type="button"
                    value="Refresh User List"
                    onClick={this.onRefreshList} />
            </div>
        );
    }
}

export default RefreshUserListComp;