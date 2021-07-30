import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function refreshPage() {
    window.location.reload(false);
}

class Likes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.postID,
            userId: this.props.userId,
            likes: this.props.likes,
            liked: false,
            likeValue: null
        }

        this.updateLocalRecords = this.updateLocalRecords.bind(this);
        this.updateDatabase = this.updateDatabase.bind(this);
    }

    componentDidMount() {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts'));
        if (likedPosts !== null) {
            if (likedPosts.includes(this.state.id)) {
                this.setState({
                    liked: true
                })
            }
        }
    }

    async updateLocalRecords(e) {
        const currentPosts = JSON.parse(localStorage.getItem('likedPosts'));
        const postId = this.state.id
        if (currentPosts !== null) {
            if (currentPosts.includes(postId)) {
                const index = currentPosts.indexOf(postId)
                if (index > -1) {
                    currentPosts.splice(index, 1);
                }
                localStorage.setItem('likedPosts', JSON.stringify(currentPosts))
                this.setState({
                    liked: false,
                    likeValue: 0
                })
            } else {
                currentPosts.push(postId)
                localStorage.setItem('likedPosts', JSON.stringify(currentPosts))
                this.setState({
                    liked: true,
                    likeValue: 1
                })
            }
        } else {
            const newPosts = []
            newPosts.push(postId)
            localStorage.setItem('likedPosts', JSON.stringify(newPosts))
            this.setState({
                liked: true,
                likeValue: 1
            })
        }
    }

    async updateDatabase(e) {
        await this.updateLocalRecords();
        fetch(`http://localhost:3001/post/like/${this.state.id}`, {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                like: this.state.likeValue
            })
        })
            .then(res => {
                if (res.status === 500) {
                    alert('Error in liking post')
                }
            })
        fetch(`http://localhost:3001/users/like/${this.state.userId}`, {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                likedPosts: localStorage.getItem('likedPosts')
            })
        })
            .then(res => {
                if (res.status === 500) {
                    alert('Error in liking post')
                } else {
                    refreshPage();
                }
            })
    }

    render() {
        return (
            <div id='likesWrapper'>
                <div id='likesDisplay'>{this.props.likes}</div>
                {(this.state.liked === false ?
                    (
                        <div>
                            <FontAwesomeIcon icon="thumbs-up" id='like' onClick={this.updateDatabase} />
                        </div>
                    )
                    : (
                        <div>
                            <FontAwesomeIcon icon="thumbs-up" id='cancelLike' onClick={this.updateDatabase} />
                        </div>
                    )
                )}
            </div>
        )
    }
}

export default Likes;