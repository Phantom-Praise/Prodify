const express = require('express');
const cors = require('cors');
const OpenAI = require("openai").default;

const app = express();
const port = 3000;

const apiKey1 = "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";

const openai1 = new OpenAI({ apiKey: apiKey1 })

// Sample data for testing
let posts = [];

app.use(express.json());
app.use(cors());
app.use(express.static('Morgan - Copy'));


// OpenAI endpoint
app.post('/get-gptResponse', async (req, res) => {
    const { prompt } = req.body;
    const completion = await openai1.chat.completions.create({
        messages: [{ role: "system", content: "You are a career counselor in the computer science department of a university, Give 5 potential career this individual can have in the tech field based on the questionnaire provided. Provide reasons why they could be a good fit for that career path based on the answers " + prompt }],
        model: "gpt-3.5-turbo",
    });
    res.json(completion.choices[0].message.content);
    console.log("Success")
});

app.post('/get-gptPathway', async (req, res) => {
    const { prompt } = req.body;
    const completion = await openai1.chat.completions.create({
        messages: [{ role: "system", content: " I want to pursue a career in " + prompt +" 'How do I navigate this career path effectively?' Give the student a detailed pathway to success in the chosen field. Give things such as Essential Skills, Relevant Tools and Technologies skills, libraries/frameworks etcs" }],
        model: "gpt-3.5-turbo",
    });
    res.json(completion.choices[0].message.content);
    console.log("Success")
});

// Community Posts endpoints
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const { content } = req.body;
    if (content.trim() !== '') {
        const post = {
            id: posts.length + 1,
            content,
            likes: 0,
            answers: []
        };
        posts.push(post);
        res.status(201).json(post);
    } else {
        res.status(400).json({ message: 'Content cannot be empty' });
    }
});

app.put('/posts/:id/like', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (post) {
        post.likes++;
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.post('/posts/:id/answers', (req, res) => {
    const postId = parseInt(req.params.id);
    const { answer } = req.body;
    const post = posts.find(post => post.id === postId);
    if (post) {
        post.answers.push(answer);
        res.status(201).json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
});

app.listen(port, () => {
    console.log("Server running on port", port);
});
