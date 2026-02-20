<template>
    <div class="container mt-4">
        <h1>Show Menu</h1>
        <div v-if="menu">
            <!-- Thumbnail -->
            <div v-if="menu.thumbnail && menu.thumbnail !== 'null'">
                <img :src="BASE_URL + menu.thumbnail" alt="thumbnail" style="width:300px; border-radius:8px;">
            </div>

            <p><strong>ID:</strong> {{ menu.id }}</p>
            <p><strong>ชื่อเมนู:</strong> {{ menu.name }}</p>
            <p><strong>ราคา:</strong> {{ menu.price }} บาท</p>
            <p><strong>ประเภท:</strong> {{ menu.type }}</p>
            <p><strong>รายละเอียด:</strong> <span v-html="menu.description"></span></p>
            <p><strong>สถานะ:</strong> {{ menu.status }}</p>

            <!-- Gallery -->
            <div v-if="pictures.length > 0">
                <strong>รูปภาพทั้งหมด:</strong>
                <div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:10px;">
                    <img v-for="pic in pictures" :key="pic.id" :src="BASE_URL + pic.name" alt="picture"
                        style="width:180px; height:180px; object-fit:cover; border-radius:6px; border:1px solid #eee;">
                </div>
            </div>

            <button @click="$router.back()" class="btn btn-secondary mt-3">ย้อนกลับ</button>
        </div>
    </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'

export default {
    data() {
        return {
            menu: null,
            pictures: [],
            BASE_URL: 'http://localhost:8081/assets/uploads/'
        }
    },
    async created() {
        try {
            let id = this.$route.params.menuId
            const response = await CoffeesService.show(id)
            this.menu = response.data

            // แปลง pictures JSON String กลับเป็น Array
            if (this.menu.pictures && this.menu.pictures !== 'null') {
                this.pictures = JSON.parse(this.menu.pictures)
            }
        } catch (error) {
            console.error("Error fetching menu details:", error)
        }
    }
}
</script>