import { ECommerce, Interfaces } from 'doodle-icons'

import { Link, routes } from '@redwoodjs/router'

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="notebook-navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to={routes.home()} className="navbar-brand">
              <img
                src="/icons/amphibien-slug-icon.svg"
                alt="Amphi-Bien"
                className="navbar-logo"
              />
              <h1 className="navbar-title">Amphi-Bien</h1>
            </Link>

            <div className="navbar-links">
              <Link
                to={routes.amphis()}
                className="navbar-link d-none d-md-block"
              >
                Amphis
              </Link>
              <Link
                to={routes.universities()}
                className="navbar-link d-none d-md-block"
              >
                Universités
              </Link>
              <Link
                to={routes.nearby()}
                className="navbar-icon"
                title="À proximité"
              >
                <ECommerce.Location className="h-6 w-6" />
              </Link>
              <span className="navbar-icon">
                <Interfaces.User className="h-6 w-6" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
