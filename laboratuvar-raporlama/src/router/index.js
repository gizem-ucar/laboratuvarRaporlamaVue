import { createRouter, createWebHashHistory } from "vue-router";

const routes=[
    {
        name: "LoginPage",
        path: "/",
        component: () => import("@/views/LoginPage")
    },
    {
        name: "AdminLoginPage",
        path: "/login-admin",
        component: () => import("@/views/AdminLoginPage")
    },
    {
        name: "RegisterPage",
        path: "/register",
        component: () => import("@/views/RegisterPage")
    },
    {
        name: "HomePage",
        path: "/home",
        component: () => import("@/views/HomePage")
    },
    {
        name: "MyReportsPage",
        path: "/myreports",
        component: () => import("@/views/MyReportsPage")
    },
    {
        name: "PatientsPage",
        path: "/patients",
        component: () => import("@/views/PatientsPage")
    },
    {
        name: "ProfilePage",
        path: "/profile",
        component: () => import("@/views/ProfilePage")
    },
    {
        name: "RegisterPage",
        path: "/register",
        component: () => import("@/views/RegisterPage")
    },
    {
        name: "ReportsPage",
        path: "/reports",
        component: () => import("@/views/ReportsPage")
    },
    {
        name: "ReportDetailPage",
        path: "/reportdetail",
        component: () => import("@/views/ReportDetailPage")
    }
    
];

const router = createRouter({
    routes,
    history: createWebHashHistory()
});


export default router;