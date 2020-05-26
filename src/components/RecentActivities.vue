<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col" class="col-id">#</th>
        <th scope="col" class="col-date">Date</th>
        <th scope="col" class="col-service">Service</th>
        <th scope="col" class="col-send-nums">Send Nums</th>
        <th scope="col" class="col-message">Message</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(notify,index) in historyNotifies" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{notify.sendTime | formatToYYYYMMDD_HHMMSS}}</td>
        <td>{{notify.Service.name}}</td>
        <td>{{notify.sendNum}}</td>
        <td>{{notify.message}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import notifyAPI from "../apis/notify";
import { Toast } from "../utils/helpers";
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [fromNowFilter],
  data() {
    return {
      historyNotifies: []
    };
  },
  created() {
    this.fetchhistoryNotifies();
  },
  methods: {
    async fetchhistoryNotifies() {
      try {
        const response = await notifyAPI.getHistory();
        this.historyNotifies = response.data.messages.slice(0, 10);
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

<style scoped>
.col-id {
  width: 5%;
}
.col-date {
  width: 15%;
}
.col-service {
  width: 20%;
}
.col-send-nums {
  width: 10%;
}
.col-message {
  width: 50%;
}
</style>