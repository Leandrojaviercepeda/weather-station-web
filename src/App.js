// React
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { ADMINISTRATOR } from '../src/redux/constants';

// Style
import './App.css';

// Initialize Firebase
import './firebase/init-firebase'

// Components   
import Home from './components/Home';
import Stations from './components/Stations';
import About from './components/About';
import Api from './components/Api';
import ApiDoc from './components/ApiDoc';
import Contact from './components/Contact';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import DashProfile from './components/DashProfile';
import DashStationsManagement from './components/DashStationsManagement';
import DashClientsManagement from './components/DashClientsManagement';
import DashPlansManagement from './components/DashPlansManagement';
import NotFound from './components/NotFound';

function App() {

    const typeOfUser = useSelector( state => state.users.typeOfUser )

    

    return (
        <BrowserRouter>
            {/* Web routes for admins */}
            {/* Web routes for customers */}
            { typeOfUser === ADMINISTRATOR ? 
                (   
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Redirect to="/dashboard"/>)}
                        />
                        <Route exact path="/home" render={() => (
                            <Redirect to="/dashboard"/>)}
                        />
                        <Route exact path="/dashboard" 
                            render = { ()=> (
                            <Dashboard/>)}
                        />
                        <Route exact path="/profile/:id" 
                            render = { ()=> (
                            <DashProfile/>)}
                        />
                        <Route exact path="/management/stations"
                            render = { ()=> (
                            <DashStationsManagement/>)}
                        />
                        <Route exact path="/management/clients"
                            render = { ()=> (
                            <DashClientsManagement/>)}
                        />
                        <Route exact path="/management/plans"
                            render = { ()=> (
                            <DashPlansManagement/>)}
                        />
                        <Route component={NotFound} />
                    </Switch>
                ) :
                (
                    <Switch>
                        <Route exact path="/" render={() => (
                            <Redirect to="/home"/>)}
                        />
                        <Route exact path="/home" 
                            render = { ()=> (
                            <Home/>)}
                        />
                        <Route exact path="/stations" 
                            render = { ()=> (
                            <Stations/>)}
                        />
                        <Route exact path="/about" 
                            render = { ()=> (
                            <About/>)}
                        />
                        <Route exact path="/api" 
                            render = { ()=> (
                            <Api/>)}
                        />
                        <Route exact path="/api-doc" 
                            render = { ()=> (
                            <ApiDoc/>)}
                        />
                        <Route exact path="/contact" 
                            render = { ()=> (
                            <Contact/>)}
                        />
                        <Route exact path="/sign-in" 
                            render = { ()=> (
                            <SignIn/>)}
                        />
                        <Route exact path="/user/:id" 
                            render = { ()=> (
                            <Profile/>)}
                        />
                        <Route exact path="/user/:id/checkout" 
                            render = { ()=> (
                            <Profile/>)}
                        />
                        <Route component={NotFound} />
                    </Switch>
                ) 
            }
        </BrowserRouter>
    );
}

export default App;
