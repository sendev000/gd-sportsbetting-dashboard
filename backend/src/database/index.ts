import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: process.env.NODE_ENV === "test"? process.env.TEST_DB_NAME : process.env.DB_NAME,
});

const connectWithRetry = () => {
  pool.connect()
    .then(() => console.log("Database connected successfully"))
    .catch((err) => {
      console.error("Database connection failed, retrying in 3 seconds...", err);
      setTimeout(connectWithRetry, 3000);
    });
};

connectWithRetry();

export default pool;
