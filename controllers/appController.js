const { body, validationResult } = require("express-validator");

const lengthErr = "must be at least 1 character.";

const validateUser = [
    body("messageUser").trim()
      .isLength({ min: 1}).withMessage(`Username ${lengthErr}`),
    body("messageText").trim()
      .isLength({ min: 1}).withMessage(`Message ${lengthErr}`),
  ];

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

exports.messageRender = (req,res) => {
    res.render("index", {title:"Mini Message Board", messages});
};

exports.newMessageGet = (req,res) => {
    res.render("form");
};

exports.newMessagePost = (req, res) => {
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
};

exports.newMessagePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "New Message",
        errors: errors.array(),
      });
    }
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
  }
];