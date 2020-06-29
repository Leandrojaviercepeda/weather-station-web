import React from 'react';

function Footer() {
    return (
        <footer className="page-footer font-small unique-color-dark" style={{bottom: 0, width: "100%"}}>
            <div className="bg-dark">
                <div className="container">
                    <div className="row py-4 d-flex align-items-center">
                        <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
                            <h6 className="mb-0 text-white">¡Conéctate con nosotras en las redes sociales!</h6>
                        </div>
                        <div className="col-md-6 col-lg-7 text-center text-md-right">
                            <a className="fb-ic text-white" href="https://www.facebook.com/"><i className="fab fa-facebook-f white-text mr-4"> </i></a>
                            <a className="tw-ic text-white" href="https://twitter.com/"><i className="fab fa-twitter white-text mr-4"> </i></a>
                            <a className="gplus-ic text-white" href="https://aboutme.google.com/"><i className="fab fa-google-plus-g white-text mr-4"> </i></a>
                            <a className="li-ic text-white" href="https://www.linkedin.com/"><i className="fab fa-linkedin-in white-text mr-4"> </i></a>
                            <a className="ins-ic text-white" href="https://www.instagram.com/"><i className="fab fa-instagram white-text"> </i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center text-md-left mt-5">
                <div className="row mt-3">
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase font-weight-bold">WeatherSt</h6>
                        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "100px"}}></hr>
                        <p>
                            Somos una pequeña empresa de TI, establecida en 2019 por un grupo de estudiantes y profesionales. Nuestras oficinas centrales están ubicadas en UADER FCyT Concepción del Uruguay (AR).
                        </p>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                        <h6 className="text-uppercase font-weight-bold">Links de utilidad</h6>
                        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "100px"}}></hr>
                        <p><a href="api">API</a></p>
                        <p><a href="/api-doc">API Doc</a></p>
                        <p><a href="/about">Acerca de nosotros</a></p>
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase font-weight-bold">Contacto</h6>
                        <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width: "100px"}}></hr>
                        <p><i className="fas fa-home mr-3"></i> 25 de Mayo 385, Concepción del Uruguay, Entre Ríos</p>
                        <p><i className="fas fa-envelope mr-3"></i> weatherstorg@gmail.com</p>
                        <p><i className="fas fa-phone mr-3"></i> + 44 345 678 903</p>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center text-white py-4 bg-dark">© 2020 Copyright:
                <a href="/home"> WeatherSt </a>
            </div>
        </footer>
    )
}

export default Footer;
