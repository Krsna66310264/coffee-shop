<template>
    <div>
        <h1>Create Menu</h1>
        <form v-on:submit.prevent="createMenu">
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
            <p>สถานะ:
                <select v-model="menu.status">
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>
            </p>
            <p><button type="submit">สร้างเมนูใหม่</button></p>
        </form>
        <button @click="$router.back()">ยกเลิก</button>
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
        async createMenu() {
            try {

                await CoffeesService.post(this.menu)


                this.$router.push({
                    name: 'menus'
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style scoped></style>