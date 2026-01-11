import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

async function main() {
  const connection = postgres(connectionString, { max: 1 });
  const db = drizzle(connection);

  await migrate(db, { migrationsFolder: './drizzle' });

  await connection.end();
}

main().catch(() => {
  process.exit(1);
});
