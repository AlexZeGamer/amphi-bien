import type { Prisma, Feature } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.FeatureCreateArgs>({
  feature: {
    one: { data: { name: 'String', icon: 'String' } },
    two: { data: { name: 'String', icon: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Feature, 'feature'>
