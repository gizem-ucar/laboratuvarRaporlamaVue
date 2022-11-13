<template>

<div class="reports" v-for="report in reports" :key="report.reportId">
            <router-link :to="{ name: 'ReportDetailPage'}" >
                    <div class="report-item">
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
                                Patient TC: 
                            </div>
                            <div class="patientName">
                                Patient Name:
                            </div>
                        </div>
                    </div>
                </router-link>
                <!-- <router-link :to="{ name: 'ReportDetailPage'}" >
                    <div class="report-item">
                        <div class="reportImage"><img src="@/assets/images/pngdeneme.png" alt=""></div>
                        <div class="report-information">
                            <div class="file-number">
                                File number:
                            </div>
                            <div class="diagnosisMade">
                                Diagnosis Made:
                            </div>
                            <div class="reportDate">
                                Report Date:
                            </div>
                            <div class="patientTC">
                                Patient TC:
                            </div>
                            <div class="patientName">
                                Patient Name:
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'ReportDetailPage'}" >
                    <div class="report-item">
                        <div class="reportImage"><img src="@/assets/images/pngdeneme.png" alt=""></div>
                        <div class="report-information">
                            <div class="file-number">
                                File number:
                            </div>
                            <div class="diagnosisMade">
                                Diagnosis Made:
                            </div>
                            <div class="reportDate">
                                Report Date:
                            </div>
                            <div class="patientTC">
                                Patient TC:
                            </div>
                            <div class="patientName">
                                Patient Name:
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'ReportDetailPage'}" >
                    <div class="report-item">
                        <div class="reportImage"><img src="@/assets/images/pngdeneme.png" alt=""></div>
                        <div class="report-information">
                            <div class="file-number">
                                File number:
                            </div>
                            <div class="diagnosisMade">
                                Diagnosis Made:
                            </div>
                            <div class="reportDate">
                                Report Date:
                            </div>
                            <div class="patientTC">
                                Patient TC:
                            </div>
                            <div class="patientName">
                                Patient Name:
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'ReportDetailPage'}" >
                    <div class="report-item">
                        <div class="reportImage"><img src="@/assets/images/pngdeneme.png" alt=""></div>
                        <div class="report-information">
                            <div class="file-number">
                                File number:
                            </div>
                            <div class="diagnosisMade">
                                Diagnosis Made:
                            </div>
                            <div class="reportDate">
                                Report Date:
                            </div>
                            <div class="patientTC">
                                Patient TC:
                            </div>
                            <div class="patientName">
                                Patient Name:
                            </div>
                        </div>
                    </div>
                </router-link>
                <router-link :to="{ name: 'ReportDetailPage'}" >
                    <div class="report-item">
                        <div class="reportImage"><img src="@/assets/images/pngdeneme.png" alt=""></div>
                        <div class="report-information">
                            <div class="file-number">
                                File number:
                            </div>
                            <div class="diagnosisMade">
                                Diagnosis Made:
                            </div>
                            <div class="reportDate">
                                Report Date:
                            </div>
                            <div class="patientTC">
                                Patient TC:
                            </div>
                            <div class="patientName">
                                Patient Name:
                            </div>
                        </div>
                    </div>
                </router-link> -->
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
}
</script>