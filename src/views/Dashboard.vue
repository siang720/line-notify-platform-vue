<template>
  <div>
    <h3>Services</h3>
    <hr class="mb-4" />
    <ServiceCard />
    <h3 class="mt-3">Activities</h3>
    <hr class="mb-4" />
    <ActivityChart />
    <h3 class="mt-3">Recent Notifies</h3>
    <RecentActivities />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ServiceCard from "../components/ServiceCard";
import RecentActivities from "../components/RecentActivities";
import ActivityChart from "../components/ActivityChart";

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  components: {
    ServiceCard,
    RecentActivities,
    ActivityChart
  }
};
</script>