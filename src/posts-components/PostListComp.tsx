import React, { Component } from 'react';
import postModel from '../DAL/postModel';
import { AppState } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { computed } from 'mobx';

@observer
class PostListComp extends Component {
    componentDidMount() {
        postModel.getPosts();
    }

   @computed get postList() {
      return postModel.getUserPosts(AppState.currentUserId);
   }

    render() {
        return (
            <div>
                {this.postList.map((p) => {
                    return(<div>{p.title}</div>)
                })}
            </div>
        );
    }
}

export default PostListComp;