<template>
  <div>
    <modals-container />
    <!-- Add new service button -->
    <button
      type="button"
      class="btn btn btn-dark mb-4"
      :disabled="isCreating"
      @click.stop.prevent="toggleIsCreating()"
    >Add New Service</button>
    <!-- Service列表 AdminServiceTable -->
    <table class="table table-rwd">
      <thead class="thead-dark">
        <tr class="tr-only-hide">
          <th scope="col" class="col-id">#</th>
          <th scope="col" class="col-name">Service Name</th>
          <th scope="col" class="col-client-id">Client Id</th>
          <th scope="col" class="col-client-secret">Client Secret</th>
          <th scope="col" class="col-tokens">Tokens</th>
          <th scope="col" width="300" class="col-action">Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- creating mode -->
        <tr v-show="isCreating">
          <td data-th="#" scope="row" class="align-middle"></td>
          <td data-th="Service Name" class="align-middle">
            <input
              v-model="newService.name"
              type="text"
              class="form-control"
              placeholder="enter service name"
            />
          </td>
          <td data-th="Client Id" class="align-middle">
            <input
              v-model="newService.clientId"
              type="text"
              class="form-control"
              placeholder="enter client id"
            />
          </td>
          <td data-th="Client Secret" class="align-middle">
            <input
              v-model="newService.clientSecret"
              type="text"
              class="form-control"
              placeholder="enter client secret"
            />
          </td>
          <td data-th="Tokens" class="align-middle">--</td>
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
        <!-- normal mode -->
        <tr
          v-for="(service, index) in services"
          :key="service.id"
          :class="{ editingLine : service.isEditing }"
        >
          <td data-th="#" scope="row" class="align-middle">{{ index + 1}}</td>
          <td data-th="Service Name" class="align-middle">
            <div v-show="!service.isEditing" class="service-name">{{service.name}}</div>
            <input
              v-show="service.isEditing"
              v-model="service.name"
              type="text"
              class="form-control"
            />
          </td>
          <td data-th="Client Id" class="align-middle">
            <div v-show="!service.isEditing" class="client-id">{{service.clientId}}</div>
            <input
              v-show="service.isEditing"
              v-model="service.clientId"
              type="text"
              class="form-control"
            />
          </td>
          <td data-th="Client Secret" class="align-middle">
            <div v-show="!service.isEditing" class="client-secret">{{ service.clientSecret }}</div>
            <input
              v-show="service.isEditing"
              v-model="service.clientSecret"
              type="text"
              class="form-control"
            />
          </td>
          <td data-th="Tokens" class="align-middle">{{ service.Tokens.length }}</td>
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
              class="btn btn-outline-danger mr-1"
            >Delete</button>
            <button
              v-show="!service.isEditing"
              @click.stop.prevent="show(service.subscriptURL, service.callbackURL)"
              type="button"
              class="btn btn-outline-primary"
            >Show URL</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import servicesAPI from "../apis/services";
import { Toast, swal } from "./../utils/helpers";
import ServiceModal from "../components/ServiceModal";

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
    },
    show(subscriptURL, callbackURL) {
      this.$modal.show(ServiceModal, {
        subscriptURL: subscriptURL,
        callbackURL: callbackURL,
        height: "300"
      });
    },
    hide() {
      this.$modal.hide("hello-world");
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
