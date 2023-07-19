<template>

    <div class="login">
        <div class="login-box">
            <router-link :to="{ name: 'HomePage'}" >
            <div class="login-logo">Laboratory Reporting</div>
            </router-link>
            <div class="login-input">

                <!-- <div>Name <input type="text" name="" id="" placeholder="Name"></div>
                <div>Surname <input type="text" name="" id="" placeholder="Surname"></div>
                <div>Email <input type="email" name="" id="" placeholder="Email"></div>
                <div>Password <input type="password" name="" id="" placeholder="Password"></div> -->

                <!-- <input type="text" name="" id="" placeholder="Name">
                <input type="text" name="" id="" placeholder="Surname"> -->
                <input v-model="userData.userName" type="text" name="" id="" placeholder="Kullanıcı adı">
                <input v-model="userData.password" type="password" name="" id="" placeholder="Password">
                <div class="register-login">Kayıt olmadıysanız kayıt olabilirsiniz.
                <router-link :to="{ name: 'RegisterPage'}" >
                    <a href="#">Register</a>
                </router-link>
                </div>

                <input @click="onLogin" type="submit" name="" id="" value="Giriş Yap" class="record">
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
                password : null,
            }    
        };
        
    },
    methods : {
        onLogin(){
            this.login(this.userData)
        },
        ...mapActions({
            login: 'login',
        }),
    },
    computed: mapState([
    // map this.count to store.state.count
     'isLoading'
    ])
};

</script>