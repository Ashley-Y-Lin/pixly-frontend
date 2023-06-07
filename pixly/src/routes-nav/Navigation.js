import React from "react";
import { Link, NavLink } from "react-router-dom";

/** Navigation bar for site. Shows up on every page.
 *
 * App -> Navigation
 */

function Navigation() {
  return (
    <nav className="Navigation navbar navbar-expand-md">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Pix.ly
        </Link>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item me-4">
            <NavLink className="nav-link" to="/photos">
              All Photos
            </NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink className="nav-link" to="/add">
              Add Photo
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
