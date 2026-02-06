const CoffeeController = require('./controllers/CoffeeController')
const UserAuthenController = require('./controllers/UserAuthenController')

const isAuthenController = require('./controllers/isAuthenController')

module.exports = (app) => {
    // Login & Register routes (เพิ่มใหม่)
    app.post('/login', UserAuthenController.login)
    app.post('/register', UserAuthenController.register)

    // Coffee routes
    app.get('/coffees', CoffeeController.index)  // เปิดให้ทุกคนดูได้
    app.get('/coffee/:id', CoffeeController.show)  // เปิดให้ทุกคนดูได้

    // ป้องกันด้วย Authentication - ต้อง login ก่อน
    app.post('/coffee', isAuthenController, CoffeeController.create)
    app.put('/coffee/:id', isAuthenController, CoffeeController.put)
    app.delete('/coffee/:id', isAuthenController, CoffeeController.remove)
}