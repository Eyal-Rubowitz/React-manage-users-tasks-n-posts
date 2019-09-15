import React, { Component } from 'react';
import TaskListComp from '../tasks-components/TaskListComp';
import PostListComp from '../posts-components/PostListComp';
import UserNewTaskFormComp from './UserNewTaskFormComp';
import './users-style/UserTasksPosts.scss';
import { AppState, FormsEnum } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import UserNewPostFormComp from './UserNewPostFormComp';

@observer
class UserTasksPostsComp extends Component {

    render() {
        return (
            <div className='addBorder'>
                {AppState.activeForm === FormsEnum.NewTask ?
                    <input type="button"
                        value="🡄 Back"
                        className="formBackBtn"
                        onClick={() => AppState.activeForm = FormsEnum.None} />
                    : <input type="button" className="adding" value="Add Task" onClick={action(() => AppState.activeForm = FormsEnum.NewTask)} />}
                {AppState.activeForm === FormsEnum.NewTask ? <UserNewTaskFormComp /> : null}
                <div id="tasksDiv">
                    <TaskListComp />
                </div>
                {AppState.activeForm === FormsEnum.NewPost ?
                    <input type="button"
                        className="formBackBtn"
                        value="🡄 Back"
                        onClick={() => AppState.activeForm = FormsEnum.None} />
                    : <input type="button" className="adding" value="Add Post" onClick={action(() => AppState.activeForm = FormsEnum.NewPost)} />}
                {AppState.activeForm === FormsEnum.NewPost ? <UserNewPostFormComp /> : null}
                <div id='postDiv'>
                    <PostListComp />
                </div>
            </div>
        );
    }
}

export default UserTasksPostsComp;