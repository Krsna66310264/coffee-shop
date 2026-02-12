<template>
    <div class="clearfix">
        <div class="nv-navbar">
            <ul class="nav">
                <li><router-link :to="{ name: 'login' }">Login</router-link></li>
                <li><router-link :to="{ name: 'menus' }">All Menus</router-link></li>
                <li><router-link :to="{ name: 'orders' }">Orders</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    // Options API
}
</script>
<style scoped>
.nv-navbar {
    background-color: palegoldenrod;
    width: 100%;
    padding: 10px 0px 10px 0px;
    overflow: hidden;
}

.nv-navbar .nav {
    list-style: none;
    margin: 0;
    padding: 0;
    float: left;
}

.nv-navbar .nav li {
    float: left;
}

.nv-navbar .nav li a {
    padding: 10px;
    text-decoration: none;
    color: gray;
    font-weight: bold;
}

.nv-navbar .nav li a:hover {
    padding: 10px;
    text-decoration: none;
    color: darkslategrey;
}

.nv-navbar .nav li a.router-link-active {
    background-color: gold;
    color: darkslategrey;
}

.clearfix {
    clear: left;
}
</style>
