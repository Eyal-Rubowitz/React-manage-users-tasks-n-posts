import React, { Component } from 'react';
import * as userModel from '../DAL/userModel';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';

@observer
class NewUserFormComp extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         userId: undefined,
    //         name: String,
    //         username: String,
    //         email: String
    //     };
        // this.validator = new SimpleReactValidator();
    // }

    // async componentDidMount() {
    //     let id = this.props.newUserId;
    //     console.log(id);
    //     await this.setState({ userId: id });
    // }

    // onRoutBack = () => {
    //     this.setState({ userId: undefined });
    //     this.props.onCloseForm();
    // }

    // handleInputChange = (e) => {
    //     const trgt = e.target;
    //     const value = trgt.type === 'checkbox' ? trgt.checked : trgt.value;
    //     const name = trgt.name;
    //     this.setState({ [name]: value });
    // }

    onCreatUser = async (e: Event) => {
    //     e.preventDefault();
    //     if (!this.validator.allValid()) {
    //         this.validator.showMessages();
    //         // rerender to show messages for the first time
    //         // you can use the autoForceUpdate option to do this automatically`
    //         this.forceUpdate();
    //         return;
    //     }
    //     let newUserId = this.state.userId;
    //     let newName = this.state.name;
    //     let newUsername = this.state.username;
    //     let newMail = this.state.email;
    //     let newSer = {
    //         id: newUserId,
    //         name: newName,
    //         username: newUsername,
    //         email: newMail,
    //         address: {
    //             city: undefined,
    //             geo: {
    //                 lat: Number,
    //                 lng: Number
    //             },
    //             street: undefined,
    //             suite: undefined,
    //             zipcode: undefined
    //         }
    //     }
    //     await userModel.addUser(newSer);
    //     this.props.onCloseForm();
    //     this.props.updateUserList();
    }

    render() {
        return (
            <div>
                {/* <form onSubmit={this.onCreatUser} className="formStyle">
                     <input type="button" value="🡄 Back" onClick={this.onRoutBack} />
                <br />
                <br />

                    <span className="unValidInput">
                        {this.validator.message('name input', this.state.name, 'required|alpha_space')}
                    </span>
                    Full Name: <input type="text" name="name" className="formInput" onChange={this.handleInputChange} />
                    <br />
                    <span className="unValidInput">
                        {this.validator.message('username input', this.state.username, 'required|alpha_space')}
                    </span>
                    User Name: <input type="text" name="username" className="formInput" onChange={this.handleInputChange} />
                    <br />
                    <span className="unValidInput">
                        {this.validator.message('email input', this.state.email,  'required|email')}
                    </span>
                    Email: <input type="text" name="email" className="formInput" onChange={this.handleInputChange} />
                    <br />
                    <input type="submit" value="Add User" />
                </form> */}
            </div>
        );
    }
}

export default NewUserFormComp;