import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import './users-style/UserTemplateCss.scss';
import { AppState } from '../stores/AppStore';
import * as userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';

type UserProps = { user: userModel.User };

@observer
class UserTemplateComp extends Component<UserProps, {}> {
    @observable isExtendUserData: boolean = false;
    @observable form: userModel.User;
    constructor(props: UserProps) {
        super(props);
        this.form = new userModel.User(props.user);
        // this.state = { };
    }

    // getTasksStatus = () => {
    //     taskModel.getUserTasks(this.props.userData.id).then(tsks => {
    //         let taskStatus = tsks.every(t => t.completed);
    //         if(this.state.isTasksDone !== taskStatus) this.setState({isTasksDone: taskStatus});
    //     });
    // }

    // onNameChangeHandle = (e) => {
    //     let newName = e.target.value;
    //     this.setState({ userData: { ...this.state.userData, name: newName } });
    // }

    // onEmailChangeHandle = (e) => {
    //     let newEmail = e.target.value;
    //     this.setState({ userData: { ...this.state.userData, email: newEmail } });
    // }

    @action
    onDelete = () => {
        userModel.deleteUser(this.props.user.id);
    }

    @action
    onUpdate = () => {
        userModel.updateUser(this.form);
    }

    // onToggleHover = (e) => {
    //     let bool = (e.type === 'mouseenter') ? true : false;
    //     this.setState({ isExtendUserData: bool });
    // }

    // onShowTaskPostLists = () => {
    //     let id = this.state.userData.id;
    //    this.props.onShowTaskPostLists(id);
    // }

    // handleChange = (e: Event) => {
    //     let t = e.target as HTMLInputElement;
    //     let name = t.name;
    //     let value = t.value;
    //     this.form[name] = value;
    // }

    render() {
        let userClass = 'mainUser tasksDidNotDone'
        let extendData = '';
        let extendClass = ''
        return (
            <div className={userClass}>
                <span id='userId' onClick={action(() => { AppState.currentUserId = this.props.user.id })}>
                    ID: {this.props.user.id}
                </span>
                <br />
                Name: <input type="text"
                    onChange={action((e: any) => { this.form.name = e.target.value })}
                    value={this.form.name || ''} />
                <br />
                Email: <input type="text"
                    onChange={action((e: any) => { this.form.email = e.target.value })}
                    value={this.form.email || ''} />
                <br />
                <div>
                    <input type="button"
                        className={extendClass}
                        value="Other Data"
                        onMouseEnter={() => { }}
                        onClick={() => { }} />
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