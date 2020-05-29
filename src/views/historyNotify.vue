<template>
  <div>
    <h2 class="mb-4">History Notifies</h2>
    <table class="table table-rwd">
      <thead class="thead-dark">
        <tr class="tr-only-hide">
          <th scope="col">#</th>
          <th scope="col">Service Name</th>
          <th scope="col">Message</th>
          <th scope="col">Send Token Numbers</th>
          <th scope="col">Send Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(notify,index) in historyNotifies" :key="index">
          <td data-th="#" scope="row">{{ index + 1 }}</td>
          <td data-th="Service Name">{{notify.Service.name}}</td>
          <td data-th="Message">{{notify.message}}</td>
          <td data-th="Send Token Numbers">{{notify.sendNum}}</td>
          <td data-th="Send Time">{{notify.sendTime | formatToYYYYMMDD_HHMMSS}}</td>
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

<style scoped>
@media (max-width: 736px) {
  .table-rwd {
    min-width: 100%;
  }
  /*針對tr去做隱藏*/
  tr.tr-only-hide {
    display: none !important;
  }
  /*讓tr變成區塊主要讓他有個區塊*/
  .table-rwd tr {
    display: block;
    border: 1px solid #ddd;
    margin-top: 5px;
  }
  .table-rwd td {
    text-align: left;
    font-size: 15px;
    overflow: hidden;
    width: 100%;
    display: block;
  }
  .table-rwd td:before {
    content: attr(data-th) "";
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
    color: #d20b2a;
  }
  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,
  .table-rwd.table-bordered th,
  .table-rwd.table-bordered {
    border: 0;
  }
}
</style>