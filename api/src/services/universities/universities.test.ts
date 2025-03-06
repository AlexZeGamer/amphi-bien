import type { University } from '@prisma/client'

import {
  universities,
  university,
  createUniversity,
  updateUniversity,
  deleteUniversity,
} from './universities'
import type { StandardScenario } from './universities.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('universities', () => {
  scenario('returns all universities', async (scenario: StandardScenario) => {
    const result = await universities()

    expect(result.length).toEqual(Object.keys(scenario.university).length)
  })

  scenario(
    'returns a single university',
    async (scenario: StandardScenario) => {
      const result = await university({ id: scenario.university.one.id })

      expect(result).toEqual(scenario.university.one)
    }
  )

  scenario('creates a university', async () => {
    const result = await createUniversity({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a university', async (scenario: StandardScenario) => {
    const original = (await university({
      id: scenario.university.one.id,
    })) as University
    const result = await updateUniversity({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a university', async (scenario: StandardScenario) => {
    const original = (await deleteUniversity({
      id: scenario.university.one.id,
    })) as University
    const result = await university({ id: original.id })

    expect(result).toEqual(null)
  })
})
