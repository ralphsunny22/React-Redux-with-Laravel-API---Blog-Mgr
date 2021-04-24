import { POSTS_LOADING, GET_POSTS, GET_POST, ADD_POST, DELETE_POST, UPDATE_POST, ADD_POST_FAIL, UPDATE_POST_FAIL } from '../actions/types';

const initialState = {
    posts: [],
    isLoadingPosts: false,
    post: {},
    postSuccessMsg: ''
};

export default function postReducer(state = initialState, action){

    switch (action.type) {
        case POSTS_LOADING:
            return {
                ...state,
                isLoadingPosts: true
            }

        case GET_POSTS:
            return {
                ...state,
                posts: action.payload.data,
                isLoadingPosts: false
            }

        case GET_POST:
            return {
                ...state,
                post: action.payload.data,
            }

        case ADD_POST:
            return {
                ...state,
                posts: [action.payload.data, ...state.posts ],
                postSuccessMsg: action.payload.message

            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.slug !== action.payload)
            }

        case UPDATE_POST:
            console.log(action.payload)
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.payload.data.id ? (post = action.payload.data )
                : post
                ),

                postSuccessMsg: action.payload.message
            }

        case ADD_POST_FAIL:
        case UPDATE_POST_FAIL:
            return {
                ...state,
                post: {}
            }
    
        default:
            return state;
    }

}