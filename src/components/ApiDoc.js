// React
import React, { Fragment, useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchStations } from '../redux/actions/stationsActions';
import { WERATHERST_CLIENT_API_URL, WERATHERST_API_URL } from '../redux/constants';

// Components
import Header from './Header';

import axios from 'axios';
import * as moment from 'moment';

function ApiDoc() {

    const [station, setStation] = useState(null)
    const [weatherData, setWeatherData] = useState('')
    const [weatherDataBetweenDates, setWeatherBetweenDates] = useState('')
    const [stationData, setStationData] = useState('')
    const [stationDataBetweenDates, setStationDataBetweenDates] = useState('')

    const dispatch = useDispatch()
    const stations = useSelector( state => state.stations.stations, shallowEqual )
    const handleStationsFetch = () => fetchStations(dispatch)

    const spinner = <div className="spinner-grow" role="status"></div>
    
    const getWeatherDataByPlace = async (region, city) => await axios.get(`${WERATHERST_API_URL}/weather/measurements/onLocation?region=${region}&city=${city}`)
    const getWeatherDataBetweenDates = async (stationId, startdate, enddate) => await axios.get(`${WERATHERST_API_URL}/weather/measurements/betweenDates?id=${stationId}&startdate=${startdate}&enddate=${enddate}`)
    const getStationDataByPlace = async (region, city) => await axios.get(`${WERATHERST_API_URL}/stations/locatedAt?region=${region}&city=${city}`)
    const getStationDataBetweenDates = async (startdate, enddate, limit) => await axios.get(`${WERATHERST_API_URL}/stations/createdAt?startdate=${startdate}&enddate=${enddate}&limit=${limit}`)
    
    
    if (!stations) handleStationsFetch()

    useEffect(() => {
        if (!station && stations) 
            setStation(stations.find(station => station.name === 'Base Gualeguaychu'))

    }, [station, stations])
    
    useEffect(() => {        
        if (station)
            if (weatherData === '') 
                getWeatherDataByPlace(station.region, station.city)
                    .then(res => setWeatherData(JSON.stringify(res.data, null, 2)))

    }, [weatherData, station])

    useEffect(() => {        
        if (station)
            if (weatherDataBetweenDates === '') 
                getWeatherDataBetweenDates(
                    station.id, 
                    moment(new Date().getTimezoneOffset()).format('YYYY/MM/DD HH:mm').toString(), 
                    moment(new Date().getTime()).format('YYYY/MM/DD HH:mm').toString())
                        .then(res => setWeatherBetweenDates(JSON.stringify(res.data, null, 2)))

    }, [weatherDataBetweenDates, station])

    useEffect(() => {        
        if (station)
            if (stationData === '') 
                getStationDataByPlace(station.region, station.city)
                    .then(res => setStationData(JSON.stringify(res.data, null, 2)))

    }, [stationData, station])

    useEffect(() => {        
        if (station)
            if (stationDataBetweenDates === '') 
                getStationDataBetweenDates(
                    moment(new Date().getTimezoneOffset()).format('YYYY/MM/DD HH:mm').toString(), 
                    moment(new Date().getTime()).format('YYYY/MM/DD HH:mm').toString(), 
                    10)
                        .then(res => setStationDataBetweenDates(JSON.stringify(res.data, null, 2)))

    }, [stationDataBetweenDates, station])

    return (
        <Fragment>
            <Header/>
            <h5 className="font-weight-bolder mt-3 mb-3 ml-3">WeatherSt API Doc</h5>
            <hr/>
            <div className="container">
                <div className="flex-row justify-content-center">
                    <h6 className="font-weight-bolder">Datos meteorológicos actuales</h6>
                    <hr/>
                    <p className="font-weight-light">
                        Nos complace anunciar nuestra primera versión de API para acceder a nuestras estaciones meteorológicas: Weather Stations API 1.0 (beta).
                    </p>
                    <p className="font-weight-light">
                        La característica principal es que los usuarios tienen acceso flexible a nuestras estaciones y se les permite obtener datos relacionados con ellas. La API hace que este proceso sea fácil y conveniente. En esta versión, la cuenta del usuario puede acceder a tantas estaciones como sea necesario.
                    </p>
                    <p className="font-weight-light">
                        Estamos lanzando la nueva versión de API en dos etapas. Por ahora, tiene la posibilidad de acceder a los datos de nuestras estaciones meteorológicas utilizando los métodos proporcionados por nuestra API 1.0. En un futuro cercano, estamos planeando proporcionar métodos adicionales que le permitirán recopilar datos de sus estaciones durante cualquier período de tiempo, administrar y configurar sus propias estaciones. También agregaremos soporte para obtener la información agregada con varios intervalos (minuto / hora / día). Será posible recibir un historial agregado de mediciones de su estación meteorológica durante varios años a través de una sola consulta.
                    </p>
                    <p className="font-weight-light">
                        Llame a los datos meteorológicos actuales para una ubicación ¡Recuerde que todos los ejemplos de llamadas API que se enumeran en esta página son solo ejemplos y no tienen ninguna conexión con el servicio API real!
                    </p>
                    <br/>

                    <h6 className="font-weight-bolder">Por lugar</h6>
                    <p className="font-weight-light">
                        Puede llamar por nombre de region y nombre de ciudad. API responde con el resultado que coincide la búsqueda.
                        <br/>
                        API call: {` ${WERATHERST_CLIENT_API_URL}/weather/measurements/onLocation?region={region}&city={city}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        region: nombre de la region (Provincia, Estado).
                        <br/>
                        city: nombre de la ciudad.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/weather/measurements/onLocation?region=Entre Rios&city=Gualeguaychú&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {weatherData !== ''
                                        ? `${weatherData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por coordenadas geográficas</h6>
                    <p className="font-weight-light">
                        API call: {` ${WERATHERST_CLIENT_API_URL}/weathermeasurements/onLocation?latitude={lat}&longitude={lon}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        latitude: latitud correspondiente a la estacion.
                        <br/>
                        longitude: longitud correspondiente a la estacion.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/weather/measurements/onLocation?latitude=-32.4833&longitude=-58.2283&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {weatherData !== ''
                                        ? `${weatherData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por código postal</h6>
                    <p className="font-weight-light">
                        API call: {` ${WERATHERST_CLIENT_API_URL}/weathermeasurements/onLocation?zipcode={zipcode}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        zipcode: codigo de area correspondiente a la localizacion requerida.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/weather/measurements/onLocation?zipcode=3260&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {weatherData !== ''
                                        ? `${weatherData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por identificador de estacion</h6>
                    <p className="font-weight-light">
                        API call: {` ${WERATHERST_CLIENT_API_URL}/weathermeasurements/relevatedBy?idstation={identificador de estacion}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        idstation: identificador de estacion meteorologica.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/weather/measurements/relevatedBy?idstation=cd8b0a5d19a9&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {weatherData !== ''
                                        ? `${weatherData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por coordenadas geográficas y entre fechas (Acceso a datos historicos)</h6>
                    <p className="font-weight-light">
                        [GET]
                        Este método se utiliza para recibir mediciones agregadas de la estación. En total se admiten 3 tipos de unidades: minuto, hora y día. Por lo tanto, es posible consultar el historial de mediciones desde la estación para cualquier intervalo de tiempo con la especificación necesaria.
                        Por el momento, la agregación utiliza la lista fija de parámetros de la colección de mediciones: presión atmosférica, temperatura, velocidad del viento, dirección del viento, humedad, número de milímetros de lluvia, radiación ultravioleta, identificador de la estacion que relevo los datos.
                        Los siguientes parámetros son obligatorios en la solicitud: latitud, longitud, un rango de mediciones y apikey.
                        API call: {` ${WERATHERST_CLIENT_API_URL}/weather/measurements/onLocation?latitude={lat}&longitude={lon}betweenDates?startdate={start date}&enddate={end date}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        latitude: latitud correspondiente a la estacion.
                        <br/>
                        longitude: longitud correspondiente a la estacion.
                        <br/>
                        startdate: fecha de inicio.
                        <br/>
                        enddate: fecha de fin.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/weather/measurements/betweenDates?id={cd8b0a5d19a9}&startdate=2019-01-01 00:00:00&enddate=2019-12-31 23:59:59&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {weatherDataBetweenDates !== ''
                                        ? `${weatherDataBetweenDates}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                </div>
            </div>
            <div className="container">
                <div className="flex-row justify-content-center">
                    <h6 className="font-weight-bolder">Datos de estaciones</h6>
                    <hr/>
                    <h6 className="font-weight-bolder">Por lugar</h6>
                    <p className="font-weight-light">
                        Puede llamar por nombre de region y nombre de ciudad. API responde con el resultado que coincide la búsqueda.
                        <br/>
                        API call: {` ${WERATHERST_CLIENT_API_URL}/stations/locatedAt?region={region}&city={city}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        region: nombre de la region (Provincia, Estado).
                        <br/>
                        city: nombre de la ciudad.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/stations/locatedAt?region=Entre Rios&city=Gualeguaychú&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {stationData !== ''
                                        ? `${stationData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por coordenadas geográficas</h6>
                    <p className="font-weight-light">
                        API call: {` ${WERATHERST_CLIENT_API_URL}/stations/locatedAt?latitude={lat}&longitude={lon}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        latitude: latitud correspondiente a la estacion.
                        <br/>
                        longitude: longitud correspondiente a la estacion.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/stations/locatedAt?latitude=-32.4833&longitude=-58.2283&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {stationData !== ''
                                        ? `${stationData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por código postal</h6>
                    <p className="font-weight-light">
                        API call: {` ${WERATHERST_CLIENT_API_URL}/stations/locatedAt?zipcode={zipcode}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        zipcode: codigo de area correspondiente a la localizacion requerida.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/stations/locatedAt?zipcode=3260&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {stationData !== ''
                                        ? `${stationData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por identificador de estacion</h6>
                    <p className="font-weight-light">
                        API call: {` ${WERATHERST_CLIENT_API_URL}/stations/?id={identificador de estacion}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        idstation: identificador de estacion meteorologica.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/stations/?id=cd8b0a5d19a9&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {stationData !== ''
                                        ? `${stationData}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>

                    <h6 className="font-weight-bolder">Por fecha de creacion</h6>
                    <p className="font-weight-light">
                        [GET]
                        Este método se utiliza para recibir estaciones. En total se admiten 3 tipos de unidades: minuto, hora y día. Por lo tanto, es posible consultar el historial de mediciones desde la estación para cualquier intervalo de tiempo con la especificación necesaria.
                        Por el momento, la agregación utiliza la lista fija de parámetros de la colección de estaciones: identificador de la estacion, nombre, falla, fecha de creacion, latitud, longitud, pais, region, ciudad, codigo de area.
                        Los siguientes parámetros son obligatorios en la solicitud: un rango de fecha de creacion de estacion y apikey.
                        API call: {` ${WERATHERST_CLIENT_API_URL}/stations/createdAt?startdate={start date}&enddate={end date}&limit={cantidad}&apikey={your apikey}`}
                    </p>
                    <p className="font-weight-light">
                        Parámetros:
                        <br/>
                        startdate: fecha de inicio.
                        <br/>
                        enddate: fecha de fin.
                        <br/>
                        limit: cantidad de estaciones que desea recibir.
                        <br/>
                        Ejemplos de llamadas a la API: {` ${WERATHERST_CLIENT_API_URL}/stations/createdAt?startdate=2020-01-01 00:00:00&enddate=2020-12-31 23:59:59&limit=10&apikey={your apikey}`}
                    </p>
                    <div className="card border-dark mb-3 w-75">
                        <div className="card-header">Ejemplo de Respuesta API</div>
                        <div className="card-body text-dark">
                            <pre>
                                <code>
                                    {stationDataBetweenDates !== ''
                                        ? `${stationDataBetweenDates}`
                                        : spinner
                                    }
                                </code>
                            </pre>
                        </div>
                    </div>
                    <br/>
                    <h6 className="font-weight-bolder">Parámetros meteorológicos en respuesta API</h6>
                    <p className="font-weight-light">
                        Si no ve algunos de los parámetros en su respuesta API, significa que estos fenómenos climáticos simplemente no ocurren durante el tiempo de medición para la ciudad o ubicación elegida. Solo los datos realmente medidos o calculados se muestran en la respuesta API.
                    </p>
                    <br/>
                </div>
            </div>
        </Fragment>
    )
}

export default ApiDoc;
