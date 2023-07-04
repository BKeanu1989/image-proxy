import { createIPX, createIPXMiddleware } from "ipx";
import express from "express";
import path from "path";
import * as url from "url";

const PORT = 80;
const HOSTNAME = "localhost";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const ipx = createIPX({ format: "webp", id: "test" });
app.use(
  ipx({
    baseUrl: "/image", // Base URL for the image proxy
    // domains: ['example.com'], // Allowed image domains (optional)
    cache: {
      engine: "memory", // Cache engine (memory, redis, or custom)
      options: {
        max: 500, // Maximum number of images to cache in memory (optional)
      },
    },
  })
);
const app = express();
// app.use("/image", createIPXMiddleware(ipx));
// app.use("/static", express.static(path.join(__dirname, "static")));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/image/:url", (req, res) => {
  const { url } = req.params;
  const imageRequest = ipx.proxy(url);

  // Stream the image response from ipx to the client
  imageRequest.pipe(res);
});

app.listen(PORT, HOSTNAME, () => {
  console.log(`server listening on: http://${HOSTNAME}:${PORT}`);
});

// http://localhost:80/f_webp/static/test.jpeg
// http://localhost:80/_/static/test.jpeg
// http://localhost:80/image/test.jpeg
// http://localhost:80/image/static/test.jpeg
// http://localhost:80/static/test.jpeg
// http://localhost:80/image/test.jpeg
// http://localhost:80/image/width_200/test.jpeg
// http://localhost:80/image/test.jpeg
// http://localhost:80/image/test.jpeg
// Resource id is missing
// working:
// app.use("/static", express.static(path.join(__dirname, "static")));

// IPX Error: Error: Modifiers are missing (/)

// ---
// http://localhost/image/#fii/test.jpeg
// http://localhost/image/#fii/width_200/test.jpeg -> IPX Error: Error: Modifiers are missing (/)
