<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu level 4" type="warning">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "Menu-4"
};
</script>
