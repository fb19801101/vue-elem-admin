<template>
  <div class="app-container">
    <div class="filter-container">
      <el-upload
        :action="uploadUrl"
        :accept="uploadExt"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :show-file-list="false"
        style="margin-right: 10px; display:inline-block"
      >
        <el-button type="primary" plain>导入曲线要素</el-button>
      </el-upload>
      <el-button type="primary" plain @click="exportExcelCurveElement"
        >导出曲线要素</el-button
      >
      <el-button type="primary" @click="selectCurveLine"
        >获取曲线信息</el-button
      >
      <el-button type="primary" @click="selectCurveElement"
        >获取曲线要素</el-button
      >
      <el-button type="primary" @click="countCurveElement"
        >统计曲线要素</el-button
      >
      <el-button type="primary" @click="searchCurveElement"
        >查找曲线要素</el-button
      >
      <el-button type="primary" plain @click="insertCurveElement"
        >添加曲线要素</el-button
      >
      <el-button type="primary" plain @click="modifyCurveElement"
        >修改曲线要素</el-button
      >
      <el-button type="primary" plain @click="deleteCurveElement"
        >删除曲线要素</el-button
      >
      <el-button type="primary" plain @click="clearCurveElement"
        >清空曲线要素</el-button
      >
      <el-button type="primary" @click="initCurveElement"
        >初始化曲线要素</el-button
      >
      <el-button type="primary" @click="calculateCoordinate"
        >计算曲线坐标</el-button
      >
      <el-button type="primary" @click="calculateCoordinateList"
        >批量计算曲线坐标</el-button
      >
    </div>

    <div class="splitter-container">
      <split-pane split="vertical" :min-percent="16" :default-percent="20">
        <template slot="paneL">
          <split-pane
            split="horizontal"
            :min-percent="40"
            :default-percent="62"
          >
            <template slot="paneL">
              <el-form
                class="top-container"
                ref="form-params"
                :model="params"
                label-width="100px"
                style="margin-top:20px"
              >
                <el-form-item label="ceQx">
                  <el-select
                    v-model="ceQx"
                    @change="selectChanged"
                    placeholder="请选择曲线名称"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(qx, index) in ceQxs"
                      :key="index"
                      :label="
                        index + 1 + '. ' + splitCeQx(qx.ceQx) + ' 曲线要素'
                      "
                      :value="qx.ceQx"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="action">
                  <el-radio-group v-model="action">
                    <el-radio :label="0">曲线坐标计算</el-radio>
                    <el-radio :label="1">大地坐标转换</el-radio>
                  </el-radio-group>
                </el-form-item>
                <hr />
                <el-form-item label="dkBegin">
                  <el-input
                    v-model="params.dkBegin"
                    placeholder="请输入起点里程"
                  ></el-input>
                </el-form-item>
                <el-form-item label="dkEnd">
                  <el-input
                    v-model="params.dkEnd"
                    placeholder="请输入终点里程"
                  ></el-input>
                </el-form-item>
                <el-form-item label="dkGap">
                  <el-input
                    v-model="params.dkGap"
                    placeholder="请输入里程间距"
                  ></el-input>
                </el-form-item>
                <el-form-item label="dkDist">
                  <el-input
                    v-model="params.dkDist"
                    placeholder="请输入桩偏距"
                  ></el-input>
                </el-form-item>
                <el-form-item label="dkBeginBreak">
                  <el-input
                    v-model="params.dkBeginBreak"
                    placeholder="请输入断链起点"
                  ></el-input>
                </el-form-item>
                <el-form-item label="dkEndBreak">
                  <el-input
                    v-model="params.dkEndBreak"
                    placeholder="请输入断链终点"
                  ></el-input>
                </el-form-item>
                <el-form-item label="dkLabelBreak">
                  <el-input
                    v-model="params.dkLabelBreak"
                    placeholder="请输入断链标识"
                  ></el-input>
                </el-form-item>
                <el-form-item label="xyTp">
                  <el-input
                    v-model="params.xyTp"
                    placeholder="请输入坐标系类型"
                  ></el-input>
                </el-form-item>
                <el-form-item label="xyL0">
                  <el-input
                    v-model="params.xyL0"
                    placeholder="请输入中央子午线"
                  ></el-input>
                </el-form-item>
                <el-form-item label="xyH0">
                  <el-input
                    v-model="params.xyH0"
                    placeholder="请输入投影面高程"
                  ></el-input>
                </el-form-item>
              </el-form>
            </template>
            <template slot="paneR">
              <split-pane
                split="horizontal"
                :min-percent="40"
                :default-percent="52"
              >
                <template slot="paneL">
                  <el-form
                    class="bottom-container"
                    ref="form-search"
                    :model="search"
                    label-width="100px"
                  >
                    <el-form-item label="field">
                      <el-input
                        v-model="search.field"
                        placeholder="请输入查询的字段名称"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="value">
                      <el-input
                        v-model="search.value"
                        placeholder="请输入查询的字段数值"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="page">
                      <el-input
                        v-model="search.page"
                        placeholder="请输入查询结果的起始页"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="limit">
                      <el-input
                        v-model="search.limit"
                        placeholder="请输入查询结果页的条目数"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </template>
                <template slot="paneR">
                  <el-form
                    class="top-container"
                    ref="form-curve"
                    :model="curve"
                    label-width="100px"
                  >
                    <el-form-item label="ceId">
                      <el-input
                        v-model="curve.ceId"
                        placeholder="请输入交点ID"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceJd">
                      <el-input
                        v-model="curve.ceJd"
                        placeholder="请输入交点编号"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceDk">
                      <el-input
                        v-model="curve.ceDk"
                        placeholder="请输入交点里程"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceEx">
                      <el-input
                        v-model="curve.ceEx"
                        placeholder="请输入交点坐标EX"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceNy">
                      <el-input
                        v-model="curve.ceNy"
                        placeholder="请输入交点坐标NY"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceT1">
                      <el-input
                        v-model="curve.ceT1"
                        placeholder="请输入前切线长"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceT2">
                      <el-input
                        v-model="curve.ceT2"
                        placeholder="请输入后切线长"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceR1">
                      <el-input
                        v-model="curve.ceR1"
                        placeholder="请输入前缓和曲线半径"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceR2">
                      <el-input
                        v-model="curve.ceR2"
                        placeholder="请输入后缓和曲线半径"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceLs1">
                      <el-input
                        v-model="curve.ceLs1"
                        placeholder="请输入前缓和曲线长度"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceLs2">
                      <el-input
                        v-model="curve.ceLs2"
                        placeholder="请输入后缓和曲线长度"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceRc">
                      <el-input
                        v-model="params.ceRc"
                        placeholder="请输入圆曲线半径"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceLc">
                      <el-input
                        v-model="curve.ceLc"
                        placeholder="请输入圆曲线长度"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="ceLz">
                      <el-input
                        v-model="curve.ceLz"
                        placeholder="请输入夹直线长度"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </split-pane>
            </template>
          </split-pane>
        </template>
        <template slot="paneR">
          <split-pane split="horizontal" :min-percent="2" :default-percent="5">
            <template slot="paneL">
              <div class="top-container" style="text-align: center">
                top-container
                <h2>曲线要素计算</h2>
              </div>
            </template>
            <template slot="paneR">
              <split-pane
                split="vertical"
                :min-percent="20"
                :default-percent="35"
              >
                <template slot="paneL">
                  <vue-table
                    class="left-container"
                    caption="坐标计算结果"
                    :toolbar="{ search: true }"
                    :cols="xy_cols"
                    :rows="xy_rows"
                  />
                </template>
                <template slot="paneR">
                  <vue-table
                    class="right-container"
                    caption="曲线要素表"
                    :cols="cols"
                    :rows="rows"
                    :refresh="refresh"
                    :page="page"
                    :toolbar="{ search: true, left: true, right: true }"
                    @handleRow="handleRow"
                    @handleSort="handleSort"
                    @handlePage="handlePage"
                  />
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
import measureApi from "@api/measure";
import splitPane from "vue-splitpane";
import VueTable from "@components/VueTable";

