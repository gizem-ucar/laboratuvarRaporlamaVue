<template>
<AppHeader />

<div class="profile profile-update">
    <div class="position-right">
        <button class="button-black" @click="profileUpdate(userId)">Düzenle</button>
    </div>
    <div class="profile-information-button">
        <div class="profile-image" v-if="imageUrl"><img v-show="imageUrl" :src="imageUrl"/></div>
        <div class="profile-image" v-else ><img src="../assets/images/profileAvatar.png" alt=""></div>
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
                    <!-- <input type="text" name="" id=""> -->
                    <input class="form-control" type="file" id="userImageFile" name="userImageFile" @change="handleFileChange">
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
                userImageFile:null,
                password:null,
                roleId: null
            },
            imageUrl: null,
        };
    },
    created(){
        const userId = this.userId;
        this.fetchUser(userId);
    },
    methods: {
        handleFileChange(event) {
            this.updateUser.userImageFile = event.target.files[0];
            let fileReader = new FileReader();
            fileReader.readAsDataURL(this.updateUser.userImageFile);

            fileReader.addEventListener("load", () => {
                this.imageUrl = fileReader.result;
            });
        },
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
            const formData = new FormData();
            formData.append('userFirstName', this.updateUser.userFirstName);
            formData.append('userLastName', this.updateUser.userLastName);
            formData.append('userName', this.updateUser.userName);
            formData.append('userTC', this.updateUser.userTC);
            formData.append('email', this.updateUser.email);
            formData.append('password', this.updateUser.password);
            formData.append('roleId', this.updateUser.roleId);
            formData.append('file', this.updateUser.userImageFile);
            

            for (const entry of formData.entries()) {
              console.log("FormData update",entry);
            }

            const token = this.$store.state.tokenKey;
            this.$appAxios.put(`/users/${userId}`, formData, {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
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