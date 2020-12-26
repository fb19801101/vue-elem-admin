<template>
  <div class="app-container" style="padding:30px;">
    <el-alert :closable="false" title="main-menu" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "Menu"
};
</script>
