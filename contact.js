const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/contacts")

const contactsSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
})

const Contact = mongoose.model('Contact', contactsSchema)

app.use(express.json())


app.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.json(contacts)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.json(contact)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/contacts", async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })

    try {
        const newContact = await contact.save()
        res.status(201).json(newContact)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.put("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })
        res.json(contact)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
app.delete("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted sucessfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.listen(3000, () => {
    console.log("Server is running on 3000...")
})