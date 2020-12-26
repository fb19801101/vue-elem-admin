<template>
  <div class="app-container" style="padding:30px;">
    <el-alert :closable="false" title="menu level 1" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "Menu-1"
};
</script>
