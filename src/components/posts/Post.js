import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../actions/postActions';

const Post = ({ post }) => {

    const auth = useSelector(state => state.auth)
    const { isAuthenticated } = auth

    const dispatch = useDispatch()

    const handleDelete = slug => {
        dispatch(deletePost(slug))
    }

    return (
        <div>
            
            <ul className="list-group mb-5">
                <li className="list-group-item" style={{ backgroundColor:'#f5fffa' }}>
                    <div className="row">
                        <div className="col-md-4 col-sm-4">
                            <img src={post.imageUrl} alt="Post file" className="w-50"/>
                        </div>
                        <div className="col-md-8 col-sm-8">
                            <Link to={post.path}>
                                <h3>{ post.title }</h3>
                            </Link>

                        { isAuthenticated && 
                            <div>
                            <button className="btn btn-danger" onClick={handleDelete.bind(null, post.slug)}>Delete</button> {' '}

                            <Link to={`/post/edit/${post.slug}`}>
                            <button className="btn btn-success">Edit</button>
                            </Link>
                            
                            </div>
                            }
                            
                            
                            <small>Written by { post.user }, { post.created_at }</small>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
    )
}

export default Post
