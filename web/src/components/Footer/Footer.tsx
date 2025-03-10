import { Link, routes } from '@redwoodjs/router'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="notebook-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-section">
              <h3 className="footer-title">Amphi-Bien</h3>
              <p className="handwritten-text">
                Une plateforme pour explorer et découvrir les meilleurs
                amphithéâtres des universités françaises.
              </p>
              <div className="footer-social">
                <a
                  href="https://github.com/AlexZeGamer/amphi-bien"
                  className="social-link"
                >
                  <i className="bi bi-github"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

            <div className="col-md-4 footer-section">
              <h3 className="footer-title">Liens utiles</h3>
              <ul className="footer-links">
                <li>
                  <Link to={routes.home()}>Accueil</Link>
                </li>
                <li>
                  <Link to={routes.nearby()}>À proximité</Link>
                </li>
                <li>
                  <Link to={routes.amphis()}>Tous les amphis</Link>
                </li>
                <li>
                  <Link to={routes.universities()}>Universités</Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4 footer-section">
              <h3 className="footer-title">Contact</h3>
              <ul className="footer-contact">
                <li>
                  <i className="bi bi-envelope"></i>
                  <span>contact@amphi-bien.fr</span>
                </li>
                <li>
                  <i className="bi bi-geo-alt"></i>
                  <span>Polytech Paris-Saclay</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="footer-bottom">
            <p className="copyright">
              © {new Date().getFullYear()} Amphi-Bien. Tous droits réservés.
            </p>
            <div className="footer-note">
              <span className="handwritten-text">
                Développé avec 💙 par des étudiants de Polytech
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
