<template>
  <div class="container py-5">
    <form class="w-50 mx-auto" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit() {
      authorizationAPI
        .signIn({
          email: this.email,
          password: this.password
        })
        .then(response => {
          // 取得API請求後的資料
          const { data } = response;
          // save data to local storage
          localStorage.setItem("token", data.token);

          // redirect to home page
          this.$router.push("/dashboard");
        });
    }
  }
};
</script>