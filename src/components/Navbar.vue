<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-transparent">
    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is login -->
        <p v-if="isAuthenticated" class="text-dark mr-3 my-auto">{{currentUser.name}} 您好</p>
        <p v-else class="text-dark mr-3 my-auto">訪客 您好</p>
        <router-link v-if="!isAuthenticated" to="/signin" class="text-dark mr-3">登入</router-link>
        <router-link v-if="!isAuthenticated" to="/signup" class="text-dark mr-3">註冊</router-link>
        <button
          v-if="isAuthenticated"
          type="button"
          class="btn btn-sm btn-outline-success my-2 my-sm-0"
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
</style>