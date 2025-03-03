// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  nearby: {
    __typename: 'Nearby' as const,
    id: 42,
  },
})
