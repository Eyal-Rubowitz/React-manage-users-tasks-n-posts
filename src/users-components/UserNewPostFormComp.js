import React, { Component } from 'react';
import postModel from '../DAL/postModel';
import SimpleReactValidator from 'simple-react-validator';

class UserNewPostFormComp extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '', body: '' };
        this.validator = new SimpleReactValidator();
    }

    onHandleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({ [name]: value });
    }

    postSubmited = (e) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
            return;
        }
        let newTitle = this.state.title;
        let newBody = this.state.body;
        let userId = this.props.userId;
        let newPost = {
            userId: userId,
            id: undefined,
            title: newTitle,
            body: newBody
        }
        postModel.addPost(newPost);
        this.props.onPostChanged();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.postSubmited} className="formStyle">
                    <span className="unValidInput">
                        {this.validator.message('title input', this.state.title, 'required|alpha_space|min:2|max:30')}
                    </span>
                    Title: <input type="text" name="title" className="formInput" onChange={this.onHandleInputChange} />
                    <br />
                    <span className="unValidInput">
                        {this.validator.message('body input', this.state.body, 'required|alpha_num_dash_space|min:5|max:120')}
                    </span>
                    Body: <input type="text" name="body" className="formInput" onChange={this.onHandleInputChange} />
                    <br />
                    <input type="submit" value="Submit Poset" />
                </form>
            </div>
        );
    }
}

export default UserNewPostFormComp;