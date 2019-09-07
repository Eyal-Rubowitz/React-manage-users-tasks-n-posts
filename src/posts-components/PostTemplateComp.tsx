import React, { Component } from 'react';
import * as postModel from '../DAL/postModel';
import { AppState } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

type PostProps = { post: postModel.Post };

@observer
class PostTemplateComp extends Component<PostProps,{}> {
 
      render() {
        return (
            <div>
                <h4>Title: &nbsp; {this.props.post.title}</h4>
                <h4>Body: &nbsp; {this.props.post.body}</h4>
            </div>
        );
    }
}

export default PostTemplateComp;