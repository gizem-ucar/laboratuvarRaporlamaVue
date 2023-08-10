<template>

    <AppHeader />
    
    <div class="patients">
        <div class="patient-item" v-for="patient in patientList" :key="patient.patientTC">
            <router-link :to="{ name: 'PatientProfile'}"  @click.prevent="onPressedPatientDetail(patient.patientId)">
            <!-- <div class="patientImage"><img src="@/assets/images/pngdeneme.png" alt=""></div> -->
            <div class="patient-information">
                <div class="form-text">
                    Patient TC: {{patient.patientTC}}
                </div>
                <div class="form-text">
                    Patient Name: {{patient.patientFirstName}}
                </div>
                <div class="form-text">
                    Patient Surname: {{patient.patientLastName}}
                </div>
            </div>
            </router-link>
        </div>
    </div>
    
        <AppFooter/>
    
    </template>

<script>

export default{
    data(){
        return{
            patientList : []
        }
    },
    created(){
        this.$appAxios.get('/patients'
            ).then(res => {
                this.patientList = res?.data;
                console.log("patientList patientsPage",this.patientList);
                console.log(res?.data);
            })
    },
    methods:{
        onPressedPatientDetail(patient_id) {
            const token = this.$store.state.tokenKey;
            this.$appAxios.get(`patients/${patient_id}`, {
              headers: {
                'Authorization': `${token}`,
              }
            }).then(res => {
                this.patientDetail = res.data;
                this.$store.commit("setPatient", this.patientDetail)
                console.log("patientDetail" , this.patientDetail);
                // console.log(resProductDetail);
                this.$router.push({name : "PatientProfile"});
            })
        }
    }
};
</script>