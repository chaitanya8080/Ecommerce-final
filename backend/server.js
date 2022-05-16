

const app = require("./app")
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

dotenv.config({path:"backend/config/config.env"})

//connecting the database

connectDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`server working on  http://localhost:${process.env.PORT}`)
})


