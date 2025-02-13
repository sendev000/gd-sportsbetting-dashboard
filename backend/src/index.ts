import app from "./app";
import { prepareDatabase } from "./database/prepareDatabase";

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await prepareDatabase();
    
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
};

  startServer(); 
