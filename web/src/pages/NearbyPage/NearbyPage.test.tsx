import { render } from '@redwoodjs/testing/web'

import NearbyPage from './NearbyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NearbyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NearbyPage />)
    }).not.toThrow()
  })
})
