let fileupload = require("express-fileupload");
let express = require("express");
let app = express();
let server = app.listen(8080);
let fs = require("fs");

let io = require("socket.io").listen(server);

let imageFolder = "./images/";
let imagesURLs = [];

app.use(fileupload());
app.use(express.static(__dirname + "/dist/instaApp"));

fs.readdir(imageFolder, (err, files) => {
  files.forEach((file) => {
    imagesURLs.push("/images/" + file);
  });
});

app.use('/images',express.static('images'));

io.on("connection", (socket) => {
  socket.emit("urls", imagesURLs);
});

app.post("/saveImage", (req, res) => {
  let image = req.files.file;
  let path = imageFolder + Math.floor(Math.random() * 1000) + image.name;
  image.mv(path, (error) => {
    if (error) {
      console.error(error);
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ status: "error", message: error }));
      return;
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({ status: "success", path: "/images/" + image.name })
    );
    imagesURLs.push(path);
    // console.log(imagesURLs);

    io.emit("newImage", path);
  });
});
