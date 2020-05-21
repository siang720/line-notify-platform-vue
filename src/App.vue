<template>
  <div id="app" :class="[{ collapsed: collapsed }]">
    <div class="demo">
      <Navbar />
      <router-view />
      <sidebar-menu :menu="menu" @toggle-collapse="onToggleCollapse" />
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
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
          href: "/dashboard",
          title: "Dashboard",
          icon: "fa fa-user"
        },
        {
          href: "/services",
          title: "Service",
          icon: "fas fa-server"
        },
        {
          href: "/sendNotify",
          title: "Send Notify",
          icon: "fas fa-paper-plane"
        },
        {
          href: "/historyNotify",
          title: "History Notify",
          icon: "fas fa-history"
        }
        // {
        //   href: "/draft",
        //   title: "Draft",
        //   icon: "far fa-file-alt"
        // }
      ],
      collapsed: false
    };
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
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
