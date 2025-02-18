const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

  app.get("/", (req,res) => {
    res.render("index", {title:"Mini Message Board", messages});
  });

  app.get("/new", (req,res) => {
    res.render("form");
  });

  app.post("/new", (req, res) => {
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
  });

  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
