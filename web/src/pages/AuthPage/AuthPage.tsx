import { useEffect, useState } from 'react'

import {
  FieldError,
  Form,
  Label,
  PasswordField,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import '../HomePage/HomePage.css'

const AuthPage = () => {
  const { isAuthenticated, logIn, signUp, currentUser, logOut } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Apply random tilts to paper section on page load
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
      const randomTilt = (Math.random() - 0.5) * 3
      const randomScale = 1 + Math.random() * 0.04
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

  const onLogin = async (data) => {
    setLoading(true)
    setError(null)
    try {
      await logIn({ email: data.email, password: data.password })
    } catch (error) {
      setError(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const onSignup = async (data) => {
    setLoading(true)
    setError(null)
    try {
      await signUp({
        email: data.email,
        password: data.password,
        customParameters: { username: data.name },
      })
    } catch (error) {
      setError(error.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    setError(null)
    try {
      await logIn('google.com')
    } catch (error) {
      setError(error.message || 'Google login failed')
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return (
      <>
        <Metadata title="Auth" description="Auth page" />
        <div className="landing-container">
          <section className="paper-section a4-paper">
            <div className="notebook-paper">
              <h1 className="display-4 position-relative mb-4 text-center">
                Bienvenue !
              </h1>

              <p className="lead fst-italic mb-4 text-center">
                Vous êtes connecté en tant que{' '}
                {currentUser?.email || 'utilisateur'}
              </p>

              <div className="content-section mt-5 text-center">
                <div className="action-section">
                  <button
                    className="btn btn-danger btn-lg position-relative handwritten-button"
                    onClick={() => {
                      if (
                        confirm('Êtes-vous sûr de vouloir vous déconnecter?')
                      ) {
                        logOut()
                      }
                    }}
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>

              <div className="page-number">
                <span>1</span>
              </div>
            </div>
          </section>
        </div>
      </>
    )
  }

  return (
    <>
      <Metadata title="Auth" description="Auth page" />

      <div className="landing-container">
        <section className="paper-section a4-paper">
          <div className="notebook-paper">
            <div className="page-header">
              <h1 className="display-4 position-relative mb-4 text-center">
                Amphi-Bien
              </h1>
              <p className="lead fst-italic mb-4 text-center">
                Découvre les amphis les plus chauds de ta région
              </p>
            </div>

            <div className="content-section mt-5">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <div className="note-section">
                    {/* Tab Navigation */}
                    <div className="d-flex border-bottom mb-4">
                      <button
                        className={`btn flex-grow-1 handwritten-button ${
                          activeTab === 'login'
                            ? 'btn-outline-primary active'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setActiveTab('login')}
                      >
                        Connexion
                      </button>
                      <button
                        className={`btn flex-grow-1 handwritten-button position-relative ${
                          activeTab === 'signup'
                            ? 'btn-outline-primary active'
                            : 'btn-outline-secondary'
                        }`}
                        onClick={() => setActiveTab('signup')}
                      >
                        Inscription
                        {activeTab === 'signup'}
                      </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="alert alert-danger mb-4 p-2">
                        <p className="mb-0" style={{ color: '#d63031' }}>
                          {error}
                        </p>
                      </div>
                    )}

                    {/* Google Login Button */}
                    <button
                      onClick={loginWithGoogle}
                      className="btn btn-outline-secondary w-100 handwritten-button d-flex align-items-center justify-content-center mb-3"
                      disabled={loading}
                    >
                      <svg
                        className="me-2"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Continuer avec Google
                    </button>

                    <div className="d-flex align-items-center my-3">
                      <div className="flex-grow-1 border-top border-secondary"></div>
                      <span className="text-secondary mx-2">ou</span>
                      <div className="flex-grow-1 border-top border-secondary"></div>
                    </div>

                    {/* Login Form */}
                    {activeTab === 'login' ? (
                      <Form onSubmit={onLogin} className="mt-4">
                        <div className="mb-3">
                          <Label name="email" className="form-label">
                            Email
                          </Label>
                          <TextField
                            name="email"
                            className="form-control"
                            validation={{
                              required: 'Email est obligatoire',
                              pattern: {
                                value: /^[^@]+@[^.]+\..+$/,
                                message:
                                  'Veuillez entrer une adresse email valide',
                              },
                            }}
                          />
                          <FieldError name="email" className="text-danger" />
                        </div>

                        <div className="position-relative mb-3">
                          <Label name="password" className="form-label">
                            Mot de passe
                          </Label>
                          <PasswordField
                            name="password"
                            className="form-control"
                            validation={{
                              required: 'Mot de passe est obligatoire',
                            }}
                          />
                          <FieldError name="password" className="text-danger" />
                          <span
                            className="crossed-text red-handwritten-text position-absolute"
                            style={{
                              right: '-130px',
                              top: '20px',
                              fontSize: '1.3rem',
                            }}
                          >
                            12345
                          </span>
                        </div>

                        <Submit
                          className="btn btn-primary w-100 handwritten-button"
                          disabled={loading}
                        >
                          {loading ? 'Connexion...' : 'Se connecter'}
                        </Submit>
                      </Form>
                    ) : (
                      /* Signup Form */
                      <Form onSubmit={onSignup} className="mt-4">
                        <div className="mb-3">
                          <Label name="name" className="form-label">
                            Nom complet
                          </Label>
                          <TextField
                            name="name"
                            className="form-control"
                            validation={{
                              required: 'Nom est obligatoire',
                            }}
                          />
                          <FieldError name="name" className="text-danger" />
                        </div>

                        <div className="mb-3">
                          <Label name="email" className="form-label">
                            Email
                          </Label>
                          <TextField
                            name="email"
                            className="form-control"
                            validation={{
                              required: 'Email est obligatoire',
                              pattern: {
                                value: /^[^@]+@[^.]+\..+$/,
                                message:
                                  'Veuillez entrer une adresse email valide',
                              },
                            }}
                          />
                          <FieldError name="email" className="text-danger" />
                        </div>

                        <div className="mb-3">
                          <Label name="password" className="form-label">
                            Mot de passe
                          </Label>
                          <PasswordField
                            name="password"
                            className="form-control"
                            validation={{
                              required: 'Mot de passe est obligatoire',
                              minLength: {
                                value: 8,
                                message:
                                  'Le mot de passe doit contenir au moins 8 caractères',
                              },
                            }}
                          />
                          <FieldError name="password" className="text-danger" />
                        </div>

                        <Submit
                          className="btn btn-success w-100 handwritten-button"
                          disabled={loading}
                        >
                          {loading
                            ? 'Création du compte...'
                            : 'Créer un compte'}
                        </Submit>
                      </Form>
                    )}

                    <div className="mt-4 text-center">
                      {activeTab === 'login' ? (
                        <p className="handwritten-note">
                          Pas encore de compte ?{' '}
                          <button
                            className="btn btn-link handwritten-button p-0"
                            onClick={() => setActiveTab('signup')}
                          >
                            S&apos;inscrire
                          </button>
                        </p>
                      ) : (
                        <p className="handwritten-note">
                          Déjà un compte ?{' '}
                          <button
                            className="btn btn-link handwritten-button p-0"
                            onClick={() => setActiveTab('login')}
                          >
                            Se connecter
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="grade-mark position-absolute">DRAFT</span>
            <div className="page-number">
              <span>1</span>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default AuthPage
