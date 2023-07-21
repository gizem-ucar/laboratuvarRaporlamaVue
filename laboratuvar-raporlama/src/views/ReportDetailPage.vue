<template>
<AppHeader />
    <div class="report-detail">
        <div class="report-detail-container">
            <div class="report-detail-row">
                <div><img :src="this.reportDetail.reportImage" alt=""></div>
                <div class="report-information">
                    <div class="file-number">
                        File number: {{this.reportDetail.fileNo}}
                    </div>
                    <div class="diagnosisMade">
                        Diagnosis Made: {{this.reportDetail.diagnosisMade}}
                    </div>
                    <div class="diagnosisDetail">
                        Diagnosis Detail: {{this.reportDetail.diagnosisDetail}}
                    </div>
                    <div class="reportDate">
                        Report Date: {{this.reportDetail.reportDate}}
                    </div>
                    <div class="patientTC">
                        Patient TC: {{this.reportDetail.patientTC}}
                    </div>
                    <div class="patientName">
                        Patient Name: {{this.reportDetail.patientFirstName}} {{this.reportDetail.patientLastName}}
                    </div>
                </div>
                <div>
                    <button class="button">Sil</button>
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

        };
    },
    computed: {
        ...mapState({
            reportDetail: state => state.report,
            // 'isLoading'
        }),
  }
}
</script>