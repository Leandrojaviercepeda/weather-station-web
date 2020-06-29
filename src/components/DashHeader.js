import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Components
import Home from './Home';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { removeCurrentUser, removeTypeOfUser } from '../redux/actions/usersActions';
import { resetClientCallStatus } from '../redux/actions/clientsActions';

// Firebase
import firebase from 'firebase'

function DashHeader() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/dashboard" className="navbar-brand">
                WeatherSt
            </Link>
            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/management/stations">Estaciones</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/management/clients">Clientes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/management/plans">Planes</Link>
                    </li>
                </ul>
                <Dropdown/>
            </div>
        </nav>
    )
}

const Dropdown = () => {
    
    const dispatch = useDispatch()
    const currentUser = useSelector( state => state.users.currentUser, shallowEqual )

    const handleCurrentUser = () => dispatch(removeCurrentUser())
    const handleTypeOfUser = () => dispatch(removeTypeOfUser())
    const handleClientCallStatus = () => dispatch(resetClientCallStatus())

    const userSignOut = () => {
        firebase.auth().signOut()
        handleCurrentUser()
        handleTypeOfUser()
        handleClientCallStatus()
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
                { currentUser ?
                    (
                        <div className={menuClass} aria-labelledby="dropdownMenuButton" style={{ right: 0, left: "auto" }}>
                            <Link className="dropdown-item" to={`/profile/${currentUser.uid}`}>
                                Perfil
                            </Link>
                            <Link className="dropdown-item" to={`/home`} onClick={ userSignOut }>
                                Cerrar sesión 
                            </Link>
                        </div>
                    ) : ( <Redirect to={`/home`} render = { ()=> (<Home/>)}/> )
                }
            </li>
        </div>
    )
}

export default DashHeader;
