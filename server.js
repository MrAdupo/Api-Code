const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const db = require(__dirname + "/" + "records.json")
 


//This Code GETS all users from json database
app.get('/getAllUsers', (req, res) => {
    res.send(db) 
     })


// This code gets user by id
app.get('/getUserId/:id', (req, res) => {
    const id = +req.params.id
    const results =  db.find(item => {
        return item.id === id
    })
     res.send(results)
        })

// This code updates user records
app.use(express.json())
app.patch('/updateUser/:id', (req, res) => {
    const mm = req.body
    const id = +req.params.id
    console.log(mm)
        const data2 = db.findIndex(a => a.id === id)
        console.log("before update" , db[data2])
        db[data2] = mm
        res.send (db[data2])
        
         })


 app.delete('/userDelete/:id', (req,res) =>{
    const id = +req.params.id
    const data = db.splice( i => i.id === id)
    res.send(data)
          })
    

//This code adds new user
app.use(express.json())
app.post('/addNewUser', (req, res) => { 
    console.log(req.body)
     db.push(req.body) 
      res.send(db)
       }) 
 

// This code creates a listening port on 3000 OR an acceptable one for Heroku
   app.listen(port, () => {
    console.log("started server on port " + port)
   }
    )