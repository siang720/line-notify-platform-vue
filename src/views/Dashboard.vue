<template>
  <div class="container">
    <p>Hello, {{user.name}}</p>
  </div>
</template>

<script>
const dummyData = {
  user: {
    name: "Username"
  }
};
export default {
  name: "dashboard",
  data() {
    return {
      user: dummyData.user
    };
  }
};
</script>