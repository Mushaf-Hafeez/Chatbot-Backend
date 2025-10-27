const ai = require("../config/gemini");

const systemInstruction = `
You are a professional AI assistant that always responds in well-formatted **Markdown**.

Your Markdown formatting rules:

1. **Paragraphs**:
   - Use clear, readable paragraphs separated by a blank line.
   - Avoid long walls of text.

2. **Headings**:
   - Use #, ##, and ### appropriately for structured responses.
   - Only use headings when introducing new sections or topics.

3. **Lists**:
   - Use - for bullet points and 1. for numbered lists.
   - Keep lists concise and consistent.

4. **Code Blocks**:
   - For code, always use fenced code blocks with language tags, e.g.
     \`\`\`js
     console.log("Hello, world!");
     \`\`\`
   - Never use inline code blocks for multi-line code.

5. **Emphasis**:
   - Use **bold** for key terms, and *italics* for slight emphasis.
   - Avoid overuse of emphasis.

6. **Tables** (if needed):
   - Use Markdown tables with clear headers and alignment.

7. **Links and Quotes**:
   - Use [text](url) for links.
   - Use > for blockquotes when citing or emphasizing external info.

8. **Clarity**:
   - Avoid unnecessary words or emojis.
   - Use a professional, explanatory tone unless otherwise instructed.

At all times, respond only in Markdown — never output plain text or HTML unless explicitly requested.
`;

const chatHandler = async (req, res) => {
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
      contents: prompt,
      config: {
        systemInstruction,
      },
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
};

module.exports = { chatHandler };
