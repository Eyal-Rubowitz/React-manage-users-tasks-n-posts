import React, { Component } from 'react';
import taskModel from '../DAL/taskModel';
import TaskTemplateComp from './TaskTemplateComp';
import { AppState, FormsEnum } from '../stores/AppStore';
import { computed, action } from 'mobx';
import { observer } from 'mobx-react';
import "./tasks-style/TaskTemplate.scss";
import UserNewTaskFormComp from '../users-components/UserNewTaskFormComp';

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
                {AppState.activeForm === FormsEnum.NewTask ?
                    <input type="button"
                        value="🡄 Back"
                        className="formBackBtn"
                        onClick={() => AppState.activeForm = FormsEnum.None} />
                    : <input type="button" className="adding" value="Add Task" onClick={action(() => AppState.activeForm = FormsEnum.NewTask)} />}
                {AppState.activeForm === FormsEnum.NewTask ? <UserNewTaskFormComp /> : null}
                <div id="tasksDiv">
                    {this.taskList.map((t, i) => {
                        return (<TaskTemplateComp key={i} task={t} />)
                    })}
                </div>
            </div>
        );
    }
}

export default TaskListComp;