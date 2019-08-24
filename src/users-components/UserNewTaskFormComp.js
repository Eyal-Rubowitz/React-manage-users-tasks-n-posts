import React, { Component } from 'react';
import taskModel from '../DAL/taskModel';

class UserNewTaskFormComp extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ''};
    }

    onHandleChange = (e) => {
        let newTitle = e.target.value;
        this.setState({title: newTitle});
    }

    onAddTask = async (e) => {
        e.preventDefault();
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
                <form onSubmit={this.onAddTask}>
                    <input type="text" name="title" onChange={this.onHandleChange}/>
                    <br />
                    <input type="submit" value="Add Task" />
                </form>
            </div>
        );
    }
}

export default UserNewTaskFormComp;