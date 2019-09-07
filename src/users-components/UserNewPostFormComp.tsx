import React, { Component } from 'react';
import postModel, { Post } from '../DAL/postModel';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import { AppState, FormsEnum } from '../stores/AppStore';
import { observable } from 'mobx';

@observer
class UserNewPostFormComp extends Component {
    @observable form: Partial<Post>;
    validator: SimpleReactValidator;

    constructor(props: any) {
        super(props);
        this.form = { userId: AppState.currentUserId as number };
        this.validator = new SimpleReactValidator({});
    }

    onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        this.form = { ...this.form, [name]: value }
    }

    postSubmited = (e: React.FormEvent) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            return;
        }
        postModel.addPost(this.form);
        this.form = { userId: AppState.currentUserId as number };
        AppState.activeForm = FormsEnum.None;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.postSubmited} className="formStyle">
                    <span className="unValidInput">
                        {this.validator.message('title input', this.form.title, 'required|alpha_space|min:2|max:30', {})}
                    </span>
                    Title: <input type="text" name="title" className="formInput" onChange={this.onHandleInputChange} />
                    <br />
                    <span className="unValidInput">
                        {this.validator.message('body input', this.form.body, 'required|alpha_num_dash_space|min:5|max:120', {})}
                    </span>
                    Body: <input type="text" name="body" className="formInput" onChange={this.onHandleInputChange} />
                    <br />
                    <input type="submit" value="Submit Post" />
                </form>
            </div>
        );
    }
}

export default UserNewPostFormComp;