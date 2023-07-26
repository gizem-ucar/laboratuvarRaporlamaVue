import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";


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
        name: "PatientProfile",
        path: "/patient",
        component: () => import("@/views/PatientProfile")
    },
    {
        name: "PatientAdd",
        path: "/patientadd",
        component: () => import("@/views/PatientAdd")
    },
    {
        name: "ProfilePage",
        path: "/profile",
        component: () => import("@/views/ProfilePage")
    },
    {
        name: "ProfileUpdate",
        path: "/profile-update",
        component: () => import("@/views/ProfileUpdate")
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
    },
    {
        name: "ReportUpdate",
        path: "/reportupdate",
        component: () => import("@/views/ReportUpdate")
    },
    {
        name: "ReportAdd",
        path: "/reportadd",
        component: () => import("@/views/ReportAdd")
    }
    
];

const router = createRouter({
    routes,
    history: createWebHashHistory()
});

router.beforeEach((to, _, next) => {
    const authRequiredRoutes = ["ProfilePage", "MyReportsPage", "ProfileUpdate", "ReportAdd", "ReportUpdate"];
    const authNotRequiredRoutes = ["AdminLoginPage", "RegisterPage"]
    const _isAuthenticated = store.getters._isAuthenticated;

    if(authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);

    if(authRequiredRoutes.indexOf(to.name) > - 1){
        if(_isAuthenticated) next();
        else next({name : "AdminLoginPage"});
    }else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
//     const _isAuthenticated = store.getters._isAuthenticated;
//     const userRole = store.getters.getUserRole;
  
//     if (authNotRequiredRoutes.includes(to.name)) {
//       next();
//     } else if (_isAuthenticated) {
//       if (userRole === "Admin") {
//         next(); // Kullanıcı admin rolüne sahipse herhangi bir kısıtlama olmadan devam et
//       } else {
//         next({ name: "HomePage" }); // Kullanıcı admin rolüne sahip değilse Ana Sayfa'ya yönlendir
//       }
//     } else {
//       next({ name: "LoginPage" }); // Kullanıcı giriş yapmamışsa Giriş Sayfası'na yönlendir
//     }
//   });


export default router;