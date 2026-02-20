const CoffeeController = require('./controllers/CoffeeController')
const UserAuthenController = require('./controllers/UserAuthenController')

const isAuthenController = require('./controllers/isAuthenController')


const UploadController = require('./controllers/UploadController') 
const fileUploadMiddleware = require('../middleware/coffeeUpload') 

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

    // Route สำหรับ Upload โดยเฉพาะ
    // logic: เรียก middleware ก่อน -> ถ้าผ่าน -> เรียก controller
    app.post('/upload', fileUploadMiddleware, UploadController.upload)

    // Delete File Route (เพิ่มใหม่)
    app.post('/upload/delete', UploadController.deleteFile)
}