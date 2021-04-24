import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postActions';
//import Post from './Post';
import Pagination from '../layouts/Pagination';

const Posts = () => {

    const posts = useSelector(state => state.post.posts)
    //console.log(posts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
        
    }, [dispatch])

    return (
        
        <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-danger">Posts</span> List
        </h1>

        {/* { posts.map(post => (
          <Post key={post.id} post={post} />
        )) } */}

        
        {posts.length > 0 ? (
          <>
            <Pagination
              data={posts}
              pageLimit={5}
              dataLimit={10}
            />
          </>
        ) : (
        <h1>Loading...</h1>
        )}

      </React.Fragment>
    )
}

export default Posts
