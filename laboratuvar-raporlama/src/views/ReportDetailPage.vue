<template>
<AppHeader />
    <div class="report-detail">
        <div class="report-detail-container">
            <div class="report-detail-row">
                <div><img :src="this.reportDetail.reportImage" alt=""></div>
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