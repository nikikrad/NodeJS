// const { request } = require('express')
const express = require('express')
const mysql = require('mysql')
const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'denis',
    database: 'mydb'
})

function getConnection() {
    return pool
}

router.get("/", (req,res) => {
    console.log("Fetching all events")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Events JOIN SportClubs ON SportClubs.idSportClubs = Events.idSportClubs"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Events: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const events = rows.map((row) => {//rows - ответ гет запроса
        return {
          id: row.idEvents,
          sport: row.sport,
          date: row.date,
          time: row.time,
          idSportClubs: row.idSportClubs,
          SportClubs: {
            idSportClubs: row.idSportClubs,
            sportAddress: row.sportAddress
          },
        }
      })
  
      console.log("I think we fetched Events successfully")
      res.json(events)//res - ответ
    })
  })

  router.post("/create", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "INSERT INTO `Events` (sport, date, time, idSportClubs) VALUES (?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.sport, req.body.date, req.body.time, req.body.idSportClubs], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching event with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Events` WHERE idEvents = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for event: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched events successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "UPDATE `Events` SET sport = ?, date = ?, time = ?, idSportClubs = ? WHERE idEvents = ?"
    getConnection().query(queryString, [req.body.sport, req.body.date, req.body.time, req.body.idSportClubs, req.params.id], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.delete("/delete/:id", (req, res) =>{//is ready
    const connection = getConnection()

    const queryString = "DELETE FROM `Events` WHERE idEvents = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;