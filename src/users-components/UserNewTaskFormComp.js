import React, { Component } from 'react';
import taskModel from '../DAL/taskModel';
import SimpleReactValidator from 'simple-react-validator';

class UserNewTaskFormComp extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
        this.validator = new SimpleReactValidator();
    }

    onHandleChange = (e) => {
        let newTitle = e.target.value;
        this.setState({ title: newTitle });
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    onAddTask = async (e) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            // this.validator.showMessages();
            // // rerender to show messages for the first time
            // // you can use the autoForceUpdate option to do this automatically`
            // this.forceUpdate();
            return;
        }
        let newTitle = this.state.title;
        let newUserId = this.props.userId;
        let newTask = {
            userId: newUserId,
            id: undefined,
            title: newTitle,
            completed: false
        }
        taskModel.addTask(newTask);
        this.props.getNewTaskList(newTask);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onAddTask} className="formStyle">
                    <span className="unValidInput">
                        {this.validator.message('title input', this.state.title, 'required|alpha_space|min:2|max:30')}
                    </span>
                    <span className="inputLable">Title:</span>
                    <input type="text" name="title" className="formInput" onChange={this.onHandleChange} />
                    <br />
                    <input type="submit" value="Submit Task" />
                </form>
            </div>
        );
    }
}

export default UserNewTaskFormComp;