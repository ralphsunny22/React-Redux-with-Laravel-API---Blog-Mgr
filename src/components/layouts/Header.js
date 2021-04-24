import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import { FaPersonBooth, FaSignInAlt, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {

    const auth = useSelector(state => state.auth)
    const { isAuthenticated } = auth

    const dispatch = useDispatch()
    const history = useHistory()
    
    const logoutHandle = () => {
       dispatch(logout())
       history.push("/login")
    }
    

    return (
        <div>
            
        { isAuthenticated ?

            <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
                <div className="container">
                    <a href="/" className="navbar-brand">
                    Blog Manager
                    </a>
                    <div>
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item">
                        <Link to="/add" className="nav-link">
                            <FaPlus /> Add
                        </Link>
                        </li>
                        
                        
                        <li className="nav-item">
                        <a href="#" onClick={logoutHandle} className="nav-link">
                            <FaSignOutAlt /> Logout
                        </a>
                        </li>       
                    </ul>
                    </div>
                </div>
            </nav> 

            :

            <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
                <div className="container">
                    <a href="/" className="navbar-brand">
                    Blog Manager
                    </a>
                    <div>
                    <ul className="navbar-nav mr-auto">
                        
                        <li className="nav-item">
                        <Link to="/register" className="nav-link">
                            <FaPersonBooth /> Register
                        </Link>
                        </li>

                        <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            <FaSignInAlt /> Login
                        </Link>
                        </li>
                        
                        
                    </ul>
                    </div>
                </div>
            </nav>
            }

            

        </div>
    )
}

export default Header
