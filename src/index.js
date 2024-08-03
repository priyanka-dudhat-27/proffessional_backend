import dotenv from "dotenv"
import connectDB from "./db/index.js"
import express from "express"

dotenv.config({path:'./env'})

const port = process.env.PORT || 3000
const app=express()

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`)
    })
})
.catch((error)=>{
    console.log("MONGODB connection failed",error)
})






// import mongoose from "mongoose"
// import { DB_NAME } from "./constants"

// (async()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

//         app.on("error",(error)=>{
//             console.log("Error: ",error)
//             throw error
//         })

//         app.listen(process.env.PORT,()=>{
//             console.log(`server listening on ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.log("Error: ",error)
//         throw error
//     }
// })()