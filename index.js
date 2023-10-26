import express from 'express';
import bodyParser from 'body-parser';
import generateResponse from "./lib/generateResponse.js";
import promptSync from 'prompt-sync';
const app = express();
app.use(bodyParser.json());
const conversationHistory = [];
app.post('/ask', async (req, res) => {
  const question = req.body.question;
  const answer = await generateResponse({
    prompt: question,
    history: conversationHistory
  });

  res.json({ answer });
  conversationHistory.push(`Human: ${question}`, `Amjad Masad: ${answer}`);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
const prompt = promptSync();
let question;
while (true) {
  question = prompt("Ask a question >");
  const answer = await generateResponse({
    prompt: question,
    history: conversationHistory
  });

  console.log(`Amjad Masad: ${answer}\n`);

  conversationHistory.push(`Human: ${question}`, `Amjad Masad: ${answer}`)
}



