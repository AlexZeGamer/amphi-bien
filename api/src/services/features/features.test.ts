import type { Feature } from '@prisma/client'

import {
  features,
  feature,
  createFeature,
  updateFeature,
  deleteFeature,
} from './features'
import type { StandardScenario } from './features.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('features', () => {
  scenario('returns all features', async (scenario: StandardScenario) => {
    const result = await features()

    expect(result.length).toEqual(Object.keys(scenario.feature).length)
  })

  scenario('returns a single feature', async (scenario: StandardScenario) => {
    const result = await feature({ id: scenario.feature.one.id })

    expect(result).toEqual(scenario.feature.one)
  })

  scenario('creates a feature', async () => {
    const result = await createFeature({
      input: { name: 'String', icon: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.icon).toEqual('String')
  })

  scenario('updates a feature', async (scenario: StandardScenario) => {
    const original = (await feature({ id: scenario.feature.one.id })) as Feature
    const result = await updateFeature({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a feature', async (scenario: StandardScenario) => {
    const original = (await deleteFeature({
      id: scenario.feature.one.id,
    })) as Feature
    const result = await feature({ id: original.id })

    expect(result).toEqual(null)
  })
})
