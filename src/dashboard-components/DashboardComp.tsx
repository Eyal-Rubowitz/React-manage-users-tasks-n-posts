import React, { Component } from 'react';
import SearchBoxComp from './dashboard-child-comps/SearchBoxComp';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { AppState, FormsEnum } from '../stores/AppStore';
import '../dashboard-components/dashboard-style/Dashboard.scss';

@observer
class DashboardComp extends Component {
   
    render() {
        let btnStyle = !(AppState.activeForm === FormsEnum.NewUser)  ? "adding" : "btnUnClick";
        return (
            <div id="dashboard">
                    <SearchBoxComp />
                    <input type="button" 
                           id="addUserBtn" 
                           className={btnStyle} 
                           value="Add User" 
                           onClick={action(() => AppState.activeForm = FormsEnum.NewUser)} />
            </div>
        );
    }
}

export default DashboardComp;