export const searchAddress = async (address: string) => {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${address}&limit=5`
  )
  const data = await response.json()
  return data
}

export const getAddress = async (lat: number, lon: number) => {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`
  )
  const data = await response.json()
  return data
}
