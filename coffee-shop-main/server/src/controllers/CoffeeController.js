const { Coffee } = require('../models') // เรียกใช้ Model Coffee

module.exports = {
    // 1. ดึงเมนูทั้งหมด -> GET /drinks
    async index(req, res) {
        try {
            const coffees = await Coffee.findAll()
            res.send(coffees)
        } catch (err) {
            res.status(500).send({ error: 'ดึงข้อมูลไม่สำเร็จ' })
        }
    },

    // 2. สร้างเมนูใหม่ -> POST /drink
    async create(req, res) {
        try {
            // ดักจับเผื่อกรณีมีการแนบไฟล์มาใน request เดียวกับการสร้างข้อมูล
            if (req.file) {
                req.body.image = req.file.filename
            }

            // Sequelize จะบันทึก req.body.image ลงฐานข้อมูลอัตโนมัติ (ถ้า Model รองรับ)
            const coffee = await Coffee.create(req.body)
            res.send(coffee.toJSON())
        } catch (err) {
            res.status(500).send({ error: 'สร้างเมนูไม่สำเร็จ' })
        }
    },

    // 3. แก้ไขเมนู -> PUT /drink/:id
    async put(req, res) {
        try {
            // ดักจับเผื่อกรณีมีการแนบไฟล์มาตอนแก้ไขข้อมูล
            if (req.file) {
                req.body.image = req.file.filename
            }

            await Coffee.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({ error: 'แก้ไขไม่สำเร็จ' })
        }
    },

    // 4. ลบเมนู -> DELETE /drink/:id
    async remove(req, res) {
        try {
            const coffee = await Coffee.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!coffee) {
                return res.status(403).send({ error: 'ไม่มีเมนูนี้' })
            }
            await coffee.destroy()
            res.send(coffee)
        } catch (err) {
            res.status(500).send({ error: 'ลบไม่สำเร็จ' })
        }
    },

    // 5. ดูเมนูรายตัว -> GET /drink/:id
    async show(req, res) {
        try {
            const coffee = await Coffee.findByPk(req.params.id)
            if (!coffee) {
                return res.status(404).send({ error: 'ไม่พบเมนูที่ระบุ' })
            }
            res.send(coffee)
        } catch (err) {
            res.status(500).send({ error: 'หาข้อมูลไม่เจอ' })
        }
    },

    // 6. อัปโหลดรูปภาพ -> POST /upload (รวมเข้ามาไว้ใน exports เดียวกัน)
    upload(req, res) {
        // Controller ทำหน้าที่แค่ส่ง response เพราะ Middleware จัดการไฟล์เสร็จแล้ว
        if (!req.file) {
            return res.status(400).send({
                error: 'No file uploaded or invalid file type.'
            })
        }

        // ส่งชื่อไฟล์กลับไปให้ Client เพื่อบันทึกลง DB ต่อไป
        res.json({
            filename: req.file.filename
        })
    }
}