const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;


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