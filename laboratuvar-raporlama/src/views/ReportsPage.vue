<template>

    <AppHeader />
    
    <app-report-list/>
    
    <AppFooter/>
    
</template>

<script>
import appReportList from "@/components/Reports/appReportList/indexReportList.vue"

export default{
    components: {
        appReportList
    }
}
</script>