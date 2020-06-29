// React
import React, { Fragment, useState } from 'react';

// Components
import DashHeader from './DashHeader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchClients } from '../redux/actions/clientsActions';

function DashClientsManagement() {
    return (
        <Fragment>
            <DashHeader/>
            <div className="container align-items-center mt-3">
                <div className="d-flex justify-content-center mt3 mb-3">
                    <h1><span className="badge badge-dark">Visualiza los clientes de WeatherSt aqui!</span></h1>
                </div>
                <hr/>
                <SearchBar/>
            </div>
        </Fragment>
    )
}

export default DashClientsManagement;

function ClientsList({clients}) {

    return (
        <div className="d-flex justify-content-around align-items-center flex-wrap mt-3 mb-3">
            { clients ?
                (clients.map((client, counter) => (
                    <div className="card border-dark ml-3 mr-3 mt-3 mb-3 w-25" key={`${counter}`}>
                        <img src={`${client.profile_picture}`} className="card-img-top img-thumbnail" alt="profile"/>
                        <div className="card-header text-center">{`${client.username}`}</div>
                        <div className="card-body text-dark">
                            <ul className="list-group list-group-flush text-dark">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Email</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${client.email}`}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Suscripto al plan</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${client.suscribed_to_plan}`}</h6></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
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
    const searchClient = some => setDataReceived(some)

    const [ searchBy, setSearchBy ] = useState('')
    const handleSearchBy = critery => setSearchBy(critery)

    const dispatch = useDispatch()
    const clients = useSelector( state => state.clients.clients, shallowEqual)
    const handleClientsFetch = dispatch => fetchClients(dispatch)

    if (!clients) handleClientsFetch(dispatch)

    const listByCritery = critery => {
        switch (critery) {
            case 'username':
                return [...clients].filter(c => c.username.toLowerCase().includes(dataReceived.toLowerCase()))
            case 'email': 
                return [...clients].filter(c => c.email.toLowerCase().includes(dataReceived.toLowerCase()))
            case 'suscribedToPlan':
                return [...clients].filter(c => c.suscribed_to_plan.toLowerCase().includes(dataReceived.toLowerCase()))
            default:
                return clients;
        }
    }

    return (
        <div className="container mt-3 mb-3">
            <div className="d-flex justify-content-around mt-3 mb-3">
                <div className="input-group flex-nowrap w-50">
                    <select className="custom-select" onChange={ e => handleSearchBy(e.target.value) }>
                        <option defaultValue>Buscar por</option>
                        <option value="username">Nombre</option>
                        <option value="email">Email</option>
                        <option value="suscribedToPlan">Suscripto al Plan</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Buscar..." onChange={ e => searchClient(e.target.value) }/>
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
                <ClientsReport clients={ clients }/>
            </div>
            <div className="container mt-3 mb-3">
                <ClientsList 
                    clients={ 
                        dataReceived
                            ? listByCritery(searchBy)
                            : clients
                    }
                />
            </div>
        </div>
    )
}

function ClientsReport ({clients}) {

    const table = clients ? 
            (<table className="table" id="table-to-xls" hidden>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Suscripto al plan</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, counter) => (
                        <tr key={counter}>
                        <th scope="row">{`${counter+1}`}</th>
                        <td>{`${client.username}`}</td>
                        <td>{`${client.email}`}</td>
                        <td>{`${client.suscribed_to_plan}`}</td>
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