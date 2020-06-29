// React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import SignIn from './SignIn';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { removeCurrentUser, removeTypeOfUser } from '../redux/actions/usersActions';
import { removeClient, resetClientCallStatus } from '../redux/actions/clientsActions';

// Firebase
import firebase from 'firebase'

// Header Component
function Header() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/home" className="navbar-brand">
                WeatherSt
            </Link>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/stations">Estaciones</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">Acerca de</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/api">API</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/api-doc">API Doc</Link>
                    </li>
                    {/* <li className="nav-item">   
                        <Link className="nav-link" to="/contact">Cantactanos</Link>
                    </li> */}
                </ul>
                <Dropdown/>
            </div>
        </nav>
    )
}

// Dropdown Component
const Dropdown = () => {
    
    const dispatch = useDispatch()
    const currentUser = useSelector( state => state.users.currentUser, shallowEqual )
    const currentClient = useSelector( state => state.clients.currentClient, shallowEqual )

    const handleCurrentUser = () => dispatch(removeCurrentUser())
    const handleTypeOfUser = () => dispatch(removeTypeOfUser())
    const handleCurrentClient = () => dispatch(removeClient())
    const handleClientCallStatus = () => dispatch(resetClientCallStatus())

    const userSignOut = () => {
        firebase.auth().signOut()
        handleCurrentUser()
        handleTypeOfUser()
        
        if (currentClient) {
            handleCurrentClient()
            handleClientCallStatus()
        }
    }

    const [ isOpen, setIsOpen ] = useState(false)
    const toggleOpen = () => setIsOpen( !isOpen );
    const menuClass = `dropdown-menu text-center${isOpen ? " show" : ""}`;

    return(
        <div className="navbar-nav align-items-center">
            <li className="nav-item dropdown" onClick={ toggleOpen }>
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                >
                <i 
                    className="fas fa-user">
                </i>
                </button>
                { !currentUser ?
                    (
                        <div className={menuClass} aria-labelledby="dropdownMenuButton" style={{ right: 0, left: "auto", width: "300px" }}>
                            <SignIn/>
                        </div>
                    ) : 
                    (
                        <div className={menuClass} aria-labelledby="dropdownMenuButton" style={{ right: 0, left: "auto" }}>
                            <Link className="dropdown-item" to={`/user/${currentUser.uid}`}>
                                Perfil
                            </Link>
                            <Link className="dropdown-item" to={`/home`} onClick={ userSignOut }>
                                Cerrar sesión 
                            </Link>
                        </div>
                    )
                }
            </li>
        </div>
    )
}

export default Header;