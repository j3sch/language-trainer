import { InferModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(history),
}));

export const history = sqliteTable('history', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  solution: text('solution').notNull(),
  user_id: text('user_id').notNull(),
  favorite: integer('id', { mode: 'boolean' }).default(false),
  f: integer('id').default(0),
});

export const postsRelations = relations(history, ({ one }) => ({
  user: one(users, {
    fields: [history.user_id],
    references: [users.id],
  }),
}));

export type User = InferModel<typeof users>;
export type History = InferModel<typeof history>;
