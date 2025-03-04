const { body, validationResult } = require("express-validator");
const { getAllMessages, insertMessage } = require("../db/queries");

const validateUser = [
  body("messageUser").trim().isLength({ min: 1 }).withMessage("Username must be at least 1 character."),
  body("messageText").trim().isLength({ min: 1 }).withMessage("Message must be at least 1 character."),
];

exports.messageRender = async (req, res) => {
  const messages = await getAllMessages();
  res.render("index", { title: "Mini Message Board", messages });
};

exports.newMessageGet = (req, res) => {
  res.render("form", { title: "New Message", errors: [] });
};

exports.newMessagePost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", { title: "New Message", errors: errors.array() });
    }

    const { messageUser, messageText } = req.body;
    await insertMessage(messageUser, messageText);
    res.redirect("/");
  }
];
