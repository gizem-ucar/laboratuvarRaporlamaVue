<template>
<AppHeader />
    <div class="report-detail">
        <div class="report-detail-container">
            <div class="report-detail-row">
                <div><img v-if="reportImageUrl" :src="reportImageUrl" alt=""></div>
                <div class="report-information">
                    <div class="form-text">
                        File number: {{this.reportDetail.fileNo}}
                    </div>
                    <div class="form-text">
                        Diagnosis Made: {{this.reportDetail.diagnosisMade}}
                    </div>
                    <div class="form-text">
                        Diagnosis Detail: {{this.reportDetail.diagnosisDetail}}
                    </div>
                    <div class="form-text">
                        Report Date: {{this.reportDetail.reportDate}}
                    </div>
                    <div class="form-text">
                        Patient TC: {{this.reportDetail.patientTC}}
                    </div>
                    <div class="form-text">
                        Patient Name: {{this.reportDetail.patientFirstName}} {{this.reportDetail.patientLastName}}
                    </div>
                </div>
                <div>
                    <button class="button">Sil</button>
                    <button class="button">
                        <router-link :to="{ name: 'ReportUpdate'}" >
                            Düzenle
                        </router-link>
                    </button>
                </div>
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
            reportImageUrl: ''
        };
    },
    created() {
    //   this.fetchReportImage();
    },
    watch: {
    reportDetail: {
      immediate: true,
      handler() {
        // Seçili rapor değiştiğinde veya detay sayfası oluşturulduğunda
        // raporun resmini güncelle
        this.fetchReportImage();
      },
    },
    },
    methods: {
        async fetchReportImage() {
          try {
            const token = this.$store.state.tokenKey;
            const reportId = this.reportDetail.reportId; // Örnek olarak reportId'yi buradan alıyorum
        
            // Sunucudan base64 kodlu veriyi al
            const response = await this.$appAxios.get(`/images/${reportId}`, {
              headers: {
                Authorization: `${token}`
              },
              responseType: 'text' // responseType'i text olarak belirtiyoruz
            });
        
            // response.data, base64 kodlu veriyi içerir, bu veriyi reportImageUrl'e atıyoruz
            this.reportImageUrl = `data:image/jpeg;base64, ${response.data}`;
            console.log('report detail response', response)
            console.log('this.reportImageUrl', this.reportImageUrl)
          } catch (error) {
            console.error("Error while fetching image URL:", error);
            this.reportImageUrl = ''; // Hata durumunda reportImageUrl'i boş bırakabilirsiniz
          }
        },
    },
    computed: {
        ...mapState({
            reportDetail: state => state.report,
            // 'isLoading'
        }),
  }
}
</script>