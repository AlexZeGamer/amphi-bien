import type { Prisma, Amphi } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AmphiCreateArgs>({
  amphi: {
    one: {
      data: {
        name: 'String9358162',
        lat: 2693213.969331236,
        lon: 1986528.2256061921,
        seats: 3374686,
        university: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        name: 'String7013847',
        lat: 1407475.1349784199,
        lon: 5963228.384803698,
        seats: 6596581,
        university: { create: { name: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Amphi, 'amphi'>
