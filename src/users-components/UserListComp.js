import React, { Component } from 'react';
import UserTemplateComp from './UserTemplateComp';
import userModel from '../DAL/userModel';

class UserListComp extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: [] };
    }

    componentDidMount() {
        this.onUpdateList();
    }

    onUpdateList = () => {
        userModel.getUsers().then( res => 
            this.setState({userList: res})
        )    
    }

    render() {
        let users = this.state.userList.map(u => {
            return (<UserTemplateComp key={u.id} userData={u} updateList={this.onUpdateList}/> )
        })
        return (
            <div>
                {users}
            </div>
        );
    }
}

export default UserListComp;