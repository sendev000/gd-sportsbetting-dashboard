import pool from ".";

export default async function seedDatabase() {
  try {
    const client = await pool.connect();

    const checkQuery = "SELECT COUNT(*) FROM events";
    const { rows } = await client.query(checkQuery);
    const rowCount = parseInt(rows[0].count, 10);

    if (rowCount === 0) {
      const insertQuery = `
          INSERT INTO events (event_name, odds)
          VALUES
            ('Soccer: Team A vs. Team B', 1.75),
            ('Basketball: Lakers vs. Warriors', 2.10),
            ('Tennis: Player X vs. Player Y', 1.90),
            ('Cricket: India vs. Australia', 1.85),
            ('Hockey: Canada vs. USA', 2.00)
        `;

      await client.query(insertQuery);
      console.log("[Database]: Events table seeded with 5 entries.");
    } else {
      console.log(
        "[Database]: Events already contains data. Skipping seeding."
      );
    }

    client.release();
  } catch (error) {
    console.error("[Database]: Error seeding database:", error);
  }
}
