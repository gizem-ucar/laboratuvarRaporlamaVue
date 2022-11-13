<template>

    <AppHeader />
    
    <app-report-list  :reports="reportList"/>
    
    <AppFooter/>
    
</template>

<script>
import appReportList from "@/components/Reports/appReportList/indexReportList.vue"

export default{
    components: {
        appReportList
    },
    data(){
        return{
            reportList : []
        }
    },
    created(){
        this.$appAxios.get('/api/reports/getall'
            ).then(res => {
                this.reportList = res?.data;
                // console.log(this.categoryList);
                // console.log(this.productList);
            })
    }
};
</script>