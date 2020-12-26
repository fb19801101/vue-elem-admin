<template>
  <div class="app-container">
    <div class="splitter-container">
      <split-pane split="vertical" :min-percent="16" :default-percent="20">
        <template slot="paneL">
          <div class="left-container"></div>
        </template>
        <template slot="paneR">
          <split-pane split="horizontal" :min-percent="2" :default-percent="5">
            <template slot="paneL">
              <div class="top-container"></div>
            </template>
            <template slot="paneR">
              <split-pane
                split="vertical"
                :min-percent="20"
                :default-percent="35"
              >
                <template slot="paneL">
                  <div class="left-container"></div>
                </template>
                <template slot="paneR">
                  <div class="right-container"></div>
                </template>
              </split-pane>
            </template>
          </split-pane>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
import splitPane from "vue-splitpane";

export default {
  name: "Disclose",
  components: { splitPane }
};
</script>

<style lang="stylus" scoped>
.splitter-container {
  //position: relative;
  background-color: #eee !important;
  color: #666 !important;
  height: 100vh;
  //width: 100vw;

  .left-container {
    //position: absolute;
    background-color: #009688 !important;
    color: #fff !important;
    height: 100%;
    //width: 350px;
  }
  .right-container {
    //position: absolute;
    background-color: #1e9fff !important;
    color: #fff !important;
    height: 100%;
    //width: calc(100vw - 350px);
  }
  .top-container {
    position: absolute;
    background-color: #ffb800 !important;
    color: #fff !important;
    height: 100%;
    width: 100%;
  }
  .bottom-container {
    //position: absolute;
    background-color: #ff5722 !important;
    color: #fff !important;
    //height: calc(100vh - 100px);
    height: 100%;
    width: 100%;
  }
}
</style>
