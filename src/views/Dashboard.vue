<template>
  <div>
    <h1>Hello, {{currentUser.name}}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  }
};
</script>