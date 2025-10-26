const express = require("express");
const routes = express.Router();

const ai = require("../config/gemini");

routes.post("/text", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Please provide prompt.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        prompt +
        `You are a professional technical writer. Your task is to create clear, concise, and beautifully formatted Markdown content. 
          
Follow these rules strictly:
- Always start with a main heading: "# [Topic Name]"
- Use "##" for subheadings
- Use bullet points (- ) for key features or lists
- Use **bold** text for key terms or headings
- Separate paragraphs with a blank line for readability
- Avoid code blocks unless explicitly requested
- Make the tone professional and easy to read.
`,
    });

    return res.status(200).json({
      success: true,
      response: {
        sender: "Chatbot",
        text: response.text,
      },
      message: "Request successful.",
    });
  } catch (error) {
    console.log(
      "Error in the generate response controller function: ",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = routes;
