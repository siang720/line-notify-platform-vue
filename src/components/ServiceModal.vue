<template>
  <div class="container my-4">
    <div class="d-flex flex-column">
      <h5 class="ml-1">Subscript URL</h5>
      <p class="ml-1">Use this URL for user to subscript your channel</p>
      <div class="input-group mb-3">
        <input type="text" class="form-control" :value="subscriptURL" ref="subscriptURL" readonly />
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-outline-dark"
            @click.stop.prevent="copySubscriptURL()"
          >Copy</button>
        </div>
      </div>
      <h5 class="ml-1">Callback URL</h5>
      <p class="ml-1">Copy this URL to line notify manager page</p>
      <div class="input-group mb-3">
        <input type="text" class="form-control" :value="callbackURL" ref="callbackURL" readonly />
        <div class="input-group-append">
          <button
            type="button"
            class="btn btn-outline-dark"
            @click.stop.prevent="copyCallbackURL()"
          >Copy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link_name:
        "https://stackoverflow.com/questions/58733960/copy-url-to-clipboard-via-button-click-in-a-vuejs-component"
    };
  },
  props: ["subscriptURL", "callbackURL"],
  methods: {
    copySubscriptURL() {
      let url = this.$refs.subscriptURL;
      url.select();
      document.execCommand("copy");
    },
    copyCallbackURL() {
      let url = this.$refs.callbackURL;
      url.select();
      document.execCommand("copy");
    }
  }
};
</script>