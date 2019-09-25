import React, { Component } from 'react';
import postModel from '../DAL/postModel';
import PostTemplateFunc from './PostTemplateFunc';
import { AppState, FormsEnum } from '../stores/AppStore';
import { observer } from 'mobx-react';
import { computed, action } from 'mobx';
import UserNewPostFormComp from '../users-components/UserNewPostFormComp';

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
                {AppState.activeForm === FormsEnum.NewPost ?
                    <input type="button"
                        className="formBackBtn"
                        value="🡄 Back"
                        onClick={() => AppState.activeForm = FormsEnum.None} />
                    : <input type="button" className="adding" value="Add Post" onClick={action(() => AppState.activeForm = FormsEnum.NewPost)} />}
                {AppState.activeForm === FormsEnum.NewPost ? <UserNewPostFormComp /> : null}
                <div id='postDiv'>
                {this.postList.map((p, i) => {
                    return (<PostTemplateFunc post={p} key={i} />)
                })}
                </div>
            </div>
        );
    }
}

export default PostListComp;