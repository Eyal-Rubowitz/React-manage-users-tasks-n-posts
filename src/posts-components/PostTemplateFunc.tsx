import React from 'react';
import { observer } from 'mobx-react';
import './posts-style/PostTemplate.scss';

const PostTemplateFunc = observer(({ post }) => {
    return (
        <div className="post">
            <h4>Title: &nbsp; {post.title}</h4>
            <h4>Body: &nbsp; {post.body}</h4>
        </div>
    );
});

export default PostTemplateFunc;