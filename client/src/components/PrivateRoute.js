import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from "react-router-dom";


function PrivateRoute({ children, ...rest }) {
    const store = useSelector((state) => state.userReducer)
    return (
        <Route
            {...rest}
            render={({ location }) => (
                store.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            )
            }
        />
    )
}

export default PrivateRoute