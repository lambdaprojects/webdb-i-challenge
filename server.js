const express = require("express");
const accountsRouter = require("./data/accountsRouter.js");

const server = express();
server.use(express.json());

// your code here
server.get("/", (req, res) => {
  res.send(`<h2>Ready, set go! for webapidb Challenge</h2>`);
});
server.use("/api/accounts", accountsRouter);

module.exports = server;
