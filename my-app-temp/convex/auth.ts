import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      return null
    }

    // Check if we've already stored this user
    const user = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .first()

    return user
  },
})

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError('Called createUser without authentication present')
    }

    // Check if user already exists
    const existingUser = await ctx.db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', identity.tokenIdentifier)
      )
      .first()

    if (existingUser) {
      throw new ConvexError('User already exists')
    }

    // Create a new user
    const userId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      tokenIdentifier: identity.tokenIdentifier,
      pictureUrl: args.pictureUrl,
    })

    return userId
  },
})
