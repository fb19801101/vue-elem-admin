<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu level 3" type="success">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "Menu-3"
};
</script>
