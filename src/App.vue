<template>
  <div id="app" :class="[{ collapsed: collapsed }]">
    <div class="demo">
      <div class="container">
        <router-view />
      </div>
      <sidebar-menu
        :menu="menu"
        :collapsed="collapsed"
        :theme="selectedTheme"
        :show-one-child="true"
        @toggle-collapse="onToggleCollapse"
        @item-click="onItemClick"
      />
    </div>
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: "App",
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Main Navigation",
          hiddenOnCollapse: true,
        },
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user",
        },
        {
          href: "/service",
          title: "Service",
          icon: "fa fa-chart-area",
          // child: [
          //   {
          //     href: "/charts/sublink",
          //     title: "Sub Link",
          //   },
          // ],
        },
        {
          href: "/sendNotify",
          title: "Send Notify",
          icon: "fa fa-user",
        },
        {
          href: "/draft",
          title: "Draft",
          icon: "fa fa-user",
        },
        {
          href: "/historyNotify",
          title: "History Notify",
          icon: "fa fa-user",
        },
      ],
      collapsed: false,
    };
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log(collapsed);
      this.collapsed = collapsed;
    },
  },
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
