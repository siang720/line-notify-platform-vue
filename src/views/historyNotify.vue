<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">service_name</th>
          <th scope="col">message</th>
          <th scope="col">send_num</th>
          <th scope="col">send_time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notify,index) in historyNotifies" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{notify.Service.name}}</td>
          <td>{{notify.message}}</td>
          <td>{{notify.sendNum}}</td>
          <td>{{notify.sendTime | formatToYYYYMMDD_HHMMSS}}</td>
        </tr>
      </tbody>
    </table>
  </div>
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
        this.historyNotifies = response.data.messages;
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