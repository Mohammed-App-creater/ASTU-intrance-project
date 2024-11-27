import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PORT = 8000;
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/gemini", async (req, res) => {
  try {
    const history = req.body.history;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: history,
    });
    const message = req.body.massage;
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" + error });
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
