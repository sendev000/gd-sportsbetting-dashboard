import createTables from "./createTables";
import seedDatabase from "./seedDatabase";

export async function prepareDatabase() {
  await createTables();
  await seedDatabase();
}
