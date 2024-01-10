const express = require('express');
const { OpenAI } = require("openai");
const app = express();
const port = 3000;
const openai = new OpenAI({ apiKey: 'xxx'}); // Replace 'your-api-key' with your actual API key


app.use(express.static('public'));

app.get('/generate-greeting', async (req, res) => {
    const params = req.query;
  
    // Check for missing parameters
    if (!params || !params.category || !params.eventType || !params.atmosphere) {
      return res.status(421).send("חסרים פרמטרים");
    }
  
    let toSend = " כתוב לי " + "3 דוגמאות של" + params.category + " באווירה " + params.atmosphere + " ל " + params.eventType;
    
    // Check for valid age parameter
    if (params.age !== '') {
      const parse_int = parseInt(params.age);
      if (isNaN(parse_int)) {
        return res.status(421).send("גיל לא תקין");
      }
      toSend += " לגיל " + params.age;
    }
  
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: toSend }],
        model: 'gpt-3.5-turbo',
        temperature: 0.8
      });
  
      console.log(chatCompletion.choices[0].message.content);
      return res.send(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app };
