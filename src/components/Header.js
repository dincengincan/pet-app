import React from 'react';
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container">
                    <a className="navbar-brand" href="#">Pets</a>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Homepage</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/favoriler">Favorites</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
