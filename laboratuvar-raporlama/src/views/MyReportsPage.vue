<template>

<AppHeader />

<div class="myReports">
        
            <div v-for="report in reportList" :key="report.reportId">
              <router-link class="report-item" :to="{ name: 'ReportDetailPage'}" @click.prevent="onPressedReportDetail(report.reportId)">
                <div class="reportImage">
                    <img v-if="reportImageUrlMap[report.reportId]" :src="reportImageUrlMap[report.reportId]" alt="">
                </div>
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
              </router-link>
            </div>
    </div>

    <AppFooter/>

</template>

<script>
import { mapState } from 'vuex';
export default{
    data(){
        return{
            reportList : [],
            reportImageUrlMap: {}
        }
    },
    created(){
        const userId = this.userId;
        this.fetchReports(userId);
        // Önce localStorage'dan verileri yükle
        const storedData = localStorage.getItem('reportImageData');
        if (storedData) {
          this.reportImageUrlMap = JSON.parse(storedData);
        } else {
          this.fetchReportImages();
        }
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
        },
        async fetchReportImages() {
          try {
            const token = this.$store.state.tokenKey;
        
            // Tüm raporları dolaşıp, reportId'ye göre base64 kodlu veriyi al ve map'e ekle
            for (const report of this.reportList) {
              const reportId = report.reportId;
              const response = await this.$appAxios.get(`/images/${reportId}`, {
                headers: {
                  Authorization: `${token}`
                },
                responseType: 'text'
              });
          
              this.reportImageMap[reportId] = `data:image/jpeg;base64, ${response.data}`;
            }
        
            // localStorage'a verileri kaydet
            localStorage.setItem('reportImageMap', JSON.stringify(this.reportImageMap));
          } catch (error) {
            console.error("Error while fetching image URL:", error);
          }
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