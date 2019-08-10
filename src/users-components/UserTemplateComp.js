import React, { Component } from 'react';
import './UserTemplateCss.css';
import userModel from '../DAL/userModel';

class UserTemplateComp extends Component {
    constructor(props) {
        super(props);
        this.state = { userData: {}, isExtendUserData: false };
    }

    componentDidMount() {
        this.setState({ userData: this.props.userData });
    }

    onNameChangeHandle = (e) => {
        let newName = e.target.value;
        this.setState({ userData: { ...this.state.userData, name: newName } });
    }

    onEmailChangeHandle = (e) => {
        let newEmail = e.target.value;
        this.setState({ userData: { ...this.state.userData, email: newEmail } });
    }

    onDelete = () => {
        userModel.deleteUser(this.state.userData.id);
        this.props.updateList();
    }

    onUpdate = () => {
        userModel.updateUser(this.state.userData);
        this.props.updateList();
    }

    onToggleHover = (e) => {
        console.log(e.type);
        let bool = (e.type === 'mouseenter') ? true : false;
        this.setState({ isExtendUserData: bool });
    }

    render() {

        let extendClass = (this.state.isExtendUserData) ? 'markedBtn' : '';

        let extendData = undefined;
        if (this.state.isExtendUserData === true) {
            extendData = <div id='extendUserData'>
                <h4>Street: &nbsp; {this.state.userData.address.street}</h4>
                <h4>City: &nbsp; {this.state.userData.address.city}</h4>
                <h4>Zipcode: &nbsp; {this.state.userData.address.zipcode}</h4>
            </div>
        }

        return (
            <div id='mainUserDiv'>
                <span id='userId'>ID: {this.props.userData.id}</span>
                <br />
                Name: <input type="text"
                    onChange={this.onNameChangeHandle}
                    value={this.state.userData.name || ''} />
                <br />
                Email: <input type="text"
                    onChange={this.onEmailChangeHandle}
                    value={this.state.userData.email || ''} />
                <br />
                <div>
                    <input type="button"
                        className={extendClass}
                        value="Other Data"
                        onMouseEnter={this.onToggleHover}
                        onClick={this.onToggleHover} />
                    <input type="button" value="Update" onClick={this.onUpdate} class='userChangedBtn' />
                    <input type="button" value="Delete" onClick={this.onDelete} class='userChangedBtn' />
                </div>
                <div>
                    {extendData}
                </div>
            </div>
        );
    }
}

export default UserTemplateComp;