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

                <input type="text" name="" id="" placeholder="Name">
                <input type="text" name="" id="" placeholder="Surname">
                <input type="email" name="" id="" placeholder="Email">
                <input type="password" name="" id="" placeholder="Password">
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