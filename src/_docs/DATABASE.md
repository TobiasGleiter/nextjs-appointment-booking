# 📀 Datebase

## ❓ Frequently Asked Questions

- **How can I use a different database then mongodb?**

---

## 🦑 How can I use a different database then mongodb?

I implemented a adapter and a database-repository structure.
This allows you to use any other database you want.

1. Create a new file e.g. for PostgreSQL `src/lib/database/repository/postgresql-repository.ts`
2. Implement the following code (which extends on DatabaseAdapter from the `adapter-database.ts`)

```typescript
import { DatabaseRepository } from '@/src/types/database/repository-database';
import { Pool } from 'pg';

export class PostgreSQLRepository<T> implements DatabaseRepository<T> {
  private pool: Pool;
  private tableName: string;

  constructor(pool: Pool, tableName: string) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async find(query: string, values?: any[]): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async findOne(query: string, values?: any[]): Promise<T | null> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  }

  async countDocuments(query: string, values?: any[]): Promise<number> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return parseInt(result.rows[0].count, 10);
    } finally {
      client.release();
    }
  }

  async insertOne(query: string, values?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0]; // Return the inserted row
    } finally {
      client.release();
    }
  }
}
```

3. (This code is probably not right because I used ChatGPT to generate the code)
4. ... try it yourself and conntact me if something not working.
