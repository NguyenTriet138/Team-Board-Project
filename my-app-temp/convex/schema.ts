import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    pictureUrl: v.optional(v.string()),
  }).index('by_token', ['tokenIdentifier']),
  
  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),
  
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
    userId: v.id('users'),
  }).index('by_user', ['userId']),
})
