import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './wrangler',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'http://127.0.0.1:8787/',
  },
} satisfies Config
