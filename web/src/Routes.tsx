// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/nearby" page={NearbyPage} name="nearby" />
      <Route path="/amphis/{id:Int}" page={AmphiAmphiPage} name="amphi" />
      <Set wrap={ScaffoldLayout} title="Amphis" titleTo="amphis" buttonLabel="New Amphi" buttonTo="newAmphi">
        <Route path="/amphis/new" page={AmphiNewAmphiPage} name="newAmphi" />
        <Route path="/amphis/{id:Int}/edit" page={AmphiEditAmphiPage} name="editAmphi" />
        <Route path="/amphis" page={AmphiAmphisPage} name="amphis" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
