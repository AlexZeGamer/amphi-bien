import { useEffect, useRef } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import './HomePage.css'

const HomePage = () => {
  const videoRef = useRef(null)

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
      <Metadata
        title="AmphiBien"
        description="Trouve l'amphi parfait pour tes études !"
      />
      <div className="landing-container">
        {/* Section 1: Title Page */}
        <section className="paper-section a4-paper title-page">
          <div className="notebook-paper">
            {/* Header with title */}
            <div className="page-header">
              <h1 className="display-1 position-relative title-main text-center">
                Amphi-Bien
                <span className="crossed-text red-handwritten-text position-absolute">
                  Amphi-nul
                </span>
              </h1>
              <p className="lead fst-italic subtitle mb-5 text-center">
                Trouve l&apos;amphi parfait pour tes études !
              </p>
            </div>

            {/* Hero video placeholder */}
            <div className="hero-video-container">
              <div className="video-wrapper">
                <video
                  ref={videoRef}
                  className="hero-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/landing-video.mp4" type="video/mp4" />
                  <div className="video-fallback">
                    <img
                      src="/videos/landing-video-thumbnail.jpg"
                      alt="AmphiBien"
                    />
                  </div>
                </video>
              </div>
            </div>

            {/* Primary Call to Action */}
            <div className="mt-5 text-center">
              <Link
                to={routes.nearby()}
                className="btn btn-primary btn-lg position-relative handwritten-button"
              >
                Trouve des amphis à proximité
              </Link>
            </div>

            <div className="page-number">
              <span>1</span>
            </div>
          </div>
        </section>

        {/* Section 2: About & Features */}
        <section className="paper-section a4-paper">
          <div className="notebook-paper">
            <div className="page-header">
              <h1 className="display-5 position-relative mb-4 text-center">
                Pourquoi c&apos;est{' '}
                <span className="text-decoration-line-through small">
                  Amphi
                </span>
                bien ?
              </h1>
            </div>

            <div className="content-section mt-4">
              <div className="row mb-5">
                <div className="col-md-8 mx-auto">
                  <ul className="handwritten-list feature-list-large">
                    <li>Trouve les amphis les plus proches de vous</li>
                    <li>Consulte les avis des &apos;autres étudiants</li>
                    <li>Découvre les caractéristiques de chaque amphi</li>
                    <li className="text-decoration-line-through">
                      Cours ennuyeux
                    </li>
                    <li>Trouve les meilleures places !</li>
                  </ul>
                </div>
              </div>

              <div className="action-section mt-5">
                <h2 className="handwritten-title mb-4 text-center">
                  Explore les amphis
                </h2>
                <div className="row g-3 justify-content-center">
                  <div className="col-md-4">
                    <Link
                      to={routes.amphis()}
                      className="btn btn-outline-secondary btn-lg d-block handwritten-button"
                    >
                      Tous les amphis
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <Link
                      to={routes.universities()}
                      className="btn btn-outline-dark btn-lg d-block handwritten-button"
                    >
                      Universités
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="page-number">
              <span>2</span>
            </div>
          </div>
        </section>

        {/* Section 3: Features Section */}
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
                      Toutes les caractéristiques importantes en un coup
                      d&apos;œil.
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

            {/* Footer note */}
            <div className="note-footer mt-5">
              <p className="handwritten-note fst-italic">
                <span className="grade-mark position-absolute">18/20</span>
              </p>
            </div>

            <div className="page-number">
              <span>3</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
