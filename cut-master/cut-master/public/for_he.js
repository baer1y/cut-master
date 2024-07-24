require('dotenv').config()
const express = require('express')
require('express-async-errors')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const keys = require('./config/keys')
const app = express()

app.set('view engine', 'ejs')

const usersRouter = require('./routes/users.router')
const adminRouter = require('./routes/admin.router')

const port = process.env.PORT || 3000

const createPath = (page) => path.resolve(__dirname, 'ejs-views', ''${page}.ejs)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/users', usersRouter)
app.use('/admin', adminRouter)

app.use(express.static('scripts'))
app.use(express.static('stylesheets'))
app.use(express.static('images'))

app.get('/', (req, res) => {
    res.status(200)
    res.render(createPath('index'));
})
app.get('/education', (req, res) => {
    res.status(200)
    res.render(createPath('education'));
})
app.get('/about', (req, res) => {
    res.status(200)
    res.render(createPath('about'));
})

app.get('/api/auth/login', (req, res) => {
    res.status(200)
    res.render(createPath('login'));
})
app.get('/api/auth/register', (req, res) => {
    res.status(200)
    res.render(createPath('register'));
})

const run = async () => {
    await mongoose.connect('mongodb+srv://admin:admin@db.z3rzz.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    })

    await app.listen(port, () => {
        console.log('Server has been started on ${port}!')
    })
}

run()

module.exports = app