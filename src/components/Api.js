// React
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import Header from './Header';
import Footer from './Footer';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlans, addPlanToBeSuscribed } from '../redux/actions/plansActions';
import { fetchClient } from '../redux/actions/clientsActions';
import { initMercadopagoTransaction, resetMercadopagoCallStatus } from '../redux/actions/paymentActions';
import { MERCADOPAGO, SUCCESS } from '../redux/constants';

// APIs
import Swal from 'sweetalert2';

function Api() {

    return (
        <Fragment>
            <Header/>
            <div className="container mt-5 mb-5">
                <div className="flex-row justify-content-center mt-5">
                    <p className="font-weight-light">
                        Regístrese y comience a utilizar nuestras APIs rápidas y fáciles de forma gratuita. 
                        Consulte nuestras suscripciones mensuales para obtener más opciones de las que puede proporcionarle la cuenta gratuita. 
                    </p>
                    <p className="font-weight-bolder">Recopilación de datos meteorológicos actuales.</p>
                </div>
                <hr/>
                <div className="flex-row d-flex justify-content-around align-items-center mt-5 mb-5">
                    <div className="card text-center ml-3 mr-3 w-25">
                        <Link className="card-haeder btn btn-dark" to="/api-doc">API doc</Link>
                        <div className="card-body">
                            <h5 className="card-title">Datos meteorológicos actuales</h5>
                            <p className="card-text">
                                Acceda a los datos meteorológicos actuales para cualquier ubicación.
                                El clima actual se actualiza en función de los datos recopilados de las estaciones meteorológicas.
                                Disponible de forma gratuita y todas las demás cuentas pagas.
                            </p>
                        </div>
                    </div>
                    <div className="card text-center ml-3 mr-3 w-25">
                        <Link className="card-haeder btn btn-dark" to="/api-doc">API doc</Link>
                        <div className="card-body">
                            <h5 className="card-title">Información histórica</h5>
                            <p className="card-text">
                                A través de nuestra API proporcionamos datos históricos del clima de la ciudad que desee.
                                Los datos históricos están disponibles con una semana de antiguedad si posee un plan Intermedio, 
                                con un mes de antiguedad si posee un plan Premium.
                                Estos datos se proporcionan en formato JSON.
                            </p>
                        </div>
                    </div>
                </div>
                <hr/>
                <Plans/>
            </div>
            <Footer/>
        </Fragment>
    )
}

// Plans Component
function Plans() {
    
    const dispatch = useDispatch()
    const currentUser = useSelector( state => state.users.currentUser )
    const currentClient = useSelector( state => state.clients.currentClient )
    const availablePlans = useSelector( state => state.plans.availablePlans )
    const paymentStatusCall = useSelector( state => state.payment.callApi.type )
    const paymentData = useSelector( state => state.payment.paymentData )
    const paymentMethod = useSelector( state => state.payment.paymentMethod )
    
    const handlePlanFetch = dispatch => fetchPlans(dispatch)
    const handlePlanToBeSuscribed = plan => dispatch(addPlanToBeSuscribed(plan))
    const handlePaymentCallStatus = () => dispatch(resetMercadopagoCallStatus())
    
    const handleSuscribe = (plan) => {
        handlePlanToBeSuscribed(plan)

        if (!currentUser) {
            const message = 'Es necesario iniciar sesion para poder Suscribirse a un Plan.'
            return (Swal.fire({ icon: 'error', title: 'Oops...', text: message }))
        }
        
        if (currentClient) {
            if (plan.description === currentClient.suscribed_to_plan) {
                const message = 'Usted ya posee el plan al que desea suscribirse.'
                return (Swal.fire({ icon: 'error', title: 'Oops...', text: message }))
            }
        }

        if (plan.price !== 0 && paymentMethod === MERCADOPAGO) {

            const config = {
                items: [
                    {
                        id: plan.description,
                        title: `Suscripcion al plan ${plan.description}`,
                        quantity: 1,
                        currency_id: 'USD',
                        unit_price: plan.price
                    }
                ],
                payer: { name: currentUser.displayName, email: currentUser.email },
                back_urls: {
                    success: `${window.location.origin}/user/${currentUser.uid}/checkout`,
                    pending: `${window.location.origin}/home`,
                    failure: `${window.location.origin}/home`,
                }
            }
            initMercadopagoTransaction(dispatch, config)
        }

        if (plan.price === 0) {
            document.location = `/user/${currentUser.uid}/checkout?collection_status=approved`
        }
        
    }

    if (paymentStatusCall === SUCCESS) {
        handlePaymentCallStatus()
        document.location = paymentData.sandbox_init_point
    }

    useEffect(() => {
        if (!availablePlans) {
            handlePlanFetch(dispatch)
        }

        if (currentUser && !currentClient)
            fetchClient(dispatch, currentUser.email)
    })

    return (
        <div className="flex-row d-flex justify-content-around align-items-center mt-5 mb-5">
            { availablePlans ?
                (availablePlans.map((plan, counter) => (
                    <div className="card border-dark w-25" key={`${counter}`}>
                        <div className="card-header">{`${plan.description.toUpperCase()}`}</div>
                        <div className="card-body text-dark">
                            <h5 className="card-title text-center">{`USD$ ${plan.price}/mes`}</h5>
                            <ul className="list-group list-group-flush text-dark">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Consultas</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${plan.amount_consults}`}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Variales</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">All</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Historial</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${plan.historical_data}`}</h6></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <button className="btn btn-dark btn-lg btn-block rounded-0" onClick={ () => handleSuscribe(plan) } >Suscribirme</button>
                    </div>
                ))) :
                (<div className="d-flex justify-content-around align-items-center mt-5 mb-5">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
            }
        </div>
    )
}


export default Api;
