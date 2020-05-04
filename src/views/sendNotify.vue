<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="serviceId">Service Name</label>
      <select
        v-model="notify.serviceId"
        class="form-control w-100"
        id="serviceId"
        name="serviceId"
        required
      >
        <option
          v-for="service in services"
          :key="service.id"
          :value="service.id"
        >{{service.service_name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="message">Notify Message</label>
      <textarea v-model="notify.message" class="form-control" id="message" name="message" rows="4"></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
const dummyData = {
  services: [
    {
      id: 1,
      service_name: "test1",
      client_id: "fafa4af56d74faf4df65af",
      client_secret: "DDFLA3L41280VA09R8E",
      token_num: 15
    },
    {
      id: 2,
      service_name: "test2",
      client_id: "fafa4af56d74faf4df65af",
      client_secret: "DDFLA3L41280VA09R8E",
      token_num: 15
    },
    {
      id: 3,
      service_name: "test3",
      client_id: "fafa4af56d74faf4df65af",
      client_secret: "DDFLA3L41280VA09R8E",
      token_num: 15
    }
  ]
};

export default {
  name: "sendNotify",
  data() {
    return {
      notify: {
        serviceId: undefined,
        message: ""
      },
      services: []
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    fetchServices() {
      this.services = dummyData.services;
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    }
  }
};
</script>