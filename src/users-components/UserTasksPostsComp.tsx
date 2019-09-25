import React, { Component } from 'react';
import TaskListComp from '../tasks-components/TaskListComp';
import PostListComp from '../posts-components/PostListComp';
import UserNewTaskFormComp from './UserNewTaskFormComp';
import UserNewPostFormComp from './UserNewPostFormComp';
import { AppState, FormsEnum } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { autorun, IReactionDisposer } from 'mobx';
import './users-style/UserTasksPosts.scss';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';

type UserTasksPostsCompProps = {match: {params: {id: string}, url: string, path: string}};



@observer
class UserTasksPostsComp extends Component<UserTasksPostsCompProps> {
    disposeAutorun: IReactionDisposer;

    constructor(props: UserTasksPostsCompProps) {
        super(props);
        console.log(props);
        this.disposeAutorun = autorun(()=>{
            AppState.currentUserId = parseInt(this.props.match.params.id);
        });
    }

    componentWillUnmount(){
        AppState.currentUserId = null;
        this.disposeAutorun();
    }

    render() {
        
        return (
            <div className='addBorder'>
                <Link to={ `${this.props.match.url}/tasks` }> tasks </Link>
                <Link to={ `${this.props.match.url}/posts` }> posts </Link>
                <Switch>
                    <Route path={`${this.props.match.path}/tasks`} component={TaskListComp} />
                    <Route path={`${this.props.match.path}/posts`} component={PostListComp} />
                </Switch>
            </div>
        );
    }
}

export default UserTasksPostsComp;