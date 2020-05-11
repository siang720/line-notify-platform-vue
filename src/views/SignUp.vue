<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
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

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">Sign In</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "warning",
            title: "Email, Password, Password Check 為必填欄位"
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "兩次輸入的密碼不一致！"
          });
          return;
        }
        // start send request, prevent user submit until accepting response
        this.isProcessing = true;
        const { data, statusText } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(data.message);
        }
        // STEP 4: 成功的話則轉址到 `/signin`
        this.$router.push("/signin");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法建立餐廳，請稍後再試"
        });
        this.isProcessing = false;
      }
    }
    // handleSubmit() {
    //   const data = JSON.stringify({
    //     name: this.name,
    //     email: this.email,
    //     password: this.password,
    //     passwordCheck: this.passwordCheck
    //   });

    //   // TODO: 向後端驗證使用者登入資訊是否合法
    //   console.log("data", data);
    // }
  }
};
</script>