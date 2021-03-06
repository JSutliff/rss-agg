var express = require("express");
var exphbs = require("express-handlebars");
var Parser = require("rss-parser");

var parser = new Parser();

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var sourceUrls = [
  // "https://cnnespanol.cnn.com/feed",
  // "https://eldiariony.com/feed",
  // "https://laopinion.com/feed",
  // "https://peopleenespanol.com/noticias/feed",
  "https://www.leafly.com/feed",
  "https://weedmaps.com/news/feed/",
];

var storyArr = [];

function getNews() {
  for (var i = 0; i < sourceUrls.length; i++) {
    parser.parseURL(sourceUrls[i], (err, feed) => {
      feed.items.forEach((item) => {
        if (sourceUrls[i] === "https://www.chron.com/rss/feed/News-270.php") {
          storyArr.push({ title: item.title, link: item.url });
        } else {
          storyArr.push({ title: item.title, link: item.guid });
        }
      });
    });
  }

  // (async () => {
  //   let feed = await parser.parseURL(sourceUrls[i]);
  //   feed.items.forEach((item) => {
  //     if (sourceUrls[i] === "https://www.chron.com/rss/feed/News-270.php") {
  //       storyArr.push({ title: item.title, link: item.url });
  //     } else {
  //       storyArr.push({ title: item.title, link: item.guid });
  //     }
  //   });
  //   console.log(storyArr);
  // })();
}
getNews();
setInterval(() => {
  console.log("reloaded");
  getNews();
}, 60000 * 2);

app.get("/", function (req, res) {
  var data = {
    storyArr,
  };

  res.render("index", data);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
