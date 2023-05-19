require("dotenv").config();
import * as http from "node:http";
import { main } from "./main";
import log from "./utils/logger";

const PORT = 42069;

(async() => {
  


  await main();


})()

// const server = http.createServer(async (req, res) => {
  // try {
  // } catch (error) {
  //   console.error(error);
  // }

//   let bodyRequest = "";
//   res.on("data", (chunk) => (bodyRequest += chunk));
//   res.on("close", () => logger.print("Server called"));
//   res.end();
// });

// server.on("clientError", (err, socket) => {
//   socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
// });

// server.listen(PORT, () => {
//   logger.print(`Server is listening on port: ${PORT}`);
// });
