<template>
  <div class="row">
    <div class="col-4" v-for="service in services" :key="service.index">
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="https://i.imgur.com/lCwYqdM.jpg" class="card-img" alt="Robot" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{service.name}}</h5>
              <div class="d-flex flex-row align-middle">
                <i class="fas fa-users mr-2"></i>
                <p>{{service.tokenNums}}</p>
              </div>
              <!-- <p class="card-text mt-3">
                <small class="text-muted">Last notify 3 days ago</small>
              </p>-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import servicesAPI from "../apis/services";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      services: []
    };
  },
  created() {
    this.fetchServicesSnapshot();
  },
  methods: {
    async fetchServicesSnapshot() {
      try {
        const response = await servicesAPI.getServicesSnapshot();
        this.services = response.data;
      } catch {
        Toast.fire({
          icon: "error",
          title: "無法取得頻道資料，請稍後再試"
        });
      }
    }
  }
};
</script>

