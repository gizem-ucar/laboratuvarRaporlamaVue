
import {createStore} from "vuex";
// import CryptoJS from 'crypto-js'
import {appAxios} from "@/utils/appAxios"
import createPersistedState from "vuex-persistedstate";
import router from "@/router"

import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default createStore({
    state: {
        user: null,
        userRole: null,
        isLoading: false,
        tokenKey: null,
        // place: null,
        // placeInformation: null,
        errorMessage: "",
        // count: 0
    },
    mutations: {
        setLoading(state, value) {
            state.isLoading = value;
        },
        setTokenKey(state, value) {
            state.tokenKey = value;
        },
        // setPlace(state, value) {
        //     state.place = value;
        // },
        // setPlaceInformation(state, value) {
        //     state.place = value;
        // },
        setUser(state, user){
            state.user = user;
            // console.log("setUser mutations",user);
        },
        setMessage(state, value){
            state.errorMessage = value;
        },
        logoutUser(state){         //appHeader da tanımlıyoruz. Çıkış yapmak için kullanıyoruz.
            state.user = null;
            // console.log("logout mutation")
        },
        setUserRole(state, role) {
            state.userRole = role;
          },
    },
    getters : {
        _isAuthenticated: state => state.user != null,    //Authenticated olup olmadığını bakıyor.
        _notAuthenticated: state => state.user == null,
        _getCurrentUser(state){
            const user = state.user;
            delete user?.password;
            return user;
        },
        getUserRole: state => state.userRole,
        _currentUserId :state => state?.user?.id,
    },
    plugins : [
        createPersistedState({
            storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
            },
        }),
    ],
    actions: {
        setUserRole({ commit }, role) {
            commit('setUserRole', role);
          },
        async register({commit}, userData) {
            commit("setLoading", true)
            try {
                // const key = "eticaret123!456"
                // const password = CryptoJS.AES.encrypt(userData.password, key).toString();
                // userData.password = password;
                // console.log(cryptedPassword)
                // console.log(this.userData);
            
                const body = { ...userData }
                // console.log(body);
                
                const response = await appAxios.post("auth/register", body, {headers: {
                    'content-type': 'application/json',
                }} 
                );
                
                commit("setLoading", false)
                const data = response;
                console.log("data döndü: ", data)



                // if (data.success === true) {
                //     const user = data.resultData;
              
                //     commit("setUserRole", user.role); // Kullanıcının rolünü güncelle
                //     commit("setUser", user); // Kullanıcı bilgilerini güncelle
              
                //     if (user.role === "visitor") {
                //       console.log("Visitor olarak giriş yapıldı");
                //       router.push({ name: "HomePage" });
                //     } else {
                //       commit("setUser", user);
                //       router.push({ name: "AdminDashboard" });
                //     }
                // } else {
                //     commit("setMessage", "Hata oluştu. Tekrar deneyin");
                // }
            }catch (error) {
                console.log("hata döndü : ", error)
                commit("setLoading", false)
                commit("setMessage", "Hata oluştu. Tekrar deneyin")
            }
        },
        async login({commit}, userData) {
            commit("setLoading", true)
            
            try {
                const body = { ...userData }
                // console.log(body);
                
                const response = await appAxios.post("auth/login", body, {headers: {
                    'content-type': 'application/json',
                }}
                );
                commit("setLoading", false)

                 const data = response.data;
                 console.log("data döndü : ", data)

                 if(data.success === true) {
                    const userId = data.userId;
                    console.log("userId",userId)

                    commit("setUserRole", data.roleName); // Kullanıcının rolünü güncelle
                    commit("setUser", userId); // Kullanıcı bilgilerini güncelle

                    if (data.roleName === "ADMIN") {
                        // Admin rolüne sahip olduğunda yapılacak işlemler
                        console.log("ADMIN olarak giriş yapıldı");
                        // Örneğin, yönlendirme işlemi yapabilirsiniz:
                        router.push({ name: "HomePage" });
                      } else {
                        // Admin rolüne sahip olmayan kullanıcı işlemleri
                        commit("setUser", userId);
                        router.push({ name: "HomePage" });
                      }
                 } else {
                    commit("setMessage", "Hata oluştu. Tekrar deneyin")
                 }
            } catch (error) {
                console.log("hata döndü : ", error)
                commit("setLoading", false)
                commit("setMessage", "Hata oluştu. Tekrar deneyin")
            }
        },
    },
});