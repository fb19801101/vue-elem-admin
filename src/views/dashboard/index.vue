<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import adminDashboard from "./admin";
import editorDashboard from "./editor";
import normalDashboard from "./normal";
import testDashboard from "./test";

export default {
  name: "Dashboard",
  components: {
    adminDashboard,
    editorDashboard,
    normalDashboard,
    testDashboard
  },
  data() {
    return {
      currentRole: "adminDashboard"
    };
  },
  computed: {
    ...mapGetters(["roles"])
  },
  created() {
    if (this.roles.includes("admin")) {
      this.currentRole = "adminDashboard";
    }

    if (this.roles.includes("editor")) {
      this.currentRole = "editorDashboard";
    }

    if (this.roles.includes("normal")) {
      this.currentRole = "normalDashboard";
    }

    if (this.roles.includes("test")) {
      this.currentRole = "testDashboard";
    }
  }
};
</script>
