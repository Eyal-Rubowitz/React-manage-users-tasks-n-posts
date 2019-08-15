import React, { Component } from 'react';

class PostTemplateComp extends Component {
    constructor(props) {
        super(props);
        this.state = {postList: []};
    }

    componentDidMount() {
        let posts = this.props.postData;
        this.setState({ postList: posts });
    }

    render() {
        return (
            <div>
                <h4>Title: &nbsp; {this.props.postData.title}</h4>
                <h4>Body: &nbsp; {this.props.postData.body}</h4>
            </div>
        );
    }
}

export default PostTemplateComp;