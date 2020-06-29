// React
import React, { Fragment } from 'react';

// Components
import Header from './Header';

function About() {
    return (
        <Fragment>
            <Header/>
            <div className="container mt-5 mb-5">
                <div className="flex-row justify-content-center mt-5">
                    <h3 className="font-weight-bolder">¿Quienes somos?</h3>
                    <p className="font-weight-light">
                        WeatherSt es una pequeña empresa de TI, establecida en 2019 por un grupo de estudiantes y profesionales. 
                        Nuestras oficinas centrales están ubicadas en UADER FCyT, tenemos centro de soporte y
                        nuestro equipo de desarrollo en Concepción del Uruguay (AR).
                    </p>
                    <br/>
                    <h3 className="font-weight-bolder">¿Que hacemos?</h3>
                    <p className="font-weight-light">
                        Hacemos API muy simples y rápidas para trabajar con nuestra vasta base de datos de datos meteorológicos.
                        Tenemos 1 producto: API para datos meteorológicos e historial de datos.
                    </p>
                    <br/>
                    <h3 className="font-weight-bolder">¿Quiénes son nuestros clientes?</h3>
                    <p className="font-weight-light">
                        API simples, rápidas y totalmente convenientes para desarrolladores
                        Clima actual, clima histórico y pronóstico
                        Los datos están disponibles para cualquier geolocalización.
                        Las fuentes de datos son OpenWeather y datos sin procesar de las estaciones meteorológicas.

                    </p>
                    <br/>
                    <h3 className="font-weight-bolder">Nuestros planes</h3>
                    <p className="font-weight-light">
                        API simples, rápidas y totalmente convenientes para desarrolladores
                        Clima actual, clima histórico y pronóstico
                        Los datos están disponibles para geolocalizaciónes en las que tenemos estaciones instaladas.
                        Las fuentes de datos son datos sin procesar de las estaciones meteorológicas.
                    </p>
                    <br/>
                    <h3 className="font-weight-bolder">Información del contacto</h3>
                    <p className="font-weight-light">
                            Sitio oficial de nuestra empresa: https://weatherst.org
                            Por favor contáctenos info@weatherapi.org
                            UADER FCyT.
                            2 ° piso
                            385 calle 25 de mayo,
                            Punto de la ciudad,
                            Entre Ríos
                            Concepción de Uruguay,
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default About;
