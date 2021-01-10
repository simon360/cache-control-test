const express = require("express");
const path = require("path");

const config = require("./config");
const { getTime } = require("./helpers");
const templates = require("./templates");

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

function getCacheControl(maxage, delay) {
  const dateObj = new Date();

  let cacheControl;
  let expiryDateObj;

  if (maxage > 0) {
    cacheControl = `public, max-age=${maxage}`;
    expiryDateObj = new Date(dateObj.getTime() + maxage * 1000 + delay * 1000);
  } else {
    cacheControl = "no-cache";
    expiryDateObj = new Date(dateObj.getTime());
  }

  const currentDate = dateObj.toDateString();
  const currentTime = getTime(dateObj);
  const expiryDate = expiryDateObj.toDateString();
  const expiryTime = getTime(expiryDateObj);

  return {
    cacheControl,
    delay,

    currentDate,
    currentTime,
    expiryDate,
    expiryTime,
  };
}

app.get("/*", (req, res) => {
  const { delay, maxage } = {
    delay: Number.parseInt(req.query?.delay || "0"),
    maxage: Number.parseInt(req.query?.maxage || "0"),
  };

  const { cacheControl, ...templateArgs } = getCacheControl(maxage, delay);

  res.setHeader("Cache-Control", cacheControl);
  setTimeout(() => {
    res.send(templates.home({ cacheControl, ...templateArgs }));
  }, delay * 1000);
});

app.listen(config.PORT, () => {
  console.log(`App started on port ${config.PORT}`);
});
