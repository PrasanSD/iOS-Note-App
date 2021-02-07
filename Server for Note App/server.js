const express = require('express')
const mongoose = require('mongoose')
var app = express()

var Data = require('./noteSchema')

mongoose.connect("mongodb://localhost/newDB")

mongoose.connection.once("open", () => {
    console.log("Connected to database!")
}).on("error", (error) => {
    console.log("Falied to connect " + error)
})

//Create a note
app.post('/create', (req, res) => {
    var note = new Data({
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")
    })

    note.save().then(() => {
        if (note.isNew == false) {
            console.log("Saved data!")
            res.send("Saved data!")
        }
        else {
            console.log("Failed to save data")
        }
    })
})


//Delete a note
app.post('/delete', (req, res) => {
    Data.findOneAndRemove({
        _id: req.get("id")
    }, (err) => {
        console.log("Failed " + err)
    })

    res.send("Deleted!")
})


//Update a note
app.post('/update', (req, res) => {
    Data.findByIdAndUpdate({
        _id: req.get("id")
    }, {
        note: req.get("note"),
        title: req.get("title"),
        date: req.get("date")
    }, (err) => {
        console.log("Failed to update " + err)
    })

    res.send("Updated!")
})


//Retrieve all notes
app.get('/fetch', (req, res) => {
    Data.find({}).then((dbitems) => {
        res.send(dbitems)
    })
})


//replace localhost with ip addr
//http://localhost:8081/create
var server = app.listen(8081, "localhost", () => {
    console.log("Server is running!")
})
