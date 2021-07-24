import React from 'react';
import './AllPosts.css'
import Likes from '../PostFunctionality/Likes';
import DeletePost from '../PostFunctionality/DeletePost';

class AllPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    async componentDidMount() {
        const tokenString = localStorage.getItem('token')
        const userID = JSON.parse(tokenString)
        const lastLogin = localStorage.getItem('lastLogin')
        console.log(`"${lastLogin}"`)
        const response = await fetch('http://localhost:3001/post');
        if (response.status === 401) {
            console.log('not logged in')
        } else {
            const data = await response.json();
            const dataMap = data.reverse().map((d) =>
                <div className='postDiv' key={d.postID}>
                    <div className='postDiv__header'>
                        <h3 className='postDiv__header--title'>{d.title}</h3>
                        <h4>{d.username}</h4>
                    </div>
                    <div className='postDiv__content'>
                        <span>{d.imagePath}</span>
                        <p>
                            {d.content}
                        </p>
                    </div>
                    <Likes likes={d.likes} postID={d.postID}/>
                    {(d.employeeID === userID.userId ?
                        (<DeletePost postID={d.postID} />)
                        : null
                    )}
                    {(`"${d.timeStamp}"` > `"${lastLogin}"` ?
                        (<div>New Post</div>)
                        : null
                    )}
                </div>
            )
            console.log(dataMap)
            this.setState({ Posts: dataMap })
        }
    }

    render() {
        const { Posts } = this.state;
        return <div>
            {Posts}
        </div>
    }
}

export default AllPosts;