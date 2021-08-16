import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhots:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // http, 웹소켓이 함께 운영될 수 있도록 설정함. (Optional)

wss.on("connection", (socket) => {
  console.log("Connected to Browser!");
  socket.on("close", () => console.log("Disconnected from the Browser"));
  socket.on("message", (message) => {
    console.log(message);
  });
  socket.send("Hello!!!");
});

server.listen(3000, handleListen);
