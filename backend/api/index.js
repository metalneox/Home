require("dotenv").config();
const express = require('express')
const bodyParser = require("body-parser")
const AuthRouter = require("./router/auth")
const UserSession = require("./router/house")
const House = require("./models/House")
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())

app.use(bodyParser.json())

app.get("/houses", async (req, res) => {
    const houses = await House.findAll();
    return res.json(houses);
});

app.use("/auth", AuthRouter)
app.use("/user", UserSession)


app.listen(PORT, () => {
    console.log("server listening on", PORT)
})
