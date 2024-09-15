const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = require('./budget.json');
// fetch("budget.json")
//     .then(res => res.json())
//     .then(data => {
//         budget = data;
//     })
//     .catch(error => console.error("Error Loading JSON File:", error));

app.get('/budget', (req, res) => {
    res.json(budget)
})

app.listen(port, ()=> {
    console.log("App served at :3000")
})
