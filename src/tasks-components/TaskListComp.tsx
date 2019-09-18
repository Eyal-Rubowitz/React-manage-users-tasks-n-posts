import React, { Component } from 'react';
import taskModel from '../DAL/taskModel';
import TaskTemplateComp from './TaskTemplateComp';
import { AppState } from '../stores/AppStore';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import "./tasks-style/TaskTemplate.scss";

@observer
class TaskListComp extends Component {
    componentDidMount() {
        taskModel.getTasks();
    }

    @computed get taskList() {
        return taskModel.getUserTasks(AppState.currentUserId);
    }

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