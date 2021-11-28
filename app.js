const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const sponsorRoutes = require('./routes/Sponsors')//routes - путь
const employeesRoutes = require('./routes/Employees')
const eventsRoutes = require('./routes/Events')
const sportclubsRoutes = require('./routes/SportClubs')//SportClubs
const positionsRoutes = require('./routes/Positions')

// // types of accessories, payment methods, delivery methods are filled locally in database

app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('./public'))

app.use('/sponsors', sponsorRoutes)
app.use('/employees', employeesRoutes)
app.use('/events', eventsRoutes)
app.use('/sportclubs', sportclubsRoutes)
app.use('/positions', positionsRoutes)


app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("It is work :3")
  })
  
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log("Server is up and listening on: " + PORT)
  })
  
