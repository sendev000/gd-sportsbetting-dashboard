import pool from ".";

async function createEventsTable() {
  try {
    const client = await pool.connect();

    const checkTableQuery =
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events')";
    const { rows } = await client.query(checkTableQuery);
    const tableExists = rows[0].exists;

    if (!tableExists) {
      const createTableQuery = `
            CREATE TABLE events (
              event_id SERIAL PRIMARY KEY,
              event_name TEXT,
              odds NUMERIC(10, 2)
            )
          `;

      await client.query(createTableQuery);
      console.log('[Database]: Created the "events" table.');
    }

    client.release();
  } catch (error) {
    console.error('[Database]: Error creating the "events" table:', error);
  }
}

async function createUsersTable() {
  try {
    const client = await pool.connect();

    const checkTableQuery =
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')";
    const { rows } = await client.query(checkTableQuery);
    const tableExists = rows[0].exists;

    if (!tableExists) {
      const createTableQuery = `
            CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              email TEXT UNIQUE,
              password TEXT
            )
          `;

      await client.query(createTableQuery);
      console.log('[Database]: Created the "users" table.');
    }

    client.release();
  } catch (error) {
    console.error('[Database]: Error creating the "users" table:', error);
  }
}

export default async function createTables() {
  await createEventsTable();
  await createUsersTable();
}