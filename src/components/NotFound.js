import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div 
            className="d-flex justify-content-center container w-50"
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
            }}
        >
			<div className='card text-white bg-dark mb-3' style={{width: "18rem"}}>
                <h1 className="card-header text-center">4 <i className="fas fa-cloud"></i> 4</h1>
                <div className="card-body">
                    <p className="card-text text-center">Ooops! pagina no encontrada!</p>
                </div>
                <Link to='/' className='card-header text-center'>
                    Volver al home
                </Link>
			</div>
		</div>
    )
}

export default NotFound;
