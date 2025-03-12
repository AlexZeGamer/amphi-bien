import { render } from '@redwoodjs/testing/web'

import NearbyPage from './NearbyPage'

//   Améliorez ce test avec l'aide de la documentation de test Redwood :
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NearbyPage', () => {
  it('se rend avec succès', () => {
    expect(() => {
      render(<NearbyPage />)
    }).not.toThrow()
  })
})
