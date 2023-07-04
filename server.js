import { createIPX, createIPXMiddleware } from "ipx";
import express from "express";
import path from "path";
import * as url from "url";

const PORT = 80;
const HOSTNAME = "localhost";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();

const ipx = createIPX({
  dir: path.resolve(__dirname, "image"),
  domains: ["localhost:80"],
});

// http://localhost:80/image/f_webp/test.jpeg
// http://localhost:80/image/f_webp/test.jpeg
// http://localhost:80/image/static/test.jpeg
// http://localhost:80/image/f_webp,w_200,blur_5/test.jpeg

app.use("/image", createIPXMiddleware(ipx));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`server listening on: http://${HOSTNAME}:${PORT}`);
});
