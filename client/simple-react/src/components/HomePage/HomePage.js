import React from 'react';
import CreatePost from '../CreatePost/CreatePost';
import AllPosts from '../AllPosts/AllPosts';
import Nav from '../Nav/Nav'

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: []
    };
  }

  async componentDidMount() {
    const tokenString = localStorage.getItem('token')
    const userID = JSON.parse(tokenString)
    const response = await fetch(`http://localhost:3001/users/${userID.userId}`);
    if (response.status === 401) {
      console.log('not logged in')
    } else {
      const data = await response.json();
      localStorage.setItem('lastLogin', data.lastLogin)
      localStorage.setItem('likedPosts', data.likedPosts)
      const pageFormat =
        <div>
          <Nav />
          <CreatePost />
          <AllPosts />
        </div>
      this.setState({ page: pageFormat })
    }
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        {page}
      </div>
    )
  }
}

export default HomePage;


// export default function HomePage() {
//   return (
//     <div>
//       <Nav />
//       <CreatePost />
//       <AllPosts />
//     </div>
//   );
// }