import React from 'react';

function refreshPage() {
    window.location.reload(false);
}

class DeleteComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            id: ''
        }

        this.togglePanel = this.togglePanel.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
        this.setState({ id: this.props.commentId })
    }

    deleteComment() {
        fetch(`http://localhost:3001/comment/${this.state.id}`, {
            crossDomain: true,
            method: 'DELETE'
        })
            .then(res => {
                if (res.status === 500) {
                    alert('Error in deleting account')
                } else {
                    refreshPage()
                }
            })
    }

    render() {
        return (
            <div>
                <button onClick={(e) => this.togglePanel(e)}>Delete</button>
                {
                    this.state.open ? (
                        <div>
                            <h4>Are you sure?</h4>
                            <button onClick={() => this.deleteComment()}>Delete Comment</button>
                            <p>{this.props.postID}</p>
                        </div>
                    ) : null
                }
            </div >
        )
    }

}

export default DeleteComment;