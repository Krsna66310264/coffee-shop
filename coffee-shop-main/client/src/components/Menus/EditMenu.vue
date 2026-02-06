<template>
    <div>
        <h1>Edit Menu</h1>
        <form v-on:submit.prevent="editMenu">
            <p>ชื่อเมนู: <input type="text" v-model="menu.name"></p>
            <p>ราคา: <input type="number" v-model="menu.price"></p>
            <p>ประเภท:
                <select v-model="menu.type">
                    <option value="hot">Hot</option>
                    <option value="iced">Iced</option>
                    <option value="frappe">Frappe</option>
                </select>
            </p>
            <p>รายละเอียด: <br>
                <textarea v-model="menu.description" rows="4"></textarea>
            </p>
            <p>
                <button type="submit">บันทึกการแก้ไข</button>
                <button type="button" @click="$router.back()">ยกเลิก</button>
            </p>
        </form>
    </div>
</template>

<script>

import CoffeesService from '../../services/CoffeesService'

export default {
    data() {
        return {

            menu: {
                name: '',
                price: 0,
                type: '',
                description: ''
            }
        }
    },
    methods: {
        async editMenu() {
            try {

                await CoffeesService.put(this.menu)


                this.$router.push({
                    name: 'menus'
                })
            } catch (err) {
                console.log(err)
            }
        }
    },
    async created() {
        try {

            let menuId = this.$route.params.menuId

            // ดึงข้อมูลเดิมมาใส่ใน Form
            this.menu = (await CoffeesService.show(menuId)).data
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>
/* ใส่ style ตามความชอบ */
</style>