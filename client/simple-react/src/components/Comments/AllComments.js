import React from 'react';
import DeleteComment from './DeleteComment';
import DisplayDate from '../App/DisplayDate';

class AllComments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            postId: this.props.postId,
            userId: this.props.userId
        }
    }

    async componentDidMount() {
        const postId = this.state.postId;
        const response = await fetch(`http://localhost:3001/comment/${postId}`);
        if (response.status === 404) {
            const display = (
                <div>No Comments Yet</div>
            )
            this.setState({ comments: display })
        } else {
            const data = await response.json();
            const dataMap = data.reverse().map((d) =>
                <div className='commentDiv' key={d.commentID}>
                    <div>{d.username}</div>
                    <div>{d.content}</div>
                    <DisplayDate date={d.timeStamp} />
                    <DeleteComment commentId={d.commentID} />
                </div>
            )
            this.setState({ comments: dataMap })
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.comments}
                </div>
            </div>
        )
    }

}

export default AllComments;