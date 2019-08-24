import React, { Component } from 'react';
import TaskTemplateComp from './TaskTemplateComp';
import taskModel from '../DAL/taskModel';
import "./tasks-style/TaskTemplateCss.scss";

class TaskListComp extends Component {
    constructor(props) {
        super(props);
        this.state = { taskList: [] };
    }

    componentDidMount() {
        taskModel.getTasks().then(res => {
            let tasks = res;
            this.setState({ taskList: tasks });
        })
    }

    onTaskDone = (task) => {
        this.props.onTaskDone(task);
    }

    render() {
        let userTasks = this.state.taskList.filter(t => t.userId === this.props.idToggleTasksPosts)
       console.log("userTasks: ", userTasks);
        userTasks  = userTasks.map(t => {
            return (<TaskTemplateComp 
                        key={t.id} 
                        taskData={t} 
                        onTaskDone={this.onTaskDone} />)
        })
        if (userTasks.length === 0) userTasks = undefined;
        return (
            <div>
                {userTasks}
            </div>
        );
    }
}

export default TaskListComp;