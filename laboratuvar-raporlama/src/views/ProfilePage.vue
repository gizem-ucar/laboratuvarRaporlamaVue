<template>
<AppHeader />

<div class="profile">
    <div class="position-right">
        <button class="button-black">Düzenle</button>
    </div>
    <div class="profile-information-button">
        <div class="profile-image"><img src="@/assets/images/pngdeneme.png" alt=""></div>
        <div class="profile-information">
            <ul>
                <li>User Name: {{ user.userFirstName }}</li>
                <li>User Lastname: {{ user.userLastName }}</li>
                <li>User TC: {{ user.userTC }}</li>
                <li>User Email: {{ user.email }}</li>
            </ul>
        </div>
    </div>
    <div class="profile-reports">
        <div class="profile-report-item" v-for="report in reportList" :key="report.reportId">
            <div class="reportImage"><img src="@/assets/images/pngdeneme.png" alt=""></div>
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
            user:null,
            reportList : []
        };
    },
    created(){
        const userId = this.userId;
        this.fetchUser(userId);
        this.fetchReports(userId);
    },
    methods: {
        fetchUser(userId) {
        const token = this.$store.state.tokenKey;
        this.$appAxios.get(`/users/${userId}`, {
              headers: {
                'Authorization': `${token}`,
              }
            })
          .then(res => {
            this.user = res?.data;
                console.log("user Profile",this.user);
                console.log(res?.data);
          })
          .catch(error => {
            // İstek hatalı olduğunda yapılacak işlemler
            console.error(error);
          });
      },
      fetchReports(userId) {
        this.$appAxios.get(`/reports?userId=${userId}`)
          .then(res => {
            this.reportList = res?.data;
                console.log("reportList myReportsPage",this.reportList);
                console.log(res?.data);
          })
          .catch(error => {
            // İstek hatalı olduğunda yapılacak işlemler
            console.error(error);
          });
      }
    },
    computed: {
        ...mapState({
            userId: state => state.user,
            // 'isLoading'
        }),
  }
}
</script>