const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");

const homeText = fs.readFileSync(path.resolve(__dirname, "./home.html"), {
  encoding: "utf8",
});

module.exports = {
  home: Handlebars.compile(homeText),
};
