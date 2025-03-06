import type { Prisma, Image } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageCreateArgs>({
  image: {
    one: { data: { title: 'String', url: 'String' } },
    two: { data: { title: 'String', url: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Image, 'image'>
