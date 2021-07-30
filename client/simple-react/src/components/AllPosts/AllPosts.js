import React from 'react';
import './AllPosts.css'
import Likes from '../PostFunctionality/Likes';
import DeletePost from '../PostFunctionality/DeletePost';
import EditPost from '../PostFunctionality/EditPost';
import DisplayDate from '../App/DisplayDate'
import CommentButton from '../Comments/CommentButton';


class AllPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
        };
    }

    async componentDidMount() {
        const tokenString = localStorage.getItem('token')
        const userID = JSON.parse(tokenString)
        const lastLogin = localStorage.getItem('lastLogin')
        const response = await fetch('http://localhost:3001/post');
        if (response.status === 401) {
            console.log('not logged in')
        } else {
            const data = await response.json();
            const dataMap = data.reverse().map((d) =>
                <div className='postDiv' key={d.postID}>
                    {(`"${d.timeStamp}"` > `"${lastLogin}"` ?
                        (<div className='postDiv__newPost'>New Post!</div>)
                        : null
                    )}
                    <div className='postDiv__header'>
                        <h3 className='postDiv__header--title'>{d.title}</h3>
                        <h4>{d.username}</h4>
                    </div>
                    <div className='postDiv__content'>
                        <img src={d.imagePath}></img>
                        <p>
                            {d.content}
                        </p>
                    </div>
                    <div className='postDiv__buttons'>
                        <Likes likes={d.likes} postID={d.postID} userId={userID.userId} />
                        <CommentButton postID={d.postID} userId={userID.userId} />
                    </div>
                    {(d.employeeID === userID.userId ?
                        (
                            <div className='postDiv__userBtns'>
                                <DeletePost postID={d.postID} imageId={d.imageId} />
                                <EditPost postID={d.postID} />
                            </div>
                        )
                        : null
                    )}
                    <DisplayDate date={d.timeStamp} />
                </div>
            )
            this.setState({ posts: dataMap })
        }
    }

    render() {
        return (
            <div>
                {this.state.posts}
            </div>
        )
    }
}

export default AllPosts;