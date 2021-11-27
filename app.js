const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const sponsorRoutes = require('./routes/Sponsors')//routes - путь
const employeesRoutes = require('./routes/Employees')

// // types of accessories, payment methods, delivery methods are filled locally in database

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('./public'))

app.use('/sponsors', sponsorRoutes)
app.use('/employees', employeesRoutes)


app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello from root")
  })
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
  })
  
