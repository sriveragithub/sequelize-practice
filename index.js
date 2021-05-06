const express = require('express')
const Sequelize = require('sequelize')
const { User } = require('./models')
const app = express()
const port = 3004

app.use(express.json())
app.use(express.urlencoded())

app.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.send(users)
})

app.post('/users', async (req, res) => {
    const { firstName, lastName, email } = req.body
    const newUser = await User.create({
        firstName,
        lastName,
        email
    })
    res.send(newUser)
})

app.get('/users/:id', async (req, res) => {
    
    try {
        const user = await User.findByPk(req.params.id)
        res.send(user)        
    } catch (e) {
        console.log(e)
        res.status(404).send()
    }

})

app.post('/users/search', async (req, res) => {
    const found = await User.findAll({
        where: {
            firstName: req.body.query
        }
    })
    res.send(found)
})

app.put('/users/:id', async (req, res) => {
    const updatedUser = await User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.send(updatedUser)
})

app.get('/postman', async (req, res) => {
    const postman = await User.findAll({
        attributes: ['email']
    })
    res.send(postman)
})

app.listen(port, () => {
    console.log(`Users API is running on prot ${port}`)
})