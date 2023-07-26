<template>
<AppHeader />

<div class="profile">
    <div class="position-right">
        <button class="button-black" @click="profileUpdate(userId)">Düzenle</button>
    </div>
    <div class="profile-information-button">
        <div class="profile-image"><img src="@/assets/images/pngdeneme.png" alt=""></div>
        <div class="profile-information">
            <ul>
                <li>Name: 
                    <input  v-model="updateUser.userFirstName"  type="text" name="" id="">
                </li>
                <li>Lastname: 
                    <input  v-model="updateUser.userLastName" type="text" name="" id="">
                </li>
                <li>User name: 
                    <input  v-model="updateUser.userName" type="text" name="" id="">
                </li>
                <li>User TC: 
                    <input  v-model="updateUser.userTC" type="text" name="" id="">
                </li>
                <li>User Email: 
                    <input  v-model="updateUser.email" type="text" name="" id="">
                </li>
                <li>User photo: 
                    <input type="text" name="" id="">
                </li>
                <li>User role: 
                    <input  v-model="updateUser.roleId" type="text" name="" id="">
                </li>
                <li>User password: 
                    <input  v-model="updateUser.password" type="text" name="" id="">
                </li>
            </ul>
        </div>
    </div>
</div>

<AppFooter/>

</template>

<script>
import { mapState } from 'vuex';
export default{
    data(){
        return{
            user:null,
            updateUser:{
                userFirstName:null,
                userLastName:null,
                userName:null,
                userTC:null,
                email:null,
                password:null,
                roleId: null
            }
        };
    },
    created(){
        const userId = this.userId;
        this.fetchUser(userId);
    },
    methods: {
        fetchUser(userId) {
        const token = this.$store.state.tokenKey;
        this.$appAxios.get(`/users/${userId}`, {
              headers: {
                'Authorization': `${token}`,
              }
            })
          .then(res => {
            this.user = res?.data;
                console.log("user Profile",this.user);
                console.log(res?.data);
          })
          .catch(error => {
            // İstek hatalı olduğunda yapılacak işlemler
            console.error(error);
          });
        },      
        profileUpdate(userId){
            const token = this.$store.state.tokenKey;
            this.$appAxios.put(`/users/${userId}`, this.updateUser, {
              headers: {
                'Authorization': `${token}`,
              }
            })
          .then(res => {
            this.user = res?.data;
                console.log("user Update",this.user);
                console.log(res?.data);
                this.$router.push({name : "ProfilePage"});
          })
          .catch(error => {
            // İstek hatalı olduğunda yapılacak işlemler
            console.error(error);
          });
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user,
            // 'isLoading'
        }),
  }
}
</script>