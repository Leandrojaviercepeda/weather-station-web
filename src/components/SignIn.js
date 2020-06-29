// React
import React, { useEffect } from 'react';

// Redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addCurrentUser, fetchTypeOfUser } from '../redux/actions/usersActions';
import { registerClient } from '../redux/actions/clientsActions'

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


// Component
function SignIn() {
    
    const dispatch = useDispatch()
    const currentUser = useSelector( state => state.users.currentUser, shallowEqual )

    // Configure FirebaseUI With Providers.
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ],
    };
    
    const handleCurrentUser = user => dispatch(addCurrentUser(user))
    const handleClientRegister = (dispatch, account) => registerClient(dispatch, account)

    useEffect(() => {
        if (!currentUser) {
            // Un-register Firebase observers when the component unmounts.
            const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {            
                if (user) {
                    handleCurrentUser(user) // Adding current user to state
                    const account = { email: user.email, username: user.displayName, profilePicture: user.photoURL }
                    handleClientRegister(dispatch, account).then(() => fetchTypeOfUser( dispatch, user.email)) // Register client in WeatherSt BBDD
                    // Adding type of user to state
                }
            })
            return unregisterAuthObserver
        }
    })

    return ( <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> )
}

export default SignIn;
