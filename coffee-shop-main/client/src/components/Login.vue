<template>
    <div class="login-container">
        <h1>Welcome to our Coffee Shop</h1>
        <form @submit.prevent="onLogin">
            <div class="form-group">
                <label>Email:</label>
                <input type="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
            <div class="error" v-if="error">{{ error }}</div>
        </form>
    </div>
</template>

<script>
import AuthenService from '../services/AuthenService'
import { useAuthenStore } from '../stores/authen'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        async onLogin() {
            try {
                const response = await AuthenService.login({
                    email: this.email,
                    password: this.password
                })

                const authenStore = useAuthenStore()
                authenStore.setToken(response.data.token)
                authenStore.setUser(response.data.user)


                this.$router.push({
                    name: 'menus'
                })
            } catch (error) {
                console.log(error)

                if (error.response && error.response.data) {
                    this.error = error.response.data.error
                } else {
                    this.error = "Unknown Error or Network Issue"
                }
            }
        }
    }
}
</script>