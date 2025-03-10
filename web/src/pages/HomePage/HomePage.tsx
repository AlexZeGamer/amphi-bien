import { useEffect } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import './HomePage.css'

const HomePage = () => {
  useEffect(() => {
    // Apply random tilts to paper sections on page load
    const papers = document.querySelectorAll('.paper-section')
    papers.forEach((paper) => {
      const randomTilt = (Math.random() - 0.5) * 3 // Random value between -1.5 and 1.5 degrees
      paper.setAttribute(
        'style',
        `transform: rotate(${randomTilt}deg); transform-origin: center`
      )
    })

    // Function to handle random button tilts on hover
    const handleButtonHover = (event) => {
      const randomTilt = (Math.random() - 0.5) * 3 // Random value between -1.5 and 1.5 degrees
      const randomScale = 1 + Math.random() * 0.04 // Random value between 1.00 and 1.04
      event.target.style.transform = `rotate(${randomTilt}deg) scale(${randomScale})`
    }

    // Function to reset button style on mouse leave
    const handleButtonLeave = (event) => {
      event.target.style.transform = ''
    }

    // Add event listeners to buttons
    const buttons = document.querySelectorAll('.handwritten-button')
    buttons.forEach((button) => {
      button.addEventListener('mouseenter', handleButtonHover)
      button.addEventListener('mouseleave', handleButtonLeave)
    })

    // Cleanup event listeners
    return () => {
      buttons.forEach((button) => {
        button.removeEventListener('mouseenter', handleButtonHover)
        button.removeEventListener('mouseleave', handleButtonLeave)
      })
    }
  }, [])

  return (
    <>
      <MetaTags
        title="Home"
        description="Welcome to Amphi-bien, find the perfect amphitheater for your studies!"
      />
      <div className="landing-container">
        {/* Section 1: Welcome Section */}
        <section className="paper-section a4-paper">
          <div className="notebook-paper">
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
                      <li>
                        Trouvez les amphithéâtres les plus proches de vous
                      </li>
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
        </section>

        {/* Section 2: Features Section */}
        <section className="paper-section a4-paper">
          <div className="notebook-paper">
            <div className="page-header">
              <h1 className="display-5 position-relative mb-4 text-center">
                Fonctionnalités
                <svg
                  className="underline-sketch"
                  viewBox="0 0 200 20"
                  width="200"
                  height="20"
                >
                  <path
                    d="M10,10 Q50,20 100,10 T190,10"
                    fill="none"
                    stroke="#333"
                    strokeWidth="2"
                  />
                </svg>
              </h1>
            </div>

            <div className="content-section mt-4">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="bi bi-geo-alt"></i>
                    </div>
                    <h3>Localisation</h3>
                    <p className="feature-description">
                      Trouvez les amphithéâtres les plus proches grâce à la
                      géolocalisation.
                    </p>
                    <div className="sketch-decoration"></div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="bi bi-star"></i>
                    </div>
                    <h3>Évaluations</h3>
                    <p className="feature-description">
                      Consultez et partagez des avis sur les amphithéâtres.
                    </p>
                    <div className="sketch-decoration"></div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      <i className="bi bi-info-circle"></i>
                    </div>
                    <h3>Informations</h3>
                    <p className="feature-description">
                      Toutes les caractéristiques importantes en un coup d'œil.
                    </p>
                    <span className="handwritten-annotation">
                      Super utile !
                    </span>
                    <div className="sketch-decoration"></div>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center">
                <Link
                  to={routes.nearby()}
                  className="btn btn-success btn-lg handwritten-button"
                >
                  Explorer les fonctionnalités
                </Link>
              </div>
            </div>

            <div className="page-number">
              <span>2</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