export default {
  name: "Measure",
  components: { VueTable, splitPane },
  data() {
    return {
      cols: [],
      rows: [],
      page: {},
      xy_cols: [],
      xy_rows: [],
      ceQx: "",
      ceQxs: {},
      action: 0,
      params: {},
      search: {},
      curve: {},
      refresh: "",
      uploadExt: ".xls,.xlsx",
      uploadUrl: "http://localhost:8057/curve-element/importExcelCurveElement"
    };
  },
  created() {
    const _this = this;

    _this.ceQx = "K161+800.957-K182+828.224";
    _this.action = 0;
    _this.params = {
      dkBegin: 175600,
      dkEnd: 182100,
      dkGap: 20,
      dkDist: 0,
      dkBeginBreak: 178065,
      dkEndBreak: 178221.702,
      dkLabelBreak: "A",
      xyTp: 2,
      xyL0: 113.2,
      xyH0: 0
    };
    _this.search = {
      field: "ce_jd",
      value: "JD22",
      page: 1,
      limit: 20
    };
    _this.curve = {
      ceId: 0,
      ceJd: "JD000",
      ceDk: 123,
      ceEx: 123,
      ceNy: 123,
      ceT1: 123,
      ceT2: 123,
      ceR1: 123,
      ceR2: 123,
      ceLs1: 123,
      ceLs2: 123,
      ceRc: 123,
      ceLc: 123,
      ceLz: 123
    };

    _this.cols = [
      {
        id: 1,
        prop: "ceId",
        label: "序号",
        width: 60,
        sort: true
      },
      {
        id: 2,
        prop: "ceJd",
        label: "交点编号",
        width: 100,
        sort: true
      },
      {
        id: 3,
        prop: "ceDk",
        label: "交点里程",
        width: 100,
        sort: true
      },
      {
        id: 4,
        prop: "ceEx",
        label: "交点坐标",
        width: 120,
        sort: false
      },
      {
        id: 5,
        prop: "ceNy",
        label: "交点坐标",
        width: 100,
        sort: false
      },
      {
        id: 6,
        prop: "ceT1",
        label: "前切线长",
        width: 100,
        sort: false
      },
      {
        id: 7,
        prop: "ceT2",
        label: "后切线长",
        width: 100,
        sort: false
      },
      {
        id: 8,
        prop: "ceR1",
        label: "前缓和曲线半径",
        width: 100,
        sort: false
      },
      {
        id: 9,
        prop: "ceR2",
        label: "后缓和曲线半径",
        width: 100,
        sort: false
      },
      {
        id: 10,
        prop: "ceA1",
        label: "前缓和曲线参数",
        width: 100,
        sort: false
      },
      {
        id: 11,
        prop: "ceA2",
        label: "后缓和曲线参数",
        width: 100,
        sort: false
      },
      {
        id: 12,
        prop: "ceLs1",
        label: "前缓和曲线长",
        width: 100,
        sort: false
      },
      {
        id: 13,
        prop: "ceLs2",
        label: "后缓和曲线长",
        width: 100,
        sort: false
      },
      {
        id: 14,
        prop: "ceRc",
        label: "圆曲线半径",
        width: 100,
        sort: false
      },
      {
        id: 15,
        prop: "ceLc",
        label: "圆曲线长",
        width: 100,
        sort: false
      },
      {
        id: 16,
        prop: "ceLz",
        label: "夹直线长",
        width: 100,
        sort: false
      },
      {
        id: 17,
        prop: "ceE",
        label: "外失距",
        width: 100,
        sort: false
      },
      {
        id: 18,
        prop: "cePj",
        label: "偏角",
        width: 100,
        sort: false
      },
      {
        id: 19,
        prop: "ceFwj",
        label: "方位角",
        width: 100,
        sort: false
      },
      {
        id: 20,
        prop: "ceQd",
        label: "起点里程",
        width: 100,
        sort: false
      },
      {
        id: 21,
        prop: "ceZh",
        label: "直缓里程",
        width: 100,
        sort: false
      },
      {
        id: 22,
        prop: "ceHy",
        label: "缓圆里程",
        width: 100,
        sort: false
      },
      {
        id: 23,
        prop: "ceYh",
        label: "圆缓里程",
        width: 100,
        sort: false
      },
      {
        id: 24,
        prop: "ceHz",
        label: "缓直里程",
        width: 100,
        sort: false
      },
      {
        id: 25,
        prop: "ceZd",
        label: "终点里程",
        width: 100,
        sort: false
      },
      {
        id: 26,
        prop: "ceDo",
        label: "操作",
        width: 130,
        slot: [
          { type: "click", name: "edit" },
          { type: "click", name: "del" }
        ]
      }
    ];

    _this.xy_cols = [
      {
        id: 1,
        prop: "dkS",
        label: "里程S",
        width: 120,
        sort: true
      },
      {
        id: 2,
        prop: "dkX",
        label: "坐标X",
        width: 120,
        sort: true
      },
      {
        id: 3,
        prop: "dkY",
        label: "坐标Y",
        width: 120,
        sort: true
      },
      {
        id: 4,
        prop: "dkL",
        label: "经度L",
        width: 130,
        sort: false
      },
      {
        id: 5,
        prop: "dkN",
        label: "纬度N",
        width: 130,
        sort: false
      }
    ];

    measureApi
      .selectCurveElement()
      .then(res => {
        _this.rows = res.data.data;
        _this.page = { total: res.data.count, size: 20, cur: 1 };
      })
      .catch(err => {
        console.log(err);
      });

    measureApi
      .selectCurveLine()
      .then(res => {
        _this.ceQxs = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    splitCeQx: function(str) {
      var strs = str.split("+");
      var _strs = strs[1].split("-");
      return strs[0] + "—" + _strs[1];
    },
    insertCurveElement: function() {
      const _this = this;
      measureApi
        .insertCurveElement({
          ceQx: _this.ceQx,
          ceId: _this.curve.ceId,
          ceJd: _this.curve.ceJd,
          ceDk: _this.curve.ceDk,
          ceEx: _this.curve.ceEx,
          ceNy: _this.curve.ceNy,
          ceT1: _this.curve.ceT1,
          ceT2: _this.curve.ceT2,
          ceR1: _this.curve.ceR1,
          ceR2: _this.curve.ceR2,
          ceLs1: _this.curve.ceLs1,
          ceLs2: _this.curve.ceLs2,
          ceRc: _this.curve.ceRc,
          ceLc: _this.curve.ceLc,
          ceLz: _this.curve.ceLz
        })
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    modifyCurveElement: function() {
      const _this = this;
      measureApi
        .modifyCurveElement({
          ceQx: _this.ceQx,
          ceId: _this.curve.ceId,
          ceJd: _this.curve.ceJd,
          ceDk: _this.curve.ceDk,
          ceEx: _this.curve.ceEx,
          ceNy: _this.curve.ceNy,
          ceT1: _this.curve.ceT1,
          ceT2: _this.curve.ceT2,
          ceR1: _this.curve.ceR1,
          ceR2: _this.curve.ceR2,
          ceLs1: _this.curve.ceLs1,
          ceLs2: _this.curve.ceLs2,
          ceRc: _this.curve.ceRc,
          ceLc: _this.curve.ceLc,
          ceLz: _this.curve.ceLz
        })
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCurveElement: function() {
      const _this = this;
      measureApi
        .deleteCurveElement(_this.ceQx, _this.curve.ceJd)
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectCurveLine: function() {
      const _this = this;
      measureApi
        .selectCurveLine()
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectCurveElement: function() {
      const _this = this;
      measureApi
        .selectCurveElement()
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    countCurveElement: function() {
      const _this = this;
      measureApi
        .countCurveElement()
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchCurveElement: function() {
      const _this = this;
      measureApi
        .searchCurveElement(
          _this.search.field,
          _this.search.value,
          _this.search.page,
          _this.search.limit
        )
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearCurveElement: function() {
      const _this = this;
      measureApi
        .clearCurveElement()
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    initCurveElement: function() {
      const _this = this;
      measureApi
        .initCurveElement(
          _this.ceQx,
          _this.params.dkBeginBreak,
          _this.params.dkEndBreak
        )
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportExcelCurveElement: function() {
      const _this = this;
      measureApi
        .exportExcelCurveElement(
          "C:/Users/Administrator/IdeaProjects/jsw_cloud/jar/download"
        )
        .then(res => {
          _this.$message.success(res.data.msg);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    calculateCoordinate: function() {
      const _this = this;
      measureApi
        .calculateCoordinate(
          _this.action,
          _this.ceQx,
          _this.params.dkBegin,
          _this.params.dkDist,
          _this.params.dkBeginBreak,
          _this.params.dkEndBreak,
          _this.params.dkLabelBreak,
          _this.params.xyTp,
          _this.params.xyL0,
          _this.params.xyH0
        )
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.xy_rows.push(res.data.data);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    calculateCoordinateList: function() {
      const _this = this;
      measureApi
        .calculateCoordinateList(
          _this.action,
          _this.ceQx,
          _this.params.dkBegin,
          _this.params.dkEnd,
          _this.params.dkGap,
          _this.params.dkDist,
          _this.params.dkBeginBreak,
          _this.params.dkEndBreak,
          _this.params.dkLabelBreak,
          _this.params.xyTp,
          _this.params.xyL0,
          _this.params.xyH0
        )
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.xy_rows = res.data.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectChanged: function(val) {
      const _this = this;
      measureApi
        .searchCurveElement("ce_QX", val, 1, 20)
        .then(res => {
          _this.$message.success(res.data.msg);
          _this.rows = res.data.data;
          _this.page = { total: res.data.count, size: 20, cur: 1 };
          _this.refresh = val;
          console.log(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleRow(row, type) {
      alert(JSON.stringify(row));
      alert(type);
    },
    handleSort(prop, order) {
      alert(prop);
      alert(order);
    },
    handlePage(value) {
      const _this = this;
      measureApi
        .searchCurveElement("ce_ID", null, value, 20)
        .then(res => {
          _this.rows = res.data.data;
          _this.refresh = value;
        })
        .catch(err => {
          console.log(err);
        });
    },
    beforeUpload: function(file) {
      const isXls =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel";
      const isLt2M = file.size / 1024 / 1024 < 2;

      const _this = this;
      if (!isLt2M) {
        _this.$message.error("上传文件大小不能超过 2MB!");
      }

      return isXls && isLt2M;
    },
    handleSuccess(res, file, fileList) {
      const _this = this;
      _this.$message.success("导入Excel文件成功!");
      console.log(res);
      console.log(fileList);
    },
    handleError(err, file, fileList) {
      const _this = this;
      _this.$message.error("导入Excel文件失败!");
      console.log(err);
      console.log(fileList);
    }
  }
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
    //background-color: #009688 !important;
    //color: #fff !important;
    background-color: #eee !important;
    color: #666 !important;
    height: 100%;
    //width: 350px;
  }
  .right-container {
    //position: absolute;
    //background-color: #1e9fff !important;
    //color: #fff !important;
    background-color: #eee !important;
    color: #666 !important;
    height: 100%;
    //width: calc(100vw - 350px);
  }
  .top-container {
    //position: absolute;
    //background-color: #ffb800 !important;
    //color: #fff !important;
    background-color: #eee !important;
    color: #666 !important;
    height: 100%;
    width: 100%;
  }
  .bottom-container {
    //position: absolute;
    //background-color: #ff5722 !important;
    //color: #fff !important;
    background-color: #eee !important;
    color: #666 !important;
    //height: calc(100vh - 100px);
    height: 100%;
    width: 100%;
  }
}
</style>
