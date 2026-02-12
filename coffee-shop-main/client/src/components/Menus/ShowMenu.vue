<template>
    <div>
        <h1>Show Menu</h1>
        <div v-if="menu">
            <p><strong>ID:</strong> {{ menu.id }}</p>
            <p><strong>ชื่อเมนู:</strong> {{ menu.name }}</p>
            <p><strong>ราคา:</strong> {{ menu.price }} บาท</p>
            <p><strong>ประเภท:</strong> {{ menu.type }}</p>
            <p><strong>รายละเอียด:</strong> {{ menu.description }}</p>
            <p><strong>สถานะ:</strong> {{ menu.status }}</p>
        </div>
    </div>
</template>

<script>

import CoffeesService from '../../services/CoffeesService'

export default {
    data() {
        return {

            menu: null
        }
    },
    async created() {
        try {
            //  รับ parameter ID จาก URL 
            let id = this.$route.params.menuId

            //  เรียกใช้ CoffeesService.show()
            const response = await CoffeesService.show(id)
            this.menu = response.data
        } catch (error) {
            console.error("Error fetching menu details:", error)
        }
    }
}
</script>
<style scoped></style>