<template>
<AppHeader />

<div class="profile">
    <div class="position-right">
        
        <button class="button-black">
                Düzenle
        </button>
        <button class="button-black">
            <router-link :to="{ name: 'ReportAdd'}" >
                Yeni Rapor Ekle
            </router-link>
        </button>
    </div>
    <div class="profile-information-button">
        <div class="profile-information">
            <ul>
                <li>Patient Name: {{ this.patientDetail.patientFirstName }}</li>
                <li>Patient Lastname: {{ this.patientDetail.patientLastName }}</li>
                <li>Patient TC: {{ this.patientDetail.patientTC }}</li>
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
        };
    },
    computed: {
        ...mapState({
            patientDetail: state => state.patient,
            // 'isLoading'
        }),
  }
}
</script>