import React, { Component } from 'react';
import userModel from '../DAL/userModel';

class NewUserFormComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
            name: String,
            username: String,
            email: String
        };
    }

    async componentDidMount(){
        let id = this.props.newUserId;
        console.log(id);
        await this.setState({ userId: id });
    }

    onRoutBack = () => {
        this.setState({ userId: undefined });
        this.props.onCloseForm();
    }

    handleInputChange = (e) => {
        console.log('hello');
        const target = e.target;
        console.log('target:', target);
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.getAttribute('name');
        console.log('name: ', name);
        this.setState({
            [name]: value
        });
    }

    onCreatUser = async (e) => {
        e.preventDefault();
        let newUserId = this.state.userId;
        let newName = this.state.name;
        let newUsername = this.state.username;
        let newMail = this.state.email;
        let newSer = {
            id: newUserId,
            name: newName,
            username: newUsername,
            email: newMail,
            address: {
                city: undefined,
                geo: {
                    lat: Number,
                    lng: Number
                },
                street: undefined,
                suite: undefined,
                zipcode: undefined
            }
        }
        console.log("newSer", newSer);
        await userModel.addUser(newSer);
        this.props.onCloseForm();
        this.props.updateUserList();
    }

    render() {
        return (
            <div>
                <input type="button" value="<= Back" onClick={this.onRoutBack} />
                <form onSubmit={this.onCreatUser}>
                    
                    Full Name: <input type="text" name="name" onChange={this.handleInputChange} />
                    <br />
                    User Name: <input type="text" name="username" onChange={this.handleInputChange} />
                    <br />
                    Email: <input type="text" name="email" onChange={this.handleInputChange} />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
        );
    }
}

export default NewUserFormComp;