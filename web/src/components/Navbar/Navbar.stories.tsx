// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Navbar from './Navbar'

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Navbar>

export const Primary: Story = {}
