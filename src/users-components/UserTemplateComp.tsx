import React, { Component } from 'react';
import * as userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';
import { AppState, FormsEnum } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './users-style/UserTemplate.scss';

type UserProps = { user: userModel.User };

@observer
class UserTemplateComp extends Component<UserProps, {}> {
    @observable isExtendUserData: boolean = false;
    @observable form: userModel.User;
    constructor(props: UserProps) {
        super(props);
        this.form = new userModel.User(props.user);
    }

    @computed
    get getTasksStatus() {
        let tsks = taskModel.getUserTasks(this.props.user.id);
        let taskStatus = tsks.every(t => t.completed);
        return taskStatus;
    }

    @action
    onDelete = () => {
        userModel.deleteUser(this.props.user.id);
    }

    @action
    onUpdate = () => {
        userModel.updateUser(this.form);
    }

    @action
    onUserSelected = () => {
        AppState.activeForm = FormsEnum.None;
    }

    @action
    onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        this.form = { ...this.form, [name]: value }
    }

    inputField = (attr: string, value: any) => {
        return(
            <div>
            {attr.charAt(0).toUpperCase()}{attr.slice(1)}:&nbsp;
            <input type="text"
                    name={attr}
                    onChange={this.onHandleInputChange}
                    value={value || ''} />
            </div>
        );
    }

    render() {
        let isTasksDoneStyle = this.getTasksStatus ? 'tasksDone' : 'tasksDidNotDone';
        let userClass = 'mainUser ' + isTasksDoneStyle;
        let extendClass = this.isExtendUserData ? 'markedBtn' : '';
        let userId = this.props.user.id
        return (
            <div className={userClass}>
                <span id='userId'>
                    <Link to={'/'+ (AppState.currentUserId === userId ? '' : userId) } onClick={this.onUserSelected}>
                            ID: {userId}
                    </Link>
                </span>
                <br />
                {this.inputField('name', this.form.name)}
                {this.inputField('email', this.form.email)}
                <div>
                    <input type="button"
                        className={extendClass}
                        value="Other Data"
                        onMouseEnter={action(() => this.isExtendUserData = true)}
                        onClick={action(() => this.isExtendUserData = false)} />
                    <input type="button" value="Update" onClick={this.onUpdate} className='userChangedBtn' />
                    <input type="button" value="Delete" onClick={this.onDelete} className='userChangedBtn' />
                </div>
                {this.isExtendUserData ? <ExtendUserData user={this.props.user} /> : undefined}
            </div>
        );
    }
}

const ExtendUserData = observer(({user}) => {
    return(
       <div id='extendUserData'>
            <h4>Street: &nbsp; {user.address.street}</h4>
            <h4>City: &nbsp; {user.address.city}</h4>
            <h4>Zipcode: &nbsp; {user.address.zipcode}</h4>
        </div>   
    )
});

export default UserTemplateComp;