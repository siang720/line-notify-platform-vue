<template>
  <div class="row">
    <div class="col-12 col-md-6 col-sm-12 mb-2" v-for="data in chartData" :key="data.index">
      <Barchart :chartdata="data" />
    </div>
  </div>
</template>

<script>
import Barchart from "../components/BarChart";
import notifyAPI from "../apis/notify";
import { Toast } from "../utils/helpers";

export default {
  components: {
    Barchart
  },
  data() {
    return {
      chartData: []
    };
  },
  created() {
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await notifyAPI.getStatistic();
        this.chartData = response.data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得歷史訊息資料，請稍後再試"
        });
      }
    }
  }
};
</script>