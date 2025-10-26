const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

module.exports = ai;
