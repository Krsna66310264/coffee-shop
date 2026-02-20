<template>
    <div class="container mt-4">
        <h1>Edit Menu</h1>
        <form v-on:submit.prevent="editMenu">

            <div class="mb-3">
                <label class="form-label">ชื่อเมนู:</label>
                <input type="text" v-model="menu.name" class="form-control">
            </div>

            <!-- Upload รูปใหม่ -->
            <div class="mb-3">
                <label class="form-label">Upload รูปเพิ่มเติม:</label>
                <upload-image @uploaded="onUploaded"></upload-image>
            </div>

            <!-- Thumbnail ปัจจุบัน -->
            <div class="mb-3">
                <label class="form-label">Thumbnail:</label>
                <div v-if="menu.thumbnail && menu.thumbnail !== 'null'">
                    <img :src="BASE_URL + menu.thumbnail" alt="thumbnail" style="width:200px;">
                </div>
            </div>

            <!-- Gallery -->
            <div class="mb-3">
                <ul style="list-style:none; padding:0; display:flex; flex-wrap:wrap; gap:10px;">
                    <li v-for="picture in pictures" :key="picture.id"
                        style="border:1px solid #eee; padding:10px; text-align:center;">
                        <img :src="BASE_URL + picture.name" alt="picture"
                            style="width:150px; height:150px; object-fit:cover;">
                        <div style="margin-top:5px;">
                            <button class="btn btn-sm btn-info me-1"
                                @click.prevent="useThumbnail(picture.name)">Thumbnail</button>
                            <button class="btn btn-sm btn-danger" @click.prevent="delFile(picture)">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="mb-3">
                <label class="form-label">ราคา:</label>
                <input type="number" v-model="menu.price" class="form-control">
            </div>

            <div class="mb-3">
                <label class="form-label">ประเภท:</label>
                <select v-model="menu.type" class="form-select">
                    <option value="hot">Hot</option>
                    <option value="iced">Iced</option>
                    <option value="frappe">Frappe</option>
                </select>
            </div>

            <div class="mb-3">
                <label class="form-label">รายละเอียด:</label>
                <ckeditor :editor="editor" v-model="menu.description" :config="editorConfig"></ckeditor>
            </div>

            <div class="mb-3">
                <label class="form-label">สถานะ:</label>
                <select v-model="menu.status" class="form-select">
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                </select>
            </div>

            <button type="submit" class="btn btn-success me-2">บันทึกการแก้ไข</button>
            <button type="button" class="btn btn-secondary" @click="$router.back()">ยกเลิก</button>
        </form>
    </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService.js'
import UploadService from '../../services/UploadService.js'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import UploadImage from '../Utils/Upload.vue'

export default {
    components: { UploadImage },
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {
                licenseKey: 'GPL',
                toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
            },
            menu: {
                name: '', price: 0, type: '',
                description: '', status: '',
                thumbnail: 'null', pictures: 'null'
            },
            pictures: [],
            pictureIndex: 0,
            BASE_URL: 'http://localhost:8081/assets/uploads/'
        }
    },
    methods: {
        onUploaded(filename) {
            this.pictureIndex++
            this.pictures.push({ id: this.pictureIndex, name: filename })
            if (this.menu.thumbnail === 'null') {
                this.menu.thumbnail = filename
            }
        },
        useThumbnail(filename) {
            this.menu.thumbnail = filename
        },
        async delFile(picture) {
            if (confirm("Want to delete?")) {
                try {
                    await UploadService.delete(picture.name)
                    this.pictures = this.pictures.filter(p => p.id !== picture.id)
                    if (this.menu.thumbnail === picture.name) {
                        this.menu.thumbnail = 'null'
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async editMenu() {
            this.menu.pictures = JSON.stringify(this.pictures)
            try {
                await CoffeesService.put(this.menu)
                this.$router.push({ name: 'menus' })
            } catch (err) {
                console.log(err)
            }
        }
    },
    async created() {
        try {
            let menuId = this.$route.params.menuId
            const response = await CoffeesService.show(menuId)
            this.menu = response.data

            // โหลด pictures เดิมจาก DB
            if (this.menu.pictures && this.menu.pictures !== 'null') {
                this.pictures = JSON.parse(this.menu.pictures)
                // หา index สูงสุดเพื่อต่อ id ใหม่
                this.pictureIndex = Math.max(...this.pictures.map(p => p.id), 0)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
</script>