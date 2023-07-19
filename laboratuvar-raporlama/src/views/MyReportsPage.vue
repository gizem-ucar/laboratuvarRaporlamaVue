<template>

<AppHeader />

<div class="myReports" v-for="report in reportList" :key="report.reportId">
        <router-link :to="{ name: 'ReportDetailPage'}" >
            <div class="report-item">
                <div class="reportImage"><img :src="report.reportImage" alt=""></div>
                <div class="report-information">
                    <div class="file-number">
                        File number: {{report.fileNo}}
                    </div>
                    <div class="diagnosisMade">
                        Diagnosis Made: {{report.diagnosisMade}}
                    </div>
                    <div class="reportDate">
                        Report Date: {{report.reportDate}}
                    </div>
                    <div class="patientTC">
                        Patient TC: {{ report.patientTC }}
                    </div>
                    <div class="patientName">
                        Patient Name: {{ report.patientFirstName }} {{ report.patientLastName }}
                    </div>
                </div>
            </div>
        </router-link>
    </div>

    <AppFooter/>

</template>

<script>
import { mapState } from 'vuex';
export default{
    data(){
        return{
            reportList : []
        }
    },
    created(){
        const userId = this.userId;
        this.fetchReports(userId);
    },
    methods: {
      fetchReports(userId) {
        this.$appAxios.get(`http://localhost:8080/reports?userId=${userId}`)
          .then(res => {
            this.reportList = res?.data;
                console.log("reportList myReportsPage",this.reportList);
                console.log(res?.data);
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
};
</script>