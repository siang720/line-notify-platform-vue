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
          <td>
            <div v-show="!service.isEditing" class="service-name">{{service.name}}</div>
            <input
              v-show="service.isEditing"
              v-model="service.name"
              type="text"
              class="form-control"
            />
            <span v-show="service.isEditing" class="cancel" @click="handleCancel(service.id)">✕</span>
          </td>
          <td>
            <div v-show="!service.isEditing" class="client-id">{{service.client_id}}</div>
            <input
              v-show="service.isEditing"
              v-model="service.client_id"
              type="text"
              class="form-control"
            />
          </td>
          <td>
            <div v-show="!service.isEditing" class="client-secret">{{ service.client_secret }}</div>
            <input
              v-show="service.isEditing"
              v-model="service.client_secret"
              type="text"
              class="form-control"
            />
          </td>
          <td>{{ service.token_num }}</td>
          <td class="d-flex justify-content-between">
            <a href="#" class="btn btn-link">Send</a>
            <button
              v-show="!service.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(service.id)"
            >Edit</button>
            <button
              v-show="service.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="updateService({ serviceId: service.id, name: service.name, client_id: service.client_id, client_secret: service.client_secret })"
            >Save</button>
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
      name: "test1",
      client_id: "fafa4af56d74faf4df65af",
      client_secret: "DDFLA3L41280VA09R8E",
      token_num: 15
    },
    {
      id: 2,
      name: "test2",
      client_id: "fafa4af56d74faf4df65af",
      client_secret: "DDFLA3L41280VA09R8E",
      token_num: 15
    },
    {
      id: 3,
      name: "test3",
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
      // this.services = dummyData.services;
      this.services = dummyData.services.map(service => ({
        ...service,
        isEditing: false,
        nameCached: "",
        client_idCached: "",
        client_secretCached: ""
      }));
    },
    deleteService(serviceId) {
      this.services = this.services.filter(service => service.id !== serviceId);
    },
    toggleIsEditing(serviceId) {
      this.services = this.services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            isEditing: !service.isEditing,
            nameCached: service.name,
            client_idCached: service.client_id,
            client_secretCached: service.client_secret
          };
        }

        return service;
      });
    },
    updateService({ serviceId, name, client_id, client_secret }) {
      // TODO: 透過 API 去向伺服器更新service data
      console.log([name, client_id, client_secret]);
      this.toggleIsEditing(serviceId);
    },
    handleCancel(serviceId) {
      this.services = this.services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,

            // 把原本的資料還回去
            name: service.nameCached,
            client_id: service.client_idCached,
            client_secret: service.client_secretCached
          };
        }

        return service;
      });

      this.toggleIsEditing(serviceId);
    }
  }
};
</script>

<style scoped>
.service-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: relative;
  right: 20px;
  top: 50%;
  transform: translateY(-130%) translateX(360%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>
