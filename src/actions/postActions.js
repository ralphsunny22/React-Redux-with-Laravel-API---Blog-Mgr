import { POSTS_LOADING, GET_POSTS, GET_POST, ADD_POST, DELETE_POST, UPDATE_POST, ADD_POST_FAIL, UPDATE_POST_FAIL } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions'

export const getPosts = () => dispatch => {
    dispatch({
        type: POSTS_LOADING
    });

    axios.get('http://127.0.0.1:8000/posts').then(res=>
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        })
    )
    //.catch(err => {err.response.data, err.response.status})
}

export const getPost = (slug) => dispatch => {
    dispatch({
        type: POSTS_LOADING
    });

    axios.get(`http://127.0.0.1:8000/post/${slug}`).then(res=>
        dispatch({
            type: GET_POST,
            payload: res.data,
        })
    )
    //.catch(err => {err.response.data, err.response.status})
}

export const addPost = (newPost) => (dispatch, getState) => {
    axios.post('http://127.0.0.1:8000/post/', newPost, tokenConfig(getState)).then(res=>
        dispatch({
            type: ADD_POST,
            payload: res.data,
        })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'ADD_POST_FAIL'));
    dispatch({
        type: ADD_POST_FAIL
    });
    });
}

export const deletePost = (slug) => (dispatch, getState) => {
    axios.delete(`http://127.0.0.1:8000/post/${slug}`).then(res=>
        dispatch({
            type: DELETE_POST,
            payload: slug,
        })
    )
    //.catch(err => {err.response.data, err.response.status})
}

export const updatePost = (updPost) => (dispatch, getState) => {
    axios.post(`http://127.0.0.1:8000/updatePost/${updPost.getAll('slug')}`, updPost, tokenConfig(getState)).then(res=>
        dispatch({
            type: UPDATE_POST,
            payload: res.data,
        })
    )
    .catch(err => {
        dispatch(returnErrors(err.response?.data, err.response?.status, 'UPDATE_POST_FAIL'));
    dispatch({
        type: UPDATE_POST_FAIL
    });
    });
}
