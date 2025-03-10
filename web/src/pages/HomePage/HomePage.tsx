import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import './HomePage.css'

const HomePage = () => {
  return (
    <>
      <MetaTags
        title="Home"
        description="Welcome to Amphi-bien, find the perfect amphitheater for your studies!"
      />
      <div className="notebook-paper position-relative">
        {/* Header with title */}
        <div className="page-header">
          <h1 className="display-4 position-relative mb-4 text-center">
            Amphi-bien
            <svg
              className="red-circle"
              viewBox="0 0 100 100"
              width="200"
              height="200"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
            </svg>
          </h1>
          <p className="lead fst-italic mb-4 text-center">
            Trouvez l'amphithéâtre parfait pour vos études !
          </p>
        </div>

        {/* Main content */}
        <div className="content-section mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="note-section">
                <h2 className="position-relative">
                  Pourquoi Amphi-bien ?
                  <span className="crossed-text position-absolute">
                    Amphi-nul
                  </span>
                </h2>
                <ul className="handwritten-list">
                  <li>Trouvez les amphithéâtres les plus proches de vous</li>
                  <li>Consultez les avis d'autres étudiants</li>
                  <li>Découvrez les caractéristiques de chaque amphi</li>
                  <li className="text-decoration-line-through">
                    Cours ennuyeux
                  </li>
                  <li>Trouvez les meilleures places !</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="action-section">
                <h2>Commencer maintenant</h2>
                <div className="d-flex flex-column mt-4 gap-3">
                  <Link
                    to={routes.nearby()}
                    className="btn btn-primary btn-lg position-relative handwritten-button"
                  >
                    Amphis à proximité
                    <svg className="arrow-sketch" width="80" height="40">
                      <path
                        d="M5,20 Q30,5 60,25 T80,20"
                        stroke="black"
                        fill="transparent"
                        strokeWidth="2"
                      />
                      <path
                        d="M70,15 L80,20 L75,30"
                        stroke="black"
                        fill="transparent"
                        strokeWidth="2"
                      />
                    </svg>
                  </Link>
                  <Link
                    to={routes.amphis()}
                    className="btn btn-outline-secondary btn-lg handwritten-button"
                  >
                    Tous les amphis
                  </Link>
                  <Link
                    to={routes.universities()}
                    className="btn btn-outline-dark btn-lg handwritten-button"
                  >
                    Universités
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="note-footer mt-5">
          <p className="handwritten-note fst-italic">
            Note: Développé avec 💙 par des étudiants de Polytech.
            <span className="draft-mark position-absolute">DRAFT</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default HomePage
