import { InferModel } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations, Many } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  completedTasks: many(completedTasks),
}));

export const completedTasks = sqliteTable('completedTasks', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  question: text('question').notNull(),
  solution: text('solution').notNull(),
  user_id: text('user_id').notNull(),
  favorite: integer('favorite', { mode: 'boolean' }).default(false),
  percentage: integer('percentage').notNull(),
});

export const completedTasksRelations = relations(completedTasks, ({ one, many }) => ({
  user: one(users, {
    fields: [completedTasks.user_id],
    references: [users.id],
  }),
  answer: many(words),
}));

export const words = sqliteTable('word', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  completedTasks_id: integer('completedTasks_id', { mode: 'number' }).notNull(),
  word: text('answer').notNull(),
  color: text('color').notNull(),
});

export const wordsRelations = relations(words, ({ one }) => ({
  word: one(completedTasks, {
    fields: [words.completedTasks_id],
    references: [completedTasks.id],
  }),
}));

export type User = InferModel<typeof users>;
export type CompletedTasks = InferModel<typeof completedTasks>;
export type Words = InferModel<typeof words>;
