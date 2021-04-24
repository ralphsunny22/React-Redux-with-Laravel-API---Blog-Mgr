import Posts from './components/posts/Posts';
import SinglePost from './components/posts/SinglePost';
import EditPost from './components/posts/EditPost';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layouts/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddPost from './components/posts/AddPost';

import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

import { loadUser } from './actions/authActions';


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUser())
    
  }, [dispatch])
  

  return (
    
    <Router>

    
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/add" component={AddPost} />
          <Route exact path="/post/edit/:slug" component={EditPost} />
          <Route exact path="/post/:slug" component={SinglePost} />
        </Switch>
        
      </div>
      
    </div>

    </Router>
    
  );





}

export default App;
