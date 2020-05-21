<template>
  <div>
    <button
      type="button"
      class="btn btn btn-dark mb-4"
      :disabled="isCreating"
      @click.stop.prevent="toggleIsCreating()"
    >Add New Service</button>
    <!-- Service列表 AdminServiceTable -->
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" class="col-id">#</th>
          <th scope="col" class="col-name">Service Name</th>
          <th scope="col" class="col-client-id">Client Id</th>
          <th scope="col" class="col-client-secret">Client Secret</th>
          <th scope="col" class="col-tokens">Tokens</th>
          <th scope="col" width="300" class="col-action text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="isCreating">
          <th scope="row" class="align-middle"></th>
          <td class="align-middle">
            <input
              v-model="newService.name"
              type="text"
              class="form-control"
              placeholder="enter service name"
            />
          </td>
          <td class="align-middle">
            <input
              v-model="newService.clientId"
              type="text"
              class="form-control"
              placeholder="enter client id"
            />
          </td>
          <td class="align-middle">
            <input
              v-model="newService.clientSecret"
              type="text"
              class="form-control"
              placeholder="enter client secret"
            />
          </td>
          <td class="align-middle">--</td>
          <td class="d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-outline-success mr-1"
              @click.stop.prevent="createService({ name: newService.name, clientId: newService.clientId, clientSecret: newService.clientSecret })"
            >Save</button>
            <button
              type="button"
              class="cnacel btn btn-outline-secondary mr-1"
              @click="CancelCreate()"
            >Cancel</button>
          </td>
        </tr>
        <tr
          v-for="(service, index) in services"
          :key="service.id"
          :class="{ editingLine : service.isEditing }"
        >
          <th scope="row" class="align-middle">{{ index + 1}}</th>
          <td class="align-middle">
            <div v-show="!service.isEditing" class="service-name">{{service.name}}</div>
            <input
              v-show="service.isEditing"
              v-model="service.name"
              type="text"
              class="form-control"
            />
          </td>
          <td class="align-middle">
            <div v-show="!service.isEditing" class="client-id">{{service.clientId}}</div>
            <input
              v-show="service.isEditing"
              v-model="service.clientId"
              type="text"
              class="form-control"
            />
          </td>
          <td class="align-middle">
            <div v-show="!service.isEditing" class="client-secret">{{ service.clientSecret }}</div>
            <input
              v-show="service.isEditing"
              v-model="service.clientSecret"
              type="text"
              class="form-control"
            />
          </td>
          <td class="align-middle">{{ service.Tokens.length }}</td>
          <td class="d-flex justify-content-center">
            <button
              v-show="!service.isEditing"
              type="button"
              class="btn btn-outline-dark mr-1"
              @click.stop.prevent="toggleIsEditing(service.id)"
            >Edit</button>
            <button
              v-show="service.isEditing"
              type="button"
              class="btn btn-outline-success mr-1"
              :disabled="isProcessing"
              @click.stop.prevent="updateService({ serviceId: service.id, name: service.name, clientId: service.clientId, clientSecret: service.clientSecret })"
            >Save</button>
            <button
              v-show="service.isEditing"
              type="button"
              class="cnacel btn btn-outline-secondary mr-1"
              :disabled="isProcessing"
              @click="handleCancel(service.id)"
            >Cancel</button>
            <button
              v-show="!service.isEditing"
              @click.stop.prevent="deleteService(service.id)"
              type="button"
              class="btn btn-outline-danger"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import servicesAPI from "../apis/services";
import { Toast, swal } from "./../utils/helpers";

export default {
  data() {
    return {
      services: [],
      isProcessing: false,
      newService: {
        name: "",
        clientId: "",
        cliendSecret: ""
      },
      isCreating: false
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
    deleteService(serviceId) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          position: "center",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(async result => {
          if (result.value) {
            try {
              this.isProcessing = true;
              // CALL API
              const { data } = await servicesAPI.deleteService(serviceId);
              if (data.status !== "success") {
                throw new Error(data.message);
              }
              // 前端刪除資料
              this.services = this.services.filter(
                service => service.id !== serviceId
              );
              swal.fire("Deleted!", "The service has been deleted.", "success");
              this.isProcessing = false;
            } catch (error) {
              this.isProcessing = false;
              swal.fire("Error!", "Fail to delete the service.", "error");
            }
          }
        });
    },
    toggleIsEditing(serviceId) {
      this.services = this.services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            isEditing: !service.isEditing,
            nameCached: service.name,
            clientIdCached: service.clientId,
            clientSecretCached: service.clientSecret
          };
        }

        return service;
      });
    },
    async updateService({ serviceId, name, clientId, clientSecret }) {
      try {
        this.isProcessing = true;
        const { data } = await servicesAPI.updateService({
          serviceId,
          formData: { name, clientId, clientSecret }
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.toggleIsEditing(serviceId);
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新資料，請稍後再試"
        });
      }
    },
    handleCancel(serviceId) {
      this.services = this.services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,

            // 把原本的資料還回去
            name: service.nameCached,
            clientId: service.clientIdCached,
            clientSecret: service.clientSecretCached
          };
        }

        return service;
      });

      this.toggleIsEditing(serviceId);
    },
    toggleIsCreating() {
      this.isCreating = !this.isCreating;
    },
    async createService({ name, clientId, clientSecret }) {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("clientId", clientId);
      formData.append("clientSecret", clientSecret);
      try {
        this.isProcessing = true;
        const { data } = await servicesAPI.postService({ formData });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.services.unshift({
          id: data.serviceId,
          name: name,
          clientId: clientId,
          clientSecret: clientSecret,
          Tokens: []
        });
        this.toggleIsCreating();
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法新增service，請稍後再試"
        });
      }
    },
    CancelCreate() {
      this.isCreating = false;
      this.newService.name = "";
      this.newService.clientId = "";
      this.newService.clientSecret = "";
    }
  }
};
</script>

<style scoped>
.col-id {
  width: 5%;
}
.col-name {
  width: 17%;
}
.col-client-id {
  width: 18%;
}
.col-client-secret {
  width: 35%;
}
.col-tokens {
  width: 5%;
}
.col-action {
  width: 20%;
}

.editingLine {
  background-color: #ebe9e9;
}
</style>
