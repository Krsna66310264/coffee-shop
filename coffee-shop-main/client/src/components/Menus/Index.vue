<template>
    <div>
        <div class="header-container">
            <h1>Get All Menus</h1>

            <div v-if="authenStore.isLoggedIn">
                <button @click="navigateTo('/menu/create')">สร้างเมนูใหม่</button>
                <button @click="logout">Logout</button>
            </div>
            <div v-else>
                <button @click="navigateTo('/login')">Login</button>
            </div>
        </div>

        <div v-if="menus.length > 0">
            <p style="text-align: left; margin-bottom: 20px;">
                จำนวนเมนูทั้งหมด: {{ menus.length }} รายการ
            </p>

            <div v-for="menu in menus" :key="menu.id" class="menu-item">

                <div class="menu-image" v-if="menu.thumbnail && menu.thumbnail !== 'null'">
                    <img :src="BASE_URL + menu.thumbnail" alt="Menu Thumbnail">
                </div>
                <div class="menu-image no-image" v-else>
                    <p>ไม่มีรูปภาพ</p>
                </div>

                <div class="menu-details">
                    <div><strong>ID:</strong> {{ menu.id }}</div>
                    <div><strong>ชื่อเมนู:</strong> {{ menu.name }}</div>
                    <div><strong>ราคา:</strong> {{ menu.price }} บาท</div>
                    <div><strong>ประเภท:</strong> {{ menu.type }}</div>
                    <div><strong>คำอธิบาย:</strong> <span v-html="menu.description"></span></div>
                    <div><strong>สถานะ:</strong> {{ menu.status }}</div>

                    <div class="button-group mt-3">
                        <button @click="navigateTo('/menu/' + menu.id)">ดูข้อมูลเมนู</button>
                        <template v-if="authenStore.isLoggedIn">
                            <button @click="navigateTo('/menu/edit/' + menu.id)">แก้ไขเมนู</button>
                            <button class="danger-btn" @click="deleteMenu(menu)">ลบเมนู</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthenStore } from '../../stores/authen'
import CoffeesService from '../../services/CoffeesService'

export default {
    setup() {
        const authenStore = useAuthenStore()
        return { authenStore }
    },
    data() {
        return {
            menus: [],
            // 🔗 เพิ่ม BASE_URL เพื่อใช้อ้างอิงพาร์ทรูปภาพจาก Server
            BASE_URL: 'http://localhost:8081/assets/uploads/'
        }
    },
    methods: {
        navigateTo(route) { this.$router.push(route) },
        async deleteMenu(menu) {
            let result = confirm("Are you sure you want to delete " + menu.name + "?")
            if (result) {
                try {
                    await CoffeesService.delete(menu)
                    await this.refreshData()
                } catch (err) {
                    console.error(err)
                    alert("Delete failed.")
                }
            }
        },
        async refreshData() {
            try {
                const response = await CoffeesService.index()
                this.menus = response.data
            } catch (error) {
                console.error(error)
            }
        },
        logout() {
            this.authenStore.logout()
            this.$router.push({ name: 'login' })
        }
    },
    async created() {
        await this.refreshData()
    }
}
</script>

<style scoped>
/* ส่วนจัดการตำแหน่ง Header */
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

h1 {
    margin: 0;
}

button {
    margin-left: 10px;
    padding: 8px 15px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
}

button:hover {
    background-color: #45a049;
}

.danger-btn {
    background-color: #f44336;
}

.danger-btn:hover {
    background-color: #da190b;
}

.mt-3 {
    margin-top: 15px;
}

/* 🎨 ปรับแต่งการ์ดแสดงผลเมนู */
.menu-item {
    display: flex;
    flex-direction: row;
    /* จัดเรียงรูปกับข้อความให้อยู่แนวนอน (ซ้าย-ขวา) */
    gap: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* ตั้งค่ารูปภาพ */
.menu-image img {
    width: 200px;
    /* กำหนดความกว้างรูป */
    height: 200px;
    object-fit: cover;
    /* ตัดรูปให้พอดีกรอบแบบสวยๆ */
    border-radius: 8px;
    border: 1px solid #eee;
}

/* กล่องแทนที่กรณีไม่มีรูป */
.no-image {
    width: 200px;
    height: 200px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: #999;
}

/* ตั้งค่าตัวอักษรและรายละเอียด */
.menu-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
}

/* ปรับให้หน้าจอเล็กลงแล้วรูปอยู่ด้านบนข้อความ (Responsive) */
@media (max-width: 600px) {
    .menu-item {
        flex-direction: column;
    }

    .menu-image img,
    .no-image {
        width: 100%;
        height: auto;
    }
}
</style>