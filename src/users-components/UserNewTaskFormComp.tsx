import React, { Component } from 'react';
import taskModel, { Task } from '../DAL/taskModel';
import SimpleReactValidator from 'simple-react-validator';
import { AppState, FormsEnum } from '../stores/AppStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer 
class UserNewTaskFormComp extends Component {
    @observable form: Partial<Task>;
    validator: SimpleReactValidator;

    constructor(props: any) {
        super(props);
        this.form = { userId: AppState.currentUserId as number,
                      completed: false };
        this.validator = new SimpleReactValidator({});
    }

    onHandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        this.form = { ...this.form, [name]: value }
    }
    
    taskSubmited = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            return;
        }
        taskModel.addTask(this.form);
        AppState.activeForm = FormsEnum.None;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.taskSubmited} className="formStyle">
                    <span className="unValidInput">
                        {this.validator.message('title input', this.form.title, 'required|alpha_space|min:2|max:30', {})}
                    </span>
                    <span className="inputLable">Title:</span>
                    <input type="text" name="title" className="formInput" onChange={this.onHandleInputChange} />
                    <br />
                    <input type="submit" value="Submit Task" />
                </form>
            </div>
        );
    }
}

export default UserNewTaskFormComp;