import React, { Component } from 'react';
import TaskTemplateComp from './TaskTemplateComp';
import taskModel from '../DAL/taskModel';
import "./tasks-style/TaskTemplateCss.scss";
import { AppState } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

@observer
class TaskListComp extends Component {
    componentDidMount() {
        taskModel.getTasks();
    }

    @computed get taskList() {
        return taskModel.getUserTasks(AppState.currentUserId);
    }
    // onTaskDone = (task: Task) => {
    //     this.props.onTaskDone(task);
    // }

    render() {
        return (
            <div>
                {this.taskList.map((t, i) => {
                    return (<TaskTemplateComp key={i} task={t} />)
                    })}
            </div>
        );
    }
}

export default TaskListComp;