<template>
<AppHeader />

<div class="profile">
    <div class="position-right">
        
        <router-link :to="{ name: 'ProfileUpdate'}" >
          <button class="button-black">
                Düzenle
          </button>
        </router-link>
        <router-link :to="{ name: 'PatientAdd'}" >
          <button class="button-black">
                Yeni Hasta Ekle
          </button>
        </router-link>
    </div>
    <div class="profile-information-button">
        <div class="profile-image"><img src="@/assets/images/pngdeneme.png" alt=""></div>
        <div class="profile-information">
            <ul>
                <li>User Name: {{ user.userFirstName }}</li>
                <li>User Lastname: {{ user.userLastName }}</li>
                <li>User TC: {{ user.userTC }}</li>
                <li>User Email: {{ user.email }}</li>
            </ul>
        </div>
    </div>
    <div class="profile-reports">
        <div v-for="report in reportList" :key="report.reportId">
            <router-link class="profile-report-item" :to="{ name: 'ReportDetailPage'}" @click.prevent="onPressedReportDetail(report.reportId)">
            <div class="reportImage"><img v-if="reportImageUrlMap[report.reportId]" :src="reportImageUrlMap[report.reportId]" alt=""></div>
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
            </router-link>
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
            user:null,
            reportList : [],
            reportImageUrlMap: {}
        };
    },
    created(){
        const userId = this.userId;
        this.fetchUser(userId);
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
        onPressedReportDetail(report_id) {
            const token = this.$store.state.tokenKey;
            this.$appAxios.get(`reports/${report_id}`, {
              headers: {
                'Authorization': `${token}`,
              }
            }).then(res => {
                const selectedReport = res.data;
                this.$store.commit("setReport", selectedReport)
                console.log("selectedReport",selectedReport);
                // console.log(resProductDetail);
                this.$router.push({name : "ReportDetailPage"});
            })
        },
        fetchUser(userId) {
        const token = this.$store.state.tokenKey;
        this.$appAxios.get(`/users/${userId}`, {
              headers: {
                'Authorization': `${token}`,
              }
            })
          .then(res => {
            this.user = res?.data;
                console.log("user Profile",this.user);
                console.log(res?.data);
          })
          .catch(error => {
            // İstek hatalı olduğunda yapılacak işlemler
            console.error(error);
          });
      },
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
      async fetchReportImages() {
            try {
              const token = this.$store.state.tokenKey;
            
              // Tüm raporları dolaşıp, reportId'ye göre base64 kodlu veriyi al ve map'e ekle
              for (const report of this.reports) {
                const reportId = report.reportId;
                const response = await this.$appAxios.get(`/images/${reportId}`, {
                  headers: {
                    Authorization: `${token}`
                  },
                  responseType: 'text'
                });
            
                this.reportImageUrlMap[reportId] = `data:image/jpeg;base64, ${response.data}`;
              }
                // localStorage'a verileri kaydet
                localStorage.setItem('reportImageData', JSON.stringify(this.reportImageUrlMap));
            } catch (error) {
              console.error("Error while fetching image URL:", error);
            }
        },
    },
    computed: {
        ...mapState({
            userId: state => state.user,
            // 'isLoading'
        }),
  }
}
</script>