<template>

    <AppHeader />
    
    <div class="patients">
        <div class="patient-item" v-for="patient in patientList" :key="patient.patientTC">
            <router-link :to="{ name: 'ReportDetailPage'}" >
            <div class="patientImage"><img src="@/assets/images/pngdeneme.png" alt=""></div>
            <div class="patient-information">
                <div class="patientTC">
                    Patient TC: {{patient.patientTC}}
                </div>
                <div class="patientFirstName">
                    Patient Name: {{patient.patientFirstName}}
                </div>
                <div class="patientLastName">
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
    }
};
</script>