// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Route, Router, Set } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'
import AuthPage from './pages/AuthPage/AuthPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={AuthPage} name="auth" />
      <Set wrap={ScaffoldLayout} title="Universités" titleTo="universities" buttonLabel="Nouvelle université" buttonTo="newUniversity">
        <Route path="/universities/new" page={UniversityNewUniversityPage} name="newUniversity" />
        <Route path="/universities/{id:Int}/edit" page={UniversityEditUniversityPage} name="editUniversity" />
        <Route path="/universities/{id:Int}" page={UniversityUniversityPage} name="university" />
        <Route path="/universities" page={UniversityUniversitiesPage} name="universities" />
      </Set>
      <Route path="/nearby" page={NearbyPage} name="nearby" />
      <Route path="/amphis/{id:Int}" page={AmphiAmphiPage} name="amphi" />
      <Set wrap={ScaffoldLayout} title="Amphis" titleTo="amphis" buttonLabel="Nouvel amphi" buttonTo="newAmphi">
        <Route path="/amphis/new" page={AmphiNewAmphiPage} name="newAmphi" />
        <Route path="/amphis/{id:Int}/edit" page={AmphiEditAmphiPage} name="editAmphi" />
        <Route path="/amphis" page={AmphiAmphisPage} name="amphis" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
