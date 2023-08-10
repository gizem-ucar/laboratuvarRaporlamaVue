<template>
    <AppHeader />
        <div class="report-detail">
            <div class="report-detail-container">
                <div class="report-detail-row">
                    <div><img v-if="reportImageUrl" :src="reportImageUrl" alt=""></div>
                    <div class="report-information">
                        <div class="form-text">
                            Diagnosis Made:                             
                            <input type="text" v-model="reportUpdate.diagnosisMade">
                        </div>
                        <div class="form-text">
                            Diagnosis Detail: 
                            <input type="text" v-model="reportUpdate.diagnosisDetail">
                        </div>
                        <div class="form-text">
                            Rapor fotoğrafı: 
                            <input type="text" v-model="reportUpdate.reportImage">
                        </div>
                    </div>
                    <div>
                        <button class="button" @click="updateReport(this.reportDetail.reportId)">Düzenle</button>
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
            reportUpdate:{
                diagnosisMade:null,
                diagnosisDetail:null,
                reportImage:null
            },
            reportImageUrl: ''
        };
    },
    created() {
      this.fetchReportImage();
    },
    methods:{
        updateReport(reportId){
            const token = this.$store.state.tokenKey;
            this.$appAxios.put(`reports/${reportId}`, this.reportUpdate, {
              headers: {
                'Authorization': `${token}`
              }
            }).then(res => {
                    console.log('this.reportUpdate nedir', this.reportUpdate)
                    console.log(res.data);
                    // console.log(resProductDetail);
                    this.$router.push({name : "ReportsPage"});
                })
        },
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