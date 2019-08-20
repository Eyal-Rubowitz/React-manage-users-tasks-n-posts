import React, { PureComponent } from 'react';
import './users-style/UserTemplateCss.scss';
import userModel from '../DAL/userModel';
import taskModel from '../DAL/taskModel';

class UserTemplateComp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { userData: {}, isExtendUserData: false, isTasksDone: false };
    }

    async componentDidMount() {
        this.setState({ userData: this.props.userData });
    }

    getTasksStatus = () => {
        taskModel.getUserTasks(this.props.userData.id).then(tsks => {
            let taskStatus = tsks.length > 0 && tsks.every(t => t.completed);
            this.setState({isTasksDone: taskStatus});
        });
    }
 
    onNameChangeHandle = (e) => {
        let newName = e.target.value;
        this.setState({ userData: { ...this.state.userData, name: newName } });
    }

    onEmailChangeHandle = (e) => {
        let newEmail = e.target.value;
        this.setState({ userData: { ...this.state.userData, email: newEmail } });
    }

    onDelete = () => {
        userModel.deleteUser(this.state.userData.id);
        this.props.updateList();
    }

    onUpdate = () => {
        userModel.updateUser(this.state.userData);
        this.props.updateList();
    }

    onToggleHover = (e) => {
        let bool = (e.type === 'mouseenter') ? true : false;
        this.setState({ isExtendUserData: bool });
    }

    onShowTaskPostLists = () => {
        let id = this.state.userData.id;
       this.props.onShowTaskPostLists(id);
    }

    render() {
        this.getTasksStatus();
        let isTasksDoneClass = (!this.state.isTasksDone) ? 'tasksDidNotDone' : 'tasksDone' ;
        let extendClass = (this.state.isExtendUserData) ? 'markedBtn' : '';

        let extendData = undefined;
        if (this.state.isExtendUserData === true) {
            extendData = <div id='extendUserData'>
                <h4>Street: &nbsp; {this.state.userData.address.street}</h4>
                <h4>City: &nbsp; {this.state.userData.address.city}</h4>
                <h4>Zipcode: &nbsp; {this.state.userData.address.zipcode}</h4>
            </div>
        }

        return (
            <div id='mainUserDiv' className={isTasksDoneClass}>
                <span id='userId' onClick={this.onShowTaskPostLists}>
                    ID: {this.props.userData.id}
                </span>
                <br />
                Name: <input type="text"
                    onChange={this.onNameChangeHandle}
                    value={this.state.userData.name || ''} />
                <br />
                Email: <input type="text"
                    onChange={this.onEmailChangeHandle}
                    value={this.state.userData.email || ''} />
                <br />
                <div>
                    <input type="button"
                        className={extendClass}
                        value="Other Data"
                        onMouseEnter={this.onToggleHover}
                        onClick={this.onToggleHover} />
                    <input type="button" value="Update" onClick={this.onUpdate} className='userChangedBtn' />
                    <input type="button" value="Delete" onClick={this.onDelete} className='userChangedBtn' />
                </div>
                <div>
                    {extendData}
                </div>
            </div>
        );
    }
}

export default UserTemplateComp;