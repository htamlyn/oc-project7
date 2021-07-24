import React from 'react';

class Likes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.postID,
            likes: this.props.likes
        }

    }

    render(){
        return(
            <div>
            <button>Like</button>
            <span>{this.props.likes}</span>
            </div>
        )
    }
}

export default Likes;