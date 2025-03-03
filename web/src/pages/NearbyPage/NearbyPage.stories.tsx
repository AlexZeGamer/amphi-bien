import type { Meta, StoryObj } from '@storybook/react'

import NearbyPage from './NearbyPage'

const meta: Meta<typeof NearbyPage> = {
  component: NearbyPage,
}

export default meta

type Story = StoryObj<typeof NearbyPage>

export const Primary: Story = {}
