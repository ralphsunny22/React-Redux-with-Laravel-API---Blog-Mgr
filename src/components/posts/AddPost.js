import React, { useState, useEffect } from 'react';
import { addPost } from '../../actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';


const AddPost = () => {

    const [post, setPost] = useState({
        title: "",
        body: "",
        // user_id: "1",
        
        image: ""
    })

    const [errMsg, setErrMsg] = useState(null)
    const [titleErr, setTitleErr] = useState(null)
    const [bodyErr, setBodyErr] = useState(null)
    const [imageErr, setImageErr] = useState(null)


    const postSuccessMsg = useSelector(state => state.post.postSuccessMsg)
    const error = useSelector(state => state.error)

    const auth = useSelector(state => state.auth)//
    const { isAuthenticated, user_id } = auth;
    
    console.log(user_id)

    

    const changeImageHandler = (e) => {
        setPost({ ...post, image: e.target.files[0] })
    }

    const dispatch = useDispatch()

    //checking errors
    useEffect(() => {
        if(error.id === 'ADD_POST_FAIL'){
            setErrMsg(error.msg.message)
            setTitleErr(error.msg.errors.title && error.msg.errors.title[0])
            setBodyErr(error.msg.errors.body && error.msg.errors.body[0])
            setImageErr(error.msg.errors.image && error.msg.errors.image[0])
        }
        
    }, [error])

   



    const onSubmit = (e) => {
        e.preventDefault();

        const newPost = new FormData();
        newPost.append('image', post.image)
        newPost.append('title', post.title)
        newPost.append('body', post.body)
        //newPost.append('user_id', post.user_id)
        newPost.append('user_id', user_id)

        dispatch(addPost(newPost));

        setPost({
            title: "",
            body: "",
            //user_id: "",
            image: ""
        })

    }

    //if(isAuthenticated === false) return <Redirect to="/" />
    
    return (
        <div className="card mb-3">

            { postSuccessMsg && <p className="alert alert-success text-center">{postSuccessMsg}</p> }

            { errMsg && <p className="alert alert-danger text-center">{errMsg}</p> }

            <div className="card-header text-center">Add Post</div>

            <div className="card-body">

                <form onSubmit={onSubmit}>

                    
                    <div className="form-group">
                        <label htmlFor="title"></label>
                        <input
                        type="text"
                        name="title"
                        className={classnames('form-control form-control-lg', {'is-invalid':titleErr})}
                        placeholder="Enter Title"
                        value={post.title}
                        onChange={(e) => setPost({...post, title:e.target.value})}
                        
                        />

                        { titleErr && <p className="invalid-feedback d-block">{titleErr}</p> }
                    </div>

                    <div className="form-group">
                        <textarea
                        name="body"
                        className={classnames('form-control form-control-lg', {'is-invalid':bodyErr})}
                        placeholder="Enter Description"
                        cols="30" rows="5"
                        value={post.body}
                        onChange={(e) => setPost({...post, body:e.target.value})}

                        />
                        { bodyErr && <p className="invalid-feedback d-block">{bodyErr}</p> }
                    </div>

                    <div className="form-group">
                        <input type="file"
                        className={classnames('form-control form-control-lg', {'is-invalid':imageErr})}
                        onChange={changeImageHandler}
                        />
                        { imageErr && <p className="invalid-feedback d-block">{imageErr}</p> }
                    </div>

                    <div className="form-group">
                        <input
                        type="submit"
                        className="form-control-lg bg-dark text-white w-100"
                        value="SUBMIT POST"/>
                    </div>
                </form>

            </div>
            
        </div>
    )
}

export default AddPost
