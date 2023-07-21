<template>

    <div class="register">
        <div class="register-box">
            <router-link :to="{ name: 'HomePage'}" >
            <div class="register-logo">Laboratory Reporting</div>
            </router-link>
            <div class="register-input">

                <!-- <div>Name <input type="text" name="" id="" placeholder="Name"></div>
                <div>Surname <input type="text" name="" id="" placeholder="Surname"></div>
                <div>Email <input type="email" name="" id="" placeholder="Email"></div>
                <div>Password <input type="password" name="" id="" placeholder="Password"></div> -->

                <input v-model="userData.userFirstName" type="text" name="" id="" placeholder="İsim">
                <input v-model="userData.userLastName" type="text" name="" id="" placeholder="Soyisim">
                <input v-model="userData.userTC" type="text" name="" id="" placeholder="TC kimlik">
                <input v-model="userData.email" type="email" name="" id="" placeholder="Email">
                <input v-model="roleName" type="text" name="" id="" placeholder="Rol">
                <input v-model="userData.userName" type="text" name="" id="" placeholder="User Name">
                <input v-model="userData.password" type="password" name="" id="" placeholder="Password">
                
                <div class="register-login">Kayıt olduysanız giriş yapabilirsiniz.
                <router-link :to="{ name: 'LoginPage'}" >
                    <a href="#">Login</a>
                </router-link>
                </div>

                <input type="submit" name="" id="" value="Kayıt Ol" class="record">
            </div>
        </div>
    </div>

</template>

<script>


import { mapState, mapActions } from "vuex"


export default{
    data(){
        return {
            userData : {
                userName : null,
                userFirstName : null,
                userLastName : null,
                userTC : null,
                email : null,
                password : null,
                roleId : null,
            },
            roleName:null    
        };
        
    },
    methods : {
        onregister(){
            this.register(this.userData)
        },
        ...mapActions({
            register: 'register',
        }),
    },
    computed: mapState([
    // map this.count to store.state.count
     'isLoading'
    ])
};
</script>