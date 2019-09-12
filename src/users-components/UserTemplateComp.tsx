import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import './users-style/UserTemplateCss.scss';
import { AppState, FormsEnum } from '../stores/AppStore';
import * as userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';
import { store } from '../DAL/postModel';

type UserProps = { user: userModel.User };
// type UserState = { isExtendUserData:  }

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
        AppState.currentUserId = AppState.currentUserId === this.props.user.id 
            ? null : this.props.user.id
        AppState.activeForm = FormsEnum.None;
    }

    @action
    onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        this.form = { ...this.form, [name]: value }
    }
   
    render() {
        // let isTasksDoneStyle = taskModel.isUserFreeOfTasks() ? 'tasksDone' : 'tasksDidNotDone';
        let isTasksDoneStyle = this.getTasksStatus ? 'tasksDone' : 'tasksDidNotDone';
        let userClass = 'mainUser ' + isTasksDoneStyle;
        let extendData = undefined;
        if (this.isExtendUserData === true) {
            extendData = <div id='extendUserData'>
                <h4>Street: &nbsp; {this.props.user.address.street}</h4>
                <h4>City: &nbsp; {this.props.user.address.city}</h4>
                <h4>Zipcode: &nbsp; {this.props.user.address.zipcode}</h4>
            </div>
        }
        let extendClass = this.isExtendUserData ? 'markedBtn' : '';
        return (
            <div className={userClass}>
                <span id='userId' onClick={this.onUserSelected}>
                    ID: {this.props.user.id}
                </span>
                <br />
                Name: <input type="text"
                    name="name"
                    onChange={this.onHandleInputChange}
                    value={this.form.name || ''} />
                <br />
                Email: <input type="text"
                    name="email"
                    onChange={this.onHandleInputChange}
                    value={this.form.email || ''} />
                <br />
                <div>
                    <input type="button"
                        className={extendClass}
                        value="Other Data"
                        onMouseEnter={action(() => this.isExtendUserData = true)}
                        onClick={action(() => this.isExtendUserData = false)} />
                    <input type="button" value="Update" onClick={this.onUpdate} className='userChangedBtn' />
                    <input type="button" value="Delete" onClick={this.onDelete} className='userChangedBtn' />
                </div>
                <div>
                    {extendData}
                </div>
            </div>
        );

        // this.getTasksStatus();
        // let isTasksDoneClass = (!this.state.isTasksDone) ? 'tasksDidNotDone' : 'tasksDone' ;
        // let extendClass = (this.state.isExtendUserData) ? 'markedBtn' : '';
        // let userClass = `mainUser ${isTasksDoneClass}`;
        // let extendData = undefined;
        // if (this.state.isExtendUserData === true) {
        //     extendData = <div id='extendUserData'>
        //         <h4>Street: &nbsp; {this.state.userData.address.street}</h4>
        //         <h4>City: &nbsp; {this.state.userData.address.city}</h4>
        //         <h4>Zipcode: &nbsp; {this.state.userData.address.zipcode}</h4>
        //     </div>
        // }

        // return (
        //     <div className={userClass}>
        //         <span id='userId' onClick={this.onShowTaskPostLists}>
        //             ID: {this.props.userData.id}
        //         </span>
        //         <br />
        //         Name: <input type="text"
        //             onChange={this.onNameChangeHandle}
        //             value={this.state.userData.name || ''} />
        //         <br />
        //         Email: <input type="text"
        //             onChange={this.onEmailChangeHandle}
        //             value={this.state.userData.email || ''} />
        //         <br />
        //         <div>
        //             <input type="button"
        //                 className={extendClass}
        //                 value="Other Data"
        //                 onMouseEnter={this.onToggleHover}
        //                 onClick={this.onToggleHover} />
        //             <input type="button" value="Update" onClick={this.onUpdate} className='userChangedBtn' />
        //             <input type="button" value="Delete" onClick={this.onDelete} className='userChangedBtn' />
        //         </div>
        //         <div>
        //             {extendData}
        //         </div>
        //     </div>
        // );
    }
}

export default UserTemplateComp;