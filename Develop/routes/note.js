const router = require("express").Router()
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');
// /api/note
router.get("/notes", (req,res)=>{
    const pastNotes = JSON.parse(fs.readFileSync("./db/db.json"))

    res.json(pastNotes)
})

router.post("/notes",(req,res)=>{
    const pastNotes = JSON.parse(fs.readFileSync("./db/db.json"))
console.log(req.body)
req.body.id= uuidv4()
pastNotes.push(req.body)

fs.writeFileSync("./db/db.json", JSON.stringify(pastNotes))
    res.json({message: "It worked, the note was saved!"})
})

module.exports = router