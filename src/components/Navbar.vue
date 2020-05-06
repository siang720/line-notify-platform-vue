<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-transparent">
    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center">
        <!-- is user is login -->
        <router-link to="/" class="text-dark mr-3">使用者 您好</router-link>
        <router-link to="/signin" class="text-dark mr-3">登入</router-link>
        <router-link to="/signup" class="text-dark mr-3">註冊</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>