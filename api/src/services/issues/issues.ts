import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export enum IssueSeverity {
  DANGER = 'DANGER',
  PROBLEM = 'PROBLEM',
  NOTE = 'NOTE',
}

export const issues: QueryResolvers['issues'] = ({ amphiId }) => {
  return db.issue.findMany({
    where: { amphiId },
    orderBy: [{ isFixed: 'asc' }, { upvotes: 'desc' }, { createdAt: 'desc' }],
  })
}

export const issue: QueryResolvers['issue'] = ({ id }) => {
  return db.issue.findUnique({
    where: { id },
  })
}

export const createIssue: MutationResolvers['createIssue'] = ({ input }) => {
  // Validate that severity is a valid enum value
  if (!Object.values(IssueSeverity).includes(input.severity as IssueSeverity)) {
    throw new Error('Invalid severity level')
  }

  return db.issue.create({
    data: input,
  })
}

export const updateIssue: MutationResolvers['updateIssue'] = ({
  id,
  input,
}) => {
  // Validate severity if it's being updated
  if (
    input.severity &&
    !Object.values(IssueSeverity).includes(input.severity as IssueSeverity)
  ) {
    throw new Error('Invalid severity level')
  }

  return db.issue.update({
    data: input,
    where: { id },
  })
}

export const deleteIssue: MutationResolvers['deleteIssue'] = ({ id }) => {
  return db.issue.delete({
    where: { id },
  })
}

export const upvoteIssue: MutationResolvers['upvoteIssue'] = ({ id }) => {
  return db.issue.update({
    data: {
      upvotes: {
        increment: 1,
      },
    },
    where: { id },
  })
}

export const Issue = {
  amphi: (_obj, { root }) => {
    return db.issue.findUnique({ where: { id: root?.id } }).amphi()
  },
}
