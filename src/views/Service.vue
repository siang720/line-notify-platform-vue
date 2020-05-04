<template>
  <div>
    <a href="#" class="btn btn-dark mb-4">Add New Service</a>
    <!-- Service列表 AdminServiceTable -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">id</th>
          <th scope="col">service_name</th>
          <th scope="col">client_id</th>
          <th scope="col">client_secret</th>
          <th scope="col">token_num</th>
          <th scope="col" width="300">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.id">
          <th scope="row">{{ service.id }}</th>
          <td>{{ service.service_name}}</td>
          <td>{{ service.client_id }}</td>
          <td>{{ service.client_secret }}</td>
          <td>{{ service.token_num }}</td>
          <td class="d-flex justify-content-between">
            <a href="#" class="btn btn-link">Send</a>
            <a href="#" class="btn btn-link">Edit</a>
            <button
              @click.stop.prevent="deleteService(service.id)"
              type="button"
              class="btn btn-link"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
  data() {
    return {
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
    deleteService(serviceId) {
      this.services = this.services.filter(service => service.id !== serviceId);
    }
  }
};
</script>
