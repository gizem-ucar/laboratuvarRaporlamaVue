<template>

<AppHeader />

    <div class="main">
        <router-link :to="{ name: 'MyReportsPage'}"  v-if="_isAuthenticated">
            <div class="myReports-card">
                <div><i class="fa-light fa-hospital-user"></i></div>
                <div>My Reports</div>
            </div>
        </router-link>
        <router-link :to="{ name: 'ReportsPage'}" >
            <div class="reports-card">
                <div><i class="fa-light fa-file-chart-column"></i></div>
                <div>Reports</div>
            </div>
        </router-link>
        
        <router-link :to="{ name: 'PatientsPage'}" >
            <div class="patients-card">
                <div><i class="fa-light fa-bed"></i></div>
                <div>Patients</div>
            </div>
        </router-link>
        
        <router-link :to="{ name: 'ProfilePage'}" v-if="_isAuthenticated">
            <div class="profile-card">
                <div><i class="fa-light fa-user"></i></div>
                <div>Profile</div>
            </div>
        </router-link>
        
    </div>

<AppFooter/>

</template>


<script>
import { mapGetters } from 'vuex';

export default {
    data(){
        return{
        };
    },
    computed:{
        ...mapGetters(["_isAuthenticated","_notAuthenticated"])
    }
}

</script>