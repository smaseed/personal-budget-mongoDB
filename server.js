// budget API

const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const port = 3000;

const personalBudgetModel = require("./models/personal_budget_schema");
let url = 'mongodb://127.0.0.1:27017/personal_budget_database';
 

app.use(cors());
app.use(express.json());

const budget =  { "myBudget" : []};

mongoose.connect(url)
        .then(() => {
            console.log("Mongoose Connection: SUCCESS");
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });

app.get('/budget', (req, res) => {
    personalBudgetModel.find({})
                    .then((data) => {
                        // console.log(data);
                        let myBudget = data.map(item => ({
                            title: item.title,
                            budget: item.value,
                            color: item.color
                          }));
                        budget.myBudget = myBudget;
                        res.json(budget);
                        console.log("Load Data from MongoDB: SUCCESS");
                    })
                    .catch((connectionError) => {
                        console.log(connectionError);
                    }); 
});

app.post('/addBudget', (req, res) => {

    const {title, value, color} = req.body;
    if (!title || !value || !color) {
        res.status(400).json({message: "All values are required!"});
    }

    let newData = new personalBudgetModel({title: title, value: value, color:color});
    personalBudgetModel.insertMany(newData)
                .then(() => {
                    console.log("Data Insertion: SUCCESS");
                    res.status(200).json({message: "Data Added Successfully!"});
                })
                .catch((error => {
                    console.log(error);
                    res.status(500).json({message: "Errors while adding data", error});
                }));
    
});



app.listen(port, ()=> {
    console.log("App served at :3000");
});