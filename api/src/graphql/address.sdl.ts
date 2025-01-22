export const schema = gql`
  type Location {
    lat: Float!
    lng: Float!
  }

  type Address {
    label: String!
    location: Location!
  }

  type AddressResult {
    address: Address!
    score: Float!
  }

  type Query {
    searchAddress(address: String!): [AddressResult!]! @requireAuth
    getAddress(lat: Float!, lng: Float!): Address @requireAuth
  }
`
