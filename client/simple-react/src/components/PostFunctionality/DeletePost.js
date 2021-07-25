import React from 'react';
import './Posts.css';

function refreshPage() {
    window.location.reload(false);
}

class DeletePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            id: '',
            toDelete: ''
        }

        this.togglePanel = this.togglePanel.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
        this.setState({ id: this.props.postID })
    }


    deletePost() {
        const image = {
            public_id: this.props.imageId
        }
        const imageToDelete = JSON.stringify(image)
        this.setState({
            toDelete: imageToDelete
        }, () => {
            fetch('http://localhost:3001/upload', {
                crossDomain: true,
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: this.state.toDelete
            })
                .then(res => {
                    if (res.status === 500) {
                        alert('Error in deleting post')
                    } 
                })
            fetch(`http://localhost:3001/post/${this.state.id}`, {
                crossDomain: true,
                method: 'DELETE'
            })
                .then(res => {
                    if (res.status === 500) {
                        alert('Error in deleting post')
                    } else {
                        refreshPage()
                    }
                })
        })
    };

    render() {
        return (
            <div>
                <button onClick={(e) => this.togglePanel(e)}>Delete</button>
                {
                    this.state.open ? (
                        <div className='post__lightbox'>
                            <h4>Are you sure?</h4>
                            <button onClick={() => this.deletePost()}>Delete Post</button>
                            <p>{this.props.postID}</p>
                        </div>
                    ) : null
                }
            </div >
        )
    }
}

export default DeletePost;