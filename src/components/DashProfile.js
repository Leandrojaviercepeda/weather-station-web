import React, { Fragment } from 'react';

// Components
import DashHeader from './DashHeader';

// Redux
import { useSelector, shallowEqual } from 'react-redux';


function DashProfile() {

    const currentUser = useSelector( state => state.users.currentUser, shallowEqual )

    return (
        <Fragment>
            <DashHeader/>
            { currentUser ? 
                (
                <div className="flex-row d-flex justify-content-around align-items-center mt-5 mb-5"> 
                    <div className="card border-dark mb3" style={{width: "18rem"}}>
                        <img src={`${currentUser.photoURL}`} className="card-img-top img-thumbnail" alt="profile"/>
                        <h6 className="card-header text-center"><span className="badge badge-light badge-info"> {`${currentUser.displayName}`} </span></h6>
                        <div className="card-body text-dark text-center">
                            <h6 className="font-weight-bold"><span className="badge badge-light badge-info"> {`${currentUser.email}`} </span></h6>
                        </div>
                    </div>
                </div>
                ) :
                (<div className="d-flex justify-content-around align-items-center mt-5 mb-5" 
                    style={{ overflow: "hidden", position: "absolute", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
            }
        </Fragment>
    )
}

export default DashProfile;
