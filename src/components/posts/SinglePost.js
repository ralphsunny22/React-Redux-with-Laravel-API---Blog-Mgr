import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../actions/postActions';

const SinglePost = (props) => {

const post = useSelector(state => state.post.post)

const { slug } = props.match.params;

const dispatch = useDispatch();

useEffect(() => {
    dispatch(getPost(slug))
    
}, [dispatch, slug])


    return (
        <div>
            <div className="text-center">
                <h1>{post.title}</h1>
                <div>
                    <img src={post.imageUrl} alt="Post file"/>
                </div>
                <p>{post.body}</p>
            </div>
            
        </div>
    )
}

export default SinglePost
