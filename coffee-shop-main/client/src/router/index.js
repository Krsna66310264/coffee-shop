import { createRouter, createWebHistory } from 'vue-router'

// Import Components
import MenuIndex from '../components/Menus/Index.vue'
import MenuCreate from '../components/Menus/CreateMenu.vue'
import MenuEdit from '../components/Menus/EditMenu.vue'
import MenuShow from '../components/Menus/ShowMenu.vue'
import Login from '../components/Login.vue'


import OrderIndex from '../components/Orders/OrderIndex.vue'
import OrderCreate from '../components/Orders/OrderCreate.vue'
import OrderEdit from '../components/Orders/OrderEdit.vue'
import OrderShow from '../components/Orders/OrderShow.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },

        // Menus Routes 
        {
            path: '/menus',
            name: 'menus',
            component: MenuIndex
        },
        {
            path: '/menu/create',
            name: 'menu-create',
            component: MenuCreate
        },
        {
            path: '/menu/edit/:menuId',
            name: 'menu-edit',
            component: MenuEdit
        },
        {
            path: '/menu/:menuId',
            name: 'menu-show',
            component: MenuShow
        },

        // Orders Routes 
        {
            path: '/orders',
            name: 'orders',
            component: OrderIndex
        },
        {
            path: '/order/create',
            name: 'orders-create',
            component: OrderCreate
        },
        {
            path: '/order/edit/:orderId',
            name: 'order-edit',
            component: OrderEdit
        },
        {
            path: '/order/:orderId',
            name: 'order',
            component: OrderShow
        }
    ]
})

export default router