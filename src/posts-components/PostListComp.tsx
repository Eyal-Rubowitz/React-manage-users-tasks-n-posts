import React, { Component } from 'react';
import postModel from '../DAL/postModel';
import PostTemplateComp from './PostTemplateComp';
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
                {this.postList.map((p, i) => {
                    return(<PostTemplateComp post={p} key={i} />)
                })}
            </div>
        );
    }
}

export default PostListComp;