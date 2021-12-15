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
    console.log("Fetching all Players")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Players"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Players: " + error)
        res.sendStatus(500)//200 and 300 - norm
        res.end()
      }
      
      const players = rows.map((row) => {
        return {
          idPlayers: row.idPlayers,
          pFirstName: row.pFirstName,
          pSurName: row.pSurName,
          pLastName: row.pLastName,
          idDischs: row.idDischs,
          idTeams: row.idTeams,
          idKindOfSports: row.idKindOfSports,
          idRolls: row.idRolls,
        }
      })
  
      console.log("I think we fetched Players successfully")
      res.json(players)
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()

    const queryString = "INSERT INTO `Players` (pFirstName, pSurName, pLastName, idDischs, idTeams, idKindOfSports, idRolls) VALUES (?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.pFirstName, req.body.pSurName, req.body.pLastName, req.body.idDischs, req.body.idTeams, req.body.idKindOfSports, req.body.idRolls], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching Players with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Players` WHERE idPlayers = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for Players: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched Players successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {//not ready
    const connection = getConnection()
  
    const queryString = "UPDATE `Players` SET  pFirstName = ?, pSurName = ?, pLastName = ?, idDischs = ?, idTeams = ?, idKindOfSports = ?, idRolls = ? WHERE idPlayers = ?"
    getConnection().query(queryString, [req.body.pFirstName, req.body.pSurName, req.body.pLastName, req.body.idDischs, req.body.idTeams, req.body.idKindOfSports, req.body.idRolls, req.params.id], (err, results, fields) => {
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

    const queryString = "DELETE FROM `Players` WHERE idPlayers = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log(error)
        res.sendStatus(500)
      }
      res.end()

    })
  })


  module.exports = router;