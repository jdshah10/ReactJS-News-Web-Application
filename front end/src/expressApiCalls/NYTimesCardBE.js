const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors');
app.use(cors());
app.get('/nytimes', (req, res) => {
    console.log("hello ny times");
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3LUV4JGbl5KXZ4B98Tae6wE0qb1kJjrV`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send({data});
    })
    .catch(er => {
        res.redirect('/error');
    });
});

const port = process.env.PORT || 3001;
app.listen(3001, () => console.log(`on port ${port}: `));