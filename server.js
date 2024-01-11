const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  console.log(req.ip);
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("User connected...");

  socket.on("chat message", msg => { // メッセージを受け取るための関数
    // console.log("message: " + msg);
    io.emit("chat message", msg); // サーバーが受け取ったメッセージをさらにクライアントに送り返して見れるようにする
  });
});

server.listen(PORT, _ => {
  console.log(`Application listening at http://127.0.0.1:${PORT}`);
});