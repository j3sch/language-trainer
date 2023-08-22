import { InferModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(completedTasks),
}));

export const completedTasks = sqliteTable('completedTasks', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  solution: text('solution').notNull(),
  user_id: text('user_id').notNull(),
  favorite: integer('favorite', { mode: 'boolean' }).default(false),
  percentage: integer('percentage').notNull(),
});

export const postsRelations = relations(completedTasks, ({ one }) => ({
  user: one(users, {
    fields: [completedTasks.user_id],
    references: [users.id],
  }),
}));

export type User = InferModel<typeof users>;
export type CompletedTasks = InferModel<typeof completedTasks>;
