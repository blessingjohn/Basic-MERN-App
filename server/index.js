const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/users");

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://blessingjohn:AG9uAayPYyxG05Sx@cluster0.x1fcj.mongodb.net/merntutorial?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post("/createUser", async (req,res) => {
    const user = req.body
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user)
})

app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
});
