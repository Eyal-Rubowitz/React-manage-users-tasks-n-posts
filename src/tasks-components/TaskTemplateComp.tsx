import React, { Component } from 'react';
import * as taskModel from '../DAL/taskModel';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import './tasks-style/TaskTemplate.scss';

type TaskProps = { task: taskModel.Task };

@observer
class TaskTemplateComp extends Component<TaskProps,{}> {
  
    render() {
        let btnClass = this.props.task.completed ? 'hideBtn' : undefined;
        return (
            <div className='task' >
                    <h5>Title: &nbsp; {this.props.task.title}</h5>
                    <h5>Completed: &nbsp; {this.props.task.completed.toString()}</h5>
                    <input type="button"
                        className={btnClass}
                        value="Mark Completed"
                        onClick={action(() => {taskModel.taskDone(this.props.task)})} />
            </div>
        );
    }
}

export default TaskTemplateComp;