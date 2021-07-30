import React from 'react';
import CreateComment from './CreateComment';
import AllComments from './AllComments';
import './Comments.css';

class CommentWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            postId: this.props.postId,
            userId: this.props.userId
        }
    }

    render() {
        return(
            <div>
                <CreateComment postId={this.state.postId} userId={this.state.userId}/>
                <AllComments postId={this.state.postId} userId={this.state.userId}/>
            </div>
        )
    }

}

export default CommentWrapper;