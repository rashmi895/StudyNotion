const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(message);

    const response = result.response.text();

    return res.status(200).json({
      success: true,
      reply: response,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Error generating response",
    });
  }
};