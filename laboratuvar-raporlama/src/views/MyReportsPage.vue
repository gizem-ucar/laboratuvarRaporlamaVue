<template>

<AppHeader />

<div class="myReports" v-for="report in reportList" :key="report.reportId">
        <router-link :to="{ name: 'ReportDetailPage'}" @click.prevent="onPressedReportDetail(report.reportId)">
            <div class="report-item">
                <div class="reportImage"><img :src="report.reportImage" alt=""></div>
                <div class="report-information">
                    <div class="form-text">
                        File number: {{report.fileNo}}
                    </div>
                    <div class="form-text">
                        Diagnosis Made: {{report.diagnosisMade}}
                    </div>
                    <div class="form-text">
                        Report Date: {{report.reportDate}}
                    </div>
                    <div class="form-text">
                        Patient TC: {{ report.patientTC }}
                    </div>
                    <div class="form-text">
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
        this.$appAxios.get(`/reports?userId=${userId}`)
          .then(res => {
            this.reportList = res?.data;
                console.log("reportList myReportsPage",this.reportList);
                console.log(res?.data);
          })
          .catch(error => {
            // İstek hatalı olduğunda yapılacak işlemler
            console.error(error);
          });
      },
      onPressedReportDetail(report_id) {
            const token = this.$store.state.tokenKey;
            this.$appAxios.get(`reports/${report_id}`, {
              headers: {
                'Authorization': `${token}`,
              }
            }).then(res => {
                this.reportDetail = res.data;
                this.$store.commit("setReport", this.reportDetail)
                console.log(this.reportDetail);
                // console.log(resProductDetail);
                this.$router.push({name : "ReportDetailPage"});
            })
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