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
            reportList : [],
            reportImageUrlMap: {}
        };
    },
    computed: {
        ...mapState({
            patientDetail: state => state.patient,
            // 'isLoading'
        }),
  },
  created(){
        // const patientId = this.patientDetail.patientId;
        // this.fetchReports(patientId);
        // Önce localStorage'dan verileri yükle
        const storedData = localStorage.getItem('reportImageData');
        if (storedData) {
          this.reportImageUrlMap = JSON.parse(storedData);
        } else {
          this.fetchReportImages();
        }
    },
    watch: {
    patientDetail: {
      immediate: true,
      handler() {
        // Seçili rapor değiştiğinde veya detay sayfası oluşturulduğunda
        // raporun resmini güncelle
        const patientId = this.patientDetail.patientId;
        this.fetchReports(patientId);
        // // Önce localStorage'dan verileri yükle
        // const storedData = localStorage.getItem('reportImageData');
        // console.log('storedData', storedData)
        // if (storedData) {
        //   this.reportImageUrlMap = JSON.parse(storedData);
        //   console.log('this.reportImageUrlMap', this.reportImageUrlMap)
        // } else {
        //   this.fetchReportImages();
        // }
      },
    },
    },
  methods:{
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
    fetchReports(patientId) {
        this.$appAxios.get(`/reports?patientId=${patientId}`)
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
              for (const report of this.reportList) {
                const reportId = report.reportId;
                const response = await this.$appAxios.get(`/images/${reportId}`, {
                  headers: {
                    Authorization: `${token}`
                  },
                  responseType: 'text'
                });

                console.log('response', response)
            
                this.reportImageUrlMap[reportId] = `data:image/jpeg;base64, ${response.data}`;

                console.log('this.reportImageUrlMap[reportId]', this.reportImageUrlMap[reportId])
              }
                // localStorage'a verileri kaydet
                localStorage.setItem('reportImageData', JSON.stringify(this.reportImageUrlMap));
            } catch (error) {
              console.error("Error while fetching image URL:", error);
            }
        },
  }
}
</script>