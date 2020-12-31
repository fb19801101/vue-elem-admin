<template>
  <div id="vue-table">
    <el-row
      type="flex"
      justify="space-between"
      :style="{ width: width + 'px' }"
    >
      <el-col :span="4">
        <el-button-group>
          <el-tooltip
            v-for="(btn, idx) in buttons.left"
            :key="idx"
            effect="dark"
            :content="btn.tip"
            placement="bottom"
          >
            <el-button
              v-if="
                toolbar.left != null && toolbar.left.indexOf(btn.label) !== -1
              "
              :size="btn.size"
              :icon="btn.icon"
              @click="handleRow(btn.param, btn.event)"
            ></el-button>
          </el-tooltip>
        </el-button-group>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="input"
          :placeholder="placeholder"
          @input="handleInput"
          size="mini"
          v-if="toolbar.search"
        ></el-input>
      </el-col>
      <el-col :span="8" tag="div">
        <div class="el-caption">{{ caption }}</div>
      </el-col>
      <el-col :span="4"> </el-col>
      <el-col :span="4">
        <el-button-group>
          <el-tooltip
            v-for="(btn, idx) in buttons.right"
            :key="idx"
            effect="dark"
            :content="btn.tip"
            placement="bottom"
          >
            <el-button
              v-if="
                toolbar.right != null && toolbar.right.indexOf(btn.label) !== -1
              "
              :size="btn.size"
              :icon="btn.icon"
              @click="handleRow(btn.param, btn.event)"
            ></el-button>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>

    <el-table
      ref="table"
      header-row-class-name="el-header"
      :data="tableData"
      :key="refresh"
      border
      stripe
      fit
      :show-summary="summary"
      :summary-method="handleSummary"
      :span-method="handleSpan"
      @sort-change="handleSort"
      @row-click="toggleExpand"
      :row-style="rowStyle"
      :header-row-style="headerStyle"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-if="btree"
        :prop="colTree.prop"
        :label="colTree.label"
        :width="colTree.width"
      >
        <template slot-scope="scope">
          <span
            :style="{ 'padding-left': +scope.row._level * indent + 'px' }"
          />
          <span
            v-show="showTreeIcon(scope.row)"
            class="el-table-tree-icon"
            @click="toggleTreeIcon(scope.row)"
          >
            <i v-if="!scope.row._expand" class="el-icon-plus" />
            <i v-else class="el-icon-minus" />
          </span>
          {{ scope.row.node }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(col, index) in colData"
        :v-if="col.hide ? Boolean(false) : Boolean(true)"
        :key="index"
        :prop="col.prop"
        :align="col.align"
        :align-header="col.align"
        :label="col.label"
        :show-overflow-tooltip="col.overflow ? Boolean(true) : Boolean(false)"
        :sortable="col.sort"
        min-width="50"
        :width="col.width"
        :filters="col.filters"
        :filter-method="col.filters != null ? handleFilter : null"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <span :class="renderClass(scope.row[col.prop], col.render)">{{
            scope.row[col.prop]
          }}</span>
          <el-button-group v-for="(it, idx) in col.slot" :key="idx">
            <el-button
              @click="handleRow(scope.row, it.type)"
              type="primary"
              size="mini"
              plain
              >{{ it.name }}</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
      <el-table-column v-if="expands.button" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="toggleFold(scope.row)">{{
            expands.caption
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column v-if="expands.expand" type="expand" width="1">
        <template slot-scope="scope">
          <el-form
            label-position="left"
            inline
            class="el-table-expand"
            v-for="(item, index) in scope.row.expands"
            :key="index"
          >
            <el-form-item :label="item.label">
              <span>{{ item.id }} - {{ item.value }}</span> </el-form-item
            ><br />
          </el-form>
        </template>
      </el-table-column>
    </el-table>

    <div class="feedback" v-show="feedback">
      <i
        v-show="feedback === 'loading'"
        class="load-icon-item el-icon-loading"
      ></i>
      <span v-if="feedback === 'error' || feedback === 'empty'">{{
        feedback === "error"
          ? "获取数据失败"
          : feedback === "empty"
          ? "暂无数据"
          : ""
      }}</span>
    </div>

    <div class="page-box" v-if="page.size !== 1000">
      <el-pagination
        @current-change="handlePage"
        :current-page.sync="page.cur"
        :page-size="page.size"
        layout="total, prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import treeToArray, { addAttrs } from "./eval";

export default {
  name: "VueTable",
  props: {
    caption: {
      type: String,
      default: ""
    },
    /*
     *   表格配置【cols】：接受一个<<对象数组>>
     *   字段说明：
     *   【hide】 => Boolean（非必填）=> default: false，为<true>时该列隐藏
     *   【label】 => String（必填） => 表头名称
     *   【prop】 => String（非必填） => 对应单元格的字段 => 有【slot】时不填，否则必填
     *   【render】 => Array（非必填） => 根据单元格内容给出对应的类名
     *              接受一个<<对象数组>>
     *              字段说明：
     *             【myTarget】 => String/Number（必填） => 比较的对象
     *             【myClass】 => String（必填） => 满足条件时的类名
     *             【mode】 => String（非必填） => 比较方法:
     *                                           'more' => 大于【myTarget】的值
     *                                           'less' => 小于【myTarget】的值
     *                                           不填【mode】 => 等于【myTarget】的值
     *    【slot】 => Array（非必填） => 对应单元格的操作
     *              接受一个<<对象数组>>
     *              字段说明：
     *              【type】 => String（必填） => 操作类型
     *              【name】 => String（必填） => 名字
     *    【filters】 => Array（非必填） => 对应列的筛选操作
     *              接受一个<<对象数组>>
     *              字段说明：
     *              【text】 => String（必填） => 筛选文字
     *              【value】 => String（必填） => 筛选变量值
     *     【sort】 => String => 排序 custom
     *     【align】 => String => default: left => 为<center>时该列居中对齐, <right>时该列右对齐, 默认局左对齐
     *     【overflow】 => Boolean => default: false => 为<true>时内容溢出隐藏
     */
    cols: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rows: {
      // 表格数据
      type: Array,
      default: () => {
        return [];
        //【expands】 => Array（非必填） => 附加展开行属性
      }
    },
    page: {
      // 页数配置
      type: Object,
      default: () => {
        return {
          total: 0, // 数据量
          size: 20, // 每页数据量
          cur: 1 // 当前页
        };
      }
    },
    feedback: {
      // 用户体验反馈 => 'loading'-加载中， 'empty'-暂无数据,  'error'-获取数据失败
      type: String,
      default: ""
    },
    toolbar: {
      // 是否有工具啦
      type: Object,
      default: () => {
        return {
          search: false,
          left: [],
          right: []
          //left: ['set', 'search', 'refresh', 'upload', 'download'],
          //right: ['edit', 'delete', 'share', 'printer'， ‘lock’]
        };
      }
    },
    buttons: {
      // 是否有工具啦
      type: Object,
      default: () => {
        return {
          left: [
            {
              label: "set",
              size: "mini",
              icon: "el-icon-setting",
              event: "btn-set",
              param: null,
              tip: "设置"
            },
            {
              label: "search",
              size: "mini",
              icon: "el-icon-search",
              event: "btn-search",
              param: null,
              tip: "搜索"
            },
            {
              label: "refresh",
              size: "mini",
              icon: "el-icon-refresh",
              event: "btn-refresh",
              param: null,
              tip: "刷新"
            },
            {
              label: "upload",
              size: "mini",
              icon: "el-icon-upload2",
              event: "btn-upload",
              param: null,
              tip: "上传"
            },
            {
              label: "download",
              size: "mini",
              icon: "el-icon-download",
              event: "btn-download",
              param: null,
              tip: "下载"
            }
          ],
          right: [
            {
              label: "edit",
              size: "mini",
              icon: "el-icon-edit",
              event: "btn-edit",
              param: null,
              tip: "编辑"
            },
            {
              label: "delete",
              size: "mini",
              icon: "el-icon-delete",
              event: "btn-delete",
              param: null,
              tip: "删除"
            },
            {
              label: "share",
              size: "mini",
              icon: "el-icon-share",
              event: "btn-share",
              param: null,
              tip: "分享"
            },
            {
              label: "printer",
              size: "mini",
              icon: "el-icon-printer",
              event: "btn-printer",
              param: null,
              tip: "打印"
            },
            {
              label: "lock",
              size: "mini",
              icon: "el-icon-lock",
              event: "btn-lock",
              param: null,
              tip: "锁定"
            }
          ]
        };
      }
    },
    filters: {
      type: Array,
      default: () => {
        //return [{ prop: "ceJd" }, { prop: "ceDk" }];
        return [];
      }
    },
    summary: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: String,
      default: ""
    },
    expands: {
      type: Object,
      default: () => {
        return {
          expand: false, // 是否有展开行
          button: false, // 是否有按钮
          caption: "详情", // 按钮标题
          items: [{ id: 1, label: "展开行", value: "Table Expand Row" }] // 展开行项目
          // 【id】 => int（必填） => 字段ID
          // 【label】 => String（必填） => 字段名称
          // 【value】 => String（非必填） => 字段值
        };
      }
    },
    btree: {
      type: Boolean,
      default: false
    },
    folder: {
      type: Boolean,
      default: true
    },
    indent: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      input: "",
      filterData: [],
      placeholder: "",
      width: 0,
      toggled: false
    };
  },
  computed: {
    tableData: {
      get() {
        const _this = this;
        if (_this.btree) {
          const data = _this.rows;
          if (data.length === 0) {
            return [];
          }

          addAttrs(data, { expand: !_this.folder });
          return treeToArray(data);
        }

        if (_this.input.length > 0) {
          return _this.filterData;
        }
        return _this.rows;
      },
      set(val) {
        return val;
      }
    },
    colTree() {
      const _this = this;
      if (_this.btree) {
        return _this.cols[0];
      }
      return {};
    },
    colData() {
      const _this = this;
      let tmp = [];
      const cols = _this.cols;
      let width = 0;
      let _with = 1230;
      _this.placeholder = "";
      cols.forEach((col, index) => {
        if (_this.btree && index > 0) {
          tmp.push(col);
        } else {
          tmp.push(col);
        }

        if (_this.filters && _this.filters.indexOf(col.prop) !== -1) {
          _this.placeholder = _this.placeholder + "【" + col.label + "】";
        }

        width += col.width;
      });

      _this.width = (width < _with ? _with : width) + 55;
      return tmp;
    }
  },
  methods: {
    // 操作
    handleRow(row, type) {
      this.$emit("handleRow", row, type);
    },
    // 排序
    handleSort({ prop, order }) {
      this.$emit("handleSort", prop, order);
    },
    // 类名
    renderClass(target, renderList) {
      let myClass = "",
        firstRender = false;
      if (!renderList) return;
      renderList.forEach(item => {
        if (!item.mode && item.myTarget === target) {
          if (firstRender) {
            myClass += " " + item.myClass;
          } else {
            myClass += item.myClass;
            firstRender = true;
          }
        } else if (item.mode === "more" && target > item.myTarget) {
          if (firstRender) {
            firstRender = true;
            myClass += " " + item.myClass;
          } else {
            myClass += item.myClass;
            firstRender = true;
          }
        } else if (item.mode === "less" && target < item.myTarget) {
          if (firstRender) {
            myClass += " " + item.myClass;
          } else {
            myClass += item.myClass;
            firstRender = true;
          }
        }
      });
      return myClass;
    },
    // 切换页数
    handlePage(value) {
      this.$emit("handlePage", value);
    },
    // 合计行
    handleSummary(param) {
      this.$emit("handlePage", param);
    },
    // 合计行
    handleSpan(param) {
      this.$emit("handleSpan", param);
    },
    // 过滤行
    handleFilter(value, row, column) {
      this.$emit("handleFilter", value, row, column);
    },
    // 过滤行
    handleInput(value) {
      this.$emit("handleInput", value);
    },
    // 展开行
    toggleExpand(row) {
      if (row.expands && row.expands.length > 0 && !this.toggled) {
        let $table = this.$refs.table;
        this.rows.map(item => {
          if (row.id !== item.id) {
            $table.toggleRowExpansion(item, false);
          }
        });
        $table.toggleRowExpansion(row);
      }

      this.toggled = false;
    },
    // 折叠行
    toggleFold(row) {
      if (row.expands && row.expands.length > 0) {
        let $table = this.$refs.table;
        $table.toggleRowExpansion(row.data, false);
      }
    },
    // 设置行样式
    rowStyle: function({ row }) {
      const parent = row._parent;
      const show = parent ? parent._expand && parent._show : true;
      row._show = show;

      let styleJson = {};
      if (show) {
        styleJson = {
          animation: "el-table-tree-show 1s",
          "-webkit-animation": "el-table-tree-show 1s"
        };
      } else {
        styleJson = {
          display: "none"
        };
      }

      return styleJson;
    },
    // 设置行样式
    headerStyle: function() {
      return {
        textAlign: "center"
      };
    },
    // 显示表格树图标
    showTreeIcon(row) {
      return row._icon;
    },
    // 表格树图标事件
    toggleTreeIcon(row) {
      this.toggled = true;
      row._expand = !row._expand;
    }
  },
  watch: {
    //computed/watch
    // eslint-disable-next-line no-unused-vars
    input: function(val, oldVal) {
      let _this = this;
      _this.filterData = _this.rows.filter(item => {
        // return ~item.ceJd.indexOf(val);
        let ret = false;
        for (let i = 0; i < _this.filters.length; i++) {
          let _ret = item[_this.filters[i]].toString().includes(val);
          ret = ret || _ret;
        }

        return ret;
      });
    }
  }
};
</script>

<style lang="stylus">

#vue-table {
  position: relative;

  .el-header {
    background-color: #f5f7fa;
    font-size: 13px;
    color: #6f7683;
    font-weight: bold;
  }

  .el-caption {
    font-size: 20px;
    font-family: "Microsoft YaHei UI";
    font-weight: bold;
    text-align: center;
  }

  .el-table {
    border: 1px solid #e6ebf5;
    border-bottom: none;
  }

  .el-table th,
  .el-table td {
    padding: 8px 0;
  }

  .el-table th {
    background-color: #f5f7fa;
  }

  .el-table th:first-child .cell {
    padding-left: 20px;
  }

  .el-table tbody tr td:first-child .cell {
    padding-left: 20px;
  }

  .caret-wrapper {
    height: 19px;
  }

  .sort-caret.ascending {
    top: -3px;
  }

  .sort-caret.descending {
    bottom: 0;
  }

  .el-table:before {
    z-index: 0;
  }

  .el-button--text {
    font-size: 13px;
    color: #60c0bd;
  }

  .el-button--small,
  .el-button--small.is-round {
    padding: 0;
  }


  .feedback {
    height: 60px;
    line-height: 60px;
    position: absolute;
    top: 40px;
    width: 100%;
    text-align: center;
  }

  .feedback i {
    font-size: 20px;
  }

  .feedback span {
    font-size: 14px;
    color: #909399;
  }


  .page-box {
    height: 70px;
    padding-top: 30px;
    position: relative;
  }

  .page-box .el-pagination {
    float: right;
  }

  .page-box .el-pagination .el-pagination__total {
    position: absolute;
    left: 10px;
  }

  .page-box .el-pagination .el-pager li {
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    padding: 0 6px;
    font-size: 12px;
    color: #555;
    border-radius: 4px;
    text-align: center;
    margin: 0 5px;
  }

  .page-box .el-pagination .el-pager li.active {
    color: #60c0bd;
    background-color: #e7f6f5;
  }

  .page-box .el-pagination button .el-icon {
    margin-top: -2px;
  }

  .page-box .el-pagination button .el-icon:before {
    font-size: 18px;
    color: #555;
    font-weight: normal;
  }

  .page-box .el-pagination button:disabled .el-icon:before {
    color: #e5e5e5;
  }


  .el-table .header-row th {
    background-color: #009688 !important;
    color: #fff !important;
  }

  .el-table .single-row td {
    background: #dadada !important;
  }

  .el-table .double-row td {
    background: #eeeeee !important;
  }

  .el-table-expand {
    font-size: 0;
    margin-left: 200px;
  }

  .el-table-expand label {
    width: 100px;
    color: #1e9fff !important;
  }

  .el-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  /* 将el-table的展开图标替换为其他图标 */
  .el-table__expand-icon{
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .el-table__expand-icon
  .el-icon-arrow-right:before{
    content: ""; //"\e6d9";
    //border: 1px solid #ccc;
    //padding: 2px;
  }
  .el-table__expand-icon--expanded
  .el-icon-arrow-right:before{
    content: ""; //"\e6d8";
  }


  /* tree-table */
  @keyframes el-table-tree-show {
    from {
      opacity: 0;
    }
    to {
        opacity: 1;
    }
  }
  @-webkit-keyframes el-table-tree-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .el-table-tree-icon {
    position: relative;
    cursor: pointer;
    color: #2196f3;
  }


  /* 背景颜色 */
  .bg-red {
    background-color: #ff5722 !important;
    color: #fff !important;
  }

  /*赤*/
  .bg-orange {
    background-color: #ffb800 !important;
    color: #fff !important;
  }

  /*橙*/
  .bg-green {
    background-color: #009688 !important;
    color: #fff !important;
  }

  /*绿*/
  .bg-cyan {
    background-color: #2f4056 !important;
    color: #fff !important;
  }

  /*青*/
  .bg-blue {
    background-color: #1e9fff !important;
    color: #fff !important;
  }

  /*蓝*/
  .bg-black {
    background-color: #393d49 !important;
    color: #fff !important;
  }

  /*黑*/
  .bg-gray {
    background-color: #eee !important;
    color: #666 !important;
  }

  /*灰*/
}
</style>
