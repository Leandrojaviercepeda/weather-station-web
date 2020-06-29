// React
import React, { Fragment, useState, useEffect } from 'react';

// Components
import DasHeader from './DashHeader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchPlans, createNewPlan, deletePlan, setPlanToEdit, editPlan, removePlanToEdit } from '../redux/actions/plansActions';


function DashPlansManagement() {
    
    return (
        <Fragment>
            <DasHeader/>
            <div className="container align-items-center mt-3">
                <div className="d-flex justify-content-center mt3 mb-3">
                    <h1><span className="badge badge-dark">Administra los planes disponibles aqui!</span></h1>
                </div>
                <hr/>
                    <ManagePlan/>
                <hr/>
                    <SearchBar/>
                <hr/>
            </div>
        </Fragment>
    )
}

export default DashPlansManagement;

function ManagePlan() {

    const dispatch = useDispatch()
    const planToEdit = useSelector( state => state.plans.planToEdit, shallowEqual)
    const availablePlans = useSelector( state => state.plans.availablePlans)

    const availableHistoricalData = ['No', 'Diaria', 'Semanal', 'Mensual', 'Anual']

    const [error, setError] = useState({message: '', isError: false})
    const handleError = (message, isError=true) => setError({message: message, isError: isError})

    const [plan, setPlan] = useState({description: '', price: '', amountConsults: '', historicalData: ''})
    const handleResetPlan = () => setPlan({description: '', price: '', amountConsults: '', historicalData: ''})
    const handlePlanToEdit = plan => setPlan({
        description: plan.description, 
        price: plan.price, 
        amountConsults: plan.amount_consults, 
        historicalData: plan.historical_data
    })
    
    const handlePlanDescription = description => setPlan({...plan, description: description})
    const handlePlanPrice = price => setPlan({...plan, price: price})
    const handlePlanAmountConsults = amountConsults => setPlan({...plan, amountConsults: amountConsults})
    const handlePlanHistoricalData = historicalData => {
        setPlan({...plan, historicalData: historicalData})
        return availableHistoricalData.includes(historicalData) ? handleError('', false) 
            : handleError(`Los valores posibles para datos historicos son 
                "${availableHistoricalData.map(h => ` ${h}`)} ".`)
    }

    const handlePlanFetch = dispatch => fetchPlans(dispatch)
    const handleRemovePlanToEdit = () => dispatch(removePlanToEdit())

    useEffect(() => {
        if (planToEdit) handlePlanToEdit(planToEdit)
    }, [planToEdit]);
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log('paso por aca');
        if (!error.isError) {
            if (plan.description === '' || plan.price === '' || plan.amountConsults === '' 
                || plan.historicalData === '')
                return handleError('Todos los campos deben estar completos!')
            else {
                
                if (planToEdit) {
                    const planExist = availablePlans.some(p => p.description === plan.description)                    
                    if (planExist) editPlan(dispatch, plan).then( () => handlePlanFetch(dispatch).then(() => handleResetPlan())).then(() => handleRemovePlanToEdit())
                    else createNewPlan(dispatch, plan).then( () => handlePlanFetch(dispatch).then(() => handleResetPlan())).then(() => handleRemovePlanToEdit())
                }
                else createNewPlan(dispatch, plan).then( () => handlePlanFetch(dispatch).then(() => handleResetPlan()))
            }
        }
    }

    return (
        <div className="d-flex justify-content-center mt-3 mb-3">
            <div className="card w-75">
                <h2 className="card-header text-center">Plan</h2>
                <form onSubmit={handleSubmit}>
                    { error.isError ? <div className="alert alert-danger text-center p2 mt-3 mb-3">{`${error.message}`}</div> : null}
                    <div className="align-items-center card-body" >
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Nombre del plan</small>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    value={plan.description}
                                    onChange={ e => handlePlanDescription(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Precio</small>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    min="0"
                                    placeholder="$USD"
                                    value={plan.price}
                                    onChange={ e => handlePlanPrice(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Cantidad de consultas</small>
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    value={plan.amountConsults}
                                    onChange={ e => handlePlanAmountConsults(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Datos Historicos</small>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder={`${availableHistoricalData.map(a => ` ${a}`)}`}
                                    value={plan.historicalData}
                                    onChange={ e => handlePlanHistoricalData(e.target.value) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-success w-100">Aceptar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


function PlansList({plans}) {

    const dispatch = useDispatch()
    const handlePlanFetch = dispatch => fetchPlans(dispatch)
    const handlePlanDelete = planDescription => deletePlan(dispatch, planDescription).then(() => handlePlanFetch(dispatch))
    const handlePlanEdit = plan => dispatch(setPlanToEdit(plan))

    return (
        <div className="d-flex justify-content-around align-items-center flex-wrap mt-3 mb-3">
            { plans ?
                (plans.map((plan, counter) => (
                    <div className="card border-dark ml-3 mr-3 mt-3 mb-3 w-25" key={`${counter}`}>
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

                        { plan.description !== 'Basic' ? 
                            (
                                <div className="card-footer">
                                    <button className="btn btn-success btn-block" type="button" onClick={ () => handlePlanEdit(plan) } >Editar</button>
                                    <button className="btn btn-danger btn-block" type="button" onClick={ () => handlePlanDelete(plan.description) } >Borrar</button>
                                </div>
                            ) : 
                            (
                                <div className="card-footer">                                
                                    <button className="btn btn-success btn-block" type="button" onClick={ () => handlePlanEdit(plan) } >Editar</button>
                                </div>
                            )
                        }
                        
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

function SearchBar () {

    const [ dataReceived, setDataReceived ] = useState('')

    const dispatch = useDispatch()
    const availablePlans = useSelector( state => state.plans.availablePlans, shallowEqual)
    const handlePlanFetch = dispatch => fetchPlans(dispatch)

    if (!availablePlans) handlePlanFetch(dispatch)
    const searchPlan = description => setDataReceived(description)
    
    return (
        <div className="container mt-3 mb-3">
            <div className="d-flex justify-content-around mt-3 mb-3">
                <div className="input-group align-middle w-50">
                    <input type="text" className="form-control" placeholder="Buscar..." onChange={ e => searchPlan(e.target.value) }/>
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
                <PlansReport plans={ availablePlans }/>
            </div>
            <div className="">
                <PlansList 
                    plans={ 
                        dataReceived 
                            ? [...availablePlans].filter(p => p.description.toLowerCase().includes(dataReceived.toLowerCase()))
                            : availablePlans
                    }
                />
            </div>
        </div>
    )
}

function PlansReport ({plans}) {

    const table = plans ? 
            (<table className="table" id="table-to-xls" hidden >
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad de consultas</th>
                    <th scope="col">Historial</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan, counter) => (
                        <tr key={counter}>
                        <th scope="row">{`${counter+1}`}</th>
                        <td>{`${plan.description}`}</td>
                        <td>{`${plan.price}`}</td>
                        <td>{`${plan.amount_consults}`}</td>
                        <td>{`${plan.historical_data}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>)
            : ''        

    return (
        <div>
            <ReactHTMLTableToExcel
                id="report-table-xls-button"
                className="btn btn-primary"
                table={table ? `${table.props.id}` : ''}
                filename="tablexls"
                sheet="tablexls"
                buttonText="Generar Reporte"
            />
            {table}
        </div>
    )
}

