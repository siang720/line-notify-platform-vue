<template>
  <nav
    class="navbar navbar-expand-lg navbar-expand-md navbar-expand-sm fixed-top navbar-dark bg-transparent d-flex justify-content-between"
  >
    <div id="navbarSupportedContent" class="navbar-collapse">
      <div class="navbar-nav ml-auto">
        <!-- is user is login -->
        <p
          v-if="isAuthenticated"
          id="welcome-text1"
          class="text-dark mr-3 my-auto"
        >{{currentUser.name}} 您好</p>
        <p v-else id="welcome-text2" class="text-dark mr-3 my-auto">訪客 您好</p>
        <router-link v-if="!isAuthenticated" to="/signin" class="text-dark mr-3">登入</router-link>
        <router-link v-if="!isAuthenticated" to="/signup" class="text-dark mr-3">註冊</router-link>
        <button
          v-if="isAuthenticated"
          type="button"
          class="logout-button btn btn-sm btn-outline-success my-2 my-sm-0"
          @click="logout"
        >登出</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    }
  }
};
</script>

<style>
.navbar {
  z-index: 1;
}

@media (max-width: 600px) {
  #welcome-text1,
  #welcome-text2 {
    display: none;
  }

  .navbar-nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .navbar {
    padding: 0;
  }
}
</style>