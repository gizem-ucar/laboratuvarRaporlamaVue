<template>
    <AppHeader />
        <div class="report-detail">
            <div class="report-detail-container">
                <div class="report-detail-row">
                    <div><img :src="this.reportDetail.reportImage" alt=""></div>
                    <div class="report-information">
                        <div class="diagnosisMade">
                            Diagnosis Made:                             
                            <input type="text" v-model="reportUpdate.diagnosisMade">
                        </div>
                        <div class="diagnosisDetail">
                            Diagnosis Detail: 
                            <input type="text" v-model="reportUpdate.diagnosisDetail">
                        </div>
                        <div class="file-number">
                            Rapor fotoğrafı: 
                            <input type="text" v-model="reportUpdate.reportImage">
                        </div>
                    </div>
                    <div>
                        <button class="button">Düzenle</button>
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
                this.$appAxios.put(`reports/${reportId}`, this.reportUpdate, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(res => {
                        console.log('this.placeUpdate nedir', this.placeUpdate)
                        console.log(res.data.message);
                        // console.log(resProductDetail);
                        this.$router.push({name : "PlacesPage"});
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