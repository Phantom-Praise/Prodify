const OpenAI = require("openai").default;
const express = require("express")
const cors = require('cors');

app = express();
const port = 3000;

const apiKey1 = "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";

const openai1 = new OpenAI({ apiKey: apiKey1 })

app.use(express.json());
app.use(express.static('Morgan - Copy'));
app.use(cors());
app.post('/get-gptResponse', async(req, res) => {
    const { prompt } = req.body;
    // const role = "You are a legal assistant designed to simplify legal and immigration documents for the user. Provide a simplified explanation followed by bullet points of next steps, documents, or information needed like Driver's License, SSN, Full Name, etc.";
    // const completion = await openai1.chat.completions.create({
    //     messages: [{ role: "system", content: role },
    //     { role: "user", content: prompt }
    // ],
    //     model: "gpt-3.5-turbo-0125",
    //     });
    //     // res.json({message: 'Static test response'})
    //     res.json({message: completion.choices[0].message.content})

    const completion = await openai1.chat.completions.create({
        messages: [{ role: "system", content: "You are a career counselor in the computer science department of a university, Give 5 potential career this individual can have in the tech field based on the questionnaire provided. Provide reasons why they could be a good fit for that career path based on the answers. Please provide your answers as a string but in a way that could be copied and pasted as a JSON with the titles as career, reason. " + prompt }],
        model: "gpt-3.5-turbo",
    });
    res.json(completion.choices[0].message.content)
    //console.log(completion.choices[0].message);
    console.log("success")
});

app.listen(port, () => {
    console.log("Server running on port", port)
})