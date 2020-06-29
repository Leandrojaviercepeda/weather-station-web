// React
import React, { useState } from 'react';

// Redux
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchStations } from '../redux/actions/stationsActions';

// APIs
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

import * as moment from 'moment';
import { GoogleMaps } from '../credentials';


function Map () {

    const [showInfoIndex, setShowInfoIndex] = useState(null)

    const handleToggleOpen = index => setShowInfoIndex(index)
    const handleToggleClose = () => setShowInfoIndex(null)

    const dispatch = useDispatch()
    const stations = useSelector( state => state.stations.stations, shallowEqual )
    const handleStationsFetch = dispatch => fetchStations(dispatch)

    if (!stations) handleStationsFetch(dispatch)

    const MapWithMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={4}
            defaultCenter={{ lat: -37.0560032, lng: -81.6327078 }}
        >
            {stations.map((station, counter) => (
                <Marker
                    position={{ lat: station.lat, lng: station.lon }}
                    key={counter}
                    onClick={ () => handleToggleOpen(counter) }
                >
                { showInfoIndex === counter
                    ?
                    <InfoWindow 
                        position={{ lat: station.lat, lng: station.lon }} 
                        key={counter}
                        onCloseClick={ () => handleToggleClose() }
                    >
                        <div className="card border-dark w-15" key={`${counter}`}>
                            <div className="card-header text-center">{`${station.name.toUpperCase()}`}</div>
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
                        </div>
                    </InfoWindow>
                    : ''
                }
                </Marker>
            ))}
        </GoogleMap>
    ));

    return (
        <MapWithMarker
            googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${GoogleMaps}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div className="border border-dark" style={{ height: `700px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Map;

