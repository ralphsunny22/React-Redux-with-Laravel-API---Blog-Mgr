import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, updatePost } from '../../actions/postActions';
import classnames from 'classnames'

const EditPost = (props) => {

    const [post, setPost] = useState({
        title: "",
        body: "",
        imageUrl: "",
        image: "",
        slug: ""
    })

    const [errMsg, setErrMsg] = useState(null)
    const [titleErr, setTitleErr] = useState(null)
    const [bodyErr, setBodyErr] = useState(null)
    const [imageErr, setImageErr] = useState(null)

    const changeImageHandler = (e) => {
        setPost({ ...post, image: e.target.files[0] })
    }

    const { slug } = props.match.params

    const selectedPost = useSelector(state => state.post.post)
    
    const postSuccessMsg = useSelector(state => state.post.postSuccessMsg)
    const error = useSelector(state => state.error)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost(slug))

        if(error.id === 'UPDATE_POST_FAIL'){
            if(error.msg.exception){
                setErrMsg( 'Invalid Parameters Passed In URL' )
            } else {
                setErrMsg( error.msg.message )
                setTitleErr( error.msg.errors.title && error.msg.errors.title[0] )
                setBodyErr( error.msg.errors.body && error.msg.errors.body[0] )
                setImageErr( error.msg.errors.image && error.msg.errors.image[0] )
            }
            
        }
        
    }, [dispatch, slug, error])

    //just like componentWillReceiveProps
    useEffect(() => {
        if(selectedPost){
            setPost({
                title: selectedPost.title,
                body: selectedPost.body,
                imageUrl: selectedPost.imageUrl,
                slug: selectedPost.slug,
            })
        } else {
            setPost({
                title: "",
                body: "",
                imageUrl: "",
                image: "",
                slug: ""
            })
        }
        
    }, [selectedPost])

    const onSubmit = (e) => {
        e.preventDefault();
        
        const updPost = new FormData();
        updPost.append('title', post.title)
        updPost.append('body', post.body)
        updPost.append('slug', post.slug)
        if(post.image !== ''){
            updPost.append('image', post.image)
        }

        dispatch(updatePost(updPost));

        setPost({
            title: "",
            body: "",
            user_id: "1",
            image: ""
        })
    }


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
                        value={post.title || ''}
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
                        value={post.body || ''}
                        onChange={(e) => setPost({...post, body:e.target.value})}

                        />
                        { bodyErr && <p className="invalid-feedback d-block">{bodyErr}</p> }
                    </div>

                    <div className="form-group">
                        <img src={post.imageUrl} alt="Post file" className="w-100" />
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

export default EditPost
