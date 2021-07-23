import React from 'react';
import CreatePost from '../CreatePost/CreatePost';
import AllPosts from '../AllPosts/AllPosts';
import Nav from '../Nav/Nav'

export default function HomePage() {
  return (
    <div>
      <Nav />
      <CreatePost />
      <AllPosts />
    </div>
  );
}