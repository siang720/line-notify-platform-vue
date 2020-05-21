<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="serviceId">Service Name</label>
      <select
        v-model="notify.serviceId"
        class="form-control w-100"
        id="serviceId"
        name="serviceId"
        placeholder="Choose a choice"
        required
      >
        <option v-for="service in services" :key="service.id" :value="service.id">{{service.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="message">Notify Message</label>
      <textarea
        v-model="notify.message"
        class="form-control"
        id="message"
        name="message"
        rows="4"
        placeholder="Enter notify message"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="isProcessing">Submit</button>
  </form>
</template>

<script>
import servicesAPI from "../apis/services";
import notifyAPI from "../apis/notify";
import { Toast, swal } from "./../utils/helpers";

export default {
  name: "sendNotify",
  data() {
    return {
      notify: {
        serviceId: undefined,
        message: ""
      },
      services: [],
      isProcessing: false
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await servicesAPI.getServices();
        this.services = response.data.services.map(service => ({
          ...service,
          isEditing: false,
          nameCached: "",
          clientIdCached: "",
          clientSecretCached: ""
        }));
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得頻道資料，請稍後再試"
        });
      }
    },
    async handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      try {
        this.isProcessing = true;
        // Call API
        const response = await notifyAPI.postHistory({ formData });
        console.log(response);
        swal.fire(
          "Send successfully!!",
          "The message has been send.",
          "success"
        );
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "Can't send notify, please try later"
        });
      }
    }
  }
};
</script>