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
    console.log("Fetching all Teams")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Teams"//ready
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Teams: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const teams = rows.map((row) => {//rows - ответ гет запроса
        return {
          id: row.idTeams,
          teams: row.teams,
        }
      })
  
      console.log("I think we fetched Teams successfully")
      res.json(teams)//res - ответ
    })
  })

  router.post("/create", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "INSERT INTO `Teams` (teams, idSportClubs) VALUES (?, ?)"
    getConnection().query(queryString, [req.body.teams, req.body.idSportClubs], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching Teams with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Teams` WHERE idTeams = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Teams: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched Teams successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//is ready
    const connection = getConnection()
  
    const queryString = "UPDATE `Teams` SET  teams = ?, idSportClubs = ? WHERE idTeams = ?"
    getConnection().query(queryString, [req.body.teams, req.body.idSportClubs, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `Teams` WHERE idTeams = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;