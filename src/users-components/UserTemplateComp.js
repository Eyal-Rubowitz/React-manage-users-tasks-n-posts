import React, { Component } from 'react';
import './UserTemplateCss.css';
import userModel from '../DAL/userModel';

class UserTemplateComp extends Component {
    constructor(props) {
        super(props);
        this.state = {userData: {}};
    }

    componentDidMount() {
        this.setState({userData: this.props.userData});
    }

    onNameChangeHandle = (e) => {
        let newName = e.target.value;
        this.setState({userData: {...this.state.userData, name: newName}});
    }

    onEmailChangeHandle = (e) => {
        let newEmail = e.target.value;
        this.setState({userData: {...this.state.userData, email: newEmail}});
    }

    onDelete = () => {
        userModel.deleteUser(this.state.userData.id);
        this.props.updateList();
    }

    render() {
        return (
            <div>
                <h1>Hello :)</h1>
                ID: {this.props.userData.id}
                <br />
                Name: <input type="text" 
                            onChange={this.onNameChangeHandle}
                            value={this.state.userData.name || ''}/>
                <br />
                Email: <input type="text" 
                              onChange={this.onEmailChangeHandle}
                              value={this.state.userData.email || ''}/>
                <br />
                <input type="button" value="Other Data"/>
                &nbsp;  &nbsp;  &nbsp;
                <input type="button" value="Update" onClick={this.onUpdate}/>
                <input type="button" value="Delete" onClick={this.onDelete}/>
            </div>
        );
    }
}

export default UserTemplateComp;