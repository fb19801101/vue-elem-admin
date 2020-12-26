<template functional>
  <div style="padding:30px;">
    <el-alert :closable="false" title="menu level 5" type="alert">
      <router-view />
    </el-alert>
  </div>
</template>

<script>
export default {
  name: "Menu-5"
};
</script>
