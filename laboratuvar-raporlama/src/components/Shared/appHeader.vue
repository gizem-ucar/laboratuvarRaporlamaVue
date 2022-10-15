<template>
        <div class="header">
        <div class="elemanter-container">
            <div class="elemanter-row">
                <section>
                    <div class="header-logo">Laboratory Reporting</div>
                    <div class="header-menu">
                        <ul>
                            <router-link :to="{ name: 'HomePage'}" ><li>Home</li></router-link>
                            <router-link :to="{ name: 'MyReportsPage'}" ><li>My Reports</li></router-link>
                            <router-link :to="{ name: 'ReportsPage'}" ><li>Reports</li></router-link>
                            <router-link :to="{ name: 'PatientsPage'}" ><li>Patients</li></router-link>
                        </ul>
                    </div>
                    <div class="header-profile">
                        <router-link :to="{ name: 'ProfilePage'}" >
                                <i class="fa-regular fa-user"></i>
                                Profile
                        </router-link>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>