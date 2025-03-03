import type { Amphi } from '@prisma/client'

import { amphis, amphi, createAmphi, updateAmphi, deleteAmphi } from './amphis'
import type { StandardScenario } from './amphis.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('amphis', () => {
  scenario('returns all amphis', async (scenario: StandardScenario) => {
    const result = await amphis()

    expect(result.length).toEqual(Object.keys(scenario.amphi).length)
  })

  scenario('returns a single amphi', async (scenario: StandardScenario) => {
    const result = await amphi({ id: scenario.amphi.one.id })

    expect(result).toEqual(scenario.amphi.one)
  })

  scenario('creates a amphi', async (scenario: StandardScenario) => {
    const result = await createAmphi({
      input: {
        name: 'String5601184',
        lat: 5224245.492616564,
        lon: 5028286.494155561,
        seats: 8687999,
        universityId: scenario.amphi.two.universityId,
      },
    })

    expect(result.name).toEqual('String5601184')
    expect(result.lat).toEqual(5224245.492616564)
    expect(result.lon).toEqual(5028286.494155561)
    expect(result.seats).toEqual(8687999)
    expect(result.universityId).toEqual(scenario.amphi.two.universityId)
  })

  scenario('updates a amphi', async (scenario: StandardScenario) => {
    const original = (await amphi({ id: scenario.amphi.one.id })) as Amphi
    const result = await updateAmphi({
      id: original.id,
      input: { name: 'String55208112' },
    })

    expect(result.name).toEqual('String55208112')
  })

  scenario('deletes a amphi', async (scenario: StandardScenario) => {
    const original = (await deleteAmphi({ id: scenario.amphi.one.id })) as Amphi
    const result = await amphi({ id: original.id })

    expect(result).toEqual(null)
  })
})
