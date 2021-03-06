

const app = require("./app")
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

dotenv.config({path:"backend/config/config.env"})

//connecting the database

connectDatabase();

app.listen(process.env.PORT,()=>{
    try {
        console.log(`server working on  http://localhost:${process.env.PORT}`)
    } catch (error) {
        console.log(error.message)
    }
})


