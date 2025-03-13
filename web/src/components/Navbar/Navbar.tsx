import { ECommerce, Interfaces } from 'doodle-icons'

import { Link } from '@redwoodjs/router'

import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="notebook-navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              <img
                src="/logo/logo-small.svg"
                alt="AmphiBien"
                className="navbar-logo-small"
              />
              <img
                src="/logo/logo-large.svg"
                alt="AmphiBien"
                className="navbar-logo-large"
              />
            </Link>

            <div className="navbar-links">
              <Link to="/amphis" className="navbar-link d-none d-md-block">
                Amphis
              </Link>
              <Link
                to="/universities"
                className="navbar-link d-none d-md-block"
              >
                Universités
              </Link>
              <Link to="/nearby" className="navbar-icon" title="À proximité">
                <ECommerce.Location className="h-6 w-6" />
              </Link>
              <Link to="/login" className="navbar-icon" title="Connexion">
                <span className="navbar-icon">
                  <Interfaces.User className="h-6 w-6" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
