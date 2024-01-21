const express = require('express');
const { OpenAI } = require("openai");
const app = express();

const openai = new OpenAI({ apiKey: 'xB3Xnj5GsQrfKLH6KnD2T3BlbkFJsEfKEqoHbETB1LfIoljS'}); // Replace 'your-api-key' with your actual API key


app.use(express.static('public'));

app.get('/generate-greeting', async (req, res) => {
  debugger
    const params = req.query;
  
    // Check for missing parameters
    if (!params || !params.category || !params.event || !params.atmosphere) {
      return res.status(421).send("חסרים פרמטרים");
    }
  
    let toSend = " כתוב לי " + "3 דוגמאות של" + params.category + " באווירה " + params.atmosphere + " ל " + params.event;
    
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

      return res.send(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  });

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app };
