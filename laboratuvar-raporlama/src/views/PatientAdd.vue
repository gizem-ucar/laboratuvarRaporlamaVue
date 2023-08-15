<template>
    <AppHeader/>

    <div class="report-detail">
            <div class="report-detail-container">
                <div class="report-detail-row">
                    <div class="report-information">
                        <div class="form-text">
                            Patient TC:                             
                            <input type="text" v-model="patientAdd.patientTC">
                        </div>
                        <div class="form-text">
                            Patient First Name:                             
                            <input type="text" v-model="patientAdd.patientFirstName">
                        </div>
                        <div class="form-text">
                            Patient Last Name: 
                            <input type="text" v-model="patientAdd.patientLastName">
                        </div>
                    </div>
                    <div>
                        <button class="button" @click="addpatient()">Ekle</button>
                    </div>
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
            patientAdd:{
                patientTC:null,
                patientFirstName:null,
                patientLastName:null
            }
        };
    },
    methods:{
        addpatient(){
            const token = this.$store.state.tokenKey;
            this.$appAxios.post("patients", this.patientAdd, {
              headers: {
                'Authorization': `${token}`
              }
            }).then(res => {
                    console.log('this.patientAdd nedir', this.patientAdd)
                    console.log(res.data);
                    // console.log(resProductDetail);
                    this.$router.push({name : "PatientsPage"});
                })
        }
    },
    computed: {
        ...mapState({
            patientDetail: state => state.patient,
            userId: state => state.user,
        }),
  }
}
</script>