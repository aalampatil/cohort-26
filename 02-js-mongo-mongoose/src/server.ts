import "dotenv/config";
import app from "./app.js";
import { connecDB } from "./common/config/db.js";

const PORT = process.env.PORT || 5000;

const start = async () => {
  await connecDB();
  app.listen(PORT, () => {
    console.log(
      `server is listening on ${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
};

start().catch((err) => {
  console.log("error server connection", err);
  process.exit(1);
});
