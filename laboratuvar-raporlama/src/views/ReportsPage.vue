<template>

    <AppHeader />
    <div  class="reportFilter elemanter-container">
        <div class="elemanter-row">
        <h3>Rapor Arama</h3>
            <form @submit.prevent="searchReports">
              <label for="patientFirstName">Hasta Adı:</label>
              <input v-model="patientFirstName" type="text" id="patientFirstName" name="patientFirstName">
            
              <label for="patientLastName">Hasta Soyadı:</label>
              <input v-model="patientLastName" type="text" id="patientLastName" name="patientLastName">
            
              <label for="patientTC">Hasta Kimlik Numarası:</label>
              <input v-model="patientTC" type="text" id="patientTC" name="patientTC">
            
              <label for="labFirstName">Laborant Adı:</label>
              <input v-model="userFirstName" type="text" id="userFirstName" name="userFirstName">
            
              <label for="labLastName">Laborant Soyadı:</label>
              <input v-model="userLastName" type="text" id="userLastName" name="userLastName">
            
              <button type="submit" class="button-black">Ara</button>
            
              <button @click="sortedReport()" class="button-black">Tarihe göre sırala</button>
            </form>
        </div>
    </div>

    
    
    <app-report-list  :reports="reportList"/>
    
    <AppFooter/>
    
</template>

<script>
import appReportList from "@/components/Reports/appReportList/indexReportList.vue"

export default{
    components: {
        appReportList
    },
    data(){
        return{
            reportList : [],
            patientFirstName: '',
            patientLastName: '',
            patientTC: '',
            userFirstName: '',
            userLastName: '',
        }
    },
    created(){
        this.$appAxios.get('/reports'
            ).then(res => {
                this.reportList = res?.data;
                console.log("reportList reportsPage",this.reportList);
                console.log(res?.data);
            })
    },
    methods:{
        async searchReports() {
            const url = 'reports/search' +
              `?patientFirstName=${this.patientFirstName}` +
              `&patientLastName=${this.patientLastName}` +
              `&patientTC=${this.patientTC}` +
              `&userFirstName=${this.userFirstName}` +
              `&userLastName=${this.userLastName}`;

            const token = this.$store.state.tokenKey;
            try {
              const response = await this.$appAxios.get(url, {
              headers: {
                'Authorization': `${token}`,
              }
            });
              this.reportList = response.data;
            } catch (error) {
              console.error('Error while searching reports:', error);
            }
        },
        sortedReport(){
            const token = this.$store.state.tokenKey;
            this.$appAxios.get('/reports/sorted', {
              headers: {
                'Authorization': `${token}`
              }
            }).then(res => {
                this.reportList = res?.data;
                console.log("reportList sorted reportsPage",this.reportList);
                console.log(res?.data);
            })
        }
    }
};
</script>