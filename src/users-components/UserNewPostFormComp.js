import React, { Component } from 'react';
import postModel from '../DAL/postModel';

class UserNewPostFormComp extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', body: ''};
    }

    onHandleTextChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({[name]: value});
    }

    postSubmited = () => {

    }

    render() {
        return (
            <div>
                <form onSubmit={this.postSubmited}>
                    Title: <input type="text" name="title" onChange={this.onHandleTextChange}/>
                    Body: <input type="text" name="body" onChange={this.onHandleTextChange}/>
                    <input type="submit" value="Submit Poset" />
                </form>
            </div>
        );
    }
}

export default UserNewPostFormComp;