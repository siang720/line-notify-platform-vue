<template>
  <div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">id</th>
          <th scope="col">service_name</th>
          <th scope="col">message</th>
          <th scope="col">send_num</th>
          <th scope="col">send_time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="notify in historyNotifies" :key="notify.id">
          <th scope="row">{{ notify.id }}</th>
          <td>{{notify.serviceName}}</td>
          <td>{{notify.message}}</td>
          <td>{{notify.sendNum}}</td>
          <td>{{notify.sendTime | moment}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";

const dummyData = {
  historyNotifies: [
    {
      id: 1,
      serviceName: "test1",
      message: "hello world1",
      sendNum: 100,
      sendTime: new Date()
    },
    {
      id: 2,
      serviceName: "test2",
      message: "hello world2",
      sendNum: 100,
      sendTime: new Date()
    },
    {
      id: 3,
      serviceName: "test3",
      message: "hello world3",
      sendNum: 100,
      sendTime: new Date()
    }
  ]
};

export default {
  filters: {
    moment: function(date) {
      return moment(date).format();
    }
  },
  data() {
    return {
      historyNotifies: []
    };
  },
  created() {
    this.fetchhistoryNotifies();
  },
  methods: {
    fetchhistoryNotifies() {
      this.historyNotifies = dummyData.historyNotifies;
    }
  }
};
</script>