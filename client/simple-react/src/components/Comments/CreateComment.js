import React from 'react';
import history from '../App/history';
import './Comments.css';

class CreateComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            postId: this.props.postId,
            userId: this.props.userId,
            content: '',
            timeStamp: ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        this.setState({
            timeStamp: dateTime
        }, () => {
            const formData = new FormData();
            formData.append("employeeID", this.state.userId);
            formData.append("postID", this.state.postId)
            formData.append("timeStamp", this.state.timeStamp);
            formData.append("content", this.state.content);
            const values = Object.fromEntries(formData.entries());
            const toSend = JSON.stringify(values)
            fetch('http://localhost:3001/comment', {
                crossDomain: true,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: toSend
            });
            window.location.reload(false);
        })
    }

    render() {
        return (
            <div>
                <h4>New Comment</h4>
                <form className='createComment__form' onSubmit={this.onSubmit}>
                <label className='commentInput'>
                        <textarea
                            type="text"
                            id="commentContent"
                            name="content"
                            value={this.state.content}
                            onChange={this.onChange} />
                    </label>
                    <input className='commentsBtn' type="submit" value="Post Comment!" id="post" onClick={() => history.push('/')}></input>
                </form>
            </div>
        )
    }
}

export default CreateComment;