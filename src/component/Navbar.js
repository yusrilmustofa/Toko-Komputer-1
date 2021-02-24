import React, { Component } from "react";
import { Link } from 'react-router-dom'
import Media from './Media'
class NavBar extends React.Component {
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        window.location = "/login"
    }
    render() {
        return (
            <div className="navbar navbar-expand-lg bg-dark navbar-dark">
                <a className="navbar-brand" href="/">
                    Yusril Computer Store
                </a>
                {/* Show and Hide Menu */}
                <button className="navbar-toggler" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Menu */}
                <div className="navbar-collapse collapse" id="menu">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/product" className="nav-link">
                                Product Kami
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customer" className="nav-link">
                                Customers
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transaction" className="nav-link">
                                Transaction
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" onClick={() => this.Logout()}>
                                Logout
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default NavBar;