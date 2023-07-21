<template>

<div class="reports">
    <div class="report-item" v-for="report in reports" :key="report.reportId">
        <router-link :to="{ name: 'ReportDetailPage'}" @click.prevent="onPressedReportDetail(report.reportId)">
        <div class="reportImage"><img :src="report.reportImage" alt=""></div>
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

</template>

<script>
export default{
    data(){
        return{
            report: null,
        }
    },
    props: {
        reports:{
            type: Array,
            required: true,
            default: () => []
        }
    },
    mounted(){
        console.log("reports", this.reports)
    },
    methods:{
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
        }
    }
}
</script>