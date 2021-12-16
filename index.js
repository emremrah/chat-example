const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("a user is typing");
  });

  socket.on("typing", (msg) => {
    console.log(msg);
    io.emit("typing", msg);
  });

  socket.on("user-join", (msg) => {
    console.log(msg);
    io.emit("user-join", msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://0.0.0.0:${port}/`);
});
