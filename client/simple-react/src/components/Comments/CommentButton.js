import React from 'react';
import CommentWrapper from './CommentWrapper';
import './Comments.css'

class CommentButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            postId: this.props.postID,
            userId: this.props.userId
        }

        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open }, () => {
        })
    }

    render() {
        return (
            <div className='commentsWrapper'>
                <button className='commentsBtn' onClick={(e) => this.togglePanel(e)}>Show Comments</button>
                {(
                    this.state.open ? (
                        <CommentWrapper postId={this.state.postId} userId={this.state.userId}/>
                    ) : null
                )}
            </div>
        )
    }
}

export default CommentButton;