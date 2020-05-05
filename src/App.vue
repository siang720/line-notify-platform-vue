<template>
  <div id="app" :class="[{ collapsed: collapsed }]">
    <div class="demo">
      <div class="container">
        <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-transparent">
          <div id="navbarSupportedContent" class="navbar-collapse collapse">
            <div class="ml-auto d-flex align-items-center">
              <!-- is user is login -->
              <router-link to="#" class="text-dark mr-3">使用者 您好</router-link>
              <button
                type="button"
                class="btn btn-sm btn-outline-success my-2 my-sm-0"
                @click="showModal"
              >登入</button>
            </div>
          </div>
        </nav>
        <router-view />
        <modal v-show="isModalVisible" @close="closeModal" />
      </div>
      <sidebar-menu :menu="menu" @toggle-collapse="onToggleCollapse" />
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import modal from "./components/loginModal";
export default {
  name: "App",
  components: {
    modal
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Profile",
          icon: "fa fa-user"
        },
        {
          href: "/service",
          title: "Service",
          icon: "fa fa-chart-area"
        },
        {
          href: "/sendNotify",
          title: "Send Notify",
          icon: "fa fa-user"
        },
        {
          href: "/historyNotify",
          title: "History Notify",
          icon: "fa fa-user"
        },
        {
          href: "/draft",
          title: "Draft",
          icon: "fa fa-user"
        }
      ],
      collapsed: false,
      isModalVisible: false
    };
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style>
.container {
  max-width: 900px;
}
#app {
  padding-left: 350px;
  transition: 0.3s ease;
}
#app.collapsed {
  padding-left: 50px;
}
.demo {
  padding: 50px;
}
</style>
