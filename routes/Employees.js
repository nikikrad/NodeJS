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
        console.log(row.idPosition)
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
  
    const queryString = "INSERT INTO `Employees` (name, surname, middle_name, address, phone_number, email, position_id) VALUES (?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [req.body.first_name,  req.body.last_name, req.body.middle_name, req.body.address, req.body.phone_number, req.body.email, req.body.position_id], (err, results, fields) => {
      if (err) {
        res.sendStatus(500)
        return
      }
      res.end()
    })
  })

  router.get("/:id", (req, res) =>{
    console.log("Fetching employees with id:" + req.params.id)
    const connection = getConnection()

    const queryString = "Select * FROM `employees` WHERE employees_id = ?"
  
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
  
    const queryString = "UPDATE `employees` SET first_name = ?, last_name = ?, middle_name = ?, address = ?, phone_number = ?, email = ?, position_id = ? WHERE employees_id = ?"
    getConnection().query(queryString, [req.body.first_name,  req.body.last_name, req.body.middle_name, req.body.address, req.body.phone_number, req.body.email, req.body.position_id, req.params.id], (err, results, fields) => {
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
    const queryString = "DELETE FROM `employees` WHERE employees_id = ?"
  
    connection.query(queryString, [req.params.id], (error, rows, fields) => {
      if (error) {
        res.sendStatus(500)
      }
      res.end()
    })
  })


  module.exports = router;