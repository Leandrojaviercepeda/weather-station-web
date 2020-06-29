// React
import React, { useState } from 'react';

// Redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { 
    fetchMeasurementsByStationId, 
    fetchMeasurementsByPlace, 
    fetchMeasurementsByZipcode,
    resetMeasurementsCallStatus,
    removeMeasurements
} from '../redux/actions/measurementsActions';
import { FAILURE } from '../redux/constants';

// Components
import Header from './Header'

import * as moment from 'moment';

function Home() {

    return (
        <div>
            <Header/>
            <div className="container mt-5 mb-5">
                <div className="flex-row justify-content-center mt-5">
                    <h1 className="font-weight-bolder">Bienvenido a WeatherSt</h1>
                    <p className="font-weight-light">
                        API meteorológica para desarrolladores simple y rápida.
                        Obtenga datos correspondientes a variables climaticas
                        de las distintas ciudades en las que se ubican nuestras estaciones meteorologicas.
                    </p>
                </div>
                <hr/>
                <div className="flex-row justify-content-center mt-5">
                    <p className="font-weight-light">
                        El buscador es muy flexible. 
                        Como funciona:
                        Para hacerlo más preciso, seleccione un criterio por el cual desea buscar.
                        En caso de querer buscar por "Lugar" coloque el nombre de la region, una coma y el nombre de la ciudad. 
                        Obtendrá las ultimas mediciones relevadas por la estacion correcpondiente al lugar especificado.
                    |   El orden es importante. Ejemplo: Entre Ríos, Gualeguaychú
                    </p>
                </div>
                <hr/>
                <SearchBar/>
            </div>
        </div>
    )
}

export default Home

function SearchBar () {

    const [ dataReceived, setDataReceived ] = useState('')
    const searchMeasurement = data => setDataReceived(data)

    const [ searchBy, setSearchBy ] = useState('')
    const handleSearchBy = critery => setSearchBy(critery)

    const dispatch = useDispatch()
    const measurements = useSelector( state => state.measurements.measurements, shallowEqual)
    const apiCallStatus = useSelector( state => state.measurements.callApi.type, shallowEqual)
    const apiCallMessage = useSelector( state => state.measurements.callApi.message, shallowEqual)

    const handleRemoveMeasurement = () => dispatch(removeMeasurements())

    const searchByCritery = critery => {
        switch (critery) {
            case 'stationId':
                return handleRemoveMeasurement() && resetMeasurementsCallStatus() && fetchMeasurementsByStationId(dispatch, dataReceived.toLowerCase())
            case 'place': {
                const place = dataReceived.toLowerCase().split(',')
                const placeTrimed = place.map(p => p.trim())
                
                return placeTrimed.length === 2 
                    ? handleRemoveMeasurement() && resetMeasurementsCallStatus() && fetchMeasurementsByPlace(dispatch, placeTrimed[0], placeTrimed[1])
                    : ''
            }
            case 'zipcode':
                return handleRemoveMeasurement() && resetMeasurementsCallStatus() && fetchMeasurementsByZipcode(dispatch, dataReceived.toLowerCase())
            default:
                return measurements;
        }
    }

    return (
        <div className="container mt-3 mb-3">
            <div className="d-flex justify-content-center mt-3 mb-3">
                <div className="input-group flex-nowrap w-75">
                    <select className="custom-select" onChange={ e => handleSearchBy(e.target.value) }>
                        <option defaultValue>Buscar por</option>
                        <option value="stationId">Identificador de Estacion</option>
                        <option value="place">Lugar</option>
                        <option value="zipcode">Codigo de Area</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Buscar..." onChange={ e => searchMeasurement(e.target.value) }/>
                    <button className="input-group-text" onClick={ () => searchByCritery(searchBy) }><i className="fas fa-search"></i></button>
                </div>
            </div>
            <div className="container mt-3 mb-3">
                {apiCallStatus === FAILURE 
                    ? <div className="alert alert-danger text-center p2 mt-3 mb-3">{`${apiCallMessage}`}</div>
                    : null
                }
                <div className="d-flex justify-content-center mt-3 mb-3">
                    {measurements 
                        ? <Measurement measurement={ measurements }/>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

function Measurement({measurement}) {

    return (
        <div className="card text-light bg-dark w-50">
            <div className="card-header text-center">Medicion</div>
            <div className="card-body text-center">
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-success"></i><span className="font-weight-normal text-center"> Fecha de relevo de medicion: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${moment(new Date(measurement.date_measurement)).format('DD/MM/YYYY - hh:mm')}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-primary"></i><span className="font-weight-normal text-center"> Temperatura °C: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.temperature}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-secondary"></i><span className="font-weight-normal text-center"> Humedad: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.humidity}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-success"></i><span className="font-weight-normal text-center"> Presion: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.pressure}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-danger"></i><span className="font-weight-normal text-center"> Radiacion UV: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.uv_radiation}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-warning"></i><span className="font-weight-normal text-center"> Velocidad del viento: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.wind_vel}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-info"></i><span className="font-weight-normal text-center"> Direccion del Viento: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.wind_dir}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-light"></i><span className="font-weight-normal text-center"> MM de lluvia: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.rain_mm}`}</span></p>
                </ul>
                <hr/>
                <ul className="d-flex justify-content-around">
                    <p className="card-text"><i className="far fa-circle text-warning"></i><span className="font-weight-normal text-center"> Intesidad de lluvia: </span></p>
                    <p className="card-text"><span className="badge badge-light font-weight-bold text-center">{`${measurement.rain_intensity}`}</span></p>
                </ul>                
            </div>
        </div>
    )
}
