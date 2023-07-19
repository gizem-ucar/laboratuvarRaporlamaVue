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

                <router-link :to="{ name: 'AdminLoginPage'}" >
                <div class="login-option">Admin Giriş</div>
                </router-link>
                <router-link :to="{ name: 'AdminLoginPage'}" >
                <div class="login-option">Kullanıcı Giriş</div>
                </router-link>
                <div class="register-login">Kayıt olmadıysanız kayıt olabilirsiniz.
                    <router-link :to="{ name: 'RegisterPage'}" >
                    <a href="#">Register</a>
                    </router-link>
                </div>

                <input type="submit" name="" id="" value="Giriş Yap" class="record">
                
            </div>
        </div>
    </div>

</template>