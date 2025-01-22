import type { School } from '@prisma/client'

import {
  schools,
  school,
  createSchool,
  updateSchool,
  deleteSchool,
} from './schools'
import type { StandardScenario } from './schools.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('schools', () => {
  scenario('returns all schools', async (scenario: StandardScenario) => {
    const result = await schools()

    expect(result.length).toEqual(Object.keys(scenario.school).length)
  })

  scenario('returns a single school', async (scenario: StandardScenario) => {
    const result = await school({ id: scenario.school.one.id })

    expect(result).toEqual(scenario.school.one)
  })

  scenario('creates a school', async () => {
    const result = await createSchool({
      input: { name: 'String' },
    })

    expect(result.name).toEqual('String')
  })

  scenario('updates a school', async (scenario: StandardScenario) => {
    const original = (await school({ id: scenario.school.one.id })) as School
    const result = await updateSchool({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a school', async (scenario: StandardScenario) => {
    const original = (await deleteSchool({
      id: scenario.school.one.id,
    })) as School
    const result = await school({ id: original.id })

    expect(result).toEqual(null)
  })
})
