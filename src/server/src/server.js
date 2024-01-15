import express from 'express'
import router from './routes.js'
import mongoose from 'mongoose'

// Connect to database
mongoose.connect('mongodb+srv://Admin:admin@datepad.zzdan.mongodb.net/datepad?retryWrites=true&w=majority', {
  useNewUrlParser:true 
})
.then(() => {
  console.log('con to db established')
})
.catch(err => {
  console.log(`db err: ${err.message}`);
  process.exit(-1)
})

// Initialize, set port
const app = express()
const port = process.env.PORT || 3002

// Uses routers with all endpoints
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log("Server connected on port " + port)
})
