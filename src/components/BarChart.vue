<script>
import { Bar } from "vue-chartjs";

let today = new Date();

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.renderChart(this.chartdata, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ],
        xAxes: [
          {
            type: "time",
            time: {
              unit: "day",
              min: today.getTime() - 7 * 24 * 60 * 60 * 1000,
              max: today.getTime()
            }
          }
        ]
      }
    });
  }
};
</script>