import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 5175);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".pdf": "application/pdf", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8" };
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    if (!url.pathname.startsWith("/Portfolio/")) {
      response.writeHead(302, { Location: "/Portfolio/" + url.pathname.replace(/^\//, "") + url.search });
      response.end(); return;
    }
    const relative = decodeURIComponent(url.pathname.slice("/Portfolio/".length));
    if (relative.split("/").some((part) => part.startsWith(".") || part === "node_modules")) throw new Error("Forbidden path");
    let target = path.resolve(root, relative);
    if (target !== path.resolve(root) && !target.startsWith(root)) throw new Error("Outside site");
    if ((await stat(target)).isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(301, { Location: url.pathname + "/" + url.search }); response.end(); return;
      }
      target = path.join(target, "index.html");
    }
    const bytes = await readFile(target);
    response.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-cache" });
    response.end(request.method === "HEAD" ? undefined : bytes);
  } catch (_) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }); response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Portfolio preview: http://127.0.0.1:${port}/Portfolio/`));
