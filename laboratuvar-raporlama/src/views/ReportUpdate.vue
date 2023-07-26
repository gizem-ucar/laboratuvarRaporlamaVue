<template>
    <AppHeader />
        <div class="report-detail">
            <div class="report-detail-container">
                <div class="report-detail-row">
                    <div><img :src="this.reportDetail.reportImage" alt=""></div>
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
            }
        };
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
        }
    },
    computed: {
        ...mapState({
            reportDetail: state => state.report,
            // 'isLoading'
        }),
  }
}
</script>