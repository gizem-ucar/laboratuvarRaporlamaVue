<template>

    <AppHeader />
    
    <div class="patients" v-for="patient in patientList" :key="patient.patientTC">
                <router-link :to="{ name: 'ReportDetailPage'}" >
                    <div class="patient-item">
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
                    </div>
                </router-link>
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
        this.$appAxios.get('/api/patients/getall'
            ).then(res => {
                this.patientList = res?.data.data;
                console.log("patientList patientsPage",this.patientList);
                console.log(res?.data);
            })
    }
};
</script>