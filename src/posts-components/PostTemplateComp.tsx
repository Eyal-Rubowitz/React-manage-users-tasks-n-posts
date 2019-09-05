import React, { Component } from 'react';
import postModel from '../DAL/postModel';
import { AppState } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

class PostTemplateComp extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {postList: []};
    // }

    componentDidMount() {

        // let posts = this.props.postData;
        // this.setState({ postList: posts });
    }

    render() {
        return (
            <div>
                {/* <h4>Title: &nbsp; {this.props.postData.title}</h4>
                <h4>Body: &nbsp; {this.props.postData.body}</h4> */}
            </div>
        );
    }
}

export default PostTemplateComp;