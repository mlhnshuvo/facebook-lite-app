import React from 'react'
import NavBar from '../components/NavBar'
import Alert from '../components/Alert'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import ActiveAccount from '../pages/ActiveAccount'
import MatchEmail from '../pages/MatchEmail'
import Resetpass from '../pages/Resetpass'
import Profile from '../pages/Profile'
import SinglePost from '../pages/SinglePost'
import Page404 from '../pages/Page404'
import ProfilePicShow from '../pages/ProfilePicShow'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoute from '../components/PrivateRoute';

export default function router() {
    return (
        <Router>
            <NavBar />
            <Alert />
            <Switch>
                <Route exact path="/">
                    <Home homeStyle="homeStyle" />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/post/:id">
                    <SinglePost />
                </Route>
                <PrivateRoute exact path="/:username">
                    <Profile homeStyleProfile="homeStyleProfile" />
                </PrivateRoute>
                <Route exact path="/active/:token">
                    <ActiveAccount />
                </Route>
                <Route exact path="/forgotpass">
                    <MatchEmail />
                </Route>
                <Route exact path="/changepass/:token">
                    <Resetpass />
                </Route>
                <Route exact path="/profilepic/:name">
                    <ProfilePicShow />
                </Route>
                <Page404 />
            </Switch>
        </Router>
    )
}
