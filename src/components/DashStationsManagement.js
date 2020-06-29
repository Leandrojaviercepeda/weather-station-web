// React
import React, {Fragment, useState, useEffect} from 'react';

// Components
import DashHeader from './DashHeader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

// Redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchStations, editStation, createNewStation, removeStationToEdit, setStationtoEdit, deleteStation } from '../redux/actions/stationsActions';

import * as moment from 'moment';

function DashStationsManagement() {

    return (
        <Fragment>
            <DashHeader/>
            <div className="container align-items-center mt-3">
                <div className="d-flex justify-content-center mt3 mb-3">
                    <h1><span className="badge badge-dark">Administra las estaciones aqui!</span></h1>
                </div>
                <hr/>
                    <ManageStation/>
                <hr/>
                    <SearchBar/>
            </div>
        </Fragment>
        
    )
}

export default DashStationsManagement;


function ManageStation() {

    const dispatch = useDispatch()
    const stationToEdit = useSelector( state => state.stations.stationToEdit, shallowEqual)
    const stations = useSelector( state => state.stations.stations, shallowEqual)

    const [error, setError] = useState({message: '', isError: false})
    const handleError = (message, isError=true) => setError({message: message, isError: isError})

    const [station, setStation] = useState({name: '', latitude: '', longitude: '', country: '', region: '', city: '', zipcode: ''})
    const handleResetStation = () => setStation({name: '', latitude: '', longitude: '', country: '', region: '', city: '', zipcode: ''})
    
    const handleStationName = name => {
        setStation({...station, name: name})

        return stations.some(s => s.name.toLowerCase() === name.toLowerCase())
            ? handleError(`Ya existe una estacion con el nombre ${name}!`)
            : handleError('', false)
    }
    
    const handleStationLatitude = latitude => setStation({...station, latitude: latitude})
    
    const handleStationLongitude = longitude => setStation({...station, longitude: longitude})
    
    const handleStationCountry = country => setStation({...station, country: country})
    
    const handleStationRegion = region => setStation({...station, region: region}) && handleError('', false)
    
    const handleStationCity = city => setStation({...station, city: city}) && handleError('', false)
    
    const handleStationZipcode = zipcode => setStation({...station, zipcode: zipcode}) && handleError('', false)
    
    const handleStationsFetch = dispatch => fetchStations(dispatch)
    
    const handleRemoveStationToEdit = () => dispatch(removeStationToEdit())
    
    const handleStationToEdit = station => setStation({
        name: station.name, 
        latitude: station.lat, 
        longitude: station.lon, 
        country: station.country,
        region: station.region, 
        city: station.city, 
        zipcode: station.zipcode
    })

    useEffect(() => {
        if (stationToEdit) handleStationToEdit(stationToEdit)
    }, [stationToEdit]);
    
    const handleSubmit = e => {
        e.preventDefault();
        if (!error.isError) {
            if (station.name === '' || station.latitude === '' || station.longitude === '' 
                || station.country === '' || station.region === ''|| station.city === ''
                || station.zipcode === '' )
                return handleError('Todos los campos deben estar completos!')
            else {
                if (stationToEdit) {
                    const stationExist = stations.some(s => s.name === station.name)
                    station.id = stationToEdit.id                    
                    if (stationExist) editStation(dispatch, station).then( () => handleStationsFetch(dispatch).then(() => handleResetStation())).then(() => handleRemoveStationToEdit())
                    else createNewStation(dispatch, station).then( () => handleStationsFetch(dispatch).then(() => handleResetStation())).then(() => handleRemoveStationToEdit())
                }
                else createNewStation(dispatch, station).then( () => handleStationsFetch(dispatch).then(() => handleResetStation()))
            }
        }
    }

    return (
        <div className="d-flex justify-content-center mt-3 mb-3">
            <div className="card w-75">
                <h2 className="card-header text-center">Estacion</h2>
                <form className="" onSubmit={handleSubmit}>
                    { error.isError ? <div className="alert alert-danger text-center p2 mt-3 mb-3">{`${error.message}`}</div> : null}
                    <div className="card-body">
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Nombre de la estacion</small>
                                <input
                                    type="text" 
                                    className="form-control" 
                                    value={station.name}
                                    onChange={ e => handleStationName(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Latitud</small>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={station.latitude}
                                    onChange={ e => handleStationLatitude(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Longitud</small>
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    value={station.longitude}
                                    onChange={ e => handleStationLongitude(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Pais</small>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={station.country}
                                    onChange={ e => handleStationCountry(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Region</small>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={station.region}
                                    onChange={ e => handleStationRegion(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Ciudad</small>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={station.city}
                                    onChange={ e => handleStationCity(e.target.value) }
                                />
                            </div>
                        </div>
                        <div className="form-group row justify-content-center">
                            <div className="col-sm-8 col-lg-10">
                                <small className="text-muted">Codigo de area</small>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={station.zipcode}
                                    onChange={ e => handleStationZipcode(e.target.value) }
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

function StationsList({stations}) {

    const dispatch = useDispatch()
    const handleStationsFetch = dispatch => fetchStations(dispatch)
    const handleStationEdit = station => dispatch(setStationtoEdit(station))
    const handleStationDelete = stationId => deleteStation(dispatch, stationId).then(() => handleStationsFetch(dispatch))

    return (
        <div className="d-flex justify-content-around align-items-center flex-wrap mt-3 mb-3">
            { stations ?
                (stations.map((station, counter) => (
                    <div className="card border-dark ml-3 mr-3 mt-3 mb-3 w-35" key={`${counter}`}>
                        <div className="card-header">{`${station.name.toUpperCase()}`}</div>
                        <div className="card-body text-dark">
                            <ul className="list-group list-group-flush text-dark">
                                <h5 className="card-title text-center">Station data</h5>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Identificator</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${station.id}`}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Estado</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{station.fail ? `Rota` : `Perfecta`}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Fecha de creación</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{moment(new Date(station.created_at)).format('DD/MM/YYYY - hh:mm')}</h6></div>
                                    </div>
                                </li>
                            </ul>
                            <ul className="list-group list-group-flush text-dark">
                                <h5 className="card-subtitle text-center mt-3 mb-3 ">Located at</h5>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Latitud</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{station.lat}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Longitud</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{station.lon}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">País</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${station.country}`}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Region</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${station.region}`}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Ciudad</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${station.city}`}</h6></div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-sm"><h6 className="font-weight-normal text-center">Codigo postal</h6></div>
                                        <div className="col-sm"><h6 className="font-weight-bold text-center">{`${station.zipcode}`}</h6></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-success btn-block rounded-0" type="button" onClick={ () => handleStationEdit(station) } >Editar</button>
                            <button className="btn btn-danger btn-block rounded-0" type="button" onClick={ () => handleStationDelete(station.id) } >Borrar</button>
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
    const searchStation = name => setDataReceived(name)

    const [ searchBy, setSearchBy ] = useState('')
    const handleSearchBy = critery => setSearchBy(critery)

    const dispatch = useDispatch()
    const stations = useSelector( state => state.stations.stations, shallowEqual)
    const handleStationsFetch = dispatch => fetchStations(dispatch)

    if (!stations) handleStationsFetch(dispatch)

    const listByCritery = critery => {
        switch (critery) {
            case 'name':
                return [...stations].filter(s => s.name.toLowerCase().includes(dataReceived.toLowerCase()))
            case 'place': {
                const place = dataReceived.toLowerCase().split(',')
                const placeTrimed = place.map(p => p.trim())
                
                return placeTrimed.length >=2 ? [...stations].filter(s => s.region.toLowerCase().includes(placeTrimed[0]) && s.city.toLowerCase().includes(placeTrimed[1]))
                    : [...stations].filter(s => s.region.toLowerCase().includes(placeTrimed[0]) || s.city.toLowerCase().includes(placeTrimed[0]))
            }
            case 'zipcode':
                return [...stations].filter(s => s.zipcode.toLowerCase().includes(dataReceived.toLowerCase()))
            default:
                return stations;
        }
    }

    return (
        <div className="container mt-3 mb-3">
            <div className="d-flex justify-content-around mt-3 mb-3">
                <div className="input-group flex-nowrap w-50">
                    <select className="custom-select" onChange={ e => handleSearchBy(e.target.value) }>
                        <option defaultValue>Buscar por</option>
                        <option value="name">Nombre</option>
                        <option value="place">Lugar</option>
                        <option value="zipcode">Codigo postal</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Buscar..." onChange={ e => searchStation(e.target.value) }/>
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
                <PlansReport stations={ stations }/>
            </div>
            <div className="container mt-3 mb-3">
                <StationsList 
                    stations={ 
                        dataReceived
                            ? listByCritery(searchBy)
                            : stations                        
                    }
                />
            </div>
        </div>
    )
}

function PlansReport ({stations}) {

    const table = stations ? 
            (<table className="table" id="table-to-xls" hidden >
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Identificator</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha de creación</th>
                    <th scope="col">Latitud</th>
                    <th scope="col">Longitud</th>
                    <th scope="col">País</th>
                    <th scope="col">Region</th>
                    <th scope="col">Ciudad</th>
                    <th scope="col">Codigo postal</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map((station, counter) => (
                        <tr key={counter}>
                        <th scope="row">{`${counter+1}`}</th>
                        <td>{`${station.id}`}</td>
                        <td>{`${station.name}`}</td>
                        <td>{`${station.created_at}`}</td>
                        <td>{station.fail ? `Rota` : `Perfecta`}</td>
                        <td>{`${station.lat}`}</td>
                        <td>{`${station.lon}`}</td>
                        <td>{`${station.country}`}</td>
                        <td>{`${station.region}`}</td>
                        <td>{`${station.city}`}</td>
                        <td>{`${station.zipcode}`}</td>
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

