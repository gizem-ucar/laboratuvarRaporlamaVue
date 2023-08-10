<template>

<div class="reports">
    

    <div class="report-item" v-for="report in reports" :key="report.reportId">
        <router-link :to="{ name: 'ReportDetailPage'}" @click.prevent="onPressedReportDetail(report.reportId)">
        <div class="reportImage"><img v-if="reportImageUrlMap[report.reportId]" :src="reportImageUrlMap[report.reportId]" alt=""></div>
        <div class="report-information">
            <div class="form-text">
                File number: {{report.fileNo}}
            </div>
            <div class="form-text">
                Diagnosis Made: {{report.diagnosisMade}}
            </div>
            <div class="form-text">
                Report Date: {{report.reportDate}}
            </div>
            <div class="form-text">
                Patient TC: {{ report.patientTC }}
            </div>
            <div class="form-text">
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
            reportImageUrlMap: {},
        }
    },
    props: {
        reports:{
            type: Array,
            required: true,
            default: () => []
        }
    },
    created() {
        // Önce localStorage'dan verileri yükle
        const storedData = localStorage.getItem('reportImageData');
        if (storedData) {
          this.reportImageUrlMap = JSON.parse(storedData);
        } else {
          this.fetchReportImages();
        }
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
        async fetchReportImages() {
            try {
              const token = this.$store.state.tokenKey;
            
              // Tüm raporları dolaşıp, reportId'ye göre base64 kodlu veriyi al ve map'e ekle
              for (const report of this.reports) {
                const reportId = report.reportId;
                const response = await this.$appAxios.get(`/images/${reportId}`, {
                  headers: {
                    Authorization: `${token}`
                  },
                  responseType: 'text'
                });
            
                this.reportImageUrlMap[reportId] = `data:image/jpeg;base64, ${response.data}`;
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