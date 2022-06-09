const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const db = require(__dirname + "/" + "records.json")
 


//Return All The Records In The Data
app.get('/users', (req, res) => {
    res.send(db) 
     })


//Return Record Per Id
app.get('/user/:id', (req, res) => {
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

// this code deletes user  by id 
 app.delete('/deleteUser/:id', (req,res) =>{
    const id = +req.params.id
    db.splice( (i) => i.id == id)
    res.status(200).send()
          })
    

//This code adds new user
app.use(express.json())
app.post('/createUser', (req, res) => { 
   const uuid = Math.floor(Math.random() * 100)
      const final = db.push(uuid,req.body) 
      if(final){
        console.log(final)
      }
      
    // db.forEach(b => b.id === id + 1)
 
    // res.send(db)

       }) 
 

// This code creates a listening port on 3000 OR an acceptable one for Heroku
   app.listen(port, () => {
    console.log("started server on port " + port)
   }
    )