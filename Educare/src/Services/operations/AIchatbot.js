import axios from "axios";

export const askAI = async (message) => {
  const response = await axios.post(
    "http://localhost:4000/api/v1/ai/chat",
    { message }
  );

  return response.data.reply;
};