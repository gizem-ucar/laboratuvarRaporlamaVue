<template>
        <div class="header">
        <div class="elemanter-container">
            <div class="elemanter-row">
                <section>
                    <div class="header-logo">Laboratory Reporting</div>
                    <div class="header-menu">
                        <ul>
                            <router-link :to="{ name: 'HomePage'}" ><li>Home</li></router-link>
                            <router-link :to="{ name: 'MyReportsPage'}"  v-if="_isAuthenticated"><li>My Reports</li></router-link>
                            <router-link :to="{ name: 'ReportsPage'}" ><li>Reports</li></router-link>
                            <router-link :to="{ name: 'PatientsPage'}" ><li>Patients</li></router-link>
                        </ul>
                    </div>
                    <div class="header-profile" v-if="_isAuthenticated">
                        <router-link :to="{ name: 'ProfilePage'}" >
                                <i class="fa-regular fa-user"></i>
                                Profile
                        </router-link>
                        <a class="nav-link " href="#" @click="onLogout">
                            <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i class="ni ni-collection text-info text-sm opacity-10"></i>
                            </div>
                            <span class="nav-link-text ms-1">Çıkış Yap</span>
                        </a>
                    </div>
                    <div class="header-profile" v-if="_notAuthenticated">
                        <router-link :to="{ name: 'AdminLoginPage'}" >
                                Login
                        </router-link>
                        <router-link :to="{ name: 'RegisterPage'}" >
                                Register
                        </router-link>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default{
    methods: {
        onLogout(){
            this.$store.commit("logoutUser");
            this.$router.push({ name: "AdminLoginPage"});
        }
    },
    computed:{
        ...mapGetters(["_isAuthenticated","_notAuthenticated"])
    }
}
</script>