const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')
const passport = require('passport')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(passport.initialize())
// กำหนดให้ folder 'public' เป็น static resource ที่เข้าถึงได้ผ่าน path '/assets'
app.use('/assets', express.static('public'))

require('./userPassport')
// Import routes
require('./routes')(app);

sequelize.sync({ force: false }).then(() => {
    app.listen(config.port, '0.0.0.0', () => {
        console.log('Server running on port ' + config.port)
    })
})