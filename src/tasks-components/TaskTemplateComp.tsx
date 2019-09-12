import React, { Component } from 'react';
import * as taskModel from '../DAL/taskModel';
import { AppState } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import './tasks-style/TaskTemplateCss.scss';

type TaskProps = { task: taskModel.Task };

@observer
class TaskTemplateComp extends Component<TaskProps,{}> {
  
    render() {
        let btnClass = this.props.task.completed ? 'hideBtn' : undefined;
        return (
            <div className='taskDiv' >
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