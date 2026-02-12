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
                <div><strong>ID:</strong> {{ menu.id }}</div>
                <div><strong>ชื่อเมนู:</strong> {{ menu.name }}</div>
                <div><strong>ราคา:</strong> {{ menu.price }} บาท</div>
                <div><strong>ประเภท:</strong> {{ menu.type }}</div>
                <div><strong>คำอธิบาย:</strong> {{ menu.description }}</div>
                <div><strong>สถานะ:</strong> {{ menu.status }}</div>

                <div class="button-group">
                    <button @click="navigateTo('/menu/' + menu.id)">ดูข้อมูลเมนู</button>
                    <template v-if="authenStore.isLoggedIn">
                        <button @click="navigateTo('/menu/edit/' + menu.id)">แก้ไขเมนู</button>
                        <button @click="deleteMenu(menu)">ลบเมนู</button>
                    </template>
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
        return { menus: [] }
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
/* ส่วนจัดการตำแหน่ง */
.header-container {
    display: flex;
    /* จัดเป็นแนวนอน */
    justify-content: space-between;
    /* ดัน H1 ไปซ้ายสุด ดันปุ่มไปขวาสุด */
    align-items: center;
    /* ให้อยู่กึ่งกลางแนวตั้ง */
    margin-bottom: 10px;
    /* ลดระยะห่างด้านล่างหัวข้อลง */
}

/* ลบ Margin ของ H1 เพื่อลดที่ว่าง */
h1 {
    margin: 0;
}

/* เว้นระยะห่างระหว่างปุ่มนิดหน่อย */
button {
    margin-left: 10px;
}

/* เพิ่ม style ให้รายการเมนูมีการ์ดสวยๆ นิดนึง หรือจะเอาแบบเดิมก็ได้ */
.menu-item {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    /* ใส่กรอบบางๆ */
    border-radius: 8px;
    /* มุมมน */
}
</style>