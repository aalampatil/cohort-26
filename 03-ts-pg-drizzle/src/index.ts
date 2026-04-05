import http from "node:http";
import { createExpressApplication } from "./app/index.js";
console.log("check pass ");

async function main() {
  try {
    const server = http.createServer(createExpressApplication());
    const port: number = 8080;

    server.listen(port, () => {
      console.log(`server is listening on port:${port}`);
    });
  } catch (error) {
    console.log("error starting http server");
    throw Error;
  }
}

main();
