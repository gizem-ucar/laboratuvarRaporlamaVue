<template>
    <AppHeader/>

    <div class="report-detail">
            <div class="report-detail-container">
                <div class="report-detail-row">
                    <div class="report-information">
                        <div class="form-text">
                            Patient TC:                             
                            <input type="text" v-model="patientUpdate.patientTC">
                        </div>
                        <div class="form-text">
                            Patient First Name:                             
                            <input type="text" v-model="patientUpdate.patientFirstName">
                        </div>
                        <div class="form-text">
                            Patient Last Name: 
                            <input type="text" v-model="patientUpdate.patientLastName">
                        </div>
                    </div>
                    <div>
                        <button class="button" @click="updatePatient(this.patientDetail.patientId)">Düzenle</button>
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
            patientUpdate:{
                patientTC:null,
                patientFirstName:null,
                patientLastName:null
            }
        };
    },
    methods:{
        updatePatient(patientId){
            const token = this.$store.state.tokenKey;
            this.$appAxios.put(`patients/${patientId}`, this.patientUpdate, {
              headers: {
                'Authorization': `${token}`
              }
            }).then(res => {
                    console.log('this.patientUpdate nedir', this.patientUpdate)
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