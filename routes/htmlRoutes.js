var router = require("express").Router();
var Parser = require("rss-parser");

var parser = new Parser();

router.get("/", (req, res) => {
  res.send("hello and shit");
});

// router.get("/api/feed", function (req, res) {
//   parser.parseURL("https://cnnespanol.cnn.com/feed", function (err, feed) {
//     let output = "";
//     for (let i = 0; i < 10; i++) {
//       console.log(feed.items[i].guid);
//       // res.json(feed.items);
//       output += `<a href="${feed.items[i].guid}">${feed.items[i].title}</a><br>`;
//       // res.send(`<a href="${feed.items[i].url}">${feed.items[i].title}</a>`);
//     }

//     res.send(output);
//   });
// });
var sourceUrls = [
  "https://cnnespanol.cnn.com/feed",
  "https://eldiariony.com/feed",
  "https://www.eluniversal.com.mx/nacion/feed",
  "https://laopinion.com/feed",
  "https://laopinion.com/feed",
  "https://peopleenespanol.com/noticias/feed",
  "https://www.chron.com/rss/feed/News-270.php",
];

var storyArr = [];

// (async () => {
//   let feed = await parser.parseURL("https://cnnespanol.cnn.com/feed");
//   console.log(feed.title);

//   feed.items.forEach((item) => {
//     storyArr.push({ title: item.title, link: item.guid });
//   });
// })();

for (var i = 0; i < sourceUrls.length; i++) {
  (async () => {
    let feed = await parser.parseURL(sourceUrls[i]);
    // console.log(feed.title);

    feed.items.forEach((item) => {
      storyArr.push({ title: item.title, link: item.guid });
    });
    console.log(storyArr);
  })();
}

router.get("/news-feed", (req, res) => {
  let output = "";
  for (let i = 0; i < storyArr.length; i++) {
    output += `<a href="${storyArr[i].link}">${storyArr[i].title}</a><br>`;
  }
  res.send(output);
});

module.exports = router;
