<template>
    <div class="container mt-4">
        <h1>Create Menu</h1>
        <form v-on:submit.prevent="createMenu">

            <div class="mb-3">
                <label class="form-label">ชื่อเมนู:</label>
                <input type="text" v-model="menu.name" class="form-control" placeholder="ใส่ชื่อเมนู">
            </div>

            <div class="mb-3">
                <label class="form-label">Upload Images:</label>
                <upload-image @uploaded="onUploaded"></upload-image>
            </div>

            <div class="mb-3">
                <label class="form-label">Thumbnail:</label>
                <transition name="fade">
                    <div class="thumbnail-pic" v-if="menu.thumbnail != 'null'">
                        <img :src="BASE_URL + menu.thumbnail" alt="thumbnail">
                    </div>
                </transition>
            </div>

            <div class="mb-3">
                <transition-group tag="ul" name="fade" class="pictures">
                    <li v-for="picture in pictures" :key="picture.id">
                        <div class="img-wrapper">
                            <img :src="BASE_URL + picture.name" alt="picture image">
                        </div>
                        <div class="btn-wrapper">
                            <button class="btn btn-sm btn-info me-1"
                                v-on:click.prevent="useThumbnail(picture.name)">Thumbnail</button>
                            <button class="btn btn-sm btn-danger" v-on:click.prevent="delFile(picture)">Delete</button>
                        </div>
                    </li>
                </transition-group>
                <div class="clearfix"></div>
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

            <button type="submit" class="btn btn-success me-2">สร้างเมนูใหม่</button>
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
                name: '',
                thumbnail: 'null',
                pictures: 'null', // เราจะเก็บเป็น JSON String ของ array pictures
                price: 0,
                type: '',
                description: '',
                status: 'available'
            },
            pictures: [], // เก็บรายการรูปภาพที่อัปโหลด { id: 1, name: 'filename.jpg' }
            pictureIndex: 0,
            BASE_URL: 'http://localhost:8081/assets/uploads/' // URL ของ Server เรา
        }
    },
    methods: {
        // เมื่ออัปโหลดเสร็จ Component ลูกจะส่งข้อมูลไฟล์มา
        onUploaded(filename) {
            this.pictureIndex++
            const pictureJSON = {
                id: this.pictureIndex,
                name: filename
            }
            this.pictures.push(pictureJSON)

            // ตั้งเป็น Thumbnail อัตโนมัติถ้ารูปแรก
            if (this.menu.thumbnail === 'null') {
                this.menu.thumbnail = filename;
            }
        },
        useThumbnail(filename) {
            this.menu.thumbnail = filename
        },
        async delFile(picture) {
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    await UploadService.delete(picture.name)
                    // ลบออกจาก array pictures
                    this.pictures = this.pictures.filter(p => p.id !== picture.id)
                    // เคลียร์ภาพปกด้วยถ้าโดนลบ
                    if (this.menu.thumbnail === picture.name) {
                        this.menu.thumbnail = 'null'
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        async createMenu() {
            // แปลง Array Pictures เป็น JSON String ก่อนบันทึก
            this.menu.pictures = JSON.stringify(this.pictures)
            try {
                await CoffeesService.post(this.menu)
                this.$router.push({ name: 'menus' })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>

<style scoped>
/* Fade transition สำหรับ Vue 3 */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

/* Style สำหรับ Gallery */
.thumbnail-pic img {
    width: 200px;
    border: 1px solid #ddd;
    padding: 5px;
    margin-bottom: 10px;
}

ul.pictures {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
}

ul.pictures li {
    margin-right: 20px;
    margin-bottom: 20px;
    border: 1px solid #eee;
    padding: 10px;
    text-align: center;
}

ul.pictures li img {
    max-width: 180px;
    height: auto;
    margin-bottom: 5px;
}

.clearfix {
    clear: both;
}
</style>