// React
import React, { Fragment, useEffect } from 'react';

// Components
import Header from './Header';

// Redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchClient, upgradePlan, notifyClient } from '../redux/actions/clientsActions';
import { removePlanToBeSuscribed } from '../redux/actions/plansActions';
import { removePaymentData } from '../redux/actions/paymentActions';

// APIs
import Swal from 'sweetalert2';

// Profile Component
function Profile() {

    // Get status of upgrade plan after Suscribe
    const collectionStatus = new URLSearchParams(window.location.search).get('collection_status')

    const dispatch = useDispatch()
    const currentUser = useSelector( state => state.users.currentUser, shallowEqual )
    const currentClient = useSelector( state => state.clients.currentClient, shallowEqual )
    const planToBeSuscribed = useSelector( state => state.plans.planToBeSuscribed, shallowEqual )

    const handleClientFetch = (dispatch, email) => fetchClient(dispatch, email)
    const handleUpgradePlan = (dispatch, clientId, planToSuscribe) => upgradePlan(dispatch, clientId, planToSuscribe)
    const handlePlanToBeSuscribed = () => dispatch(removePlanToBeSuscribed())
    const handlePaymentData = () => dispatch(removePaymentData())

    useEffect(() => {
        handleClientFetch(dispatch, currentUser.email)
    }, [currentUser.email, dispatch])

    if (collectionStatus) {
        handleUpgradePlan(dispatch, currentClient.id_client, planToBeSuscribed.description)
            .then( () => handleClientFetch(dispatch, currentUser.email) )
            .then( () => handlePlanToBeSuscribed() )
            .then( () => handlePaymentData() )
            .then( () => notifyClient(dispatch, currentClient.id_client) )
        
        return (Swal.fire({
            icon: 'success',
            title: `Gracias por suscribirte con nosotros!`,
            timer: 2000,
            buttons: false
        })).then(() => window.location = `/user/${currentUser.uid}`)
    }

    return (
        <Fragment>
            <Header/>
            { currentClient ? 
                (<div className="d-flex flex-column justify-content-center ml-5 mr-5">
                    <div className="container mt-5" style={{ maxWidth: "250px", maxHeight: "250px", alignContent: "center" }}>
                        <img src={`${currentClient.profile_picture}`} className="card-img-top img-thumbnail" alt="profile"/>
                    </div>
                    <div className="card mt-5">
                        <div className="card-header">
                            <h6 className="font-weight-bold text-left"> Nombre de usuario: <span className="badge badge-pill badge-info"> {`${currentClient.username}`} </span></h6>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><h6 className="font-weight-bold text-left"> Email: <span className="badge badge-pill badge-info"> {`${currentClient.email}`} </span></h6></li>
                            <li className="list-group-item"><h6 className="font-weight-bold text-left"> Consultas disponibles: <span className="badge badge-pill badge-info"> {`${currentClient.available_consults}`} </span></h6></li>
                            <li className="list-group-item"><h6 className="font-weight-bold text-left"> Plan actual: <span className="badge badge-pill badge-info"> {`${currentClient.suscribed_to_plan}`} </span></h6></li>
                        </ul>
                    </div>
                    <div className="card mt-5 mb-5">
                        <div className="card-header text-center"> Apikeys </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {currentClient.apikeys.map((apikey, counter) => (
                                    <div key={counter} className="row">
                                        <div className="col-sm">
                                            <h6 className="font-weight-bold text-center">
                                                Apikey: <span className="badge badge-pill badge-info">{`${apikey.id_apikey}`}</span>    
                                            </h6>
                                        </div>
                                        <div className="col-sm">
                                            <h6 className="font-weight-bold text-center">
                                                Nombre: <span className="badge badge-pill badge-info">{`${apikey.name_apikey}`}</span>
                                            </h6>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>) :
                (<div className="d-flex justify-content-around align-items-center mt-5 mb-5" 
                    style={{ overflow: "hidden", position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
            }
        </Fragment>
    )
}

export default Profile;