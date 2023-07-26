<template>
    <AppHeader/>

    <div class="report-detail">
            <div class="report-detail-container">
                <div class="report-detail-row">
                    <div><img src="this.reportDetail.reportImage" alt=""></div>
                    <div class="report-information">
                        <div class="form-text">
                            File No:                             
                            <input type="text" v-model="reportAdd.fileNo">
                        </div>
                        <div class="form-text">
                            Diagnosis Made:                             
                            <input type="text" v-model="reportAdd.diagnosisMade">
                        </div>
                        <div class="form-text">
                            Diagnosis Detail: 
                            <input type="text" v-model="reportAdd.diagnosisDetail">
                        </div>
                        <div class="form-text">
                            Rapor Tarihi: 
                            <input type="text" v-model="reportAdd.reportDate">
                        </div>
                        <div class="form-text">
                            Rapor Fotoğrafı:                             
                            <!-- <input type="text" v-model="reportAdd.reportImageFile"> -->
                            <input class="form-control" type="file" id="reportImageFile" name="reportImageFile" @change="handleFileChange">
                        </div>
                    </div>
                    <div>
                        <button class="button" @click="addReport()">Ekle</button>
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
            reportAdd:{
                fileNo:null,
                userId:null,
                diagnosisMade:null,
                diagnosisDetail:null,
                reportDate: null,
                reportImageFile: null,
                patientId: null
            }
        };
    },
    created(){
        console.log('this.patientDetail.patientId', this.patientDetail.patientId)
        console.log('this.userId', this.userId)
        console.log('this.reportAdd', this.reportAdd)
    },
    methods:{
        handleFileChange(event) {
            this.reportAdd.reportImageFile = event.target.files[0];
            console.log('this.reportAdd.reportImageFile', this.reportAdd.reportImageFile)
        },
        addReport(){
             this.reportAdd.userId= this.userId;
             this.reportAdd.patientId= this.patientDetail.patientId;

                // FormData nesnesini oluşturun
            //const formData = new FormData();
            //formData.append('newReportRequest', JSON.stringify(this.reportAdd)); // JSON verisini ekle
            //formData.append('imageFile', this.reportAdd.reportImageFile); // Dosyayı ekle

            // // FormData nesnesini oluşturun 
            // const formData = new FormData(); 
            // formData.append('newReportRequest', JSON.stringify(this.reportAdd)); // JSON verisini ekle 
            // formData.append('reportImageFile', this.reportAdd.reportImageFile); // Dosyayı ekle

            // FormData nesnesini oluşturun 
            const formData = new FormData();
            formData.append('fileNo', this.reportAdd.fileNo);
            formData.append('userId', this.userId);
            formData.append('patientId', this.patientDetail.patientId);
            formData.append('diagnosisMade', this.reportAdd.diagnosisMade);
            formData.append('diagnosisDetail', this.reportAdd.diagnosisDetail);
            formData.append('reportDate', this.reportAdd.reportDate);
            formData.append('file', this.reportAdd.reportImageFile);

            for (const entry of formData.entries()) {
              console.log("FormData",entry);
            }

            console.log('this.reportAdd', this.reportAdd)

            const token = this.$store.state.tokenKey;
            this.$appAxios.post("reports", formData , {
              headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'

              }
            }).then(res => {
                    console.log('this.reportAdd nedir', this.reportAdd)
                    console.log(res.data);
                    // console.log(resProductDetail);
                    this.$router.push({name : "ReportsPage"});
                })
                .catch(error => {
                  // Hata durumunu yönet
                  console.error('Bir hata oluştu:', error);
                });
        }
    },
    computed: {
        ...mapState({
            userId: state => state.user,
            patientDetail: state => state.patient,
        }),
  }
}
</script>