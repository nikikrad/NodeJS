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
    console.log("Fetching all employees")
    const connection = getConnection()
  
    const queryString = "SELECT * FROM Employees JOIN Positions ON Positions.idPositions = Employees.idPositions"
    connection.query(queryString, (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for employees: " + error)
        res.sendStatus(500)
        res.end()
      }
      
      const employees = rows.map((row) => {
        return {
          idEmployees: row.idEmployees,
          name: row.name,
          surname: row.surname,
          lastname: row.lastname,
          idPositions: row.idPositions,
          Position: {
            idPositions: row.idPositions,
            positionname: row.positionname
          }
        } 
      })
  
      console.log("I think we fetched employees successfully")
      res.json(employees)//response - otvet json v kotorom employees
    })
  })

  router.post("/create", (req, res) => {
    const connection = getConnection()
    console.log(req.body.idPositions)
    const queryString = "INSERT INTO employees (name, surname, lastname, idPositions, idSportClubs) VALUES (?, ?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.name,  req.body.surname, req.body.lastname, req.body.idPositions, req.body.idSportClubs], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching employees with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `Employees` WHERE idEmployees = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        console.log("Failed to query for employees: " + error)
        res.sendStatus(500)
        res.end()
      }
  
      console.log("I think we fetched employees successfully")
      res.json(rows)
    })
  })

  router.put("/update/:id", (req, res) => {
    const connection = getConnection()
  
    const queryString = "UPDATE `Employees` SET name = ?, surname = ?, lastname = ?, idPosition = ?, idSportClubs WHERE idEmployees = ?"
    getConnection().query(queryString, [req.body.name,  req.body.surname, req.body.lastname, req.body.idPosition, req.body.idSportClubs, req.params.id], (err, results, fields) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.delete("/delete/:id", (req, res) =>{
    const connection = getConnection()

    const orderId = req.params.id
    const queryString = "DELETE FROM `Employees` WHERE idEmployees = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()
    })
  })


  module.exports = router;