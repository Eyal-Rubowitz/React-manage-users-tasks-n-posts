import React, { Component } from 'react';
import taskModel from '../DAL/taskModel';
import './tasks-style/TaskTemplateCss.scss';

class TaskTemplateComp extends Component {
    constructor(props) {
        super(props);
        this.state = { task: {} };
    }

    componentDidMount(){
        let taskInit = this.props.taskData;
        this.setState({task: taskInit});
    }

    onTaskDone = () => {
        let userTask = this.props.taskData;
        taskModel.taskDone(userTask).then(t => {
            // this.setState({task: t});
            this.props.onTaskDone(t);
        });
    }
    
    render() {
        let isComplete = "" + this.state.task.completed;
        let btnClass = this.state.task.completed ? 'hideBtn' : undefined;
        return (
            <div className='taskDiv' >
                    <h5>Title: &nbsp; {this.state.task.title}</h5>
                    <h5>Completed: &nbsp; {isComplete}</h5>
                    <input type="button"
                        className={btnClass}
                        value="Mark Completed"
                        onClick={this.onTaskDone} />
            </div>

        );
    }
}

export default TaskTemplateComp;