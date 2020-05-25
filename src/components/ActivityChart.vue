<template>
  <div class="row">
    <div class="col-4 mb-2" v-for="data in chartData" :key="data.index">
      <Barchart :chartdata="data" />
    </div>
  </div>
</template>

<script>
import Barchart from "../components/BarChart";
import notifyAPI from "../apis/notify";
import { Toast } from "../utils/helpers";

// let dummyData = [
//   {
//     labels: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December"
//     ],
//     datasets: [
//       {
//         label: "Data One",
//         backgroundColor: "#f87979",
//         data: [40, 20, 12, 39, 10, 40, 39, 10, 40, 20, 12, 11]
//       }
//     ]
//   },
//   {
//     labels: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December"
//     ],
//     datasets: [
//       {
//         label: "Data Two",
//         backgroundColor: "#f87979",
//         data: [10, 50, 18, 10, 30, 20, 10, 50, 10, 50, 20, 5]
//       }
//     ]
//   },
//   {
//     labels: [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December"
//     ],
//     datasets: [
//       {
//         label: "Data Three",
//         backgroundColor: "#f87979",
//         data: [10, 50, 18, 10, 30, 20, 10, 50, 10, 50, 20, 5]
//       }
//     ]
//   }
// ];

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