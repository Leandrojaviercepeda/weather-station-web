// React
import React, { Fragment } from 'react';

// Components
import DashHeader from './DashHeader';
import Map from './Map';


function Dashboard() {

    return (
        <Fragment>
            <DashHeader/>
            <div className="container mt-5 mb-5">
                <div className="flex-row justify-content-center mt-5">
                    <p className="font-weight-light">
                        En esta seccion podra encontrar nuestras estaciones geolocalizadas, consultar su respectiva informacion
                        para poder hacer uso de las mismas y obtener la informacion correcpondiente a los datos meteorologicos que
                        estas relevan.
                    </p>
                    <p className="font-weight-bolder">Mapa de estaciones de WeatherSt</p>
                </div>
                <hr/>
                <Map/>
            </div>
        </Fragment>
    )
}

export default Dashboard;