import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

connectDb();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port: http://localhost:${PORT}`);
});
