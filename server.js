const { createServer } = require("http");
const { URL } = require("url");
const next = require("next");

const app = next({
  dev: process.env.NODE_ENV !== "production",
});

const handle = app.getRequestHandler();

// listen to errors on port 3000
app.prepare().then(() => {
  createServer((req, res) => {
    const url = new URL(req);
    const path = url.pathname;
    if (path === "/campaigns/new") {
      app.render(req, res, "/campaigns/new");
    } else if (path === "/campaigns/:address") {
      app.render(req, res, "/campaigns/[address]");
    } else if (path === "/campaigns/:address/requests") {
      app.render(req, res, "/campaigns/requests/index");
    } else if (path === "/campaigns/:address/requests/new")
      app.render(req, res, "/campaigns/requests/new");
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on localhost:3000");
  });
});
