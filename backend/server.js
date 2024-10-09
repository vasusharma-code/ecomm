const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase  = require('./config/database');

//Uncaught Exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting Down The Server Uncaught Exceptions`);
        process.exit(1);
        
})
//Config
dotenv.config({path:"backend/config/config.env"});

//DataBase
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on port http://localhost:${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting Down The Server Unhandled Promise`);
    server.close(()=>{
        process.exit(1);
    })
})