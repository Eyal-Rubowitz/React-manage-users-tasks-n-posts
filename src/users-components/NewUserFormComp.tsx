import React, { Component } from 'react';
import * as userModel from '../DAL/userModel';
import SimpleReactValidator from 'simple-react-validator';
import { AppState, FormsEnum } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

@observer
class NewUserFormComp extends Component {
    @observable form: Partial<userModel.User>;
    validator: SimpleReactValidator;

    constructor(props: any) {
        super(props);
        this.form = { address: new userModel.Address() };
        this.validator = new SimpleReactValidator({});
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const trgt = e.target;
        const value = trgt.type === 'checkbox' ? trgt.checked : trgt.value;
        const name = trgt.name;
        this.form = { ...this.form, [name]: value }
    }

    onCreatUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            return;
        }
    userModel.addUser(this.form);
    AppState.activeForm = FormsEnum.None;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onCreatUser} className="formStyle">
                     <input type="button" value="🡄 Back" onClick={action(() => AppState.activeForm = FormsEnum.None)} />
                <br />
                <br />

                    <span className="unValidInput">
                        {this.validator.message('name input', this.form.name, 'required|alpha_space', {})}
                    </span>
                    Full Name: <input type="text" name="name" className="formInput" onChange={this.handleInputChange} />
                    <br />
                    <span className="unValidInput">
                        {this.validator.message('username input', this.form.username, 'required|alpha_space', {})}
                    </span>
                    User Name: <input type="text" name="username" className="formInput" onChange={this.handleInputChange} />
                    <br />
                    <span className="unValidInput">
                        {this.validator.message('email input', this.form.email,  'required|email', {})}
                    </span>
                    Email: <input type="text" name="email" className="formInput" onChange={this.handleInputChange} />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
        );
    }
}

export default NewUserFormComp;